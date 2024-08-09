'use server'
export const postContent = async (postData: any, collection: string) => {
    const res = await fetch(`${process.env.API_URL}/${collection}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    if (!res.ok) {
        throw new Error('Error')
    }
    const apiData = await res.json()
    return apiData
}
