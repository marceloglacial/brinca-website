export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const API_HOMEPAGE_PARAMS: string = `homepage?populate=frontpage.image,frontpage.button`
export const API_PAGES_PARAMS: string = `pages?populate=content,thumbnail`
export const API_EVENTS_PARAMS: string = `events?populate=content,thumbnail&sort=date:desc`
export const API_MENU: string = `menu?populate=*`
export const API_BLOCKS: string = `populate=content.photos,content.buttons,content.image,thumbnail`
