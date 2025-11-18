import DashboardPostForm from "@/components/dashboard-post-form";

interface NewPostTabProps {
  postSuccess: boolean;
  onSubmit: (values: any) => void;
}

export function NewPostTab({ postSuccess, onSubmit }: NewPostTabProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
      {postSuccess && (
        <div className="mb-4 text-green-600">Post added successfully!</div>
      )}
      <DashboardPostForm onSubmit={onSubmit} mode="add" />
    </div>
  );
}
