export interface MakananHarianProps {
    title: string
    links: Makan[]
}
export interface MakananHarianPropsWithVariant extends MakananHarianProps {
    variant: "primary" | "secondary"
}

export interface DetailHeadProps {
    image: string;
    created_at: Date;
    readingTime: number;
    title: string;
}

interface Makan {
    title: string;
    link: string
}