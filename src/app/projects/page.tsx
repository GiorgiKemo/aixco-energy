import { createPageMetadata } from '../../lib/seo';
import ProjectsPage from '../../views/ProjectsPage';

export const metadata = createPageMetadata({
  title: 'Renewable Project Types',
  description:
    'Review the renewable energy project types AIXCO Energy may pursue, including solar storage parks, commercial energy platforms and grid support infrastructure.',
  path: '/projects',
});

export default function ProjectsRoute() {
  return <ProjectsPage />;
}
