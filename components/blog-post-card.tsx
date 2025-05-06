import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  coverImage: string
  date: string
  readTime: string
  slug: string
  category?: string
}

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-700 h-full flex flex-col">
      <div className="relative h-48">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{formatDate(post.date)}</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-400 mb-3">{post.excerpt}</p>
        {post.category && (
          <Badge variant="outline" className="bg-gray-700 hover:bg-gray-600">
            {post.category}
          </Badge>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary hover:underline">
          Read more
        </Link>
      </CardFooter>
    </Card>
  )
}
