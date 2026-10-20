import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * Function representing a manifest.json generation
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NinjaFood',
    short_name: 'NinjaFood',
    description: 'Street food restaurace s burgery, ramenem, bowly a rozvozem po Hradci Králové.',
    start_url: '/',
    display: 'browser',
    background_color: '#fbfbf9',
    theme_color: '#fbfbf9',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
