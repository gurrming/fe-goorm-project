import{j as r}from"./iframe-oUI-Itw7.js";import{f as t}from"./price-C8jZ1Iff.js";import"./preload-helper-PPVm8Dsz.js";const n=({item:e})=>r.jsxs("tr",{className:"border-b border-gray-200 hover:bg-gray-50",children:[r.jsxs("td",{className:"px-2 py-3 text-xs text-[#333333] text-center border-r border-gray-200 flex flex-col gap-1",children:[r.jsx("p",{className:"text-xs font-semibold",children:e.categoryName}),r.jsx("p",{className:"text-[10px] text-gray-500",children:e.symbol})]}),r.jsx("td",{className:"pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200",children:e.investCount}),r.jsx("td",{className:"pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200",children:t(e.avgPrice)}),r.jsx("td",{className:"pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200",children:t(e.buyAmount)}),r.jsx("td",{className:"pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200",children:t(e.evaluationAmount)}),r.jsx("td",{className:`pr-2 py-3 text-xs text-[#333333] text-right border-r border-gray-200 ${e.evaluationProfit&&e.evaluationProfit>0?"text-red-500":"text-blue-500"}`,children:t(e.evaluationProfit)})]});n.__docgenInfo={description:"",methods:[],displayName:"AssetItem",props:{item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  categoryId: number;
  avgPrice: number;
  categoryName: string;
  symbol: string;
  investCount: number;
  currentPrice: number;
  buyAmount: number;
  evaluationAmount: number;
  evaluationProfit: number;
  profitRate: number;
}`,signature:{properties:[{key:"categoryId",value:{name:"number",required:!0}},{key:"avgPrice",value:{name:"number",required:!0}},{key:"categoryName",value:{name:"string",required:!0}},{key:"symbol",value:{name:"string",required:!0}},{key:"investCount",value:{name:"number",required:!0}},{key:"currentPrice",value:{name:"number",required:!0}},{key:"buyAmount",value:{name:"number",required:!0}},{key:"evaluationAmount",value:{name:"number",required:!0}},{key:"evaluationProfit",value:{name:"number",required:!0}},{key:"profitRate",value:{name:"number",required:!0}}]}},description:""}}};const i={title:"AssetItem",component:n,parameters:{backgrounds:{default:"white"}},argTypes:{item:{control:"object"}}},a={name:"기본",args:{item:{categoryId:1,categoryName:"비트코인",symbol:"BTC",avgPrice:1e4,investCount:10,evaluationAmount:1e5,evaluationProfit:1e4,profitRate:10}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: '기본',
  args: {
    item: {
      categoryId: 1,
      categoryName: '비트코인',
      symbol: 'BTC',
      avgPrice: 10000,
      investCount: 10,
      evaluationAmount: 100000,
      evaluationProfit: 10000,
      profitRate: 10
    }
  }
}`,...a.parameters?.docs?.source}}};const m=["Default"];export{a as Default,m as __namedExportsOrder,i as default};
