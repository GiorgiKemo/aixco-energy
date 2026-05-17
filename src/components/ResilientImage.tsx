'use client';

import React from 'react';
import Image, { type ImageProps } from 'next/image';
import { imageBlurDataUrl } from '../lib/image-loading';

type ResilientImageProps = ImageProps & {
  fallbackLabel?: string;
};

function getImageKey(src: ImageProps['src']) {
  if (typeof src === 'string') return src;
  if (src && typeof src === 'object' && 'src' in src) return src.src;
  return '';
}

export function ResilientImage({
  alt,
  blurDataURL,
  className,
  decoding,
  fallbackLabel,
  onError,
  onLoad,
  placeholder,
  src,
  ...props
}: ResilientImageProps) {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [state, setState] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const srcKey = getImageKey(src);
  const label = fallbackLabel || alt;

  React.useEffect(() => {
    const image = imageRef.current;

    if (image?.complete && image.naturalWidth > 0) {
      setState('loaded');
      return;
    }

    setState('loading');
  }, [srcKey]);

  return (
    <>
      <Image
        {...props}
        ref={imageRef}
        alt={alt}
        blurDataURL={blurDataURL ?? imageBlurDataUrl}
        className={['resilient-image', className].filter(Boolean).join(' ')}
        data-load-state={state}
        decoding={decoding ?? 'async'}
        onError={(event) => {
          setState('error');
          onError?.(event);
        }}
        onLoad={(event) => {
          setState('loaded');
          onLoad?.(event);
        }}
        placeholder={placeholder ?? 'blur'}
        src={src}
      />
      <span className="resilient-image-fallback" data-load-state={state} aria-hidden="true">
        {label ? <span className="resilient-image-fallback__label">{label}</span> : null}
      </span>
    </>
  );
}
