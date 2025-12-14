# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Prob-Gym** is a multi-study research platform built with Next.js for conducting cognitive science experiments. Currently hosts the "Interpreting Agent Behavior in a Treasure Game" study, with architecture designed to support multiple studies through a unified platform.

## Technology Stack

- **Framework**: Next.js 15.5.9 (App Router) with React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL) with abstraction layer supporting in-memory fallback
- **Build Tool**: Turbopack (via `--turbopack` flag)
- **Visualization**: Chart.js with react-chartjs-2

## Development Commands

### Essential Commands
```bash
# Development server (with Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database setup (Supabase)
npm run db:setup
# Use --force flag to update existing study: npm run db:setup -- --force
```

### Database Setup Workflow
1. Create Supabase project and configure `.env.local` with:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Apply schema: Copy `schema.sql` content to Supabase SQL Editor and run
3. Seed data: `npm run db:setup`
4. Without Supabase credentials, the app automatically uses in-memory database for development

## Architecture

### Multi-Study Platform Design

The codebase implements a **multi-tenant study platform** where each study is isolated but shares common infrastructure:

#### Study Registry Pattern
- **Central Registry**: `src/studies/registry.ts` - All studies register here with metadata
- **Study Structure**: Each study lives in `src/studies/{study-slug}/` containing:
  - `metadata.ts` - Study configuration, tags, settings, flow
  - `scenarios.ts` - Study-specific scenarios/questions
  - `plugins/` - Custom input components (e.g., ConstrainedSlider, NumberLine, Histogram)

#### Database Abstraction Layer
Located in `src/services/database/`:
- **Interface**: `types.ts` defines `DatabaseService` contract
- **Implementations**:
  - `supabase.ts` - Production Supabase backend
  - `memory.ts` - In-memory implementation for development/testing
- **Factory**: `index.ts` auto-selects implementation based on environment
- **Multi-tenant Schema**: All data scoped by `study_id` foreign key

#### Plugin System
Custom input components are treated as plugins:
- **Registration**: Plugins declared in study metadata (`metadata.plugins`)
- **Location**: Study-specific plugins in `src/studies/{slug}/plugins/`
- **Current Plugins**:
  - `ConstrainedSliderPlugin` - Sliders with sum constraints
  - `NumberLinePlugin` - Point selection on timeline
  - `HistogramPlugin` - Probability distribution allocation

### Routing Structure

```
/ (homepage)
  └─ Study catalog with filtering

/studies/[studySlug]
  ├─ /consent          # IRB consent page
  ├─ /tutorial         # Interactive tutorial
  ├─ /scenarios        # Main study scenarios
  ├─ /demographic      # Demographic survey
  └─ /complete         # Completion/thank you page
```

**Study Context**: `src/contexts/StudyContext.tsx` provides study metadata and configuration throughout study pages via React Context.

### API Routes

```
/api/studies/[studySlug]/submit           # Submit scenario responses
/api/studies/[studySlug]/demographic      # Submit demographic data
/api/studies/[studySlug]/participant/[id] # Get/update participant
/api/responses/[scenarioId]               # Individual response operations
```

### Data Flow

1. **Participant Creation**: On consent, participant record created in `participants` table with `study_id`
2. **Scenario Selection**: `src/utils/scenarioSelection.ts` randomly selects N scenarios per study config, stores in localStorage with study-scoped keys (`{studySlug}_selectedScenarios`)
3. **Response Storage**: All responses stored in JSONB `responses` field, scoped to participant and study
4. **State Persistence**: Study progress tracked via localStorage (study-scoped keys) and database

### Key Type Definitions

- `src/types/study.ts` - Core study types (StudyConfig, UserResponse, InputMethod)
- `src/studies/types.ts` - Study metadata and registry types (StudyMetadata, StudySettings, StudyFlow)
- `src/services/database/types.ts` - Database service interfaces

## Important Patterns

### Scenario Randomization
- Scenarios randomly selected on first visit (per `questionsPerParticipant` setting)
- Original IDs preserved as `original_scenario_id`
- Sequential IDs assigned (1-based) for participant view
- Selection cached in localStorage to ensure consistency across page refreshes

### Study Scoping
When adding study-scoped features:
- **CRITICAL**: Always use study-scoped localStorage utilities from `@/utils/studyStorage`
- Never use raw `localStorage.getItem/setItem` - this causes cross-study contamination
- Always pass `study_id` to database operations
- Reference assets via `{study.assetPath}/{filename}` in metadata

### localStorage Best Practices

**IMPORTANT**: To prevent cross-study data contamination, always use the study-scoped localStorage utilities:

```typescript
import { getStudyItem, setStudyItem, removeStudyItem } from '@/utils/studyStorage';

// ✅ CORRECT - Study-scoped
const value = getStudyItem(studySlug, 'myKey');
setStudyItem(studySlug, 'myKey', 'myValue');
removeStudyItem(studySlug, 'myKey');

// ❌ WRONG - Will contaminate across studies
localStorage.getItem('myKey');
localStorage.setItem('myKey', 'myValue');

// ❌ WRONG - Manual scoping is error-prone
localStorage.getItem(`${studySlug}_myKey`);
```

**Available Utilities**:
- `getStudyItem(studySlug, key)` - Get study-scoped item
- `setStudyItem(studySlug, key, value)` - Set study-scoped item
- `removeStudyItem(studySlug, key)` - Remove study-scoped item
- `clearStudyStorage(studySlug)` - Clear all items for a study
- `getParticipantId(studySlug)` - Get study-scoped participant ID
- `setParticipantId(studySlug, id)` - Set study-scoped participant ID

**Getting studySlug in Components**:
```typescript
import { useStudy } from '@/contexts/StudyContext';

function MyComponent() {
  const { studySlug } = useStudy();
  // Now use studySlug with storage utilities
}
```

**Exceptions**: Only the theme preference (`theme` key) is intentionally global across all studies.

### Plugin Development
To create a new input plugin:
1. Create component in study's `plugins/` directory
2. Export via `plugins/index.ts`
3. Declare in study `metadata.plugins` array
4. Component receives props: `options`, `onChange`, `value`, plus study-specific config

### Database Service Usage
```typescript
import { db } from '@/services/database';

// Factory auto-selects Supabase or in-memory
// All operations return Promise<{ data, error }>
await db.createParticipant(studyId, participantData);
await db.getParticipant(participantId);
await db.updateParticipantResponses(participantId, responses);
```

## Study Configuration

Studies are configured through metadata objects with:
- **Identification**: `id`, `slug`, `version`
- **Display**: `title`, `description`, `tags` (for filtering)
- **Settings**: `questionsPerParticipant`, `randomizeQuestions`, `allowBack`, `showProgress`, `timeLimit`
- **Flow**: Boolean flags for `consent`, `tutorial`, `scenarios`, `demographic` pages
- **Resources**: `assetPath`, `plugins` array

See `src/studies/prob-gym/metadata.ts` for reference implementation.

## Code Organization Principles

- **Study Isolation**: Each study's unique code lives in `src/studies/{slug}/`
- **Shared Components**: Reusable UI in `src/components/`
- **Type Safety**: Comprehensive TypeScript types, strict mode enabled
- **Path Aliases**: Use `@/` prefix for absolute imports (configured in `tsconfig.json`)

## Migration Context

The codebase was recently restructured from a single-study app to multi-study platform:
- Legacy code may reference `/data/` (now `/studies/prob-gym/`)
- **All localStorage access is now study-scoped** to prevent cross-contamination
- Legacy components (NumberLineInput, SliderInput, HistogramInput) are deprecated - use plugins instead
- Database schema supports multi-tenancy with study-scoped data

See `INTEGRATION_PLAN.md` for detailed migration history and future extensibility plans.

## Environment Variables

Required for Supabase (optional - app works with in-memory DB without these):
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Optional for database setup script:
```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database Schema

Multi-tenant normalized schema with three main tables:
- **studies**: Study metadata, config, status (indexed on `slug`, `status`)
- **participants**: Per-study participant data with JSONB responses (indexed on `study_id`, `created_at`)
- **study_plugins**: Plugin registry (future extensibility)

Row-Level Security (RLS) enabled with policies allowing anonymous access for research participation.
