# Dashboard Migration Plan

## Goal

Migrate the current `/admin` page to a modern dashboard layout with a collapsible sidebar, inspired by the shadcn/ui blocks example. The new dashboard should provide all current admin features and improve navigation and UX.

## Instructions

- **Do not remove or alter the current admin section** until the new dashboard is fully implemented and tested.
- Use the `Sidebar` component from `components/ui/sidebar.tsx` for the collapsible sidebar.
- Incrementally port features from the old admin page to the new dashboard.
- Track progress and todos in this file.

## Required Features (from current admin page)

- [ ] Authentication (login/logout)
- [ ] Pending Submissions (moderate blog posts)
- [ ] Blog Posts (view/manage published posts)
- [ ] New Post (create blog post)
- [ ] Projects (view/manage projects)
- [ ] New Project (add project)
- [ ] **Dashboard Metrics** (display key stats, charts, and graphs)

## Migration Steps

1. **Set up new dashboard route and layout**
   - Create a new route (e.g., `/admin/dashboard` or `/dashboard`).
   - Implement the dashboard shell with the collapsible sidebar.
2. **Sidebar Navigation**
   - Add navigation links for each feature (Pending Submissions, Blog Posts, etc.).
   - Ensure sidebar is collapsible and mobile-friendly.
3. **Dashboard Metrics Section**
   - Design and implement a metrics/overview section as the dashboard landing page.
   - Use modern chart libraries (e.g., shadcn/ui, recharts, nivo, etc.) for graphs and widgets.
   - Example metrics: total posts, pending submissions, project count, recent activity, etc.
4. **Port Features**
   - Incrementally move each feature from the old admin page to the new dashboard.
   - Ensure feature parity and test each section.
5. **Authentication**
   - Integrate authentication checks and logout functionality.
6. **Testing & QA**
   - Test the new dashboard for usability, responsiveness, and bugs.
7. **Deprecate Old Admin**
   - Once the new dashboard is complete and stable, remove or redirect the old admin page.

## Progress Tracking

- [ ] Step 1: Set up new dashboard route and layout
- [ ] Step 2: Sidebar navigation
- [ ] Step 3: Dashboard metrics section
- [ ] Step 4: Port features
- [ ] Step 5: Authentication
- [ ] Step 6: Testing & QA
- [ ] Step 7: Deprecate old admin

---

**Update this file as you make progress or change the plan.**
