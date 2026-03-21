'use client';

import React from 'react';
import { OSProvider } from '@/context/OSContext';
import { WindowProvider } from '@/context/WindowContext';
import Desktop from '@/components/shell/Desktop';

export default function PortfolioOS() {
  return (
    <OSProvider>
      <WindowProvider>
        <Desktop />
      </WindowProvider>
    </OSProvider>
  );
}
