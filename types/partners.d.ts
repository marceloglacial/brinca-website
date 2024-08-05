
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
}

interface PartnersListProps {
    language: string;
}

interface PartnersCard extends PartnerType {
    locale: string,
}

interface PartnersListMenuProps {
    title: LocalizedString;
    items: PartnerCategoryType[];
    locale: string;
}

interface PartnersSectionProps {
    title: LocalizedString;
    locale: string;
    items: PartnerType[];
}
