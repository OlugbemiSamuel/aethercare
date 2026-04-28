import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";


interface AuthStore {
    user: User | null ;
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
      supabase.auth.getSession().then(({data:{session}}) => {
        console.log(session, 'session');
        set({user: session?.user ?? null, isLoading: false})
      })


    supabase.auth.onAuthStateChange((_event, session) => {
        console.log('auth event', _event);
        set({user:session?.user ?? null, isLoading: false});

    });
    },

    signOut: async () => {
        await supabase.auth.signOut();
    }, 
    

   



    }

    
))


