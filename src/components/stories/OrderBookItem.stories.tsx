import OrderBookItem from '../orderbook/OrderBookItem';

export default {
    title: 'OrderBookItem',
    component: OrderBookItem,
    argTypes: {
        item: { control: 'object' },
        isSell: { control: 'boolean' },
        maxVolume: { control: 'number' },
    },
}

export const SellItem = {
    name: '매도 아이템',
    args: {
        item: { orderPrice: 10000, totalRemainingCount: 10 },
        isSell: true,
        maxVolume: 100,
    },
}

export const BuyItem = {
    name: '매수 아이템',
    args: {
        item: { orderPrice: 10000, totalRemainingCount: 10 },
        isSell: false,
        maxVolume: 100,
    },
}