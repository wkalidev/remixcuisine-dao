'use client';

import { useState, useEffect } from 'react';

export function useMiniKit() {
  const [isFrameReady, setIsFrameReady] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    // Vérifie si on est dans un Mini App context
    if (typeof window !== 'undefined') {
      // @ts-ignore - SDK Farcaster peut ne pas avoir de types
      const sdk = window.Farcaster || window.frameSDK;
      
      if (sdk) {
        sdk.context.then((ctx: any) => {
          setContext(ctx);
        });
      }
    }
  }, []);

  const setFrameReadyFunc = () => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const sdk = window.Farcaster || window.frameSDK;
      if (sdk && sdk.actions) {
        sdk.actions.ready();
      }
      setIsFrameReady(true);
    }
  };

  return {
    isFrameReady,
    setFrameReady: setFrameReadyFunc,
    context,
  };
}
