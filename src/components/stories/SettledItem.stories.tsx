import SettledItem from '../right/contents/transaction/SettledItem';

export default {
    title: 'SettledItem',
    component: SettledItem,
    argTypes: {
        item: { control: 'object' },
    },
}

export const SellItem = {
    name: '매도 아이템',
    args: {
        item: { tradeId: 1, tradeTime: '2024-01-01T12:00:00', tradePrice: 10000, tradeCount: 10, myOrderType: 'SELL', symbol: 'BTC', buyOrderId: 1, sellOrderId: 1, takerType: 'BUY' },
    },
}

export const BuyItem = {
    name: '매수 아이템',
    args: {
        item: { tradeId: 1, tradeTime: '2024-01-01T12:00:00', tradePrice: 10000, tradeCount: 10, myOrderType: 'BUY', symbol: 'BTC', buyOrderId: 1, sellOrderId: 1, takerType: 'SELL' },
    },
}