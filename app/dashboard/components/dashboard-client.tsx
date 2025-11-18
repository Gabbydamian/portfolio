"use client";

import { useState } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardPostForm from "@/components/dashboard-post-form";
import DashboardProjectForm from "@/components/dashboard-project-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocationInfo } from "@/components/location-info";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  FolderKanban, 
  Clock, 
  TrendingUp, 
  Eye,
  Calendar,
  ArrowUpRight,
  Activity
} from "lucide-react";
import Link from "next/link";

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "submissions", label: "Pending Submissions" },
  { key: "posts", label: "Blog Posts" },
  { key: "new-post", label: "New Post" },
  { key: "projects", label: "Projects" },
  { key: "new-project", label: "New Project" },
];

interface DashboardClientProps {
  initialBlogPosts: any[];
  initialPendingSubmissions: any[];
  initialProjects: any[];
  chartData: any[];
  userEmail: string;
}

export function DashboardClient({
  initialBlogPosts,
  initialPendingSubmissions,
  initialProjects,
  chartData,
  userEmail,
}: DashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [pendingSubmissions, setPendingSubmissions] = useState(
    initialPendingSubmissions
  );
  const [projects, setProjects] = useState(initialProjects);
  const [postSuccess, setPostSuccess] = useState(false);
  const [projectSuccess, setProjectSuccess] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editPostSuccess, setEditPostSuccess] = useState(false);
  const [editProjectSuccess, setEditProjectSuccess] = useState(false);

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
    });
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
    });
    setEditProjectSuccess(true);
    setEditingProject(null);
    const projectsResult = await fetchProjects();
    setProjects(projectsResult.error ? [] : projectsResult.projectsData ?? []);
  }

  // Logout handler
  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  // Main content for each tab
  function renderTabContent() {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your content.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Posts
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blogPosts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Published blog posts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Projects
                  </CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active projects
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {pendingSubmissions.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting review
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Content
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {blogPosts.length + projects.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All published items
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Content Overview</CardTitle>
                  <CardDescription>
                    Monthly posts and projects over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <DashboardMetricsChart chartData={chartData} />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                  <CardDescription>
                    Your latest published blog posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 5).map((post: any) => (
                      <div
                        key={post.id}
                        className="flex items-start justify-between space-x-4"
                      >
                        <div className="flex-1 space-y-1">
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="text-sm font-medium leading-none hover:underline"
                          >
                            {post.title}
                          </Link>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date_created).toLocaleDateString()}
                          </p>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    ))}
                    {blogPosts.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No posts yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Projects */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>
                    Your latest portfolio projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.slice(0, 4).map((project: any) => (
                      <div
                        key={project.id}
                        className="flex items-start justify-between"
                      >
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {project.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {project.description?.substring(0, 60)}...
                          </p>
                        </div>
                        {project.link && (
                          <Link href={project.link} target="_blank">
                            <Button variant="ghost" size="sm">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No projects yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={() => setActiveTab("new-post")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Create New Post
                  </Button>
                  <Button
                    onClick={() => setActiveTab("new-project")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FolderKanban className="mr-2 h-4 w-4" />
                    Add New Project
                  </Button>
                  <Button
                    onClick={() => setActiveTab("submissions")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Review Submissions
                    {pendingSubmissions.length > 0 && (
                      <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {pendingSubmissions.length}
                      </span>
                    )}
                  </Button>
                  <Button
                    onClick={() => setActiveTab("posts")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Manage Posts
                  </Button>
                  <Button
                    onClick={() => setActiveTab("projects")}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FolderKanban className="mr-2 h-4 w-4" />
                    Manage Projects
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
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
            <span className="text-sm text-muted-foreground">{userEmail}</span>
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
