interface HeroProps {
    id: number
    title: string;
    description: string;
    rounded: boolean
    shadow: boolean
    reverse: boolean
    image: ImageProps;
    link: {
        link: string
        text: string
    }
}
