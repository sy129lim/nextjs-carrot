import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "플랜닥스",
  description: "next app 연습",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
