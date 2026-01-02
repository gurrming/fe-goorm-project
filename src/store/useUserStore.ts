import { create } from 'zustand';
import { postLogout } from '../api/member';

interface IUserStore {
  user: string | null;
  setUser: (user: string) => void;
  logout: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('accessToken');
    postLogout();
    set({ user: null });
  },
}));

export default useUserStore;
