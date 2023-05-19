import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { NewsCardIF } from '../../../../types/NewsType';
import cn from './style.module.scss';

export default function NewsCard({ title, img, createdAt, id, slug, shortDesc }: NewsCardIF) {
    const formattedDate = new Date(createdAt).toLocaleString('ru-RU', { dateStyle: 'full' });
    return (
        <Link href={`/news/${id}-${slug}`}>
            <div className={cn.cardNews}>
                <div className={cn.cardHeader}>
                    <Image
                        width={400}
                        height={300}
                        src={img}
                        alt="News image card"
                        className={cn.cardImage}
                    />
                </div>
                <div className={cn.cardBody}>
                    <h4>{title}</h4>
                    <p className={cn.cardDesc}>{shortDesc}</p>
                    <p className={cn.cardDate}> {formattedDate}</p>
                </div>
            </div>
        </Link>
    );
}
