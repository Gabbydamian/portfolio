import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Project } from "@/app/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-700 h-full flex flex-col hover:border-gray-800 hover:scale-[1.01] transition-all duration-200">
      <div className="relative h-48">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover object-top"
        />
      </div>
      <CardContent className="p-6 flex-1">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          target="__blank"
          href={project.link}
          className="inline-flex items-center text-white hover:underline hover:text-primary transition-colors duration-200"
        >
          View Project <ExternalLink className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
