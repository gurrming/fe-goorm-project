import { useState, useEffect } from 'react';
import OrderFormButtons from './OrderFormButtons';
import { useGetMyAsset } from '../../../../api/asset/useGetAsset';
import { useGetCategories } from '../../../../api/useGetCategories';
import { useGetInvest } from '../../../../api/useGetInvest';
import { changeNumber, dotQuantity, formatNumber, getPriceTickSize } from '../../../../lib/price';
import useCategoryIdStore from '../../../../store/useCategoryId';
import useUserStore from '../../../../store/useUserStore';
import { useModal } from '../../../common/Modal/hooks/useModal';
import { Modal } from '../../../common/Modal/Modal';
import type { TAssets } from '../../../../types/asset';

type OrderType = 'buy' | 'sell';

type OrderFormProps = {
  orderType: OrderType;
  onOrder: (price: string, quantity: string) => void;
  reset?: number | null;
};

const OrderForm = ({ orderType, onOrder, reset }: OrderFormProps) => {
  const isBuy = orderType === 'buy';
  const { openModal, closeModal } = useModal();
  const user = useUserStore((state) => state.user);
  const memberId = user?.id;
  // 서버에서 데이터 가져오기
  const { data: myAsset } = useGetMyAsset();
  const { data: portfolio } = useGetInvest(memberId!);
  const { data: categories } = useGetCategories();
  const { categoryId } = useCategoryIdStore();

  const selectedCategory = categories?.find((item) => item.categoryId === categoryId);
  const holdingAsset = portfolio?.assetList?.find((asset: TAssets) => asset.categoryId === categoryId);

  const selectedSymbol = selectedCategory?.symbol;
  const buyAvailableCash = myAsset?.assetCash ?? 0;
  const sellAvailableQuantity = holdingAsset?.investCount ?? 0;

  // 현재 가격 (추후 선택된 코인의 현재 가격으로 변경 필요)
  const initialPrice = 0;

  const [price, setPrice] = useState<string>(initialPrice > 0 ? formatNumber(initialPrice) : '');
  const [quantity, setQuantity] = useState<string>('');
  const [userTotalAmount, setUserTotalAmount] = useState<string>(''); // 사용자가 직접 입력한 주문 총액

  // initialPrice가 변경되면 price 상태 업데이트
  useEffect(() => {
    if (initialPrice > 0) {
      setPrice(formatNumber(initialPrice));
    }
  }, [initialPrice]);

  const changedPriceNum = changeNumber(price);
  const quantityNum = changeNumber(quantity);

  // 서버에 전송하기 위한 숫자로 변환된 총액 값
  const totalAmountValue = userTotalAmount ? changeNumber(userTotalAmount) : changedPriceNum * quantityNum;
  // 사용자가 입력한 총액 값을 표시하기 위해 문자열 상태인 총액 값
  const totalAmountDisplay = totalAmountValue ? formatNumber(totalAmountValue) : '';

  const priceUpDown = (clickType: 'up' | 'down') => {
    // 숫자값으로 변환한 값을 가지고 + / - 테이블에 맞게 계산하기 위해 getPriceTickSize 함수 사용
    const step = getPriceTickSize(changedPriceNum);
    const newPrice = clickType === 'up' ? changedPriceNum + step : changedPriceNum - step;
    setPrice(formatNumber(newPrice));
    setUserTotalAmount('');
  };

  // 사용자가 가격 / 수량 변경 시에
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(formatNumber(changeNumber(e.target.value.replace(/[^0-9]/g, ''))));
    setUserTotalAmount(''); // 가격 변경 시 사용자 입력값 초기화, 계산값으로 전환
  };

  // 주문 수량 변경 시
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.'); // 숫자마다 .으로 구분해서 배열에 저장

    // 배열로 저장된 구분된 숫자 값이 2개 이상인 경우, 첫번째 값과 뒤에 오는 나머지 값을 합쳐서 하나의 숫자로 변환 0.234
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    // 배열에 저장된 구분된 숫자 값이 2개이고 두번째 값의 길이가 8자리 이상인 경우, 첫번째 값과 두번째 값의 첫 8자리를 합쳐서 하나의 숫자로 변환 0.23456789
    if (parts.length === 2 && parts[1].length > 8) value = parts[0] + '.' + parts[1].substring(0, 8);

    setQuantity(value);
    setUserTotalAmount(''); // 주문 수량 변경 시 사용자 입력값 초기화하여 계산값 표시
  };

  // 주문 총액 입력 시 주문수량 계산하기
  const handleTotalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setUserTotalAmount(value);
    setQuantity(value && changedPriceNum > 0 ? dotQuantity(changeNumber(value) / changedPriceNum) : '');
  };

  const handleReset = () => {
    setPrice(initialPrice > 0 ? formatNumber(initialPrice) : '');
    setQuantity('');
    setUserTotalAmount('');
  };

  // 주문 넣는 행동 자체를 성공 또는 실패 시 초기화
  useEffect(() => {
    if (reset == null) return;
    handleReset();
  }, [reset]);

  const handleOrder = () => {
    // 주문 수량이 비워져있을 때
    if (!quantity || quantity.trim() === '' || quantityNum === 0) {
      openModal(
        <Modal
          title={isBuy ? '매수 주문 안내' : '매도 주문 안내'}
          description={isBuy ? '매수 수량을 확인해 주세요.' : '매도 수량을 확인해 주세요.'}
          confirmButtonProps={{
            text: '확인',
            onClick: closeModal,
          }}
        />,
      );
      return;
    }

    // 주문 총액이 5000미만일 때
    if (totalAmountValue < 5000) {
      openModal(
        <Modal
          title={isBuy ? '매수 주문 안내' : '매도 주문 안내'}
          description="주문 가능한 최소금액은 5,000 KRW 입니다."
          confirmButtonProps={{
            text: '확인',
            onClick: closeModal,
          }}
        />,
      );
      return;
    }

    // 주문 가능 금액이 부족할 때 (매수일 시)
    if (isBuy && totalAmountValue > buyAvailableCash) {
      openModal(
        <Modal
          title="매수 주문 안내"
          description="주문 가능 금액이 부족합니다."
          confirmButtonProps={{
            text: '확인',
            onClick: closeModal,
          }}
        />,
      );
      return;
    }

    // 주문 가능 수량이 부족할 때 (매도일 시)
    if (!isBuy && quantityNum > sellAvailableQuantity) {
      openModal(
        <Modal
          title="매도 주문 안내"
          description="매도 수량을 확인해 주세요."
          confirmButtonProps={{
            text: '확인',
            onClick: closeModal,
          }}
        />,
      );
      return;
    }

    onOrder(price, quantity);
  };

  const buttonColorType = isBuy ? 'red' : 'blue';
  const priceLabel = isBuy ? '매수가격' : '매도가격';
  const orderButtonText = isBuy ? '매수' : '매도';

  return (
    <div className="flex flex-col gap-4 px-4 pb-4 min-w-[500px]">
      <div className="flex items-center justify-between py-2 text-[13px] text-primary-100 ">
        <span>주문유형</span>
        <span>지정가</span>
      </div>

      <div className="flex items-center justify-between py-2 text-[13px] text-primary-100 ">
        <span>주문가능</span>
        <span className="text-sm font-semibold">
          {isBuy ? formatNumber(buyAvailableCash) : formatNumber(sellAvailableQuantity)}
          <span className="text-primary-300 text-[10px] ml-1 font-medium">{isBuy ? 'KRW' : selectedSymbol}</span>
        </span>
      </div>

      {/* 매수 가격 */}
      <div className="flex items-center justify-between py-2 text-[13px] text-primary-100">
        <span className="flex items-center">
          {priceLabel} <span className="text-primary-500 text-[10px] ml-1">(KRW)</span>
        </span>
        <div className="flex items-center border border-gray-300 rounded-[2px]">
          <input
            value={price}
            onChange={handlePriceChange}
            className="w-73 px-2 py-1 text-[13px] text-right border-0 rounded-[2px]-l"
          />
          <div className="flex border-l border-gray-300 cursor-pointer">
            <button
              onClick={() => priceUpDown('down')}
              className="w-8 h-8 text-[13px] text-primary-300 bg-white hover:bg-gray-100 border-0 border-r border-gray-300 flex items-center justify-center"
            >
              −
            </button>
            <button
              onClick={() => priceUpDown('up')}
              className="w-8 h-8 text-[13px] text-primary-300 bg-white hover:bg-gray-100 border-0 rounded-r flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 주문 수량 */}
      <div className="flex items-center justify-between py-2 text-[13px] text-primary-100">
        <span className="flex items-center">
          주문수량 <span className="text-primary-500 text-[10px] ml-1">({selectedSymbol})</span>
        </span>
        <input
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="0"
          className="w-90 px-2 py-2 text-[13px] text-right border border-gray-300 rounded-[2px]"
        />
      </div>

      {/* 주문 총액 */}
      <div className="flex items-center justify-between py-2 text-[13px] text-primary-100">
        <span className="flex items-center">
          주문총액 <span className="text-primary-500 text-[10px] ml-1">(KRW)</span>
        </span>
        <input
          value={totalAmountDisplay}
          onChange={handleTotalAmountChange}
          placeholder="0"
          className="w-90 px-2 py-2 text-[13px] text-right border border-gray-300 rounded-[2px]"
        />
      </div>

      {/* 하단 버튼 */}
      <OrderFormButtons
        onReset={handleReset}
        onOrder={handleOrder}
        buttonColorType={buttonColorType}
        orderButtonText={orderButtonText}
      />
    </div>
  );
};

export default OrderForm;
