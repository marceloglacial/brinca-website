type LinksGroupType = {
    id: string | number,
    text: string,
    href: string,
    type: ButtonTypes
}

interface LinksGroupProps {
    data: { items: LinksGroupType[] }
}
