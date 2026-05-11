import { Skeleton } from 'primereact/skeleton';

interface RegularPostSkeletonProps {
    postSize: number;
    compact?: boolean;
    fillHeight?: boolean;
}

const RegularPostSkeleton: React.FC<RegularPostSkeletonProps> = ({
    postSize,
    compact = false,
    fillHeight = false,
}) => {
    const skeletonItems = Array.from({ length: postSize });

    return (
        <div className={fillHeight ? 'h-full flex flex-col' : ''}>
            <div className={fillHeight ? 'flex flex-col flex-1 gap-3' : ''}>
                {skeletonItems.map((_, index) => (
                    <div
                        key={index}
                        className={`flex ${fillHeight ? 'min-h-40 lg:h-[150px] xl:h-[160px]' : 'mb-3'} break-all justify-between ${fillHeight ? '' : compact ? 'min-h-40 lg:min-h-32' : 'h-40'} shadow-[0_1px_6px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden bg-surface-0`}
                    >
                        <div
                            className={`relative flex-shrink-0 ${compact ? 'w-44 xs:w-56 md:w-64 lg:w-40 xl:w-44' : 'w-48 sm:w-56 md:w-64 lg:w-72'} h-full`}
                        >
                            <Skeleton width="100%" height="100%" className="!rounded-none" />
                        </div>
                        <div className={`flex-1 flex flex-col ${compact ? 'p-3' : 'lg:p-4 p-3'}`}>
                            <Skeleton
                                width="80%"
                                height={compact ? '1.5rem' : '1.75rem'}
                                className="mb-3"
                            />
                            <Skeleton width="40%" height="1.25rem" className="mb-3" />
                            <div className="flex-grow">
                                <Skeleton width="100%" height="1rem" className="mb-2" />
                                <Skeleton width="100%" height="1rem" className="mb-2" />
                                <Skeleton width="75%" height="1rem" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!fillHeight && (
                <div className="flex justify-center mt-4">
                    <Skeleton width="20rem" height="2.5rem" />
                </div>
            )}
        </div>
    );
};

export default RegularPostSkeleton;
