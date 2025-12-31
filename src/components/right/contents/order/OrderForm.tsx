import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { changeNumber, dotQuantity, formatNumber, getPriceTickSize } from '../../../../lib/price';
import Button from '../../../common/Button';
import type { BuyOrderInitialData, SellOrderInitialData } from './types';

type OrderType = 'buy' | 'sell';

type OrderFormProps = {
  orderType: OrderType;
  initialData: BuyOrderInitialData | SellOrderInitialData;
  onOrder: (price: string, quantity: string, totalAmount: number) => void;
};

const OrderForm = ({ orderType, initialData, onOrder }: OrderFormProps) => {
  const isBuy = orderType === 'buy';
  const data = initialData as BuyOrderInitialData | SellOrderInitialData;

  const initialPrice = data.currentPrice ?? 0;

  const [price, setPrice] = useState<string>(formatNumber(initialPrice));
  const [quantity, setQuantity] = useState<string>('');
  const [userTotalAmount, setUserTotalAmount] = useState<string>(''); // 사용자가 직접 입력한 주문 총액

  const availableAmount = isBuy
    ? (data as BuyOrderInitialData).availableBalance
    : (data as SellOrderInitialData).availableQuantity;

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
    setPrice(formatNumber(initialPrice));
    setQuantity('');
    setUserTotalAmount('');
  };

  const handleOrder = () => {
    onOrder(price, quantity, totalAmountValue);
  };

  const buttonColorType = isBuy ? 'red' : 'blue';
  const priceLabel = isBuy ? '매수가격' : '매도가격';
  const orderButtonText = isBuy ? '매수' : '매도';

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <div className="flex items-center justify-between py-2 text-[13px] text-primary-100 ">
        <span>주문유형</span>
        <span>지정가</span>
      </div>

      <div className="flex items-center justify-between py-2 text-[13px] text-primary-100 ">
        <span>주문가능</span>
        <span className="text-sm font-semibold">
          {formatNumber(availableAmount ?? 0)}
          <span className="text-primary-300 text-[10px] ml-1 font-medium">{isBuy ? 'KRW' : data.symbol}</span>
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
            className="w-80 px-2 py-1 text-[13px] text-right border-0 rounded-[2px]-l"
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
          주문수량 <span className="text-primary-500 text-[10px] ml-1">({data.symbol})</span>
        </span>
        <input
          value={quantity}
          onChange={handleQuantityChange}
          placeholder="0"
          className="w-96 px-2 py-2 text-[13px] text-right border border-gray-300 rounded-[2px]"
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
          className="w-96 px-2 py-2 text-[13px] text-right border border-gray-300 rounded-[2px]"
        />
      </div>

      {/* 초기화, 매도/매수 버튼 */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleReset}
          className="flex flex-1 px-4 py-2 text-white bg-gray-400 rounded-[2px] text-[13px] items-center justify-center gap-1 cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowRotateRight} />
          <span>초기화</span>
        </button>
        <Button colorType={buttonColorType} onClick={handleOrder} className="flex-4 w-full rounded-[2px] text-[13px]">
          {orderButtonText}
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
