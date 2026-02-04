import AssetItem from '../asset/AssetItem';

export default {
    title: 'AssetItem',
    component: AssetItem,
    parameters: {
        backgrounds: {
            default: 'white',
        },
    },
    argTypes: {
        item: { control: 'object' },
    },
}

export const Default = {
    name: '기본',
    args: {
        item: { categoryId: 1, categoryName: '비트코인', symbol: 'BTC', avgPrice: 10000, investCount: 10, evaluationAmount: 100000, evaluationProfit: 10000, profitRate: 10 },
    },
}