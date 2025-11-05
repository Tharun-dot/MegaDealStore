import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="bg-background">{children}</div>
      <Footer />
    </>
  );
}
