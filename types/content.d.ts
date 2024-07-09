type ContentType = {
    id: string,
    type: string,
    data: any
}

interface ContentProps {
    items: ContentType[];
    language: string;
}
