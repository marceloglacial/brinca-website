// Define types for image formats
type ImageFormat = {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: null
    size: number
    width: number
    height: number
    provider_metadata: {
        public_id: string
        resource_type: string
    }
}

// Define types for image attributes
type ImageAttributes = {
    name: string
    alternativeText: null
    caption: null
    width: number
    height: number
    formats: {
        small?: ImageFormat
        thumbnail?: ImageFormat
        medium?: ImageFormat
        large?: ImageFormat
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null
    provider: string
    provider_metadata: {
        public_id: string
        resource_type: string
    }
    createdAt: string
    updatedAt: string
}

// Define types for button
type Button = {
    id: number
    text: string
    href: string
    type: string
}

// Define types for hero component
type HeroComponent = {
    id: number
    __component: string
    title: string
    description: string
    isRounded: boolean
    button: Button
    image: {
        data: {
            id: number
            attributes: ImageAttributes
        }
    }
}

// Define types for content list
type ContentList = {
    id: number
    __component: string
    title: string
    type: string
    items: number
}

// Define types for attributes
type Attributes = {
    createdAt: string
    updatedAt: string
    locale: string
    frontpage: HeroComponent[]
}

// Define types for data
type Data = {
    id: number
    attributes: Attributes
}

// Define types for the root object
type RootObject = {
    data: Data
    meta: {}
}
