import useCategoryIdStore from '../../store/useCategoryId';
import useSelectedPriceStore from '../../store/useSelectedPriceStore';
import useUserStore from '../../store/useUserStore';

const mockStore = (hook, state) => {
  const initStore = hook.getState();
  hook.setState({ ...initStore, ...state }, true);
};

export const mockUseUserStore = (state) => {
  mockStore(useUserStore, state);
};

export const mockUseCategoryIdStore = (state) => {
  mockStore(useCategoryIdStore, state);
};

export const mockUseSelectedPriceStore = (state) => {
  mockStore(useSelectedPriceStore, state);
};
