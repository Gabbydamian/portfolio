import { MainLayout } from "@/components/main-layout";
import { fetchProjects } from "@/actions/projectActions";
import { Projects } from "@/components/Projects";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
export default async function ProjectsPage() {
  // const result = await fetchProjects();
  // const projects = result.error ? [] : result.projectsData ?? [];
  // const error = result.error ? "Failed to fetch projects" : null;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  })

  return (
    <MainLayout>
      {/* <Projects fetchedProjects={projects} projectsError={error} /> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Projects />
      </HydrationBoundary>
    </MainLayout>
  );
}
