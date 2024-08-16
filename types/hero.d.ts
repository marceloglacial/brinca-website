interface HeroProps {
    id: number
    title: string;
    description: string;
    rounded: boolean
    shadow: boolean
    image: ImageProps;
    link: {
        link: string
        text: string
    }
}
