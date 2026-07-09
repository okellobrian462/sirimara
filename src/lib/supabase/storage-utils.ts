import { createClient } from './client';

export type StorageBucket = 'property-images' | 'agent-photos' | 'agent-images' | 'videos';

export async function uploadFile(
    bucket: StorageBucket,
    file: File,
    path?: string
): Promise<string> {
    const supabase = createClient();

    
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

export async function deleteFileFromUrl(
    bucket: StorageBucket,
    url: string
): Promise<void> {
    const supabase = createClient();

    
    
    const urlParts = url.split(`/public/${bucket}/`);
    if (urlParts.length < 2) return; 

    const filePath = urlParts[1];

    const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

    if (error) {
        console.error('Error deleting file:', error);
    }
}
