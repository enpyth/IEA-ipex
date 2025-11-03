import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Item } from '@/types/database'
import { ItemData, ItemWithData, CreateItemData, UpdateItemData } from '@/types/items'

export async function getItems(): Promise<Item[]> {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('item')
    .select('*')
    .order('inserted_at', { ascending: false })

  if (error) {
    console.error('Error fetching items:', error)
    return []
  }

  return data || []
}

export async function getItemById(id: number): Promise<Item | null> {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('item')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching item:', error)
    return null
  }

  return data
}

export async function createItem(itemData: CreateItemData): Promise<Item | null> {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('item')
    .insert(itemData)
    .select()
    .single()

  if (error) {
    console.error('Error creating item:', error)
    return null
  }

  return data
}

export async function updateItem(id: number, updates: UpdateItemData): Promise<Item | null> {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('item')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating item:', error)
    return null
  }

  return data
}

export async function deleteItem(id: number): Promise<boolean> {
  const supabase = await createServerSupabaseClient()
  
  const { error } = await supabase
    .from('item')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting item:', error)
    return false
  }

  return true
}

export async function searchItems(query: string): Promise<Item[]> {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('item')
    .select('*')
    .or(`data->>'name'.ilike.%${query}%,data->>'description'.ilike.%${query}%`)
    .order('inserted_at', { ascending: false })

  if (error) {
    console.error('Error searching items:', error)
    return []
  }

  return data || []
}

// Helper function to get items with parsed data
export async function getItemsWithParsedData(): Promise<ItemWithData[]> {
  const items = await getItems()
  
  return items.map(item => ({
    ...item,
    data: typeof item.data === 'string' ? JSON.parse(item.data) : item.data
  }))
}

// Helper function to get item by ID with parsed data
export async function getItemByIdWithParsedData(id: number): Promise<ItemWithData | null> {
  const item = await getItemById(id)
  
  if (!item) return null
  
  return {
    ...item,
    data: typeof item.data === 'string' ? JSON.parse(item.data) : item.data
  }
}
