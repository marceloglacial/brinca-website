
type PartnerType = {
    id: string,
    isActive: boolean,
    type?: 'partner' | 'community',
    createdAt: string,
    updatedAt: string,
    title: LocalizedString,
    description?: LocalizedString,
    image: ImageProps,
    category: PartnerCategoryType[]
    email: string,
    address?: string,
    website?: string,
    phone?: string,
    social: {
        type: IconTypes,
        url: string
    }[]
}

type PartnerCategoryType = {
    id: string;
    title: LocalizedString;
    slug: LocalizedString;
    locale: LocaleTypes
}

interface PartnersListProps {
    language: LocaleTypes;
}

interface PartnersCard extends PartnerType {
    locale: LocaleTypes,
}

interface PartnersListMenuProps {
    title: LocalizedString;
    items: PartnerCategoryType[];
    locale: LocaleTypes;
}

interface PartnersSectionProps {
    title: LocalizedString;
    locale: LocaleTypes;
    items: PartnerType[];
}
