import axios from 'axios';

const baseUrl = 'https://api.upbit.com/v1/candles/days';
const options = { method: 'GET', headers: { accept: 'application/json' } };

const getUpBit = async (market: string, count: number) => {
  const response = await axios.get(`${baseUrl}?market=${market}&count=${count}`, options);
  return response.data;
};

export default getUpBit;
