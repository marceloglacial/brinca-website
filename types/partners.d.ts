type PartnerTypes = 'partner' | 'community'

type PartnerType = {
    id: string,
    isActive: boolean,
    type?: PartnerTypes,
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
    language: LocaleTypes;
}

interface PartnersCard extends PartnerType {
    locale: LocaleTypes,
}

interface PartnersListMenuProps {
    locale: LocaleTypes;
}

interface PartnersSectionProps {
    id: string
    title: LocalizedString
    locale: LocaleTypes;
    type: PartnerTypes
}

interface PartnersListItemProps extends PartnerCategoryType {
    locale: LocaleTypes;
}
