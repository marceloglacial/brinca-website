export const filterItemsByCategory = (
    items: any[],
    language: LocalesType,
    categorySlug?: string
): any[] => {
    if (!categorySlug) return items;
    return items.filter((item) =>
        item.category.some(
            (category: any) => category.slug[language] === categorySlug
        )
    );
};
