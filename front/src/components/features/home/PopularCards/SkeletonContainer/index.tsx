import React from 'react';
import ContentLoader from 'react-content-loader';

export default function SkeletonCard() {
    return (
        <div>
            <ContentLoader
                width={450}
                height={400}
                id={String('skeleton-1')}
                viewBox="0 0 450 400"
                backgroundColor="#f0f0f0"
                foregroundColor="#dedede"
            >
                <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
                <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
                <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
            </ContentLoader>
            <ContentLoader
                width={450}
                height={400}
                id={String('skeleton-2')}
                viewBox="0 0 450 400"
                backgroundColor="#f0f0f0"
                foregroundColor="#dedede"
            >
                <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
                <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
                <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
            </ContentLoader>
            <ContentLoader
                width={450}
                height={400}
                viewBox="0 0 450 400"
                id={String('skeleton-3')}
                backgroundColor="#f0f0f0"
                foregroundColor="#dedede"
            >
                <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
                <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
                <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
            </ContentLoader>
            <ContentLoader
                width={450}
                height={400}
                id={String('skeleton-4')}
                viewBox="0 0 450 400"
                backgroundColor="#f0f0f0"
                foregroundColor="#dedede"
            >
                <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
                <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
                <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
            </ContentLoader>
            <ContentLoader
                width={450}
                height={400}
                id={String('skeleton-5')}
                viewBox="0 0 450 400"
                backgroundColor="#f0f0f0"
                foregroundColor="#dedede"
            >
                <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
                <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
                <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
            </ContentLoader>
            <ContentLoader
                width={450}
                id={String('skeleton-6')}
                height={400}
                viewBox="0 0 450 400"
                backgroundColor="#f0f0f0"
                foregroundColor="#dedede"
            >
                <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
                <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
                <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
            </ContentLoader>
        </div>
    );
}