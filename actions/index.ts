'use server'
import { postContent } from '@/services'

export async function formServerAction(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData)
    if (data.formType === 'addContent') return await addContent(data)
    return false
}


export async function addContent(data: any) {
    try {
        // honeypot
        if (data.full_name) return {
            message: 'Error',
            status: 'error',
        }

        const content = structuredClone(data)
        Object.keys(content).forEach((key) => key.startsWith('$ACTION_') && delete content[key])
        delete content.formType
        delete content.formEndpoint
        const response = await postContent({ data: content }, data.formEndpoint)
        console.info('Success')

        return {
            message: 'Success',
            data: { ...content, id: response.data },
            status: 'success',
        }
    } catch (e) {
        console.error(e)
        return {
            message: 'Error',
            status: 'error',
        }
    }
}
