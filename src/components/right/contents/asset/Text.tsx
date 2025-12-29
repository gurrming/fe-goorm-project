const Text = ({
  text,
  price,
  minus,
  type,
}: {
  text: string;
  price: string;
  minus: boolean;
  type: 'number' | 'percentage';
}) => {
  return (
    <div className="flex w-full justify-center items-center">
      <p className="text-xs text-gray-500 ">{text}</p>
      <span className={`text-sm  flex-1 text-right ${minus ? 'text-[#0062DF]]' : 'text-[#333333]'}`}>{price}</span>
      <p className="text-xs text-gray-500 ml-1">{type === 'number' ? '원' : '%'}</p>
    </div>
  );
};

export default Text;
