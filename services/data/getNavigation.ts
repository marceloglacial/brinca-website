import { LinkTypes } from '@marceloglacial/brinca-ui'
import { navItem } from 'components/AppLayout/AppLayout'
import { API_MENU, API_URL } from 'constants/api'

type menuItem = {
    id: number
    value: string
    text: string
    type: LinkTypes | 'link'
}

const getNavigation = async () => {
    const results = await fetch(`${API_URL}/${API_MENU}`)
    const menu = await results.json()
    const navigation = menu?.data?.attributes?.items.map((item: menuItem) => {
        const itemType = item.type === 'link' ? 'default' : item.type
        const navigationItem: navItem = {
            id: item.id,
            href: item.value,
            text: item.text,
            type: itemType,
        }
        return navigationItem
    })
    return navigation || []
}

export default getNavigation
