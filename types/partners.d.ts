type PartnerTypes = 'partner' | 'community'

type PartnerType = {
  id: string
  active: boolean
  title: string
  description: string
  logo: string
  //** It is the category id */
  category: string
  email: string
  membership_email?: string
  address?: string
  website?: string
  phone?: string
  whatsapp?: string
  instagram?: string
  facebook?: string
  linkedin?: string
}

type PartnerTypeLocalized = PartnerType & {
  title: LocalizedString
  description: LocalizedString
}

type PartnerCategoryType = {
  title: LocalizedString
  slug: LocalizedString
}

interface PartnersListProps {
  category?: CategoryType
  locale: LocaleTypes
}

interface PartnersCard extends PartnerType {
  locale: LocaleTypes
}

interface PartnersListMenuProps {
  content: PartnerCategoryType[]
}

interface PartnersSectionProps {
  content: PartnerTypeLocalized[]
  title: LocalizedString
}

interface PartnersListItemProps extends PartnerCategoryType {
  locale: LocaleTypes
}

type GetPartnersType = {
  order?: string
  page?: number
  pageSize?: number
  type?: 'partners' | 'community'
  category?: CategoryType
}
