"use client";
import { useEffect, useState } from "react";
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
import { AdminLogin } from "@/components/AdminLogin";
import { createClient } from "@/utils/supabase/client";

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "submissions", label: "Pending Submissions" },
  { key: "posts", label: "Blog Posts" },
  { key: "new-post", label: "New Post" },
  { key: "projects", label: "Projects" },
  { key: "new-project", label: "New Project" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postSuccess, setPostSuccess] = useState(false);
  const [projectSuccess, setProjectSuccess] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editPostSuccess, setEditPostSuccess] = useState(false);
  const [editProjectSuccess, setEditProjectSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Client-side authentication check
  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setAuthChecked(true);
    }
    checkAuth();
  }, []);

  // Fetch all data on mount (if authenticated)
  useEffect(() => {
    if (!user) return;
    async function fetchAll() {
      setLoading(true);
      const publishedResult = await fetchBlogPosts();
      setBlogPosts(publishedResult.error ? [] : publishedResult.blogs ?? []);
      const pendingResult = await fetchBlogPosts("pending");
      setPendingSubmissions(
        pendingResult.error ? [] : pendingResult.blogs ?? []
      );
      const projectsResult = await fetchProjects();
      setProjects(
        projectsResult.error ? [] : projectsResult.projectsData ?? []
      );
      setLoading(false);
    }
    fetchAll();
  }, [user]);

  // Chart data
  const chartData = getMonthlyCounts(blogPosts, projects);

  // Handlers for CRUD
  async function handleApprove(id: string) {
    await approveBlogPost(id);
    const pendingResult = await fetchBlogPosts("pending");
    setPendingSubmissions(pendingResult.error ? [] : pendingResult.blogs ?? []);
  }
  async function handleReject(id: string) {
    await rejectBlogPost(id);
    const pendingResult = await fetchBlogPosts("pending");
    setPendingSubmissions(pendingResult.error ? [] : pendingResult.blogs ?? []);
  }
  async function handleDeletePost(id: string) {
    await deleteBlogPost(id);
    const publishedResult = await fetchBlogPosts();
    setBlogPosts(publishedResult.error ? [] : publishedResult.blogs ?? []);
  }
  async function handleDeleteProject(id: string) {
    await deleteProject(id);
    const projectsResult = await fetchProjects();
    setProjects(projectsResult.error ? [] : projectsResult.projectsData ?? []);
  }
  async function handleAddPost(values: any) {
    await addNewBlogPost(values);
    setPostSuccess(true);
    const publishedResult = await fetchBlogPosts();
    setBlogPosts(publishedResult.error ? [] : publishedResult.blogs ?? []);
  }
  async function handleAddProject(values: any) {
    await addProject({
      ...values,
      tags: values.tags
        ? values.tags.split(",").map((t: string) => t.trim())
        : [],
    });
    setProjectSuccess(true);
    const projectsResult = await fetchProjects();
    setProjects(projectsResult.error ? [] : projectsResult.projectsData ?? []);
  }
  async function handleEditPost(values: any) {
    if (!editingPost) return;
    await fetch("/api/edit-post", {
      method: "POST",
      body: JSON.stringify({ id: editingPost.id, ...values }),
    }); // Replace with your updateBlogPost action
    setEditPostSuccess(true);
    setEditingPost(null);
    const publishedResult = await fetchBlogPosts();
    setBlogPosts(publishedResult.error ? [] : publishedResult.blogs ?? []);
  }
  async function handleEditProject(values: any) {
    if (!editingProject) return;
    await fetch("/api/edit-project", {
      method: "POST",
      body: JSON.stringify({ id: editingProject.id, ...values }),
    }); // Replace with your updateProject action
    setEditProjectSuccess(true);
    setEditingProject(null);
    const projectsResult = await fetchProjects();
    setProjects(projectsResult.error ? [] : projectsResult.projectsData ?? []);
  }

  // Logout handler
  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }

  // Main content for each tab
  function renderTabContent() {
    if (loading) {
      return <div className="text-muted-foreground">Loading...</div>;
    }
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
            {/* Metrics widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card rounded-lg shadow p-6 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">
                  {blogPosts.length}
                </span>
                <span className="text-muted-foreground">Total Posts</span>
              </div>
              <div className="bg-card rounded-lg shadow p-6 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">
                  {pendingSubmissions.length}
                </span>
                <span className="text-muted-foreground">
                  Pending Submissions
                </span>
              </div>
              <div className="bg-card rounded-lg shadow p-6 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">
                  {projects.length}
                </span>
                <span className="text-muted-foreground">Projects</span>
              </div>
              <div className="bg-card rounded-lg shadow p-6 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">--</span>
                <span className="text-muted-foreground">Recent Activity</span>
              </div>
            </div>
            {/* Chart using shadcn/ui chart component */}
            <div className="bg-card rounded-lg shadow p-6 min-h-[300px] flex items-center justify-center">
              <DashboardMetricsChart chartData={chartData} />
            </div>
          </>
        );
      case "submissions":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4">Pending Submissions</h1>
            {pendingSubmissions.length === 0 ? (
              <div className="text-muted-foreground">
                No pending submissions.
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingSubmissions.map((submission: any) => (
                  <Card
                    key={submission.id}
                    className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold">{submission.title}</div>
                      <div className="text-sm text-muted-foreground">
                        By {submission.author || "Anonymous"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="default"
                        onClick={() => handleApprove(submission.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleReject(submission.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        );
      case "posts":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
            {editPostSuccess && (
              <div className="mb-4 text-green-600">
                Post updated successfully!
              </div>
            )}
            {editingPost ? (
              <DashboardPostForm
                initialValues={editingPost}
                onSubmit={handleEditPost}
                mode="edit"
              />
            ) : blogPosts.length === 0 ? (
              <div className="text-muted-foreground">No blog posts yet.</div>
            ) : (
              <div className="grid gap-4">
                {blogPosts.map((post: any) => (
                  <Card
                    key={post.id}
                    className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold">{post.title}</div>
                      <div className="text-sm text-muted-foreground">
                        By {post.author || "Anonymous"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(post.date_created).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditingPost(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        );
      case "projects":
        return (
          <>
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            {editProjectSuccess && (
              <div className="mb-4 text-green-600">
                Project updated successfully!
              </div>
            )}
            {editingProject ? (
              <DashboardProjectForm
                initialValues={editingProject}
                onSubmit={handleEditProject}
                mode="edit"
              />
            ) : projects.length === 0 ? (
              <div className="text-muted-foreground">No projects yet.</div>
            ) : (
              <div className="grid gap-4">
                {projects.map((project: any) => (
                  <Card
                    key={project.id}
                    className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold">{project.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Last modified:{" "}
                        {new Date(project.last_modified).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditingProject(project)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        );
      case "new-post":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
            {postSuccess && (
              <div className="mb-4 text-green-600">
                Post added successfully!
              </div>
            )}
            <DashboardPostForm onSubmit={handleAddPost} mode="add" />
          </div>
        );
      case "new-project":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
            {projectSuccess && (
              <div className="mb-4 text-green-600">
                Project added successfully!
              </div>
            )}
            <DashboardProjectForm onSubmit={handleAddProject} mode="add" />
          </div>
        );
      default:
        return null;
    }
  }

  if (!authChecked) {
    return (
      <div className="text-muted-foreground">Checking authentication...</div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {TABS.find((t) => t.key === activeTab)?.label ||
                      "Dashboard"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <LocationInfo />
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button type="button" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>
        <div className="p-8">{renderTabContent()}</div>
      </SidebarInset>
    </SidebarProvider>
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
