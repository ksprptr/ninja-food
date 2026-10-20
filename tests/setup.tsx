import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

afterEach(cleanup);
