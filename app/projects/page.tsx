import { MainLayout } from "@/components/main-layout";
import { fetchProjects } from "@/actions/projectActions";
import { Projects } from "@/components/Projects";
export default async function ProjectsPage() {
  const result = await fetchProjects();
  const projects = result.error ? [] : result.projectsData ?? [];
  const error = result.error ? "Failed to fetch projects" : null;

  return (
    <MainLayout>
      <Projects fetchedProjects={projects} projectsError={error} />
    </MainLayout>
  );
}
