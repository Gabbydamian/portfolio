import Link from "next/link";
import { LearningPost } from "@/app/types/learning";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LearningCardProps {
  post: LearningPost;
}

export function LearningCard({ post }: LearningCardProps) {
  const publishDate = new Date(post.date_created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/learning/${post.slug}`} aria-label={`Read ${post.title}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        {post.image && (
          <div className="w-full h-48 overflow-hidden rounded-t-lg bg-muted">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{post.topic}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{publishDate}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
