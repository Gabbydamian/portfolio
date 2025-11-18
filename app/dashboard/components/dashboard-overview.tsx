import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardMetricsChart from "@/components/dashboard-metrics-chart";
import {
  FileText,
  FolderKanban,
  Clock,
  Eye,
  Calendar,
  ArrowUpRight,
  Activity,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

interface DashboardOverviewProps {
  blogPosts: any[];
  projects: any[];
  learningPosts: any[];
  pendingSubmissions: any[];
  chartData: any[];
  onTabChange: (tab: string) => void;
}

export function DashboardOverview({
  blogPosts,
  projects,
  learningPosts,
  pendingSubmissions,
  chartData,
  onTabChange,
}: DashboardOverviewProps) {
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
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
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
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Learning Posts
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningPosts.length}</div>
            <p className="text-xs text-muted-foreground">Educational content</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {blogPosts.length + projects.length + learningPosts.length}
            </div>
            <p className="text-xs text-muted-foreground">All published items</p>
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
            <CardDescription>Your latest published blog posts</CardDescription>
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
            <CardDescription>Your latest portfolio projects</CardDescription>
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
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={() => onTabChange("new-post")}
              className="w-full justify-start"
              variant="outline"
            >
              <FileText className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
            <Button
              onClick={() => onTabChange("new-project")}
              className="w-full justify-start"
              variant="outline"
            >
              <FolderKanban className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
            <Button
              onClick={() => onTabChange("submissions")}
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
              onClick={() => onTabChange("posts")}
              className="w-full justify-start"
              variant="outline"
            >
              <FileText className="mr-2 h-4 w-4" />
              Manage Posts
            </Button>
            <Button
              onClick={() => onTabChange("projects")}
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
}
