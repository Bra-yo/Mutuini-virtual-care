/**
 * App Layout
 * Shared layout for all authenticated pages
 */

import { AppLayout } from "@/components/layout";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
