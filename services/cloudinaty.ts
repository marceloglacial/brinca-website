'use server'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function transformToJpg(publicId: string): string {
    return cloudinary.url(publicId, { format: 'jpg' });
}

export async function getCloudinaryImages(folderPath: string): Promise<string[]> {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: folderPath,
            resource_type: 'image',
        });

        const imageUrls = result.resources.map((resource: any) => transformToJpg(resource.public_id));
        return imageUrls;
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
        throw error;
    }
}
