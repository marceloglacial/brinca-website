import { partners, partnersCategories } from '@/mocks/data'

export const getPartnersMenu = async () => {
    return partnersCategories
}

export const getPartners = async (type?: string) => {
    return partners
}
