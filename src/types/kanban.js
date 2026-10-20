export const COLUMNS = [
  { id: 'todo', title: 'To Do', accent: 'border-amber-400', badge: 'bg-amber-100 text-amber-800' },
  { id: 'in-progress', title: 'In Progress', accent: 'border-blue-500', badge: 'bg-blue-100 text-blue-800' },
  { id: 'review', title: 'In Review', accent: 'border-purple-500', badge: 'bg-purple-100 text-purple-800' },
  { id: 'done', title: 'Completed', accent: 'border-emerald-500', badge: 'bg-emerald-100 text-emerald-800' },
];

export const PRIORITIES = {
  urgent: { label: 'Urgent', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  high: { label: 'High', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  medium: { label: 'Medium', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  low: { label: 'Low', color: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export const AVAILABLE_TAGS = [
  'Frontend',
  'Backend',
  'Design',
  'Bug',
  'Feature',
  'DevOps',
  'Documentation',
];

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Architect Component Hierarchy & State Store',
    description: 'Design the single-source-of-truth state container using custom React hooks and LocalStorage synchronization.',
    status: 'done',
    priority: 'high',
    tags: ['Frontend', 'Feature'],
    dueDate: '2026-10-18',
    createdAt: '2026-10-15T09:00:00Z',
  },
  {
    id: 'task-2',
    title: 'Implement Interactive Kanban Drag & Drop',
    description: 'Provide seamless card movement between columns using HTML5 drag-and-drop with keyboard accessible fallbacks.',
    status: 'in-progress',
    priority: 'urgent',
    tags: ['Frontend', 'Feature'],
    dueDate: '2026-10-22',
    createdAt: '2026-10-16T11:30:00Z',
  },
  {
    id: 'task-3',
    title: 'Code Review: API Error Boundary & Retry Logic',
    description: 'Verify resilience of network error handlers and graceful fallback UI during network latency.',
    status: 'review',
    priority: 'medium',
    tags: ['Backend', 'Bug'],
    dueDate: '2026-10-23',
    createdAt: '2026-10-17T14:15:00Z',
  },
  {
    id: 'task-4',
    title: 'Build Dark / Light Theme & Responsive Styles',
    description: 'Ensure full viewport responsiveness across mobile cards, tablets, and ultra-wide monitor displays using Tailwind CSS.',
    status: 'in-progress',
    priority: 'high',
    tags: ['Design', 'Frontend'],
    dueDate: '2026-10-24',
    createdAt: '2026-10-18T10:00:00Z',
  },
  {
    id: 'task-5',
    title: 'Configure GitHub Actions CI Workflow',
    description: 'Automate build verification, lint checks, and GitHub Pages preview deployment on pull requests.',
    status: 'todo',
    priority: 'low',
    tags: ['DevOps', 'Documentation'],
    dueDate: '2026-10-28',
    createdAt: '2026-10-19T08:45:00Z',
  },
  {
    id: 'task-6',
    title: 'Write Recruiter-Friendly Showcase README',
    description: 'Draft comprehensive documentation highlighting component design patterns, state diagrams, and live preview links.',
    status: 'todo',
    priority: 'medium',
    tags: ['Documentation'],
    dueDate: '2026-10-25',
    createdAt: '2026-10-20T16:20:00Z',
  },
];
