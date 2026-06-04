import { createBrowserClient } from "@supabase/ssr";

// Stub type for build-time placeholder
interface StubSupabaseClient {
  auth: {
    signInWithPassword: () => Promise<{ data: { user: null }; error: { message: string } }>;
    signOut: () => Promise<{ error: null }>;
    getUser: () => Promise<{ data: { user: null }; error: null }>;
  };
  from: () => any;
}

function isConfigured(): boolean {
  if (typeof window !== 'undefined') {
    return Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-project-url"
    );
  }
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-project-url"
  );
}

// Create a stub client for build-time to prevent crashes
function createStubClient() {
  const stub: StubSupabaseClient = {
    auth: {
      signInWithPassword: async () => ({ data: { user: null }, error: { message: "Not configured" } }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({
            limit: async () => ({ data: [], error: null }),
          }),
        }),
      }),
      insert: () => ({
        select: async () => ({ data: null, error: { message: "Not configured" } }),
      }),
      update: () => ({
        eq: () => ({
          select: async () => ({ data: null, error: { message: "Not configured" } }),
        }),
      }),
      delete: () => ({
        eq: () => async () => ({ error: { message: "Not configured" } }),
      }),
    }),
  } as unknown as StubSupabaseClient;
  return stub;
}

// Lazy initialization to avoid build-time errors
let supabaseClient: ReturnType<typeof createBrowserClient> | StubSupabaseClient | null = null;

export function createClient() {
  // During build or when not configured, return stub client
  if (!isConfigured()) {
    return createStubClient() as ReturnType<typeof createBrowserClient>;
  }

  // At runtime, create real client once
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return supabaseClient as ReturnType<typeof createBrowserClient>;
}

export { isConfigured };