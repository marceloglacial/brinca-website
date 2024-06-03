export async function getSinglePage(locale: string, slug: string): Promise<IPageResponse> {
    const res = await fetch(`${process.env.API_URL}/pages/${locale}/${slug}`);
    return res.json();
}

export async function getPageByType(pageType: string, locale: string, slug: string): Promise<IPageResponse> {
    const res = await fetch(`${process.env.API_URL}/${pageType}/${locale}/${slug}`);
    return res.json();
}

export async function getDataByType(type: string): Promise<any> {
    const res = await fetch(`${process.env.API_URL}/${type}`);
    return res.json();
}

export async function getDataById(type: string, id: string): Promise<any> {
    const res = await fetch(`${process.env.API_URL}/${type}/id/${id}`);
    return res.json();
}
