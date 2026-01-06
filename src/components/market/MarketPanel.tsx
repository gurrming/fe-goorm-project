import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarketSearchBar from './MarketSearchBar';
import MarketTableHeader from './MarketTableHeader';
import MarketTableItem from './MarketTableItem';
import MarketTabs from './MarketTabs';
import { useDeleteFavorite } from '../../api/favorite/useDeleteFavorite';
import { useGetFavorite } from '../../api/favorite/useGetFavorite';
import { usePostFavorite } from '../../api/favorite/usePostFavorite';
import { useGetMarketItems } from '../../api/useGetMarketItems';
import { useGetPortfolio } from '../../api/useGetPortfolio';
import useUserStore from '../../store/useUserStore';
import { useModal } from '../common/Modal/hooks/useModal';
import { Modal } from '../common/Modal/Modal';
import type { TabKey, SortTable, SortPriceArray, Category, PortfolioAsset } from '../../types/market';

function getNextSortOrder(current: SortPriceArray): SortPriceArray {
  if (current === 'none') return 'descending';
  if (current === 'descending') return 'ascending';
  return 'none';
}

export default function MarketPanel() {
  const { user } = useUserStore();
  const memberId = user?.id;
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState<TabKey>('krw');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortTable, setSortTable] = useState<SortTable>('lastPrice');
  const [sortPriceArray, setSortPriceArray] = useState<SortPriceArray>('none');

  // 마켓 데이터 조회
  const { data: categories } = useGetMarketItems();

<<<<<<< Updated upstream
  // 포트폴리오 - 보유 데이터 조회
  const { data: portfolio } = useGetPortfolio();

=======
  // 포트폴리오 - 보유 데이터
  const { data: portfolio } = useGetPortfolio();
>>>>>>> Stashed changes
  // 관심 종목 목록 조회
  const { data: Interest } = useGetFavorite(memberId ?? null);
  const postFavorite = usePostFavorite();
  const deleteFavorite = useDeleteFavorite();

  const isFavoriteCategory = (categoryId: number) =>
    Interest?.some((interest) => interest.categoryId === categoryId) || false;

  // Category 배열 그대로 사용 (lastPrice, changeRate, tradeAmount는 다른 API에서 받아와서 병합 예정)
  const categoryList: Category[] = Array.isArray(categories) ? categories : [];

  // 탭별 필터링
  let filteredCategories: Category[] = [];
  let portfolioAssets: PortfolioAsset[] = [];

  if (activeTab === 'krw') {
    filteredCategories = categoryList;
  } else if (activeTab === 'interest') {
    filteredCategories = categoryList.filter((category) => isFavoriteCategory(category.categoryId));
  } else if (activeTab === 'holding') {
    // 보유 탭일 때 포트폴리오 데이터 사용
    portfolioAssets = portfolio?.assets || [];
  }

  // 검색 필터
  const keyword = searchKeyword.trim().toLowerCase();
  const searchFilteredCategories = keyword
    ? filteredCategories.filter(
        (category) =>
          category.categorySymbol.toLowerCase().includes(keyword) ||
          category.categoryName.toLowerCase().includes(keyword),
      )
    : filteredCategories;

  const searchFilteredPortfolioAssets = keyword
    ? portfolioAssets.filter(
        (asset) =>
          asset.categorySymbol.toLowerCase().includes(keyword) || asset.categoryName.toLowerCase().includes(keyword),
      )
    : portfolioAssets;

  // 정렬
  const sortedCategories = searchFilteredCategories;
  let sortedPortfolioAssets = searchFilteredPortfolioAssets;

  if (activeTab === 'holding') {
    // 보유 탭 정렬
    sortedPortfolioAssets = [...searchFilteredPortfolioAssets].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortTable) {
        case 'evaluateAmount':
          aValue = a.evaluateAmount;
          bValue = b.evaluateAmount;
          break;
        case 'avgBuyPrice':
          aValue = a.avgBuyPrice;
          bValue = b.avgBuyPrice;
          break;
        case 'profitRate':
          aValue = a.profitRate ?? 0;
          bValue = b.profitRate ?? 0;
          break;
        default:
          return 0;
      }

      if (sortPriceArray === 'ascending') {
        return aValue - bValue;
      } else if (sortPriceArray === 'descending') {
        return bValue - aValue;
      }
      return 0;
    });
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
    <div className="w-[400px] bg-white flex flex-col h-[calc(100vh-120px)]">
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
        <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0" style={{ height: 0 }}>
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
