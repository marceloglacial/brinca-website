interface PageParamsProps {
    slug?: string
    locale: string
}

interface PageProps {
    children?: React.ReactNode;
    params: PageParamsProps
}
