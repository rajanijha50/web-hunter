import { WebsiteType } from "@/types/website";
import { create } from "zustand";

interface WebState {
  websites: WebsiteType[];
  loading: boolean;
  loadingError: string | null;

  fetchWebsites: () => Promise<void>;
  setWebsites: (websites: WebsiteType[]) => void;
}

export const useWebStore = create<WebState>((set) => ({
  websites: [],
  loading: false,
  loadingError: null,
  fetchWebsites: async () => {
      set({ loading: true });
      try {
        const res = await fetch("/api/websites");
        const data = await res.json();
        if (data.success) {
          set({ websites: data.data });
        }
        console.log("total count: ", data.count);
      } catch (error: any) {
        set({ loadingError: error.message });
      } finally {
        set({ loading: false });
      }
  },
  setWebsites: (websites) => set({ websites }),
}));
