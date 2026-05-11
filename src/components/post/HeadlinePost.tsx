import { useNavigate } from 'react-router-dom';
import thumbnail from '../../../public/thumbnail.svg';
import { slugify } from '../../utils/postUtils.ts';
import { Post } from '../../types/post.ts';
import React from 'react';
import HeadlinePostSkeleton from '../ui/HeadlinePostSkeleton.tsx';
import SafeImage from '../ui/SafeImage.tsx';

interface HeadlinePostProps {
    headlinePost: Post | null;
    loading: boolean;
    handleCategoryChange: (category: string) => void;
}

const HeadlinePost: React.FC<HeadlinePostProps> = ({
    headlinePost,
    loading,
    handleCategoryChange,
}) => {
    const navigate = useNavigate();

    const handleNavigate = (item: Post) => {
        if (!item) return;
        const slug = slugify(item.title);
        navigate(`/post/${item.id}/${slug}`);
    };

    if (loading) {
        return <HeadlinePostSkeleton />;
    }

    if (!headlinePost) {
        return null;
    }

    return (
        <div className="h-full flex flex-col">
            <div className="grid grid-cols-1 flex-1">
                <div
                    key={headlinePost.id}
                    className="shadow-[0_1px_6px_rgba(0,0,0,0.1)] rounded-lg w-full break-word flex flex-col h-[474px] sm:h-[504px] bg-surface-0"
                >
                    <div className="relative w-full flex-1 bg-surface-200 rounded-t-lg overflow-hidden shrink-0">
                        <SafeImage
                            src={
                                headlinePost.thumbnail
                                    ? `${headlinePost.thumbnail}`
                                    : (thumbnail as string)
                            }
                            alt={headlinePost.title}
                            className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                            onClick={() => handleNavigate(headlinePost)}
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 px-2 rounded-md flex items-center text-xs z-10">
                            <i className="pi pi-eye mr-1"></i>
                            <span>{headlinePost.viewCount}</span>
                        </div>
                    </div>

                    <div className="p-4">
                        <h3
                            className="text-lg md:text-2xl font-semibold w-fit cursor-pointer line-clamp-2 text-text-color mb-1"
                            onClick={() => handleNavigate(headlinePost)}
                        >
                            {headlinePost.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-text-color-secondary mb-2">
                            <span
                                className="font-medium cursor-pointer"
                                onClick={() => {
                                    if (headlinePost?.category?.name) {
                                        handleCategoryChange(
                                            headlinePost.category.name.toLowerCase()
                                        );
                                    }
                                }}
                            >
                                {headlinePost.category?.name}
                            </span>
                            <span className="text-text-color-secondary">•</span>
                            <time className="text-text-color-secondary">
                                {headlinePost.createdAt}
                            </time>
                        </div>
                        <p className="text-sm md:text-base line-clamp-3 text-text-color">
                            {headlinePost.summary}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadlinePost;
