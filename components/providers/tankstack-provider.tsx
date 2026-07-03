'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function TankStackProviders({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 1, // 1 sec- update it to anything else if required
        refetchOnWindowFocus: true, // this fixes your cross-tab problem
      },
    },
  }))
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}