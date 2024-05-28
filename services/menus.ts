export async function getMenus() {
    const res = await fetch(`${process.env.API_URL}/menus`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}
