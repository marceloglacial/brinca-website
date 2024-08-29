'use server'
import { MESSAGES } from '@/constants'
import { postContent, uploadImage } from '@/services'

export async function formServerAction(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData)
    if (data.formType === 'database') return await addContent(data)
    if (data.formType === 'email') return await sendEmail(data)
    throw Error
}

export async function addContent(data: any) {
    try {
        // honeypot
        if (data.full_name) return {
            message: 'Error',
            status: 'error',
        }

        const content = structuredClone(data)
        Object.keys(content).forEach((key) => {
            if (key.startsWith('$ACTION_') || !content[key]) {
                delete content[key]
            }
        })
        delete content.full_name
        delete content.formType
        delete content.formEndpoint
        delete content.formTitle

        if (content.logo || content.image) {
            const image = await uploadImage(content?.logo || content.image)
            content.logo = image
        }

        const response = await postContent({ data: content }, data.formEndpoint)

        await sendEmail({
            formTitle: data.formTitle,
            message: MESSAGES.NEW_DOCUMENT,
        })
        console.info('Success')

        return {
            message: 'Success',
            data: { ...content, id: response?.data },
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


const sendEmail = async (data: any) => {
    try {
        if (!process.env.FORMS_URL) throw Error
        const emailResponse = await fetch(process.env.FORMS_URL, {
            method: 'POST',
            body: JSON.stringify({
                subject: `${MESSAGES.EMAIL_TITLE} - ${data.formTitle}`,
                honeypot: '',
                replyTo: '@',
                accessKey: process.env.FORMS_API_KEY,
                name: data?.fullName,
                email: data?.email,
                message: data?.message
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        const emailJson = await emailResponse.json();
        console.info('Email sent');

        return {
            message: 'Success',
            data: emailJson,
            status: 'success',
        }
    } catch (e) {
        console.error(e)
        return {
            message: 'Error',
            status: 'error',
        }
    }
};
