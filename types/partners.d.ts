
type PartnerTypes = 'partner' | 'community'

type PartnerType = {
    id: string,
    isActive: boolean,
    type?: PartnerTypes,
    createdAt: string,
    updatedAt: string,
    title: string,
    description?: string,
    logo: {
        alternativeText?: string,
        url: string
    }
    category: PartnerCategoryType[]
    email: string,
    address?: string,
    website?: string,
    phone?: string,
    facebook?: string,
    instagram?: string,
    linkedin?: string,
    whatsapp?: string
}

type PartnerCategoryType = {
    id: string;
    title: string;
    slug: string;
}

interface PartnersListProps {
    locale: LocaleTypes;
    category?: string
}


interface PartnersListMenuProps {
    locale: LocaleTypes;
}

interface PartnersSectionProps {
    locale: LocaleTypes
    filter?: string
    isMember?: boolean
}

interface PartnersListItemProps extends PartnerCategoryType {
    locale: LocaleTypes;
}
