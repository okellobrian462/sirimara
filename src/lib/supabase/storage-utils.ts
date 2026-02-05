import { createClient } from './client';

export type StorageBucket = 'property-images' | 'agent-photos' | 'agent-images' | 'videos';

/**
 * Uploads a file to a specific Supabase Storage bucket
 * @param bucket The bucket name
 * @param file The file to upload
 * @param path Optional sub-path within the bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
    bucket: StorageBucket,
    file: File,
    path?: string
): Promise<string> {
    const supabase = createClient();

    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return publicUrl;
}

/**
 * Deletes a file from a specific Supabase Storage bucket
 * @param bucket The bucket name
 * @param url The full public URL of the file to delete
 */
export async function deleteFileFromUrl(
    bucket: StorageBucket,
    url: string
): Promise<void> {
    const supabase = createClient();

    // Extract the path from the URL
    // Public URL format: https://[ref].supabase.co/storage/v1/object/public/[bucket]/[path]
    const urlParts = url.split(`/public/${bucket}/`);
    if (urlParts.length < 2) return; // Not a Supabase storage URL

    const filePath = urlParts[1];

    const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

    if (error) {
        console.error('Error deleting file:', error);
    }
}
