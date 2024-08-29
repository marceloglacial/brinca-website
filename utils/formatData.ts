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
        type: item['__component']?.split('.')[1],
        image: formatThumbnail(item.image),
        thumbnail: formatThumbnail(item.thumbnail)
    }
    delete result.__component
    return result
}


export const formatFrontPageData = (data: any) =>
    data.data.attributes.frontpage.map((item: any) => {
        return {
            ...formatBaseData(item),
            rounded: item.isRounded,
            shadow: item.hasShadow || true,
            link: {
                link: item?.button?.href,
                text: item?.button?.text
            }
        }
    });


export const formatContentListData = (data: any): any => {
    const result = data.map((item: any) => {

        return {
            id: item.id,
            ...item.attributes,
            logo: { ...item.attributes?.logo?.data?.attributes },
            category: { ...item.attributes.category?.data?.attributes }
        }

    })
    return result
}

export const normalizeData = (data: any) => {
    return {
        id: data.data.id,
        ...data.data.attributes,
    }
}

export const normalizeItem = (item: any) => {
    return {
        id: item.id,
        ...item.attributes,
    }
}


export const normalizeFormsData = (data: any) => {
    const formData = data.data
    const result: FormDataType = {
        id: formData.id,
        ...formData.attributes,
        status: {
            success: {
                message: formData.attributes.onSuccess
            },
            error: {
                message: formData.attributes.onError
            }
        },
        fields: formData.attributes?.fields.map((item: any) => formatField(item)),
    }
    return result
}

export const formatField = (field: any) => {

    const result = {
        ...field,
        fieldType: field['__component']?.split('.')[1],
        options: field.options?.map((option: any) => formatOptions(option))
    }
    delete result['__component']
    return result
}

export const formatOptions = (option: any) => {
    const result = {
        ...option,
        ...option.attributes
    }
    delete result.attributes

    return result
}
