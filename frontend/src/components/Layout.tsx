import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <main>{children}</main>
      <Footer />
    </div>
  );
}
