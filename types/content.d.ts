interface ContentProps {
    items: ContentType[];
    language: string;
}

type ContentType = {
    id: string,
    type: string,
    content: any
}

interface BlockProps {
    blockLanguage: string;
    blockContent: ContentType;
}

type BlockType = {
    [k: string]: React.ReactNode;
};
