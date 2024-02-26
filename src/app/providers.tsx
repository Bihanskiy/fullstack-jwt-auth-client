'use client'
import React, { useState } from 'react'
import {
  QueryClient,
  HydrationBoundary,
  QueryClientProvider
} from '@tanstack/react-query'

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        retry: false,
        staleTime: 5 * 1000,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
  )
}
