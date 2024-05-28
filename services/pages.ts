export async function getPages() {
    const res = await fetch(`${process.env.API_URL}/pages`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export async function getSinglePage(locale: string, slug: string) {
    const res = await fetch(`${process.env.API_URL}/pages/${locale}/${slug}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}
