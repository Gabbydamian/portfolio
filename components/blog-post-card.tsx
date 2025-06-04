import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Blog } from "@/app/types/blog";
import { Link as HrefLink, ArrowRight } from "lucide-react";

interface BlogPostCardProps {
  post: Blog;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden bg-card border-border hover:border-primary hover:scale-[1.01] transition-all duration-200 h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={post.cover_img || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover object-top"
          loading="eager"
        />
      </div>
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{formatDate(post.date_created)}</span>
          <span>{post.read_time}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-card-foreground">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-3">{post.excerpt}</p>
        {post.category && (
          <Badge variant="default" className="capitalize">
            {post.category}
          </Badge>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm text-card-foreground hover:text-primary"
          aria-label={`Read full post: ${post.title}`}
        >
          Read more:&nbsp;
          <span className="underline">
            {post.title.split(" ").slice(0, 2).join(" ")}
            {""}...{""}
          </span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
