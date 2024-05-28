export async function getPages() {
    const res = await fetch('http://localhost:3007/api/pages/');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export async function getSinglePage(locale: string, slug: string) {
    const res = await fetch(`http://localhost:3007/api/pages/${locale}/${slug}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}
