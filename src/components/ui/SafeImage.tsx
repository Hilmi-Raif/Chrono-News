import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from 'primereact/skeleton';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

const SafeImage: React.FC<SafeImageProps> = ({
    src,
    alt,
    className,
    style,
    onLoad,
    onError,
    ...props
}) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const image = imageRef.current;

        if (!src || image?.complete) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
    }, [src]);

    return (
        <>
            {isLoading && (
                <Skeleton
                    className={`safe-image-skeleton pointer-events-none ${className || ''}`}
                    width="100%"
                    height="100%"
                    borderRadius="0"
                    style={{
                        ...style,
                        zIndex: 10,
                    }}
                />
            )}

            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className={`${className || ''} transition-opacity duration-500 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                style={style}
                onLoad={(event) => {
                    setIsLoading(false);
                    onLoad?.(event);
                }}
                onError={(event) => {
                    setIsLoading(false);
                    onError?.(event);
                }}
                {...props}
            />
        </>
    );
};

export default SafeImage;
