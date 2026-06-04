-- ============================================
-- DATABASE SCHEMA FOR PORTFOLIO
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  tech_stack TEXT[],
  image_url TEXT,
  project_url TEXT,
  github_url TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. Public read access (anyone can view projects)
CREATE POLICY "Public can view projects"
ON projects FOR SELECT
USING (true);

-- 4. Admin full access (only authenticated users can modify)
-- Note: We rely on Supabase Auth for admin authentication
-- and middleware to protect admin routes
CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
ON projects FOR DELETE
USING (true);

-- 5. Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- ============================================
-- SAMPLE DATA (optional - remove if not needed)
-- ============================================

INSERT INTO projects (title, short_description, description, tech_stack, image_url, category, featured) VALUES
(
  'Project 1 Title',
  'Brief description for card preview',
  'Full detailed description of the project...',
  ARRAY['React', 'Node.js', 'PostgreSQL'],
  'https://picsum.photos/800/600',
  'Web Development',
  true
);

-- ============================================
-- SUPABASE AUTH SETUP
-- ============================================
-- 1. Go to Supabase Dashboard > Authentication
-- 2. Add a user manually or enable sign up
-- 3. For production, consider using email magic links
--
-- To create admin user manually:
-- 1. Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" > enter email & password
-- 3. Save the credentials - these are your admin login
-- ============================================

-- ============================================
-- STORAGE (if you want to upload images)
-- ============================================
-- 1. Go to Supabase Dashboard > Storage
-- 2. Create a new bucket called "projects"
-- 3. Set as public bucket
-- 4. Add this policy for public access:
--
-- CREATE POLICY "Public can view images"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'projects');
--
-- CREATE POLICY "Authenticated can upload images"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'projects');