import Skeleton from 'react-loading-skeleton';
import { TransactionItem_Skeleton } from './TransactionItem_Skeleton';

export const Transaction_Skeleton = () => {
    return (
        <div className="flex flex-col gap-3">
            <Skeleton count={1} width={500} height={60} baseColor="#bbbbbb" highlightColor="#e0e0e0" duration={1} enableAnimation={true}/>
            <TransactionItem_Skeleton />
            <TransactionItem_Skeleton />
            <TransactionItem_Skeleton />
        </div>
    )
}