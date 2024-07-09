export async function getMenus() {
    const res = await fetch(`${process.env.API_URL}/menus`);
    return res.json();
}
