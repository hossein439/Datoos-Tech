import MainHeader from '@/app/(main)/component/layout/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}
