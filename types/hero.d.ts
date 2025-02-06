interface HeroProps {
    id: number
    title: string;
    description: string;
    rounded?: boolean
    reversed?: boolean
    shadow?: boolean
    image: string;
    link: {
        title: string
        url: string
    }
}
