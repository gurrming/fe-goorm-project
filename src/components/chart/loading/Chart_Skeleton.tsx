import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Chart_Skeleton = () => {
    return (
        <div className="flex flex-col">
            <Skeleton count={1} width={1000} height={120} baseColor="#f0f0f0" highlightColor="#e0e0e0" duration={1} enableAnimation={true}/>
            <Skeleton count={1} width={1000} height={450} baseColor="#e0e0e0" highlightColor="#e0e0e0" duration={1} enableAnimation={true}/>
        </div>
    )
}