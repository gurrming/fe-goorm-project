import { useNavigate } from 'react-router-dom';
import AssetList from './AssetList';
import MyAsset from './MyAsset';
import useUserStore from '../../../../store/useUserStore';

const Asset = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-5 h-1/6">
      {user !== null ? (
        <div className="w-[500px] h-full">
          <MyAsset />
          <AssetList />
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-[500px] h-full ">
          <p className="flex-1 text-sm text-gray-500 text-center py-40">로그인 후 확인할 수 있습니다.</p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/signup')}
              className="flex flex-1 px-4 py-2 text-white bg-blue-800 rounded-[2px] text-[13px] items-center justify-center cursor-pointer"
            >
              <span>회원가입</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex flex-4 w-full px-4 py-2 text-white bg-blue-500 rounded-[2px] text-[13px] items-center justify-center cursor-pointer"
            >
              <span>로그인</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Asset;
