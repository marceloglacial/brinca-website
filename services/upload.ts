'use server'
export const uploadImage = async (fileBlob: Blob) => {
    const formData = new FormData();
    formData.append('files', fileBlob);

    try {
        const response = await fetch(`${process.env.STRAPI_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
};
