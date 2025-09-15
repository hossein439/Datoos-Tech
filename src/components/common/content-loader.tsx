import React, { ReactNode } from 'react';
import EmptyHome from '@/components/common/empty-home';

interface Props {
  isLoading?: boolean;
  isShowContent: boolean;
  children?: ReactNode;
  custom?: ReactNode;
  empty?: ReactNode;
}

const ContentLoader: React.FC<Props> = ({ isLoading = false, isShowContent, children, custom, empty }) => {
  if (isLoading) {
    return <>{custom || <div className="h-full -z-10 w-full flex items-center justify-center">loading ...</div>}</>;
  }

  if (isShowContent) {
    return <>{children}</>;
  }

  return (
    <>
      {empty || (
        <div className="-z-10 w-full flex items-center justify-center h-full mx-auto">
          <EmptyHome />
        </div>
      )}
    </>
  );
};

export default ContentLoader;
