type CardGridItemType = {
    id: string | number;
    link: string;
    image: HTMLImageElement;
    title: string;
    content?: string;
    date?: string
};

interface CardGridProps {
    title?: string;
    items: CardGridItemType[];
}
