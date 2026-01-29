import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../../store/useUserStore';
import Button from '../../../common/Button';

type OrderFormButtonsProps = {
  onReset: () => void;
  onOrder: () => void;
  buttonColorType: 'red' | 'blue';
  orderButtonText: string;
};

const OrderFormButtons = ({ onReset, onOrder, buttonColorType, orderButtonText }: OrderFormButtonsProps) => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  return (
    <div className="flex gap-2 mt-4">
      {user ? (
        <>
          <button
            onClick={onReset}
            className="flex flex-1 px-4 py-2 text-white bg-gray-400 rounded-[2px] text-[13px] items-center justify-center gap-1 cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRotateRight} />
            <span>초기화</span>
          </button>
          <Button colorType={buttonColorType} onClick={onOrder} className="flex-4 w-full rounded-[2px] text-[13px]">
            {orderButtonText}
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default OrderFormButtons;
