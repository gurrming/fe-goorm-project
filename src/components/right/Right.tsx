import { useState } from 'react';
import Asset from './contents/asset/Asset';
import OrderForm from './contents/order/OrderForm';
import Transaction from './contents/transaction/Transaction';
import Tab from './Tab';
import { usePostOrder } from '../../api/order/usePostOrder';
import { changeNumber } from '../../lib/price';
import useCategoryIdStore from '../../store/useCategoryId';
import useUserStore from '../../store/useUserStore';
import { useModal } from '../common/Modal/hooks/useModal';
import { Modal } from '../common/Modal/Modal';

const Right = () => {
  const [tab, setTab] = useState('buy');
  const [reset, setReset] = useState<number | null>(null);
  const { user } = useUserStore();
  const { categoryId } = useCategoryIdStore();
  const { openModal, closeModal } = useModal();
  const postOrderMutation = usePostOrder();

  const handleTab = (tab: string) => {
    setTab(tab);
  };

  const handleOrder = (price: string, quantity: string) => {
    if (!user) {
      openModal(
        <Modal
          title="주문 안내"
          description="로그인이 필요합니다."
          confirmButtonProps={{
            text: '확인',
            onClick: closeModal,
          }}
        />,
      );
      return;
    }

    const orderPrice = changeNumber(price);
    const orderCount = changeNumber(quantity);
    const isBuy = tab === 'buy';

    // 선택된 코인의 categoryId 사용
    if (!categoryId || categoryId === 0) {
      openModal(
        <Modal
          title="주문 안내"
          description="코인을 선택해주세요."
          confirmButtonProps={{
            text: '확인',
            onClick: closeModal,
          }}
        />,
      );
      return;
    }

    postOrderMutation.mutate(
      {
        memberId: user.id,
        categoryId,
        orderPrice,
        orderCount,
        orderType: isBuy ? 'BUY' : 'SELL',
      },
      {
        onSuccess: () => {
          // 주문 성공 시 OrderForm의 input 초기화한다.
          // 확실하게 값이 바뀌었다는 것을 알리기 위해 Date.now()를 사용한다. (성공 시점이 다르니깐 바로 실행)
          setReset(Date.now());
          openModal(
            <Modal
              title={isBuy ? '매수 주문 완료' : '매도 주문 완료'}
              description={isBuy ? '매수 주문이 완료되었습니다.' : '매도 주문이 완료되었습니다.'}
              confirmButtonProps={{
                text: '확인',
                onClick: closeModal,
              }}
            />,
          );
        },
        onError: (error) => {
          openModal(
            <Modal
              title="주문 실패"
              description={`주문 처리 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`}
              confirmButtonProps={{
                text: '확인',
                onClick: closeModal,
              }}
            />,
          );
        },
      },
    );
  };

  return (
    <div className="w-1/2 h-full bg-white flex flex-col gap-4">
      <Tab handleTab={handleTab} tab={tab} />
      {tab === 'buy' && <OrderForm orderType="buy" onOrder={handleOrder} reset={reset} />}
      {tab === 'sell' && <OrderForm orderType="sell" onOrder={handleOrder} reset={reset} />}
      {tab === 'asset' && <Asset />}
      {tab === 'transaction' && <Transaction />}
    </div>
  );
};

export default Right;
