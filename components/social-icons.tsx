import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function SocialIcons() {
  return (
    <div className="flex items-center space-x-4 bg-background/60 backdrop-blur border border-border rounded-xl shadow-lg px-3 py-3">
      <Link
        href="https://github.com/Gabbydamian"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        <Github className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </Link>
      <Link
        href="https://twitter.com/astridesigns_"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        <Twitter className="h-5 w-5" />
        <span className="sr-only">Twitter</span>
      </Link>
      <Link
        href="https://linkedin.com/in/gabriel-damian-43309423b"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </Link>
    </div>
  );
}
