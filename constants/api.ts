export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const API_HOMEPAGE_PARAMS = `homepage?populate=frontpage.image,frontpage.button`
export const API_PAGES_ROUTE = `/`
export const API_PAGES_PARAMS = `pages?populate=content,thumbnail`
export const API_EVENTS_ROUTE = `/events`
export const API_EVENTS_PARAMS = `events?populate=content,thumbnail&sort=date:desc`
export const API_MENU = `menu?populate=*`
export const API_BLOCKS = `populate=content.photos,content.buttons,content.image,thumbnail`
