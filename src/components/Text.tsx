import React from 'react';

/**
 *
 * Text Component
 *
 * @example
 * <Text size="sm" text="보유잔액" price="100,000,000" minus={false} type="원" />
 *
 * @param size: 'xs' | 'sm'
 * @param text: string
 * @param price: string
 * @param minus: boolean
 * @param type: string
 * @returns
 */

const Text = ({
  size,
  text,
  price,
  minus,
  type,
}: {
  size: 'xs' | 'sm';
  text: string;
  price: string;
  minus: boolean;
  type?: string;
}) => {
  return (
    <div className="flex w-full justify-center items-center">
      <p className="text-xs text-gray-500 ">{text}</p>
      <span className={`text-${size}  flex-1 text-right ${minus ? 'text-[#0062DF]]' : 'text-[#333333]'}`}>{price}</span>
      <p className={`text-xs text-gray-500 ml-1`}>{type}</p>
    </div>
  );
};

export default Text;
