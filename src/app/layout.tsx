import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Impact Slug | Manutenção e usinagem para carabinas PCP",
    template: "%s | Impact Slug",
  },
  description:
    "Manutenção especializada, usinagem e fabricação de chumbos Slug para carabinas PCP.",
  applicationName: "Impact Slug",
  keywords: [
    "Impact Slug",
    "carabinas PCP",
    "manutenção de carabinas",
    "usinagem",
    "chumbos Slug",
    "Slug para PCP",
    "personalização de componentes",
  ],
  openGraph: {
    title: "Impact Slug | Precisão em cada detalhe",
    description:
      "Manutenção especializada, usinagem e fabricação de chumbos Slug para carabinas PCP.",
    locale: "pt_BR",
    siteName: "Impact Slug",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#101114",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="site-body">
        {children}
      </body>
    </html>
  );
}
