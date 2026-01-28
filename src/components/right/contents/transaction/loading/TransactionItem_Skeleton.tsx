import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const TransactionItem_Skeleton = () => {
    return (
        <div className="flex gap-1">
            <Skeleton count={1} width={500} height={30} borderRadius={5} baseColor="#f0f0f0" highlightColor="#e0e0e0" duration={1} enableAnimation={true}/>
        </div>
    )
}