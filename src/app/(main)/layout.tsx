'use client';

import MainHeader from './components/layout/header';
import Sidebar from './components/layout/sidebar';
import BottomNav from './components/layout/bottom-nav';
import useMediaQuery from '@/hooks/useMediaQuery';
import useAuthStore from '@/store/auth';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { getUserInfo, setUserInfo, userInfo, isHydrated } = useAuthStore((state) => state);
  const { mutate: getUserInfoData } = useMutation({
    mutationFn: getUserInfo,
    onSuccess: (res) => {
      const user = res?.data?.data?.user;
      setUserInfo(user);
    },
  });

  useEffect(() => {
    if (isHydrated && !userInfo?.email) {
      getUserInfoData();
    }
  }, [isHydrated]);

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return (
    <div className="flex bg-background">
      {isDesktop && <Sidebar />}
      <div className="w-full">
        {isDesktop && <MainHeader />}
        <main className="w-full pt-[48px] px-[16px] desktop:p-[24px] max-h-[calc(100svh-3.5rem)] overflow-y-auto">{children}</main>
        {!isDesktop && <BottomNav />}
      </div>
    </div>
  );
}
