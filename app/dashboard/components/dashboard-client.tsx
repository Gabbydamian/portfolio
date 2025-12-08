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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  addLearningPost,
} from "@/actions/learningActions";
import { updateBlogPost } from "@/actions/blogActions";
import { updateProject } from "@/actions/projectActions";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocationInfo } from "@/components/location-info";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DashboardOverview } from "./dashboard-overview";
import { SubmissionsTab } from "./submissions-tab";
import { PostsTab } from "./posts-tab";
import { LearningTab } from "./learning-tab";
import { ProjectsTab } from "./projects-tab";
import { NewPostTab } from "./new-post-tab";
import { NewProjectTab } from "./new-project-tab";
import { NewLearningTab } from "./new-learning-tab";
import { AboutSettingsTab } from "./about-settings-tab";
import type {
  Profile,
  Skill,
  Experience,
  Education,
  Interest,
} from "@/app/types/profile";

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "submissions", label: "Pending Submissions" },
  { key: "about-settings", label: "About Settings" },
  { key: "posts", label: "Blog Posts" },
  { key: "new-post", label: "New Post" },
  { key: "learning", label: "Learning Posts" },
  { key: "new-learning", label: "New Learning Post" },
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
  initialProfile: Profile | null;
  initialSkills: Skill[];
  initialExperience: Experience[];
  initialEducation: Education[];
  initialInterests: Interest[];
  topics: string[];
}

export function DashboardClient({
  initialBlogPosts,
  initialPendingSubmissions,
  initialProjects,
  initialLearningPosts,
  chartData,
  userEmail,
  initialProfile,
  initialSkills,
  initialExperience,
  initialEducation,
  initialInterests,
  topics,
}: DashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [pendingSubmissions, setPendingSubmissions] = useState(
    initialPendingSubmissions
  );
  const [projects, setProjects] = useState(initialProjects);
  const [learningPosts, setLearningPosts] = useState(initialLearningPosts);
  const [profile] = useState(initialProfile);
  const [skills] = useState(initialSkills);
  const [experience] = useState(initialExperience);
  const [education] = useState(initialEducation);
  const [interests] = useState(initialInterests);
  const [postSuccess, setPostSuccess] = useState(false);
  const [projectSuccess, setProjectSuccess] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editPostSuccess, setEditPostSuccess] = useState(false);
  const [editProjectSuccess, setEditProjectSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    type: "post" | "project" | "learning";
    title: string;
  } | null>(null);

  async function handleApprove(id: string) {
    try {
      await approveBlogPost(id);
      const pendingResult = await fetchBlogPosts("pending");
      setPendingSubmissions(pendingResult.error ? [] : pendingResult.blogs ?? []);
      toast.success("Post approved successfully");
    } catch (error) {
      toast.error("Failed to approve post");
      console.error(error);
    }
  }

  async function handleReject(id: string) {
    try {
      await rejectBlogPost(id);
      const pendingResult = await fetchBlogPosts("pending");
      setPendingSubmissions(pendingResult.error ? [] : pendingResult.blogs ?? []);
      toast.success("Post rejected successfully");
    } catch (error) {
      toast.error("Failed to reject post");
      console.error(error);
    }
  }

  async function handleDeletePost(id: string, title: string) {
    setDeleteConfirm({ id, type: "post", title });
  }

  async function handleDeleteProject(id: string, title: string) {
    setDeleteConfirm({ id, type: "project", title });
  }

  async function handleDeleteLearningPost(id: string, title: string) {
    setDeleteConfirm({ id, type: "learning", title });
  }

  async function confirmDelete() {
    if (!deleteConfirm) return;

    try {
      if (deleteConfirm.type === "post") {
        await deleteBlogPost(deleteConfirm.id);
        const publishedResult = await fetchBlogPosts();
        setBlogPosts(publishedResult.error ? [] : publishedResult.blogs ?? []);
        toast.success(`"${deleteConfirm.title}" deleted successfully`);
      } else if (deleteConfirm.type === "project") {
        await deleteProject(deleteConfirm.id);
        const projectsResult = await fetchProjects();
        setProjects(projectsResult.error ? [] : projectsResult.projectsData ?? []);
        toast.success(`"${deleteConfirm.title}" deleted successfully`);
      } else if (deleteConfirm.type === "learning") {
        await deleteLearningPost(deleteConfirm.id);
        const learningResult = await fetchLearningPosts();
        setLearningPosts(learningResult.error ? [] : learningResult.posts ?? []);
        toast.success(`"${deleteConfirm.title}" deleted successfully`);
      }
    } catch (error) {
      toast.error("Failed to delete item");
      console.error(error);
    } finally {
      setDeleteConfirm(null);
    }
  }

  async function handleAddPost(values: any) {
    try {
      await addNewBlogPost(values);
      setPostSuccess(true);
      const publishedResult = await fetchBlogPosts();
      setBlogPosts(publishedResult.error ? [] : publishedResult.blogs ?? []);
      toast.success("Blog post created successfully");
    } catch (error) {
      toast.error("Failed to create blog post");
      console.error(error);
    }
  }

  async function handleAddProject(values: any) {
    try {
      await addProject({
        ...values,
        tags: values.tags
          ? values.tags.split(",").map((t: string) => t.trim())
          : [],
      });
      setProjectSuccess(true);
      const projectsResult = await fetchProjects();
      setProjects(projectsResult.error ? [] : projectsResult.projectsData ?? []);
      toast.success("Project created successfully");
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    }
  }

  async function handleAddLearningPost(values: any) {
    try {
      await addLearningPost(values);
      const learningResult = await fetchLearningPosts();
      setLearningPosts(learningResult.error ? [] : learningResult.posts ?? []);
      toast.success("Learning post created successfully");
    } catch (error) {
      toast.error("Failed to create learning post");
      console.error(error);
    }
  }

  async function handleEditPost(values: any) {
    if (!editingPost) return;
    try {
      const result = await updateBlogPost(editingPost.id, {
        ...values,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setEditPostSuccess(true);
      setEditingPost(null);
      const publishedResult = await fetchBlogPosts();
      setBlogPosts(publishedResult.error ? [] : publishedResult.blogs ?? []);
      toast.success("Blog post updated successfully");
    } catch (error) {
      toast.error("Failed to update blog post");
      console.error(error);
    }
  }

  async function handleEditProject(values: any) {
    if (!editingProject) return;
    try {
      const result = await updateProject(editingProject.id, {
        id: editingProject.id,
        ...values,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setEditProjectSuccess(true);
      setEditingProject(null);
      const projectsResult = await fetchProjects();
      setProjects(projectsResult.error ? [] : projectsResult.projectsData ?? []);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error("Failed to update project");
      console.error(error);
    }
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
      case "about-settings":
        return (
          <AboutSettingsTab
            profile={profile}
            skills={skills}
            experience={experience}
            education={education}
            interests={interests}
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
      case "new-learning":
        return (
          <NewLearningTab onSubmit={handleAddLearningPost} topics={topics} />
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

      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{deleteConfirm?.title}"? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
