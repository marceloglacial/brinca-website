interface EventType {
    id: string;
    image: string;
    title: LocalizationType | string;
    slug: LocalizationType | string,
    blocks: Array<{
        type: string;
        value: any;
    }>;
}
