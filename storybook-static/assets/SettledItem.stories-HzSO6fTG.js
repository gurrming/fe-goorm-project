import{j as e}from"./iframe-oUI-Itw7.js";import"./preload-helper-PPVm8Dsz.js";const d=({item:r})=>{const n=new Date(r.tradeTime);n.setHours(n.getHours());const s=n.toLocaleString("ko-KR",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});return e.jsxs("tr",{className:"border-b border-gray-200 hover:bg-gray-50",children:[e.jsx("td",{className:"px-4 py-3 text-xs text-[#333333] border-r border-gray-200",children:s}),e.jsx("td",{className:"px-4 py-3 text-xs text-center  border-r border-gray-200",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("span",{children:r.symbol}),e.jsx("span",{className:`${r.myOrderType==="SELL"?"text-[#0062DF]":"text-[#DD3C44]"}`,children:r.myOrderType==="SELL"?"매도":"매수"})]})}),e.jsx("td",{className:"px-4 py-3 text-xs text-[#333333] border-r border-gray-200",children:e.jsx("div",{className:"flex flex-col gap-1",children:e.jsx("span",{className:"text-right",children:r.tradePrice.toLocaleString("ko-KR")})})}),e.jsx("td",{className:"px-4 py-3 text-xs text-[#333333] text-right",children:r.tradeCount.toLocaleString("ko-KR",{minimumFractionDigits:2,maximumFractionDigits:8})})]},r.tradeId)};d.__docgenInfo={description:"",methods:[],displayName:"SettledItem",props:{item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  tradeId: number;
  tradeTime: string;
  tradePrice: number;
  tradeCount: number;
  tradeClosePrice: number;
  buyOrderId: number;
  sellOrderId: number;
  takerType: string;
  myOrderType: string;
  symbol: string;
}`,signature:{properties:[{key:"tradeId",value:{name:"number",required:!0}},{key:"tradeTime",value:{name:"string",required:!0}},{key:"tradePrice",value:{name:"number",required:!0}},{key:"tradeCount",value:{name:"number",required:!0}},{key:"tradeClosePrice",value:{name:"number",required:!0}},{key:"buyOrderId",value:{name:"number",required:!0}},{key:"sellOrderId",value:{name:"number",required:!0}},{key:"takerType",value:{name:"string",required:!0}},{key:"myOrderType",value:{name:"string",required:!0}},{key:"symbol",value:{name:"string",required:!0}}]}},description:""}}};const o={title:"SettledItem",component:d,argTypes:{item:{control:"object"}}},t={name:"매도 아이템",args:{item:{tradeId:1,tradeTime:"2024-01-01T12:00:00",tradePrice:1e4,tradeCount:10,myOrderType:"SELL",symbol:"BTC",buyOrderId:1,sellOrderId:1,takerType:"BUY"}}},a={name:"매수 아이템",args:{item:{tradeId:1,tradeTime:"2024-01-01T12:00:00",tradePrice:1e4,tradeCount:10,myOrderType:"BUY",symbol:"BTC",buyOrderId:1,sellOrderId:1,takerType:"SELL"}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: '매도 아이템',
  args: {
    item: {
      tradeId: 1,
      tradeTime: '2024-01-01T12:00:00',
      tradePrice: 10000,
      tradeCount: 10,
      myOrderType: 'SELL',
      symbol: 'BTC',
      buyOrderId: 1,
      sellOrderId: 1,
      takerType: 'BUY'
    }
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: '매수 아이템',
  args: {
    item: {
      tradeId: 1,
      tradeTime: '2024-01-01T12:00:00',
      tradePrice: 10000,
      tradeCount: 10,
      myOrderType: 'BUY',
      symbol: 'BTC',
      buyOrderId: 1,
      sellOrderId: 1,
      takerType: 'SELL'
    }
  }
}`,...a.parameters?.docs?.source}}};const u=["SellItem","BuyItem"];export{a as BuyItem,t as SellItem,u as __namedExportsOrder,o as default};
