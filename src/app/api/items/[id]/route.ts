import { updateItem, getItemById, deleteItem } from '@/db/items';
import { processImageUpload, deleteFromSupabase } from '@/lib/file-upload';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      );
    }

    // Check if item exists
    const existingItem = await getItemById(idInt);
    if (!existingItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    
    // Parse the JSON data
    const dataString = formData.get('data') as string;
    let data: any = {};
    
    if (dataString) {
      data = JSON.parse(dataString);
    }
    
    // Validate required fields if they're being updated
    if (data.name !== undefined && !data.name) {
      return NextResponse.json(
        { error: 'Name cannot be empty' },
        { status: 400 }
      );
    }
    
    if (data.description !== undefined && !data.description) {
      return NextResponse.json(
        { error: 'Description cannot be empty' },
        { status: 400 }
      );
    }
    
    if (data.price !== undefined && (typeof data.price !== 'number' || data.price < 0)) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      );
    }
    
    if (data.category !== undefined && !data.category) {
      return NextResponse.json(
        { error: 'Category cannot be empty' },
        { status: 400 }
      );
    }

    // Handle image file upload
    const imageFile = formData.get('image') as File | null;
    let imageUrl = undefined;

    if (imageFile) {
      try {
        const uploadResult = await processImageUpload(imageFile);
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url;
          
          // If there was a previous image, we could optionally delete it from storage
          // This would require storing the filename in the database or extracting it from the URL
          // For now, we'll just update with the new image
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

    const updatedItem = await updateItem(idInt, {
      data: data || {},
      image: imageUrl,
    });

    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Failed to update item' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
      );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      );
    }

    // Check if item exists
    const existingItem = await getItemById(id);
    if (!existingItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Optionally delete the image from storage if it exists
    if (existingItem.image) {
      try {
        // Extract filename from URL for deletion
        const urlParts = existingItem.image.split('/');
        const filename = urlParts[urlParts.length - 1];
        if (filename) {
          await deleteFromSupabase(filename);
        }
      } catch (deleteError) {
        console.error('Error deleting image from storage:', deleteError);
        // Continue with item deletion even if image deletion fails
      }
    }

    const success = await deleteItem(id);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete item' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
