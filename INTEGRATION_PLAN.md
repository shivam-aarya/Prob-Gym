# Integration Plan: Unified Multi-Study Platform

## Overview
Transform Prob-Gym into an extensible multi-study platform using normalized multi-tenant database architecture, plugin system for custom inputs, and standardized study configuration patterns.

---

## Phase 1: Database Architecture Redesign (Normalized Multi-Tenant)

### 1.1 Create New Supabase Schema
```sql
-- Studies table (study metadata and config)
CREATE TABLE studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  config JSONB NOT NULL,
  metadata JSONB,
  status TEXT DEFAULT 'DRAFT',
  version TEXT DEFAULT '1.0.0',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Participants table (multi-tenant with study_id)
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_id UUID REFERENCES studies(id) ON DELETE CASCADE,
  participant_id TEXT NOT NULL,
  responses JSONB,
  demographic_data JSONB,
  consent_timestamp TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW(),
  total_completion_time_ms BIGINT,
  session_data JSONB,
  UNIQUE(study_id, participant_id)
);

-- Plugin registry table
CREATE TABLE study_plugins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  version TEXT NOT NULL,
  component_path TEXT NOT NULL,
  config_schema JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_participants_study_id ON participants(study_id);
CREATE INDEX idx_participants_created_at ON participants(created_at);
CREATE INDEX idx_studies_slug ON studies(slug);
CREATE INDEX idx_studies_status ON studies(status);
```

### 1.2 Update Database Services
- Extend `DatabaseService` interface with study-scoped methods
- Update `SupabaseService` to support `studyId` parameter in all operations
- Add `StudyService` class for CRUD operations on studies table
- Update `InMemoryDatabaseService` to support multi-study in development

### 1.3 Migration Strategy
- Create migration script to insert Prob-Gym as first study
- Link existing participant data to prob-gym study_id
- Preserve all existing data integrity

---

## Phase 2: Project Structure Reorganization

### 2.1 New Directory Structure
```
/Users/shivam/dev/Research/Prob-Gym/
├── src/
│   ├── app/
│   │   ├── page.tsx                           # Study catalog homepage (NEW)
│   │   ├── layout.tsx
│   │   └── studies/[studySlug]/               # Dynamic study routes (NEW)
│   │       ├── page.tsx                       # Study detail/landing
│   │       ├── consent/page.tsx
│   │       ├── tutorial/page.tsx
│   │       ├── scenarios/page.tsx
│   │       ├── demographic/page.tsx
│   │       └── complete/page.tsx
│   ├── studies/                               # Study definitions (NEW)
│   │   ├── registry.ts                        # Central study registry
│   │   ├── types.ts                           # Study interfaces
│   │   ├── prob-gym/                          # Migrated Prob-Gym study
│   │   │   ├── metadata.ts                    # Study metadata
│   │   │   ├── config.json                    # Study configuration
│   │   │   ├── scenarios.ts                   # Scenario definitions
│   │   │   ├── scenarios_cabinet.ts
│   │   │   └── plugins/                       # Study-specific plugins
│   │   │       ├── ConstrainedSliderPlugin.tsx
│   │   │       ├── NumberLinePlugin.tsx
│   │   │       └── HistogramPlugin.tsx
│   │   └── _template/                         # Template for new studies
│   ├── components/
│   │   ├── core/                              # Platform core components
│   │   │   ├── StudyCard.tsx
│   │   │   ├── StudyFilters.tsx
│   │   │   └── StudyCatalog.tsx
│   │   ├── study/                             # Study components (existing)
│   │   │   ├── QuestionFrame.tsx
│   │   │   ├── ScenarioNavigation.tsx
│   │   │   ├── ConsentPage.tsx
│   │   │   ├── TutorialPage.tsx
│   │   │   └── DemographicSurvey.tsx
│   │   ├── inputs/                            # Standard input components
│   │   │   ├── SliderInput.tsx (basic version)
│   │   │   └── TextInput.tsx
│   │   └── plugins/                           # Plugin system (NEW)
│   │       ├── PluginRegistry.ts
│   │       ├── PluginLoader.tsx
│   │       └── types.ts
│   ├── services/
│   │   ├── database/
│   │   │   ├── types.ts                       # Update with study methods
│   │   │   ├── supabase.ts                    # Update for multi-study
│   │   │   ├── memory.ts                      # Update for multi-study
│   │   │   └── index.ts
│   │   └── study/                             # Study management (NEW)
│   │       ├── StudyService.ts
│   │       └── PluginService.ts
│   └── data/                                  # DEPRECATED - move to studies/
```

### 2.2 File Migration Checklist
- Move `/data/config*.json` → `/studies/prob-gym/config.json` (merge variants)
- Move `/data/scenarios*.ts` → `/studies/prob-gym/scenarios*.ts`
- Move specialized inputs → `/studies/prob-gym/plugins/`
- Update all imports throughout codebase
- Move assets to `/public/studies/prob-gym/assets/`

---

## Phase 3: Plugin Architecture Implementation

### 3.1 Define Plugin System Interfaces
```typescript
// src/components/plugins/types.ts
interface Plugin {
  name: string;
  version: string;
  type: 'input' | 'visualization' | 'feature';
  component: React.ComponentType<any>;
  configSchema?: ZodSchema;
  dependencies?: string[];
}

interface PluginManifest {
  plugins: Plugin[];
  initialize?: () => void;
  cleanup?: () => void;
}
```

### 3.2 Build Plugin Registry
- Create `PluginRegistry` singleton for plugin registration
- Implement `register()`, `get()`, `list()` methods
- Add validation for plugin schemas
- Support dynamic loading and lazy loading

### 3.3 Create Plugin Loader Component
- `<PluginLoader>` wrapper for dynamic plugin rendering
- Error boundaries for plugin failures
- Fallback UI for missing plugins
- Plugin prop validation

### 3.4 Convert Prob-Gym Inputs to Plugins
- `SliderInput` → `ConstrainedSliderPlugin` (with all constraint features)
- `NumberLineInput` → `NumberLinePlugin`
- `HistogramInput` → `HistogramPlugin`
- Each plugin exports manifest with metadata
- Register plugins in `prob-gym/metadata.ts`

---

## Phase 4: Study Metadata Standard

### 4.1 Define Metadata Schema
```typescript
// src/studies/types.ts
interface StudyMetadata {
  // Identification
  id: string;
  slug: string;
  version: string;

  // Display
  title: string;
  description: string;
  shortDescription?: string;

  // Classification
  tags: {
    cognitiveProcess: string[];
    modality: string[];
    studyLength: 'quick' | 'medium' | 'long';
    domain?: string[];
  };

  // Settings
  settings: {
    questionsPerParticipant: number;
    randomizeQuestions: boolean;
    allowBack: boolean;
    showProgress: boolean;
    timeLimit?: number;
  };

  // Resources
  assetPath: string;
  plugins: string[];  // Plugin names required

  // Study flow
  flow: {
    consent: boolean;
    tutorial: boolean;
    scenarios: boolean;
    demographic: boolean;
  };
}
```

### 4.2 Create Validation System
- Zod schemas for runtime validation
- TypeScript types for compile-time safety
- Validation utility functions
- Error messages for invalid configs

### 4.3 Study Registry Implementation
```typescript
// src/studies/registry.ts
const STUDY_REGISTRY: Record<string, StudyMetadata> = {
  'prob-gym': probGymMetadata,
  // Future studies...
};

export function getStudy(slug: string): StudyMetadata;
export function listStudies(filters?: FilterOptions): StudyMetadata[];
```

---

## Phase 5: Multi-Study UI & Routing

### 5.1 Study Catalog Homepage (`/`)
- Grid layout of study cards (3 columns)
- Each card shows: title, description, duration, participant count, tags
- Filter panel: cognitive process, modality, study length
- Search functionality
- Status badges (Active, Draft, Completed)

### 5.2 Dynamic Study Routes
- `/studies/[studySlug]` - Study landing page with details
- `/studies/[studySlug]/consent` - Consent flow
- `/studies/[studySlug]/tutorial` - Tutorial flow
- `/studies/[studySlug]/scenarios` - Main study
- `/studies/[studySlug]/demographic` - Demographics
- `/studies/[studySlug]/complete` - Completion page

### 5.3 Study-Scoped Layouts
- Create layout.tsx for study routes that loads study context
- Study context provides: metadata, config, plugin registry
- Asset loading from study-specific paths
- Theme/styling per study if needed

### 5.4 Update Navigation
- Platform header with "All Studies" link
- Study-specific progress tracking
- Breadcrumbs showing current location

---

## Phase 6: API Routes & Data Flow

### 6.1 Update API Routes for Multi-Study
```
/api/studies/[studySlug]/submit
/api/studies/[studySlug]/demographic
/api/studies/[studySlug]/participant/[id]
/api/studies/[studySlug]/stats
```

### 6.2 Study Context & State Management
- Create React context for current study
- Load study metadata on route change
- Initialize plugins based on study requirements
- Manage study-scoped localStorage (prefix keys with studySlug)

---

## Phase 7: Migration & Testing

### 7.1 Data Migration
- Create `scripts/migrate-to-multi-study.ts`
- Insert Prob-Gym into studies table
- Update existing participants with study_id
- Verify data integrity
- Create backup before migration

### 7.2 Create Second Study (Validation)
- Build simple example study using template
- Test plugin system with different input types
- Verify data isolation between studies
- Test filtering and catalog display

### 7.3 Testing Checklist
- [ ] Existing Prob-Gym functionality works identically
- [ ] New studies can be added via registry
- [ ] Plugins load correctly per study
- [ ] Data isolation verified (no cross-study leaks)
- [ ] Study catalog filtering works
- [ ] All routes function with dynamic studySlug
- [ ] LocalStorage properly scoped per study
- [ ] Database queries efficient with indexes

---

## Phase 8: Documentation & Developer Experience

### 8.1 Documentation Files
- `docs/ARCHITECTURE.md` - Platform architecture overview
- `docs/STUDY_CREATION_GUIDE.md` - Step-by-step guide
- `docs/PLUGIN_DEVELOPMENT.md` - Custom plugin guide
- `docs/DATABASE_SCHEMA.md` - Database schema documentation
- `docs/MIGRATION_GUIDE.md` - Migration from standalone to platform

### 8.2 Study Template
- Create `src/studies/_template/` with boilerplate
- Include example metadata, config, scenarios
- Sample plugin implementation
- README with instructions

### 8.3 Developer Tools (Optional Future Enhancement)
- CLI tool: `npm run create-study <name>`
- Study validation: `npm run validate-study <slug>`
- Plugin tester: isolated plugin testing environment

---

## Implementation Order

**Week 1: Database & Core Infrastructure**
- Phase 1: Database schema + services (Days 1-2)
- Phase 2: Project restructure + migration (Days 3-4)
- Phase 6: API routes update (Day 5)

**Week 2: Plugin System & Study Registry**
- Phase 3: Plugin architecture (Days 1-3)
- Phase 4: Metadata standard + registry (Days 4-5)

**Week 3: UI & Testing**
- Phase 5: Multi-study UI (Days 1-3)
- Phase 7: Migration + testing (Days 4-5)

**Week 4: Documentation & Polish**
- Phase 8: Documentation (Days 1-2)
- Testing, bug fixes, refinement (Days 3-5)

---

## Success Criteria

✅ Prob-Gym functionality 100% preserved
✅ New studies can be added in < 2 hours
✅ Plugin system supports custom inputs
✅ Single Vercel deployment
✅ Database properly normalized and performant
✅ Comprehensive documentation
✅ Template for future studies
