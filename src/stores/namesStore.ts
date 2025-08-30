
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export interface Name {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

interface NamesState {
  names: Name[];
  loading: boolean;
  error: string | null;
  fetchNames: () => Promise<void>;
  addName: (name: string) => Promise<void>;
  updateName: (id: string, name: string) => Promise<void>;
  deleteName: (id: string) => Promise<void>;
}

export const useNamesStore = create<NamesState>((set, get) => ({
  names: [],
  loading: false,
  error: null,
  
  fetchNames: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('names')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ names: data });
    } catch (error: any) {
      set({ error: error.message });
      toast.error('Failed to load names');
    } finally {
      set({ loading: false });
    }
  },
  
  addName: async (name: string) => {
    set({ loading: true, error: null });
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      if (!userData.user) {
        throw new Error('User not authenticated');
      }
      
      const { data, error } = await supabase
        .from('names')
        .insert([{ 
          name, 
          user_id: userData.user.id 
        }])
        .select();
        
      if (error) throw error;
      if (data) {
        set(state => ({ 
          names: [data[0], ...state.names] 
        }));
        toast.success('Name added successfully');
      }
    } catch (error: any) {
      set({ error: error.message });
      toast.error('Failed to add name');
    } finally {
      set({ loading: false });
    }
  },
  
  updateName: async (id: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('names')
        .update({ name })
        .eq('id', id);
        
      if (error) throw error;
      
      set(state => ({
        names: state.names.map(item => 
          item.id === id ? { ...item, name } : item
        )
      }));
      
      toast.success('Name updated successfully');
    } catch (error: any) {
      set({ error: error.message });
      toast.error('Failed to update name');
    } finally {
      set({ loading: false });
    }
  },
  
  deleteName: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('names')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      set(state => ({
        names: state.names.filter(item => item.id !== id)
      }));
      
      toast.success('Name deleted successfully');
    } catch (error: any) {
      set({ error: error.message });
      toast.error('Failed to delete name');
    } finally {
      set({ loading: false });
    }
  },
}));
