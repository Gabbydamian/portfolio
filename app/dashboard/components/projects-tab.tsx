import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardProjectForm from "@/components/dashboard-project-form";
import {
  Eye,
  Edit,
  Trash2,
  Calendar,
  ExternalLink,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectsTabProps {
  projects: any[];
  editingProject: any | null;
  editProjectSuccess: boolean;
  onEdit: (project: any) => void;
  onDelete: (id: string, title: string) => void;
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <Card key={project.id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                {project.image ? (
                  <div className="relative w-full h-48 bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <FolderKanban className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {project.description}
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {project.tags && (
                    <div className="flex flex-wrap gap-1">
                      {project.tags
                        .slice(0, 3)
                        .map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground self-center">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(project.last_modified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit(project)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                {project.link && (
                  <Link href={project.link} target="_blank">
                    <Button type="button" variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(project.id, project.title)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
