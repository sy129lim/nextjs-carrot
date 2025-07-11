import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

import { gmarket, pretendard } from '@/fonts';

import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: '플랜닥스',
  description: 'next app 연습',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${gmarket.variable}`} suppressHydrationWarning>
      <body className={`${pretendard.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed right-4 bottom-4">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
