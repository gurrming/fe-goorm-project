import UnSettledItem from '../right/contents/transaction/UnSettledItem';


export default {
    title: 'UnSettledItem',
    component: UnSettledItem,
    parameters: {
        backgrounds: {
            default: 'white',
        },
    },
    argTypes: {
        item: { control: 'object' },
    },
}

export const BuyItem = {
    name: '매수 아이템',
    args: {
        item: { orderId: 1, orderTime: '2024-01-01T12:00:00', orderPrice: 10000, orderCount: 10, remainingCount: 10, orderType: 'BUY' },
    },
}

export const SellItem = {
    name: '매도 아이템',
    args: {
        item: { orderId: 1, orderTime: '2024-01-01T12:00:00', orderPrice: 10000, orderCount: 10, remainingCount: 10, orderType: 'SELL' },
    },
}