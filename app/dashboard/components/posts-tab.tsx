import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardPostForm from "@/components/dashboard-post-form";

interface PostsTabProps {
  blogPosts: any[];
  editingPost: any | null;
  editPostSuccess: boolean;
  onEdit: (post: any) => void;
  onDelete: (id: string) => void;
  onSubmitEdit: (values: any) => Promise<void>;
}

export function PostsTab({
  blogPosts,
  editingPost,
  editPostSuccess,
  onEdit,
  onDelete,
  onSubmitEdit,
}: PostsTabProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {editPostSuccess && (
        <div className="mb-4 text-green-600">Post updated successfully!</div>
      )}
      {editingPost ? (
        <DashboardPostForm
          initialValues={editingPost}
          onSubmit={onSubmitEdit}
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
                  onClick={() => onEdit(post)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onDelete(post.id)}
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
