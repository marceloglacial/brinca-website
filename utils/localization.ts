import { SITE } from '@/constants'

export const localizedContent = (
    content: any,
    locale?: string,
): any => {
    const fallbackLocale: string = SITE.DEFAULT_LOCALE;

    const localize = (value: any): any => {
        // Handle arrays by iterating over them and localizing each item
        if (Array.isArray(value)) {
            return value.map(item => localize(item));
        }

        // Handle objects by reducing them into a localized object
        if (typeof value === 'object' && value !== null) {
            const result = Object.keys(value).reduce((acc: any, key: string) => {
                const nestedValue = value[key];

                // Recurse into nested objects or arrays
                if (typeof nestedValue === 'object' && nestedValue !== null) {
                    acc[key] = localize(nestedValue[locale || fallbackLocale] || nestedValue);
                } else {
                    acc[key] = nestedValue;
                }
                return acc;
            }, {});

            return result;
        }

        // Return the value if it's neither an object nor an array
        return value;
    };

    return localize(content);
};



export const localizedData = (data: any, locale?: string): any => data.map((item: any) => localizedContent(item, locale))

export const localizedUrl = (pathname: string, newLocale: string): string => {
    const localePattern = /^\/[a-z]{2}-[A-Z]{2}/

    return localePattern.test(pathname)
        ? pathname.replace(localePattern, `/${newLocale}`)
        : `/${newLocale}${pathname}`
}


export const formatLocale = (locale: LocalesType) => {
    return locale === 'pt_br' ? 'pt-BR' : locale
}
