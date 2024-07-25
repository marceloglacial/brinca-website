type ContentType = {
    id: number,
    type: string,
    data: any
}

interface ContentProps {
    items: ContentType[];
    language: string;
}
