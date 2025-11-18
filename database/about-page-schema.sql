-- =============================================
-- About Page Dynamic Content - Database Schema
-- =============================================
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- =============================================
-- 1. CREATE TABLES
-- =============================================

-- Profile table (single row for personal info)
CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT,
  resume_url TEXT,
  email TEXT NOT NULL,
  location TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  category TEXT DEFAULT 'General',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience table
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interests table
CREATE TABLE IF NOT EXISTS interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Star',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_skills_order ON skills("order");
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_experience_order ON experience("order");
CREATE INDEX IF NOT EXISTS idx_experience_current ON experience(is_current);
CREATE INDEX IF NOT EXISTS idx_education_order ON education("order");
CREATE INDEX IF NOT EXISTS idx_interests_order ON interests("order");

-- =============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- =============================================

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. CREATE RLS POLICIES
-- =============================================

-- Profile Policies
-- Public can read
CREATE POLICY "Public can view profile"
  ON profile
  FOR SELECT
  USING (true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can insert profile"
  ON profile
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update profile"
  ON profile
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete profile"
  ON profile
  FOR DELETE
  TO authenticated
  USING (true);

-- Skills Policies
-- Public can read
CREATE POLICY "Public can view skills"
  ON skills
  FOR SELECT
  USING (true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can insert skills"
  ON skills
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update skills"
  ON skills
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete skills"
  ON skills
  FOR DELETE
  TO authenticated
  USING (true);

-- Experience Policies
-- Public can read
CREATE POLICY "Public can view experience"
  ON experience
  FOR SELECT
  USING (true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can insert experience"
  ON experience
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update experience"
  ON experience
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete experience"
  ON experience
  FOR DELETE
  TO authenticated
  USING (true);

-- Education Policies
-- Public can read
CREATE POLICY "Public can view education"
  ON education
  FOR SELECT
  USING (true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can insert education"
  ON education
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update education"
  ON education
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete education"
  ON education
  FOR DELETE
  TO authenticated
  USING (true);

-- Interests Policies
-- Public can read
CREATE POLICY "Public can view interests"
  ON interests
  FOR SELECT
  USING (true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can insert interests"
  ON interests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update interests"
  ON interests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete interests"
  ON interests
  FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- 5. CREATE FUNCTION FOR UPDATED_AT TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 6. CREATE TRIGGER FOR PROFILE TABLE
-- =============================================

DROP TRIGGER IF EXISTS update_profile_updated_at ON profile;

CREATE TRIGGER update_profile_updated_at
  BEFORE UPDATE ON profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 7. STORAGE BUCKETS (Run in Supabase Dashboard)
-- =============================================

-- Create buckets via SQL (if supported) or use Dashboard
-- Navigate to Storage > Create new bucket

-- Bucket: profile-images
-- Public: true
-- File size limit: 2MB
-- Allowed MIME types: image/jpeg, image/png, image/webp

-- Bucket: resumes
-- Public: true
-- File size limit: 5MB
-- Allowed MIME types: application/pdf

-- =============================================
-- 8. STORAGE POLICIES
-- =============================================

-- Profile Images Bucket Policies

-- Public can view all images
CREATE POLICY "Public can view profile images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile-images');

-- Authenticated users can upload images
CREATE POLICY "Authenticated users can upload profile images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'profile-images');

-- Authenticated users can update images
CREATE POLICY "Authenticated users can update profile images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'profile-images')
  WITH CHECK (bucket_id = 'profile-images');

-- Authenticated users can delete images
CREATE POLICY "Authenticated users can delete profile images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'profile-images');

-- Resumes Bucket Policies

-- Public can view all resumes
CREATE POLICY "Public can view resumes"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'resumes');

-- Authenticated users can upload resumes
CREATE POLICY "Authenticated users can upload resumes"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resumes');

-- Authenticated users can update resumes
CREATE POLICY "Authenticated users can update resumes"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'resumes')
  WITH CHECK (bucket_id = 'resumes');

-- Authenticated users can delete resumes
CREATE POLICY "Authenticated users can delete resumes"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'resumes');

-- =============================================
-- 9. SEED INITIAL DATA (OPTIONAL)
-- =============================================

-- Insert default profile (run after tables are created)
-- You can update this with your actual data

INSERT INTO profile (
  full_name,
  title,
  bio,
  email,
  location,
  website
) VALUES (
  'Damian Gabriel O.',
  'Full-Stack Developer & IT Expert',
  'Developer. Problem-solver. UX thinker. I build full-stack web apps that are fast, clean, and built to scale.',
  'gabbydamian92@gmail.com',
  'Lagos, Nigeria',
  'https://astridamian.vercel.app/'
) ON CONFLICT DO NOTHING;

-- Insert skills (sample data)
INSERT INTO skills (name, color, category, "order") VALUES
  ('JavaScript', 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300', 'Frontend', 1),
  ('TypeScript', 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300', 'Frontend', 2),
  ('Python', 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', 'Backend', 3),
  ('React', 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', 'Frontend', 4),
  ('Node.js', 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300', 'Backend', 5),
  ('Next.js', 'bg-slate-50 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300', 'Frontend', 6),
  ('Tailwind CSS', 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300', 'Frontend', 7),
  ('Docker', 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300', 'Tools', 8),
  ('Git', 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300', 'Tools', 9),
  ('SQL', 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', 'Backend', 10),
  ('Supabase', 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', 'Backend', 11),
  ('Figma', 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', 'Design', 12),
  ('UI/UX Design', 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300', 'Design', 13),
  ('Linux/Unix', 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', 'Tools', 14),
  ('APIs', 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300', 'Backend', 15),
  ('AI Systems', 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', 'General', 16),
  ('OOP', 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300', 'General', 17)
ON CONFLICT DO NOTHING;

-- Insert experience (sample data)
INSERT INTO experience (title, company, period, description, "order", is_current) VALUES
  (
    'Frontend Developer',
    'Valdymas',
    'Mar 2025 – Present',
    'Built responsive interfaces for a student management system and a full-stack savings/loan app using React, Next.js, and Supabase. Focused on authentication, data security, and performance visualization.',
    1,
    true
  ),
  (
    'Frontend Developer (Next.js)',
    'Hire-ng',
    'Apr 2024 – Present',
    'Developed reusable components using Next.js and TailwindCSS. Partnered with design teams to deliver optimized, engaging user interfaces and improve load times.',
    2,
    true
  ),
  (
    'Frontend Developer Intern',
    'IINVIO',
    'Nov 2023 – Feb 2024',
    'Collaborated on React-based app components and system architecture prototypes. Contributed to product research and business model development.',
    3,
    false
  )
ON CONFLICT DO NOTHING;

-- Insert education (sample data)
INSERT INTO education (degree, institution, period, description, "order") VALUES
  (
    'B.Sc. in Quantity Surveying',
    'Obafemi Awolowo University',
    '2017 – 2024',
    'Graduated with Second Class Honours (Upper Division). Built foundational analytical and project planning skills.',
    1
  ),
  (
    'CompTIA IT Fundamentals (ITF+)',
    'CompTIA',
    'Sep 2024 – Nov 2024',
    'Studied core IT concepts, security, operating systems, and troubleshooting. Achieved strong mock exam scores (avg. 83%).',
    2
  ),
  (
    'Introduction to Computer Science (CS50X)',
    'Harvard University (edX)',
    'Nov 2023 – Jun 2024',
    'Covered CS fundamentals with C, Python, JavaScript, and SQL. Focused on algorithmic thinking and secure web development.',
    3
  )
ON CONFLICT DO NOTHING;

-- Insert interests (sample data)
INSERT INTO interests (text, icon_name, "order") VALUES
  ('Classic film analysis and theory', 'Clapperboard', 1),
  ('Music production and discovery', 'Headphones', 2),
  ('Competitive chess', 'Crown', 3),
  ('Learning new technologies and skills', 'Rocket', 4)
ON CONFLICT DO NOTHING;

-- =============================================
-- 10. VERIFICATION QUERIES
-- =============================================

-- Check if tables were created
SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
  AND tablename IN ('profile', 'skills', 'experience', 'education', 'interests');

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public'
  AND tablename IN ('profile', 'skills', 'experience', 'education', 'interests');

-- Check policies exist
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public'
  AND tablename IN ('profile', 'skills', 'experience', 'education', 'interests');

-- Verify data was inserted
SELECT COUNT(*) as profile_count FROM profile;
SELECT COUNT(*) as skills_count FROM skills;
SELECT COUNT(*) as experience_count FROM experience;
SELECT COUNT(*) as education_count FROM education;
SELECT COUNT(*) as interests_count FROM interests;

-- =============================================
-- SETUP COMPLETE!
-- =============================================
-- Next Steps:
-- 1. Create storage buckets in Supabase Dashboard:
--    - Go to Storage > New Bucket
--    - Create "profile-images" (Public: true)
--    - Create "resumes" (Public: true)
-- 2. The storage policies will be applied automatically
-- 3. Test by querying the tables as public and authenticated user
-- =============================================
