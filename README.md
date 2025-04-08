This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Database Integration

This project uses Supabase as the database backend with an abstraction layer that allows easy swapping of different database implementations.

### Setting Up Supabase

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new Supabase project
3. In the SQL Editor, run the SQL code from the `schema.sql` file in this project to set up the required tables
4. Go to Project Settings > API and copy the URL and anon key
5. Create a `.env.local` file in the project root with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Database Abstraction Layer

The project uses a service-based abstraction layer for database operations, which allows:
- Easy switching between database implementations (Supabase, in-memory, etc.)
- Clean separation of concerns
- Testability with mock implementations

The implementation can be found in the `src/services/database` directory:
- `types.ts`: Interface definitions
- `supabase.ts`: Supabase implementation
- `memory.ts`: In-memory implementation for development/testing
- `index.ts`: Factory to create and provide database service instances

### Development Mode

For local development without Supabase, the system will automatically use an in-memory database implementation if Supabase credentials are not configured. This allows for easy development without requiring a database setup.
