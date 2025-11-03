export interface Profile {
  id: string
  role: 'admin' | 'membership' | 'visitor'
  email: string
  points: number
  full_name: string | null
  birthday: string | null
}

export interface ProfileUpdateData {
  role?: 'admin' | 'membership' | 'visitor'
  email?: string
  points?: number
  full_name?: string
  birthday?: string
}

export interface Item {
  id: number
  inserted_at: string
  updated_at: string
  data: any // JSONB data
  image: string | null
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id'> & { id?: string }
        Update: Partial<ProfileUpdateData>
      }
      item: {
        Row: Item
        Insert: Omit<Item, 'id' | 'inserted_at' | 'updated_at'> & { 
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Item, 'id' | 'inserted_at' | 'updated_at'>>
      }
    }
  }
}
