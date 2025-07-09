import { fetchProjects, deleteProject } from "@/actions/projectActions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProjectsPage() {
  const projectsResult = await fetchProjects();
  const projects = projectsResult.error
    ? []
    : projectsResult.projectsData ?? [];

  async function handleDelete(id: string) {
    "use server";
    await deleteProject(id);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      {projects.length === 0 ? (
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
                <Link href={`/admin/dashboard/projects/${project.id}/edit`}>
                  <Button type="button" variant="outline">
                    Edit
                  </Button>
                </Link>
                <form action={handleDelete.bind(null, project.id)}>
                  <Button type="submit" variant="destructive">
                    Delete
                  </Button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
