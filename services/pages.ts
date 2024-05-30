export async function getSinglePage(locale: string, slug: string): Promise<IPageResponse> {
    const res = await fetch(`${process.env.API_URL}/pages/${locale}/${slug}`);
    return res.json();
}

export async function getPageByType(pageType: string, locale: string, slug: string): Promise<IPageResponse> {
    const res = await fetch(`${process.env.API_URL}/${pageType}/${locale}/${slug}`);
    return res.json();
}

export async function getEvents(): Promise<any> {
    const res = await fetch(`${process.env.API_URL}/events`);
    return res.json();
}
