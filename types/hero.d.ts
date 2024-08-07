interface HeroProps {
    id: number
    language: LocaleTypes;
    title: LocalizedString;
    description: LocalizedString;
    rounded: boolean
    shadow: boolean
    image: ImageProps;
    link: {
        link: LocalizedString
        text: LocalizedString
    }
}
