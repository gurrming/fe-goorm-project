import { useEffect } from 'react';
import AssetList from './AssetList';
import MyAsset from './MyAsset';
import { useGetMyAsset } from '../../api/asset/useGetAsset';
import { useAssetStore } from '../../store/websocket/useAssetStore';

const Asset = () => {
  const { data: myAssetData } = useGetMyAsset();

  const { setMyAsset } = useAssetStore();

  useEffect(() => {
    if (myAssetData) {
      setMyAsset({
        assetCash: myAssetData.assetCash,
        totalAsset: myAssetData.totalAsset,
        assetCanOrder: myAssetData.assetCanOrder,
      });
    }
  }, [myAssetData, setMyAsset]);

  return (
    <div className="w-[1000px] flex flex-col gap-5">
      <MyAsset />
      <AssetList />
    </div>
  );
};

export default Asset;
