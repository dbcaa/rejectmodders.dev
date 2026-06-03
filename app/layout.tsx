import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { CustomCursor } from '@/components/layout/custom-cursor'
import { PageTransition } from '@/components/layout/page-transition'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { TerminalEasterEgg } from '@/components/layout/terminal-easter-egg'
import { CommandPalette } from '@/components/layout/command-palette'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { LegacyDomainBanner } from '@/components/layout/legacy-domain-banner'
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_AUTHOR,
  THEME_COLOR,
} from '@/config/constants'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_AUTHOR }],
  icons: {
    icon: [
      { url: '/avatar.png', sizes: '32x32' },
      { url: '/avatar.png', sizes: '64x64' },
      { url: '/avatar.png', sizes: '192x192' },
    ],
    shortcut: '/avatar.png',
    apple: '/avatar.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description: 'Cybersecurity-focused developer from Missouri. Building security tools and writing code.',
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: '/avatar.png', width: 192, height: 192, alt: `${SITE_NAME} Avatar` }],
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: 'Cybersecurity-focused developer from Missouri. Building security tools and writing code.',
    images: ['/avatar.png'],
  },
  other: { 'theme-color': THEME_COLOR },
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="relative font-sans antialiased noise-bg cursor-none" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LegacyDomainBanner />
          <CustomCursor />
          <TerminalEasterEgg />
          <CommandPalette />
          <ScrollToTop />
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
