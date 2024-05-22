interface PageParamsProps {
    slug?: string
    locale: string
    id?: string
}

interface PageProps {
    children?: React.ReactNode;
    params: PageParamsProps;
}
