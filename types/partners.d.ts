type PartnerTypes = 'partner' | 'community'

type PartnerType = {
    id: string,
    active: boolean,
    title: string,
    description: string,
    image: string,
    category: PartnerCategoryType[]
    email: string,
    address?: string,
    website?: string,
    phone: string,
    social: {
        type: IconTypes,
        url: string
    }[]
}

type PartnerTypeLocalized = PartnerType & {
    title: LocalizedString,
    description: LocalizedString,
}

type PartnerCategoryType = {
    id: string;
    title: LocalizedString;
    slug: LocalizedString;
}

interface PartnersListProps {
    category?: string
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
    category?: string
}

interface PartnersListItemProps extends PartnerCategoryType {
    locale: LocaleTypes;
}
