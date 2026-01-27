import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarketSearchBar from './MarketSearchBar';
import MarketTableHeader from './MarketTableHeader';
import MarketTableItem from './MarketTableItem';
import MarketTabs from './MarketTabs';
import { useDeleteFavorite } from '../../api/favorite/useDeleteFavorite';
import { useGetFavorite } from '../../api/favorite/useGetFavorite';
import { usePostFavorite } from '../../api/favorite/usePostFavorite';
import { useGetCategories } from '../../api/useGetCategories';
import { useGetInvest } from '../../api/useGetInvest';
import { useTicker } from '../../hooks/websocket/useTicker';
import useCategoryIdStore from '../../store/useCategoryId';
import useUserStore from '../../store/useUserStore';
import { useModal } from '../common/Modal/hooks/useModal';
import { Modal } from '../common/Modal/Modal';
import type { TAssets } from '../../types/asset';
import type { Category } from '../../types/category';
import type { TabKey, SortTable, SortPriceArray } from '../../types/market';

function getNextSortOrder(current: SortPriceArray): SortPriceArray {
  if (current === 'base') return 'descending';
  if (current === 'descending') return 'ascending';
  return 'base';
}

export default function MarketPanel() {
  const { user } = useUserStore();
  const memberId = user?.id;
  const selectedCategoryId = useCategoryIdStore((state) => state.categoryId);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState<TabKey>('krw');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortTable, setSortTable] = useState<SortTable>('lastPrice');
  const [sortPriceArray, setSortPriceArray] = useState<SortPriceArray>('base');

  // 마켓 전체 데이터 조회
  const { data: categories } = useGetCategories();

  // 포트폴리오 - 보유 데이터 조회
  const { data: portfolio } = useGetInvest(memberId!);

  // 관심 종목 목록 조회
  const { data: Interest } = useGetFavorite(memberId ?? null);
  const postFavorite = usePostFavorite();
  const deleteFavorite = useDeleteFavorite();

  const isFavoriteCategory = (categoryId: number) =>
    Interest?.some((interest) => interest.categoryId === categoryId) || false;

  // 탭별 필터링
  const categoryList: Category[] = categories ?? [];
  let filteredCategories: Category[] = [];
  let portfolioAssets: TAssets[] = [];

  if (activeTab === 'krw') {
    filteredCategories = categoryList;
  } else if (activeTab === 'interest') {
    filteredCategories = categoryList.filter((category) => isFavoriteCategory(category.categoryId));
  } else if (activeTab === 'holding') {
    // 보유 탭일 때 포트폴리오 데이터 사용
    portfolioAssets = portfolio?.assetList || [];
  }

  // 검색 필터
  const keyword = searchKeyword.trim().toLowerCase();
  const searchFilteredCategories = keyword
    ? filteredCategories.filter(
        (category) =>
          category.symbol.toLowerCase().includes(keyword) || category.categoryName.toLowerCase().includes(keyword),
      )
    : filteredCategories;

  const searchFilteredPortfolioAssets = keyword
    ? portfolioAssets.filter(
        (asset) => asset.symbol.toLowerCase().includes(keyword) || asset.categoryName.toLowerCase().includes(keyword),
      )
    : portfolioAssets;

  let sortedCategories = searchFilteredCategories;
  let sortedPortfolioAssets = searchFilteredPortfolioAssets;

  // 오름차순은 1, 내림차순은 -1, base는 0 되도록 오름/내림차순 로직 구현
  const direction = sortPriceArray === 'ascending' ? 1 : sortPriceArray === 'descending' ? -1 : 0;

  const getCategorySortValue = (category: Category): number => {
    switch (sortTable) {
      case 'lastPrice':
        return category.tradePrice ?? 0;
      case 'changeRate':
        return category.changeRate ?? 0;
      case 'tradeAmount':
        return category.accAmount ?? 0;
      default:
        return 0;
    }
  };

  const getHoldingSortValue = (asset: TAssets): number => {
    switch (sortTable) {
      case 'evaluateAmount':
        return asset.evaluationAmount ?? 0;
      case 'avgBuyPrice':
        return asset.avgPrice ?? 0;
      case 'profitRate':
        return asset.profitRate ?? 0;
      default:
        return 0;
    }
  };

  const tickerCategoryIds =
    activeTab === 'holding'
      ? searchFilteredPortfolioAssets.map((a) => a.categoryId)
      : sortedCategories.map((c) => c.categoryId);

  useTicker(tickerCategoryIds.filter((id) => id !== selectedCategoryId));

  // sort() 함수는 비교 함수의 반환값으로 순서를 결정:
  // - 음수: a가 b보다 앞에 옴
  // - 0: 순서 유지
  // - 양수: a가 b보다 뒤에 옴
  if (direction !== 0) {
    if (activeTab === 'holding') {
      sortedPortfolioAssets = [...searchFilteredPortfolioAssets].sort((a, b) => {
        const aValue = getHoldingSortValue(a);
        const bValue = getHoldingSortValue(b);
        return (aValue - bValue) * direction;
      });
    } else {
      sortedCategories = [...searchFilteredCategories].sort((a, b) => {
        const aValue = getCategorySortValue(a);
        const bValue = getCategorySortValue(b);
        return (aValue - bValue) * direction;
      });
    }
  }

  const handleSortClick = (item: SortTable) => {
    if (sortTable === item) {
      setSortPriceArray(getNextSortOrder(sortPriceArray));
    } else {
      setSortTable(item);
      setSortPriceArray('descending');
    }
  };

  // 좋아요 클릭 시 관심 종목 추가/삭제
  const handleToggleFavorite = (categoryId: number) => {
    if (!memberId) {
      openModal(
        <Modal
          title="로그인 안내"
          description="관심코인을 추가하려면 로그인이 필요합니다."
          cancelButtonProps={{
            text: '취소',
            onClick: closeModal,
          }}
          confirmButtonProps={{
            text: '로그인',
            onClick: () => {
              closeModal();
              navigate('/login');
            },
          }}
        />,
      );
      return;
    }

    const isCurrentlyFavorite = Interest?.some((interest) => interest.categoryId === categoryId) || false;

    if (isCurrentlyFavorite) {
      // 관심 종목 삭제
      const existingInterest = Interest?.find((interest) => interest.categoryId === categoryId);
      if (existingInterest) {
        deleteFavorite.mutate({
          interestId: existingInterest.interestId,
          memberId,
        });
      }
    } else {
      // 관심 종목 추가
      postFavorite.mutate({
        memberId,
        categoryId,
      });
    }
  };

  return (
    <div className="w-[400px] bg-white flex flex-col h-[calc(100vh)] mb-30">
      <MarketSearchBar searchKeyword={searchKeyword} onSearchKeywordChange={setSearchKeyword} />
      <MarketTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="w-full bg-white flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="bg-white overflow-x-hidden">
          <MarketTableHeader
            activeTab={activeTab}
            activeSortTable={sortTable}
            activeSortPriceArray={sortPriceArray}
            onSortClick={handleSortClick}
          />
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0">
          {activeTab === 'holding' ? (
            sortedPortfolioAssets.length === 0 ? (
              <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr]">
                <div className="px-4 py-6 text-center text-primary-300- col-span-4 text-xs text-primary-500">
                  {!user ? '로그인하면 내 보유자산을 확인할 수 있습니다.' : '표시할 종목이 없습니다.'}
                </div>
              </div>
            ) : (
              sortedPortfolioAssets.map((asset) => (
                <MarketTableItem
                  key={asset.categoryId}
                  activeTab={activeTab}
                  portfolioAsset={asset}
                  isFavorite={isFavoriteCategory(asset.categoryId)}
                  onToggleFavorite={() => handleToggleFavorite(asset.categoryId)}
                />
              ))
            )
          ) : sortedCategories.length === 0 ? (
            <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr]">
              <div className="px-4 py-6 text-center text-primary-300- col-span-4 text-xs text-primary-500">
                {!user && activeTab === 'interest'
                  ? '로그인하면 내 관심코인을 확인할 수 있습니다.'
                  : '표시할 종목이 없습니다.'}
              </div>
            </div>
          ) : (
            sortedCategories.map((category) => (
              <MarketTableItem
                key={category.categoryId}
                activeTab={activeTab}
                category={category}
                isFavorite={isFavoriteCategory(category.categoryId)}
                onToggleFavorite={() => handleToggleFavorite(category.categoryId)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
