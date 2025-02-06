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
    title: LocalizedString;
    slug: LocalizedString;
}

interface PartnersListProps {
    category?: CategoryType
}

interface PartnersCard extends PartnerType {
    locale: LocaleTypes,
}

interface PartnersListMenuProps {
    content: PartnerCategoryType[];
}

interface PartnersSectionProps {
    content: PartnerTypeLocalized[]
    title: LocalizedString
}

interface PartnersListItemProps extends PartnerCategoryType {
    locale: LocaleTypes;
}
