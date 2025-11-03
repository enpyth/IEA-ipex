export interface ItemData {
  name: string
  description: string
  price: number
  category: string
  [key: string]: any // Allow additional properties
}

export interface ItemWithData {
  id: number
  inserted_at: string
  updated_at: string
  data: ItemData
  image: string | null
}

export interface CreateItemData {
  data: ItemData
  image?: string
}

export interface UpdateItemData {
  data?: Partial<ItemData>
  image?: string
}
