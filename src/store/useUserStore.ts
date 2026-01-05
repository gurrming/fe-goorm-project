import { create } from 'zustand';

interface IUserStore {
  user: {
    id: number;
    nickname: string;
  } | null;
  setUser: (user: { id: number; nickname: string }) => void;
  logout: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user: { id: user.id, nickname: user.nickname } }),
  logout: async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null });
  },
}));

export default useUserStore;
