import React, { useState, useEffect, useMemo } from 'react';

type SrcType = 'public' | 'api' | 'fullPath';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  srcType?: SrcType;
  noPlaceHolder?: boolean;
  lightbox?: boolean;
}

// نمونه متد جایگزین برای getImageUrl
const getImageUrl = (src: string): string => {
  return `/api/images/${src}`;
};

const fallbackSrc = 'images/logo.png';

const sourceResolvers: Record<SrcType, (src: string) => string> = {
  public: (src) => src,
  api: (src) => getImageUrl(src),
  fullPath: (src) => src,
};

const ImageLoader: React.FC<ImageProps> = ({ src, srcType = 'api', lightbox = false, ...rest }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src || fallbackSrc);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (src) {
      setImageSrc(src);
    }
  }, [src]);

  const resolvedSrc = useMemo(() => {
    if (!imageSrc) return fallbackSrc;
    const resolver = sourceResolvers[srcType];
    return resolver ? resolver(imageSrc) : fallbackSrc;
  }, [imageSrc, srcType]);

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  const openLightbox = () => {
    if (lightbox) setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <>
      <img
        {...rest}
        src={resolvedSrc}
        loading="lazy"
        onError={handleError}
        onClick={openLightbox}
        className={`${rest.className || ''} ${lightbox ? 'cursor-zoom-in' : ''}`}
        alt="Image"
      />

      {isOpen && (
        <div
          className="fixed inset-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center z-[10000]"
          onClick={closeLightbox}
        >
          <img
            src={resolvedSrc}
            alt="Full Image"
            className="max-w-[90vw] max-h-[90vh] object-contain cursor-auto"
            onError={handleError}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="fixed top-4 right-4 bg-transparent border-0 text-white text-[2rem] cursor-pointer" onClick={closeLightbox}>
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default ImageLoader;
