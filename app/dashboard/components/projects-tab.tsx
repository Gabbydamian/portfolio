import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardProjectForm from "@/components/dashboard-project-form";

interface ProjectsTabProps {
  projects: any[];
  editingProject: any | null;
  editProjectSuccess: boolean;
  onEdit: (project: any) => void;
  onDelete: (id: string) => void;
  onSubmitEdit: (values: any) => Promise<void>;
}

export function ProjectsTab({
  projects,
  editingProject,
  editProjectSuccess,
  onEdit,
  onDelete,
  onSubmitEdit,
}: ProjectsTabProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      {editProjectSuccess && (
        <div className="mb-4 text-green-600">Project updated successfully!</div>
      )}
      {editingProject ? (
        <DashboardProjectForm
          initialValues={editingProject}
          onSubmit={onSubmitEdit}
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
                  onClick={() => onEdit(project)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onDelete(project.id)}
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
}
