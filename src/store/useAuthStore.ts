import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface AuthStore {
  user: User | null;
  initializeAuth: () => void;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  initializeAuth: () => {
    supabase.auth.getSession().
    then(({ data: { session } }) => {
      set({ user: session?.user ?? null, isLoading: false });
     
    })
    .catch((err) => {
      toast.error('Authentication failed:', err)
      set({isLoading: false, user: null})
    })

    supabase.auth.onAuthStateChange((_event, session) => {
    
      set({ user: session?.user ?? null, isLoading: false });
    });
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.message("an unexpected error occured try again");
      }
    }
  },
}));
