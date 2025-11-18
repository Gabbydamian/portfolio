import DashboardProjectForm from "@/components/dashboard-project-form";

interface NewProjectTabProps {
  projectSuccess: boolean;
  onSubmit: (values: any) => void;
}

export function NewProjectTab({
  projectSuccess,
  onSubmit,
}: NewProjectTabProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
      {projectSuccess && (
        <div className="mb-4 text-green-600">Project added successfully!</div>
      )}
      <DashboardProjectForm onSubmit={onSubmit} mode="add" />
    </div>
  );
}
