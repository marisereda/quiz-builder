interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className=" flex px-6 py-10 flex-col m-auto min-h-screen justify-between max-w-4xl">
      <main>{children}</main>
    </div>
  );
}
