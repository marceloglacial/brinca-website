type LocalesType = 'en' | 'pt_br'

type LocaleListType = {
    icon: string;
    slug: string;
    title: string;
};

interface LocaleListItemsProps {
    items: LocaleListType[];
}
