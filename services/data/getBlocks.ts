/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeroComponentProps } from 'components/Hero/Hero'

const getBlocks = (data: any) => {
    const allBlocks = data?.map((block: any) => {
        const blockName = getComponentType(block)
        const componentType: any = {
            'content-list': getContentList(block),
            'text-editor': getTextEditor(block),
            hero: getHero(block),
            hubspot: getHubspot(block),
            gallery: getGallery(block),
            embed: getEmbed(block),
        }
        return componentType[blockName] || null
    })

    return allBlocks
}

const getEmbed = (props: any) => {
    return {
        ...props,
        type: getComponentType(props),
    }
}

const getGallery = (props: any) => {
    return {
        id: props.id,
        title: props.title,
        images: props.photos?.data.map((photo: any) => {
            return {
                id: photo.id,
                ...photo.attributes,
            }
        }),
        type: getComponentType(props),
    }
}

const getHubspot = (props: any) => {
    return {
        ...props,
        attrs: {
            formID: props.formId,
        },
        type: getComponentType(props),
    }
}

const getTextEditor = (props: any) => {
    return {
        ...props,
        type: getComponentType(props),
    }
}

const getContentList = (props: any) => {
    return {
        ...props,
        contentType: props.type,
        type: getComponentType(props),
    }
}

const getHero = (props: any) => {
    const { title, description, image, button, isRounded } = props
    const hero: HeroComponentProps & { type: any } = {
        type: getComponentType(props),
        title,
        rounded: isRounded,
        description,
        image: {
            src: image?.data.attributes.url,
            alt: '',
        },
        link: {
            href: button?.href,
            text: button?.text,
        },
    }
    return hero
}

const getComponentType = (component: any) =>
    component.__component.replace('components.', '')

export default getBlocks
