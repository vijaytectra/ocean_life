"use client";

import { usePathname } from "next/navigation";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import GoToTopButton from "@/components/GoToTopButton";
import AdPopup from "@/components/AdPopup";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Menu />
      {children}
      <Footer />
      <GoToTopButton />
      <AdPopup />
    </>
  );
}
