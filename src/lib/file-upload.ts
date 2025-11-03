import { createServerSupabaseClient } from './supabase-server';

export interface FileUploadConfig {
  maxSize: number; // in bytes
  allowedTypes: string[];
  bucketName: string;
}

export const defaultFileConfig: FileUploadConfig = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  bucketName: process.env.SUPABASE_STORAGE_BUCKET_NAME || 'bucket-ygf'
};

export async function validateFile(file: File, config: FileUploadConfig = defaultFileConfig): Promise<{ valid: boolean; error?: string }> {
  // Check file size
  if (file.size > config.maxSize) {
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${config.maxSize / (1024 * 1024)}MB`
    };
  }

  // Check file type
  if (!config.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed. Allowed types: ${config.allowedTypes.join(', ')}`
    };
  }

  return { valid: true };
}

export async function uploadToSupabase(
  file: File, 
  filename: string, 
  config: FileUploadConfig = defaultFileConfig
): Promise<string> {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(config.bucketName)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(config.bucketName)
      .getPublicUrl(filename);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw new Error('Failed to upload file to storage');
  }
}

export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
}

export async function processImageUpload(
  file: File, 
  config: FileUploadConfig = defaultFileConfig
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Validate file
    const validation = await validateFile(file, config);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Generate unique filename
    const filename = generateUniqueFilename(file.name);
    
    // Upload to Supabase
    const url = await uploadToSupabase(file, filename, config);
    
    return { success: true, url };
  } catch (error) {
    console.error('Error processing image upload:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function deleteFromSupabase(
  filename: string,
  config: FileUploadConfig = defaultFileConfig
): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { error } = await supabase.storage
      .from(config.bucketName)
      .remove([filename]);

    if (error) {
      console.error('Supabase delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting from Supabase:', error);
    return false;
  }
}
