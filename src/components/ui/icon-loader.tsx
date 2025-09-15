'use client';

import type { FC } from 'react';
import * as React from 'react';

interface BaseIconLoaderProps {
  name: string | undefined;
  size?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  isSrc?: boolean;
}

const IconLoader: FC<BaseIconLoaderProps> = ({ onClick, isSrc = false, className, name, size = '24px', ...props }) => {
  return (
    <>
      {isSrc ? (
        <div className={`w-[${size}] h-[${size}]`}>
          <img src={name} alt="" className="w-full h-full object-cover rounded" />
        </div>
      ) : (
        <svg onClick={onClick} className={className} {...props} width={size} height={size}>
          <use width="100%" height="100%" href={`/svgs/${name}.svg#${name}`} />
        </svg>
      )}
    </>
  );
};

export default IconLoader;
