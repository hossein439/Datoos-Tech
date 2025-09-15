'use client';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function HandleProvider({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <body className="bg-background">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
      <Toaster position="bottom-center" />
    </body>
  );
}
