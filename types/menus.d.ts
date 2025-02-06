type MenuItemType = {
    slug: string;
    title: string;
    type: 'link' | 'primary' | 'secondary'
}

type MenusType = {
    title: string,
    items: MenuItemType[]
}[]
