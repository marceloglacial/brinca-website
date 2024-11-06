import { SITE } from '@/constants'

export const localizedContent = (
    content: any,
    locale?: string,
): any => {
    const fallbackLocale: string = SITE.DEFAULT_LOCALE
    return Object.keys(content).reduce((acc: LocalizedContent, key: string) => {
        const value = content[key];

        if (typeof value === 'object') {
            acc[key] = value[locale || fallbackLocale] || value;
        } else {
            acc[key] = value;
        }
        return acc;
    }, {});
};

export const localizedData = (data: any, locale?: string): any => data.map((item: any) => localizedContent(item, locale))

export const localizedUrl = (pathname: string, newLocale: string): string => {
    const localePattern = /^\/[a-z]{2}-[A-Z]{2}/

    return localePattern.test(pathname)
        ? pathname.replace(localePattern, `/${newLocale}`)
        : `/${newLocale}${pathname}`
}
