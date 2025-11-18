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
import {
  fetchLearningPosts,
  deleteLearningPost,
} from "@/actions/learningActions";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocationInfo } from "@/components/location-info";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { DashboardOverview } from "./dashboard-overview";
import { SubmissionsTab } from "./submissions-tab";
import { PostsTab } from "./posts-tab";
import { LearningTab } from "./learning-tab";
import { ProjectsTab } from "./projects-tab";
import { NewPostTab } from "./new-post-tab";
import { NewProjectTab } from "./new-project-tab";

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "submissions", label: "Pending Submissions" },
  { key: "posts", label: "Blog Posts" },
  { key: "new-post", label: "New Post" },
  { key: "learning", label: "Learning Posts" },
  { key: "projects", label: "Projects" },
  { key: "new-project", label: "New Project" },
];

interface DashboardClientProps {
  initialBlogPosts: any[];
  initialPendingSubmissions: any[];
  initialProjects: any[];
  initialLearningPosts: any[];
  chartData: any[];
  userEmail: string;
}

export function DashboardClient({
  initialBlogPosts,
  initialPendingSubmissions,
  initialProjects,
  initialLearningPosts,
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
  const [learningPosts, setLearningPosts] = useState(initialLearningPosts);
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

  async function handleDeleteLearningPost(id: string) {
    await deleteLearningPost(id);
    const learningResult = await fetchLearningPosts();
    setLearningPosts(learningResult.error ? [] : learningResult.posts ?? []);
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
          <DashboardOverview
            blogPosts={blogPosts}
            projects={projects}
            learningPosts={learningPosts}
            pendingSubmissions={pendingSubmissions}
            chartData={chartData}
            onTabChange={setActiveTab}
          />
        );
      case "submissions":
        return (
          <SubmissionsTab
            pendingSubmissions={pendingSubmissions}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        );
      case "posts":
        return (
          <PostsTab
            blogPosts={blogPosts}
            editingPost={editingPost}
            editPostSuccess={editPostSuccess}
            onEdit={setEditingPost}
            onDelete={handleDeletePost}
            onSubmitEdit={handleEditPost}
          />
        );
      case "learning":
        return (
          <LearningTab
            learningPosts={learningPosts}
            onDelete={handleDeleteLearningPost}
          />
        );
      case "projects":
        return (
          <ProjectsTab
            projects={projects}
            editingProject={editingProject}
            editProjectSuccess={editProjectSuccess}
            onEdit={setEditingProject}
            onDelete={handleDeleteProject}
            onSubmitEdit={handleEditProject}
          />
        );
      case "new-post":
        return (
          <NewPostTab postSuccess={postSuccess} onSubmit={handleAddPost} />
        );
      case "new-project":
        return (
          <NewProjectTab
            projectSuccess={projectSuccess}
            onSubmit={handleAddProject}
          />
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
