export const runtime = 'edge';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server'; 
 
 
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed file types - standardized MIME types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf'
];

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Parse the multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type. Only images (JPEG, PNG, GIF, WebP) and PDF files are allowed.' 
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || '';
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${timestamp}_${sanitizedFileName}`;

    // Convert file to ArrayBuffer for upload
    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(fileArrayBuffer);

    // Upload to Supabase Storage - changed bucket name to 'commscope_data'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('commscope_data') // Changed from 'videos' to 'commscope_data'
      .upload(uniqueFileName, fileBuffer, {
        contentType: file.type,
        duplex: 'half'
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file to storage' },
        { status: 500 }
      );
    }

    // Get the public URL of the uploaded file
    const { data: urlData } = supabase.storage
      .from('commscope_data') // Changed from 'videos' to 'commscope_data'
      .getPublicUrl(uniqueFileName);

    const publicUrl = urlData.publicUrl;

    return NextResponse.json({
      success: true,
      data: {
        message: 'File uploaded successfully',
        filename: uniqueFileName,
        originalFilename: file.name,
        fileType: file.type,
        fileSize: file.size,
        publicUrl: publicUrl,
        bucketPath: uploadData.path
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}