import { partners, partnersCategories } from '@/mocks/data'

export const getPartnersMenu = async () => {
    return partnersCategories
}

export const getPartners = async (type: PartnerType['type']) => {
    return partners.filter(partner => partner.isActive && partner.type === type)
}
