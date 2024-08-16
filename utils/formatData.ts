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
        thumbnail: formatThumbnail(info.attributes.thumbnail)
    }
}

export const formatThumbnail = (thumbnail: any) => {
    if (!thumbnail?.data) return null
    const image = thumbnail.data.attributes
    return {
        src: image.url,
        alt: image.alternativeText
    }

}

export const formatBaseData = (item: any) => {
    const result = {
        ...item,
        id: item.id,
        type: item['__component'].split('.')[1],
        image: formatThumbnail(item.image),
        thumbnail: formatThumbnail(item.thumbnail)
    }
    delete result.__component
    return result
}
