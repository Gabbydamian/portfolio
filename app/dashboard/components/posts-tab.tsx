import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardPostForm from "@/components/dashboard-post-form";
import { Eye, Edit, Trash2, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PostsTabProps {
  blogPosts: any[];
  editingPost: any | null;
  editPostSuccess: boolean;
  onEdit: (post: any) => void;
  onDelete: (id: string, title: string) => void;
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post: any) => (
            <Card key={post.id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                {post.cover_img ? (
                  <div className="relative w-full h-48 bg-muted">
                    <Image
                      src={post.cover_img}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Eye className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author || "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(post.date_created).toLocaleDateString()}
                    </span>
                  </div>
                  {post.category && (
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mt-2 w-fit">
                      {post.category}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit(post)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Link href={`/blog/${post.slug}`}>
                  <Button type="button" variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(post.id, post.title)}
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
