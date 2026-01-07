import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ICategoryIdStore {
  categoryId: number;
  setCategoryId: (categoryId: number) => void;
}

const useCategoryIdStore = create<ICategoryIdStore>()(
  persist(
    (set) => ({
      categoryId: 1,
      setCategoryId: (categoryId) => set({ categoryId }),
    }),
    {
      name: 'categoryId-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCategoryIdStore;
