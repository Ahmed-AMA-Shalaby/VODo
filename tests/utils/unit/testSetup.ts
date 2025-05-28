import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  ...vi.importActual('next/navigation'),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === 'page') return '0';
      if (key === 'query') return '';

      return '';
    },
    entries: () => new Map().entries(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
