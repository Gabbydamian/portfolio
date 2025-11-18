import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

interface LearningTabProps {
  learningPosts: any[];
  onDelete: (id: string) => void;
}

export function LearningTab({ learningPosts, onDelete }: LearningTabProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Learning Posts</h1>
      {learningPosts.length === 0 ? (
        <div className="text-muted-foreground">No learning posts yet.</div>
      ) : (
        <div className="grid gap-4">
          {learningPosts.map((post: any) => (
            <Card
              key={post.id}
              className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div className="flex-1">
                <div className="font-semibold">{post.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    {post.topic}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/learning/${post.slug}`}>
                  <Button type="button" variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
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
