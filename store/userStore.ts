import { signOut } from "next-auth/react";
import { create } from "zustand";

interface User {
  email: string;
  name: string;
  image?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UseUser {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUser = create<UseUser>((set) => ({
    user: null,
    loading: false,

    fetchUser: async () => {
      set({loading: true})
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        // console.log("Data from useuser: ", data)
        if (data.user) {
          set({ user: data.user });
        }
      } catch (error) {
        console.log(error);
      } finally{
        set({loading: false})
      }
    },
    setUser: (user) => set((state) => ({...state, user})),
    logout: async () => {
      try {
        await signOut();
        set({user: null})
      } catch (error) {
        console.log(error);
      }
    }
  }
))
