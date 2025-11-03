'use client';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  IconButton
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ItemWithData } from '@/types/items';

interface EditItemFormProps {
  item: ItemWithData;
}

export default function EditItemForm({ item }: EditItemFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(item.image || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    setFormData({
      name: item.data.name || '',
      description: item.data.description || '',
      price: item.data.price?.toString() || '',
      category: item.data.category || ''
    });
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
      }));
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await fetch(`/api/items/${item.id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      toast.success('Item updated successfully!');
      router.push(`/dashboard/item/${item.id}`);
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardHeader
        title="Edit Item"
        subheader="Update the details below to modify this item."
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Name *"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter item name"
            required
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Description *"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter item description"
            required
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />

          <TextField
            label="Price *"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            placeholder="0.00"
            required
            fullWidth
            variant="outlined"
            inputProps={{
              step: 0.01,
              min: 0
            }}
          />

          <FormControl fullWidth required>
            <InputLabel>Category *</InputLabel>
            <Select
              value={formData.category}
              label="Category *"
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="books">Books</MenuItem>
              <MenuItem value="home">Home & Garden</MenuItem>
              <MenuItem value="sports">Sports & Outdoors</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Image Upload
            </Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            
            {!imagePreview ? (
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUpload />}
                onClick={triggerFileInput}
                sx={{ width: '100%', height: 120, borderStyle: 'dashed' }}
              >
                Click to upload image
              </Button>
            ) : (
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 8
                  }}
                />
                <IconButton
                  onClick={handleRemoveImage}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            )}
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ flex: 1 }}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Updating...' : 'Update Item'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => router.back()}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
