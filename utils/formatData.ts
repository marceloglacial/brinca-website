export const formatData = (data: any): FormatedData => {
    const info = data.data
    return {
        id: info.id,
        ...info.attributes,
        content: info.attributes.content.map((item: any) => {
            const result = {
                ...item,
                id: item.id,
                type: item['__component'].split('.')[1],
            }
            delete result.__component
            return result
        }),
    }
}
