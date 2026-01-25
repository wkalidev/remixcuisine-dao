'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains';
import { WagmiProvider, http, createConfig } from 'wagmi';

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
          chain={base}
          config={{
            appearance: {
              mode: 'dark',
              theme: 'cyberpunk',
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
