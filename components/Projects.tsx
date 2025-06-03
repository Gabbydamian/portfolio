"use client";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
// import { Project } from "@/app/types/project";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/actions/projectActions";
import { Spinner } from "@/components/ui/spinner";

// interface ProjectsProps {
//   fetchedProjects: Project[];
//   projectsError: string | null;
// }

export function Projects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  // const projects = fetchedProjects;
  // const error = projectsError;

  if (isLoading) {
    return <Spinner className="my-32" />;
  }
  if (error) {
    return <div>An error occured</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-24 py-12 mt-24">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-12 md:mb-20 text-center underline"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>

      {error && (
        <motion.p
          className="text-red-500 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {error}
        </motion.p>
      )}

      {data &&
        Array.isArray(data.projectsData) &&
        data.projectsData.length === 0 &&
        !error && (
          <motion.p
            className="text-lg text-center text-gray-500 max-w-xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            No Projects have been added yet. Please check back later or contact
            an Admin!
          </motion.p>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data &&
          Array.isArray(data.projectsData) &&
          data.projectsData.length > 0 &&
          data.projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
      </div>
    </div>
  );
}
