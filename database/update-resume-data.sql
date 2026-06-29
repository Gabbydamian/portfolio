-- =============================================
-- Update Resume Data in Supabase SQL Editor
-- =============================================
-- Copy and run this script in your Supabase SQL Editor (SQL Editor > New Query)
-- to update your active database content to match your new resume info.
-- =============================================

-- 1. UPDATE PROFILE INFO
UPDATE profile
SET 
  full_name = 'Damian Gabriel O.',
  title = 'Technical Lead / Full-Stack Developer',
  bio = 'Technical Lead & Full-Stack Developer with 2.5+ years building and owning production systems end-to-end. Specialized in Next.js, TypeScript, and PostgreSQL (Supabase/Neon), with hands-on experience architecting multi-tenant platforms, implementing secure auth flows, and deploying on Vercel. Comfortable working across the full stack with minimal oversight and a strong bias toward shipping.',
  email = 'gabbydamian92@gmail.com',
  location = 'Lagos, Nigeria',
  website = 'https://astridamian.vercel.app/'
WHERE id = (SELECT id FROM profile LIMIT 1);

-- 2. UPDATE EXPERIENCE RECORDS
DELETE FROM experience;

INSERT INTO experience (title, company, period, description, "order", is_current) VALUES
  (
    'Technical Lead / Full-Stack Developer',
    'Aspom Travels',
    'Jan 2026 – Present',
    'Architected and built a multi-tenant B2B Visa Portal (Next.js, Drizzle ORM, Neon/Postgres) supporting independent agency workflows. Built TravelAtal''s hotel booking engine from scratch, integrating RateHawk API with Redis caching and lazy-loading strategies, achieving a 100/100 score across Performance, Accessibility, Best Practices, and SEO on Google PageSpeed Insights. Implemented Paystack Split Payments, automating real-time commission distribution. Managed all server infrastructure, CI/CD pipelines, and technical operations end-to-end.',
    1,
    true
  ),
  (
    'Full-Stack Developer',
    'Valdymas',
    'Mar 2025 – Dec 2025',
    'Built a production-grade loan and savings workflow engine using Next.js and Supabase, designing the database schema and implementing Row Level Security (RLS) policies. Configured Supabase Auth with role-based permissions and built data visualization dashboards for savings goals and loan repayment schedules.',
    2,
    false
  ),
  (
    'Frontend Developer (Next.js)',
    'Hire-ng',
    'Apr 2024 – Apr 2025',
    'Engineered reusable UI component libraries with TailwindCSS. Conducted performance audits, resolving rendering bottlenecks and improving Core Web Vitals scores. Collaborated with design and product teams to ship user-focused interfaces on tight delivery cycles.',
    3,
    false
  );

-- 3. UPDATE EDUCATION RECORDS
DELETE FROM education;

INSERT INTO education (degree, institution, period, description, "order") VALUES
  (
    'B.Sc. in Quantity Surveying',
    'Obafemi Awolowo University',
    'May 2018 – Dec 2024',
    'Graduated with Second Class Honours (Upper Division) degree.',
    1
  ),
  (
    'CompTIA IT Fundamentals (ITF+) Certification (FC0-U61)',
    'Computing Technology Industry Association (COMPTIA)',
    'Sep 2024 – Nov 2024',
    'Gained foundational knowledge of IT security, software architecture, and computing basics; achieved 83% average on certification mock exams.',
    2
  ),
  (
    'Introduction to Computer Science',
    'Harvard’s CS50X',
    'Nov 2023 – Jun 2024',
    'Built foundational CS understanding including data abstraction, resource management, and encapsulation. Created applications in C, Python, and JavaScript with SQL databases, focusing on algorithmic efficiency and web functionality.',
    3
  );

-- 4. UPDATE SKILLS RECORDS
DELETE FROM skills;

INSERT INTO skills (name, color, category, "order") VALUES
  ('JavaScript (ES6+)', 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300', 'Languages', 1),
  ('TypeScript', 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300', 'Languages', 2),
  ('Python', 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', 'Languages', 3),
  ('SQL', 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', 'Languages', 4),
  ('React 19', 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', 'Frontend', 5),
  ('Next.js 15', 'bg-slate-50 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300', 'Frontend', 6),
  ('TailwindCSS v4', 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300', 'Frontend', 7),
  ('Drizzle ORM', 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300', 'Backend', 8),
  ('Prisma', 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300', 'Backend', 9),
  ('PostgreSQL (Neon/Supabase)', 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', 'Backend', 10),
  ('Node.js', 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300', 'Backend', 11),
  ('Better Auth', 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', 'Backend', 12),
  ('Git', 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300', 'Tools', 13),
  ('Vercel', 'bg-slate-50 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300', 'Tools', 14),
  ('CI/CD Pipelines', 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300', 'Tools', 15),
  ('AI Model Integration', 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', 'General', 16),
  ('Linux/Unix', 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', 'Tools', 17);
