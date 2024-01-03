import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://wwww.remo-work.com'),
  title: 'Remo-Work - Discover Your Ideal Remote Work Location',
  description:
    'Find the best cafes, libraries, and coworking spaces tailored for remote work. Explore, review, and share your favorite work spots with the Remo-Work community.',
  keywords:
    'Remote Work, Coworking Spaces, Cafes for Work, Quiet Work Locations, Freelancers, Digital Nomads',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: 'Remo-Work',
    description:
      'Find the best cafes, libraries, and coworking spaces tailored for remote work. Explore, review, and share your favorite work spots with the Remo-Work community.',
    url: 'https://wwww.remo-work.com',
    siteName: 'Remo-Work',
    images: [
      {
        url: '/meta/ogp.png',
        width: 1200,
        height: 860,
        alt: 'OGP Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icon-52x52.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: [
      {
        rel: 'icon',
        sizes: '128x128',
        url: '/icon-128x128.png',
      },
      {
        rel: 'icon',
        sizes: '144x144',
        url: '/icon-144x144.png',
      },
      {
        rel: 'icon',
        sizes: '152x152',
        url: '/icon-152x152.png',
      },
      {
        rel: 'icon',
        sizes: '384x384',
        url: '/icon-384x384.png',
      },
      {
        rel: 'icon',
        sizes: '512x512',
        url: '/icon-512x512.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '167x167',
        url: '/iphone-167x167.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/iphone-180x180.png',
      },
    ],
  },
};
