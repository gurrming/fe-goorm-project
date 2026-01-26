import useCategoryIdStore from '../../store/useCategoryId';
import useSelectedPriceStore from '../../store/useSelectedPriceStore';
import useUserStore from '../../store/useUserStore';
import { useAssetStore } from '../../store/websocket/useAssetStore';
import { useChartStore } from '../../store/websocket/useChartStore';
import type { StoreApi } from 'zustand';

const mockStore = <T,>(hook: StoreApi<T>, state: Partial<T>) => {
  const initStore = hook.getState();
  hook.setState({ ...initStore, ...state }, true);
};

export const mockUseUserStore = (state: Partial<ReturnType<typeof useUserStore.getState>>) => {
  mockStore(useUserStore, state);
};

export const mockUseCategoryIdStore = (state: Partial<ReturnType<typeof useCategoryIdStore.getState>>) => {
  mockStore(useCategoryIdStore, state);
};

export const mockUseSelectedPriceStore = (state: Partial<ReturnType<typeof useSelectedPriceStore.getState>>) => {
  mockStore(useSelectedPriceStore, state);
};

export const mockUseChartStore = (state: Partial<ReturnType<typeof useChartStore.getState>>) => {
  mockStore(useChartStore, state);
};

export const mockUseAssetStore = (state: Partial<ReturnType<typeof useAssetStore.getState>>) => {
  mockStore(useAssetStore, state);
};