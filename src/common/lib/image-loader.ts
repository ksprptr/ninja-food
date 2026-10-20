import type { ImageLoaderProps } from 'next/image';

/**
 * Custom image loader used by the static export
 */
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  return `${src}?w=${width}`;
}
