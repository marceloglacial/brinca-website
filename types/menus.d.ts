type MenuItemType = {
    type: string,
    value: {
        slug: string;
        title: string;
    }
}

type MenusType = {
    title: string,
    items: MenuItemType[]
}[]
