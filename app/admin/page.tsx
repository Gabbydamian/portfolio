import { MainLayout } from "@/components/main-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getUserSession, userLogout } from "@/actions/userActions";
import { fetchBlogPosts } from "@/actions/blogActions";
import { AdminLogin } from "@/components/AdminLogin";
import { PendingSubmissions } from "@/components/PendingSubmissions";
import { BlogPosts } from "@/components/BlogPosts";
import { NewPost } from "@/components/NewPost";
import { Projects } from "@/components/AdminProjects";
import { NewProject } from "@/components/NewProject";
import { fetchProjects } from "@/actions/projectActions";

export default async function AdminPage() {
  const pendingResult = await fetchBlogPosts("pending");
  const pendingSubmissions = pendingResult.error
    ? []
    : pendingResult.blogs ?? [];

  if (pendingResult.error) {
    console.error("Error fetching blogs: ", pendingResult.error);
  }

  const publishedResult = await fetchBlogPosts();
  const blogPosts = publishedResult.error ? [] : publishedResult.blogs ?? [];

  if (publishedResult.error) {
    console.error("Error fetching published blogs: ", publishedResult.error);
  }

  const FetchedProjects = await fetchProjects();
  const projects = FetchedProjects.error
    ? []
    : FetchedProjects.projectsData ?? [];

  // Check authentication server-side
  const session = await getUserSession();
  const isAuthenticated = !!session;

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <MainLayout>
        <AdminLogin />
      </MainLayout>
    );
  }

  // If authenticated, show admin dashboard
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-24 py-12 mt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <form action={userLogout}>
            <Button
              type="submit"
              variant="outline"
              className="hover:bg-red-800"
            >
              Logout
            </Button>
          </form>
        </div>

        <Tabs defaultValue="submissions">
          <TabsList className="mb-8">
            <TabsTrigger value="submissions">Pending Submissions</TabsTrigger>
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="new-post">New Post</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="new-project">New Project</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <PendingSubmissions submissions={pendingSubmissions} />
          </TabsContent>

          <TabsContent value="posts">
            <BlogPosts blogs={blogPosts} />
          </TabsContent>

          <TabsContent value="new-post">
            <NewPost />
          </TabsContent>

          <TabsContent value="projects">
            <Projects projects={projects} />
          </TabsContent>

          <TabsContent value="new-project">
            <NewProject />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
