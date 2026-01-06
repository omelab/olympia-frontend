import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Olympia Paints & Construction Chemical',
    short_name: 'olympia paints',
    description:
      'We pride ourselves on setting new work strategies, pushing the boundaries of product development, and delving deep into market research. But what truly sets us apart is our unwavering spirit of wonderment. We don’t just follow trends; we create them. Our ability to innovate goes beyond mere product development. We dive deep into market insights to uncover surprising solutions that redefine the painting landscape. We believe in challenging the status quo and offering never-thought-of approaches to meet your painting needs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
