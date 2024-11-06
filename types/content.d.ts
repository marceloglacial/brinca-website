
interface ContentProps {
    items: BlockType[];
}


type ContentType = {
    id: string;
    title: string;
    slug: string;
    blocks: BlockType[];
};
