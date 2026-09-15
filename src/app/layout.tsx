import type { Metadata } from "next";
import { cookies } from "next/headers";
import { IBM_Plex_Mono, Newsreader, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";
import {
  getTheme,
  THEME_BOOTSTRAP_SCRIPT,
  THEME_COOKIE,
} from "@/lib/themes";
import "./globals.css";
import "./theme-layouts.css";
import "./mission-control.css";
import "./night-signal.css";

const unbounded = localFont({
  src: "../fonts/unbounded.woff2",
  variable: "--font-unbounded",
  weight: "500 700",
  display: "swap",
});

const sora = localFont({
  src: "../fonts/sora.woff2",
  variable: "--font-sora",
  weight: "400 700",
  display: "swap",
});

const grotesque = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesque",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Web Development for Startups & SMBs`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  keywords: [
    "web development",
    "startup websites",
    "SMB web design",
    "Next.js agency",
    "Shopify development",
    "Canada web development",
    "simpltech",
    "simpltech.ca",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Web Development for Startups & SMBs`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Web Development for Startups & SMBs`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = getTheme(cookieStore.get(THEME_COOKIE)?.value);

  return (
    <html
      lang="en-CA"
      className={`${unbounded.variable} ${sora.variable} ${grotesque.variable} ${serif.variable} ${mono.variable} h-full`}
      data-theme={theme.id}
      data-motion={theme.motion}
      data-density={theme.density}
      data-hero={theme.hero}
      style={{ colorScheme: theme.colorScheme }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }}
        />
        <ThemeProvider initialThemeId={theme.id}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
