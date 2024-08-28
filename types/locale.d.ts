type LocaleListType = {
    id: string | number,
    name: string,
    code: LocaleTypes,
    isDefault: boolean
};

interface LocaleListItemsProps {
    items: LocaleListType[];
}
