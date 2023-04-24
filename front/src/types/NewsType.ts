export interface News {
    created_at: number | string;
    id: number | string;
    img: string;
    title: string;
    short_desc: string;
}

export interface NewsPost {
    description: string;
    img: string;
    short_desc: string;
    title: string;
    slug: string;
    created_at: number | string;
}
