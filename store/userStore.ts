import { UserType } from "@/types/user";
import { signOut } from "next-auth/react";
import { create } from "zustand";

interface UserState {
  user: UserType | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: UserType) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,

  fetchUser: async () => {
    // if (state.user) return;
    set({ loading: true });
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      // console.log("Data from useuser: ", data)
      if (data.user) {
        set({ user: data.user });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  setUser: (user) => set((state) => ({ ...state, user })),
  logout: async () => {
    try {
      await signOut();
      set({ user: null });
    } catch (error) {
      console.log(error);
    }
  },
}));
