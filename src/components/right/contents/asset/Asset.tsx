import AssetList from './AssetList';
import MyAsset from './MyAsset';

const Asset = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <MyAsset />
      <AssetList />
    </div>
  );
};

export default Asset;
