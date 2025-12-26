import AssetList from './assetList';
import MyAsset from './myAsset';

const Asset = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <MyAsset />
      <AssetList />
    </div>
  );
};

export default Asset;
