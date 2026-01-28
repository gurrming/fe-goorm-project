import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Chat_Skeleton = ({ width}: { width: number}) => {
    return (
        <div className="flex flex-col gap-1 mb-3">
            <Skeleton count={1} width={70} height={15} borderRadius={5} />
            <Skeleton count={1} width={width} height={35} borderRadius={5} />
        </div>
    )
}