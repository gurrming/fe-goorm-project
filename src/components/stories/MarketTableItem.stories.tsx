import MarketTableItem from '../market/MarketTableItem';

export default {
    title: 'MarketTableItem',
    component: MarketTableItem,
    argTypes: {
        activeTab: { control: 'select' },
        category: { control: 'object' },
        portfolioAsset: { control: 'object' },
        isFavorite: { control: 'boolean' },
        onToggleFavorite: { action: 'toggleFavorite' },
    },
}

export const Default = {
    name: '기본',
    args: {
        activeTab: 'krw',
        category: { categoryId: 1, categoryName: '비트코인', symbol: 'BTC' },
        portfolioAsset: { categoryId: 1, categoryName: '비트코인', symbol: 'BTC', avgPrice: 10000, investCount: 10, evaluationAmount: 100000, evaluationProfit: 10000, profitRate: 10 },
        isFavorite: false,
        onToggleFavorite: () => {},
    },
}

export const Favorite = {
    name: '관심 종목',
    args: {
        activeTab: 'krw',
        category: { categoryId: 1, categoryName: '비트코인', symbol: 'BTC' },
        portfolioAsset: { categoryId: 1, categoryName: '비트코인', symbol: 'BTC', avgPrice: 10000, investCount: 10, evaluationAmount: 100000, evaluationProfit: 10000, profitRate: 10 },
        isFavorite: true,
        onToggleFavorite: () => {},
    },
}

export const Holding = {
    name: '보유 종목',
    args: {
        activeTab: 'holding',
        category: { categoryId: 1, categoryName: '비트코인', symbol: 'BTC' },
        portfolioAsset: { categoryId: 1, categoryName: '비트코인', symbol: 'BTC', avgPrice: 10000, investCount: 10, evaluationAmount: 100000, evaluationProfit: 10000, profitRate: 10 },
        isFavorite: false,
        onToggleFavorite: () => {},
    },
}

