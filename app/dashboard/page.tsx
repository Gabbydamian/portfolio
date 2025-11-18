import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import DashboardMetricsChart from "@/components/dashboard-metrics-chart";
import {
  fetchBlogPosts,
  approveBlogPost,
  rejectBlogPost,
  deleteBlogPost,
  addNewBlogPost,
} from "@/actions/blogActions";
import {
  fetchProjects,
  deleteProject,
  addProject,
} from "@/actions/projectActions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardPostForm from "@/components/dashboard-post-form";
import DashboardProjectForm from "@/components/dashboard-project-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocationInfo } from "@/components/location-info";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/supabase";
import { DashboardClient } from "./components/dashboard-client";

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "submissions", label: "Pending Submissions" },
  { key: "posts", label: "Blog Posts" },
  { key: "new-post", label: "New Post" },
  { key: "projects", label: "Projects" },
  { key: "new-project", label: "New Project" },
];

export default async function AdminDashboard() {
  // Server-side authentication check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware should handle this, but double-check
  if (!user) {
    redirect("/admin");
  }

  // Fetch all data on server
  const publishedResult = await fetchBlogPosts();
  const blogPosts = publishedResult.error ? [] : publishedResult.blogs ?? [];

  const pendingResult = await fetchBlogPosts("pending");
  const pendingSubmissions = pendingResult.error
    ? []
    : pendingResult.blogs ?? [];

  const projectsResult = await fetchProjects();
  const projects = projectsResult.error
    ? []
    : projectsResult.projectsData ?? [];

  // Chart data
  const chartData = getMonthlyCounts(blogPosts, projects);

  return (
    <DashboardClient
      initialBlogPosts={blogPosts}
      initialPendingSubmissions={pendingSubmissions}
      initialProjects={projects}
      chartData={chartData}
      userEmail={user.email || ""}
    />
  );
}

// Helper to group blog posts and projects by month for the chart
function getMonthlyCounts(
  blogPosts: { date_created: string }[],
  projects: { last_modified: string }[]
) {
  // Get last 6 months
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return d;
  });
  const monthLabels = months.map((d) =>
    d.toLocaleString("default", { month: "short" })
  );

  // Count posts per month
  const postCounts = months.map((d) => {
    const month = d.getMonth();
    const year = d.getFullYear();
    return blogPosts.filter((p) => {
      const date = new Date(p.date_created);
      return date.getMonth() === month && date.getFullYear() === year;
    }).length;
  });

  // Count projects per month
  const projectCounts = months.map((d) => {
    const month = d.getMonth();
    const year = d.getFullYear();
    return projects.filter((p) => {
      const date = new Date(p.last_modified);
      return date.getMonth() === month && date.getFullYear() === year;
    }).length;
  });

  return monthLabels.map((name, i) => ({
    name,
    posts: postCounts[i],
    projects: projectCounts[i],
  }));
}
