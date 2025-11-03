import { createItem } from '@/db/items';
import { processImageUpload } from '@/lib/file-upload';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Parse the JSON data
    const dataString = formData.get('data') as string;
    if (!dataString) {
      return NextResponse.json(
        { error: 'Missing data field' },
        { status: 400 }
      );
    }

    const data = JSON.parse(dataString);
    
    // Validate required fields
    if (!data.name || !data.description || !data.price || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, and category are required' },
        { status: 400 }
      );
    }

    // Validate price is a positive number
    if (typeof data.price !== 'number' || data.price < 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      );
    }

    // Handle image file upload
    const imageFile = formData.get('image') as File | null;
    let imageUrl = null;

    if (imageFile) {
      try {
        const uploadResult = await processImageUpload(imageFile);
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url;
        } else {
          return NextResponse.json(
            { error: uploadResult.error || 'Failed to upload image' },
            { status: 400 }
          );
        }
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload image' },
          { status: 500 }
        );
      }
    }

    const item = await createItem({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
      },
      image: imageUrl || undefined,
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Failed to create item' },
        { status: 500 }
      );
    }

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
