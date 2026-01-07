import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IUserStore {
  user: {
    id: number;
    nickname: string;
  } | null;
  setUser: (user: { id: number; nickname: string }) => void;
  logout: () => void;
}

const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user: { id: user.id, nickname: user.nickname } }),
      logout: () => {
        localStorage.removeItem('accessToken');

        set({ user: null });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
