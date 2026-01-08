import React from 'react';

export default function OrderBookGridLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full grid grid-cols-3 grid-rows-2 gap-0">{children}</div>;
}
