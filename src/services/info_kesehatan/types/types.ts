export interface CardTopNewsProps {
    tanggal: Date;
    // TODO: change category type to enum
    category: string;
    title: string;
    image: string;
    id?: string; // Optional ID for the article
    slug?: string; // Optional slug for routing
}

export interface CardInfoKesehatanProps {
    tanggal: Date;
    // TODO: change category type to enum
    category: string;
    title: string;
    image: string;
    link: string;
    id?: string; // Optional ID for the article
    slug?: string; // Optional slug for routing
}

export interface InfoKesehatanHeadProps {
    tanggal: Date;
    // TODO: change category type to enum
    category: string;
    title: string;
    image: string;
    link: string;
    readingTime: number;
    id?: string; // Optional ID for the article
    slug?: string; // Optional slug for routing
    content?: string; // Optional content for article detail
}