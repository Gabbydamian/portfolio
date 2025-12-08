import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, LucideFolderCode } from "lucide-react";
import { Project } from "@/app/types/project";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-card border-border h-full flex flex-col hover:border-primary hover:scale-[1.01] transition-all duration-200">
      <div className="relative h-48">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <CardContent className="p-6 flex-1">
        <h3 className="text-xl font-bold mb-2 text-card-foreground">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-start">
        <Link
          target="__blank"
          href={project.link}
          className="inline-flex items-center text-sm text-card-foreground underline hover:text-primary transition-colors duration-200"
          aria-label={`View project: ${project.title}`}
        >
          {project.title} <ExternalLink className="ml-1 h-4 w-4" />
        </Link>
        {project.source_code && (
          <Link
            target="__blank"
            href={project.source_code}
            className="inline-flex items-center text-sm text-card-foreground hover:text-primary transition-colors duration-200"
          >
            <LucideFolderCode className="mr-1 h-4 w-4" />
            View Source &nbsp;
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
