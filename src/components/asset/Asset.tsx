import { useEffect } from 'react';
import AssetList from './AssetList';
import MyAsset from './MyAsset';
import { useGetMyAsset } from '../../api/asset/useGetAsset';
import { useGetInvest } from '../../api/useGetInvest';
import useUserStore from '../../store/useUserStore';
import { useAssetStore } from '../../store/websocket/useAssetStore';

const Asset = () => {
  const { user } = useUserStore();
  const memberId = user?.id;
  const { data: investData } = useGetInvest(memberId!);
  const { data: myAssetData } = useGetMyAsset();

  const { setMyAsset, setSummary } = useAssetStore();

  useEffect(() => {
    if (myAssetData) {
      setMyAsset({ assetCash: myAssetData.assetCash, totalAsset: myAssetData.totalAsset, assetCanOrder: myAssetData.assetCanOrder });
    }
  }, [myAssetData, setMyAsset]);

  useEffect(() => {
    if (investData) {
      setSummary(investData);
    }
  }, [investData, setSummary]);
  return (
    <div className="w-[1000px] flex flex-col gap-5">
      <MyAsset />
      <AssetList />
    </div>
  );
};

export default Asset;
