import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Calendar, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface LearningTabProps {
  learningPosts: any[];
  onEdit?: (post: any) => void;
  onDelete: (id: string, title: string) => void;
}

export function LearningTab({
  learningPosts,
  onEdit,
  onDelete,
}: LearningTabProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Learning Posts</h1>
      {learningPosts.length === 0 ? (
        <div className="text-muted-foreground">No learning posts yet.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {learningPosts.map((post: any) => (
            <Card key={post.id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                {post.image ? (
                  <div className="relative w-full h-48 bg-muted">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <h3 className="font-semibold text-lg line-clamp-2 mb-3">
                  {post.title}
                </h3>
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 w-fit">
                    {post.topic}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                {onEdit ? (
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
                ) : (
                  <div className="flex-1" />
                )}
                <Link href={`/learning/${post.slug}`}>
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
