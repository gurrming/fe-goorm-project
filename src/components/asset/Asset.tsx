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

  const { setAssetCash, setTotalAsset, setSummary } = useAssetStore();

  useEffect(() => {
    if (myAssetData) {
      setAssetCash(myAssetData.assetCash);
      setTotalAsset(myAssetData.totalAsset);
    }
  }, [myAssetData, setAssetCash, setTotalAsset]);

  useEffect(() => {
    if (investData) {
      setSummary(investData);
    }
  }, [investData, setSummary]);
  return (
    <div className="w-full flex flex-col gap-5">
      <MyAsset />
      <AssetList />
    </div>
  );
};

export default Asset;
