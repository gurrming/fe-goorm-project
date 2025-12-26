import AssetList from './assetList';
import MyAsset from './myAsset';

const Asset = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <MyAsset />
      <AssetList />
    </div>
  );
};

export default Asset;
