import { create } from 'zustand';

interface IUserStore {
  user: string | null;
  setUser: (user: string) => void;
  logout: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
