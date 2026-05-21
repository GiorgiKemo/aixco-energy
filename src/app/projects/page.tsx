import { createPageMetadata } from '../../lib/seo';
import ProjectsPage from '../../views/ProjectsPage';

export const metadata = createPageMetadata({
  title: 'Energy Projects',
  description:
    'Explore the energy project themes AIXCO Energy is focused on, including utility-scale solar, wind, battery storage, hybrid platforms, smart grid systems and hydrogen infrastructure.',
  path: '/projects',
});

export default function ProjectsRoute() {
  return <ProjectsPage />;
}
