type NavBarVariantTypes = 'top' | 'bottom'

interface NavBarProps {
    variant?: NavBarVariantTypes;
    locale: LocaleTypes
}

interface NavBarItemsProps {
    variant?: NavBarVariantTypes;
    items: {
        href: string,
        text: string
    }[]
}
