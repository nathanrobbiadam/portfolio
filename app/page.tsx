import { createClient } from "@/lib/supabase/server";
import LandingPage from "@/components/LandingPage";

export default async function Home() {
  const supabase = await createClient();

  // Fetch projects from Supabase
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  // If no featured projects, fetch all projects
  const { data: allProjects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  const displayProjects = (projects?.length ? projects : allProjects) || [];

  return <LandingPage projects={displayProjects} />;
}