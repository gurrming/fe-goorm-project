import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Chart_Skeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton count={1} width={1000} height={450} baseColor="#ffffff" highlightColor="#efefef" />
    </div>
  );
};
