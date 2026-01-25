import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'RemixCuisine DAO - Daily Lucky Draw',
  description: 'Win USDC daily on Base Network! AI-powered Web3 cooking meets crypto prizes.',
  openGraph: {
    title: 'RemixCuisine DAO - Daily Lucky Draw',
    description: 'Win USDC daily on Base Network!',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className="bg-cyber-darker text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
