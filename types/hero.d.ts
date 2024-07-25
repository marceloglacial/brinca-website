interface HeroProps {
    id: number
    language: string;
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
