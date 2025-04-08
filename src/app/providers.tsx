"use client"
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from '@/components/theme-provider';

export function Providers ({children} : {children: React.ReactNode}) {
    const [queryClient] = useState(
        ()=>
        new QueryClient({
            defaultOptions:{
                queries: {
                    staleTime: 60 * 1000,
                  },
            }
        })
    )
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </div>
  )
}

