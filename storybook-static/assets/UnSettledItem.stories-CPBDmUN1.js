import{S as y,s as x,l as c,m as b,h as m,u as l,r as i,n as v,k as C,j as s}from"./iframe-oUI-Itw7.js";import{r as S}from"./axiosInstance-wK0ylcKC.js";import"./preload-helper-PPVm8Dsz.js";var f=class extends y{#t;#s=void 0;#e;#r;constructor(e,t){super(),this.#t=e,this.setOptions(t),this.bindMethods(),this.#n()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){const t=this.options;this.options=this.#t.defaultMutationOptions(e),x(this.options,t)||this.#t.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#e,observer:this}),t?.mutationKey&&this.options.mutationKey&&c(t.mutationKey)!==c(this.options.mutationKey)?this.reset():this.#e?.state.status==="pending"&&this.#e.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#e?.removeObserver(this)}onMutationUpdate(e){this.#n(),this.#o(e)}getCurrentResult(){return this.#s}reset(){this.#e?.removeObserver(this),this.#e=void 0,this.#n(),this.#o()}mutate(e,t){return this.#r=t,this.#e?.removeObserver(this),this.#e=this.#t.getMutationCache().build(this.#t,this.options),this.#e.addObserver(this),this.#e.execute(e)}#n(){const e=this.#e?.state??b();this.#s={...e,isPending:e.status==="pending",isSuccess:e.status==="success",isError:e.status==="error",isIdle:e.status==="idle",mutate:this.mutate,reset:this.reset}}#o(e){m.batch(()=>{if(this.#r&&this.hasListeners()){const t=this.#s.variables,n=this.#s.context,r={client:this.#t,meta:this.options.meta,mutationKey:this.options.mutationKey};e?.type==="success"?(this.#r.onSuccess?.(e.data,t,n,r),this.#r.onSettled?.(e.data,null,t,n,r)):e?.type==="error"&&(this.#r.onError?.(e.error,t,n,r),this.#r.onSettled?.(void 0,e.error,t,n,r))}this.listeners.forEach(t=>{t(this.#s)})})}};function T(e,t){const n=l(),[r]=i.useState(()=>new f(n,e));i.useEffect(()=>{r.setOptions(e)},[r,e]);const o=i.useSyncExternalStore(i.useCallback(d=>r.subscribe(m.batchCalls(d)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),p=i.useCallback((d,g)=>{r.mutate(d,g).catch(v)},[r]);if(o.error&&C(r.options.throwOnError,[o.error]))throw o.error;return{...o,mutate:p,mutateAsync:o.mutate}}const I=e=>S({method:"PATCH",url:`/api/orders/${e}/cancel`}),k=()=>{const e=l();return T({mutationFn:({orderId:t})=>I(t),onSuccess:()=>{e.invalidateQueries({queryKey:["unsettled"]})},onError:t=>{console.error("주문 취소 실패 : ",t)}})},h=({item:e})=>{const{mutate:t}=k(),n=new Date(e.orderTime);n.setHours(n.getHours());const r=n.toLocaleString("ko-KR",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});return s.jsxs("tr",{className:"border-b border-gray-200 hover:bg-gray-50",children:[s.jsx("td",{className:"px-4 py-3 text-xs text-[#333333] border-r border-gray-200",children:r}),s.jsx("td",{className:"px-4 py-3 text-xs text-center text-nowrap border-r border-gray-200",children:s.jsxs("div",{className:"flex flex-col",children:[s.jsx("span",{className:"text-center text-bold ",children:e.symbol}),s.jsx("span",{className:`text-[11px] font-normal mt-1 ${e.orderType==="BUY"?"text-[#DD3C44]":"text-[#0062DF]"}`,children:e.orderType==="BUY"?"매수":"매도"})]})}),s.jsx("td",{className:"px-4 py-3 text-xs text-[#333333] border-r border-gray-200",children:e.orderPrice.toLocaleString("ko-KR")}),s.jsx("td",{className:"px-4 py-3 text-xs text-[#333333] text-right border-r border-gray-200",children:s.jsxs("div",{className:"flex flex-col gap-1",children:[s.jsx("span",{className:"text-right",children:e.orderCount.toLocaleString("ko-KR",{minimumFractionDigits:2,maximumFractionDigits:8})}),s.jsx("span",{className:"text-right",children:e.remainingCount.toLocaleString("ko-KR",{minimumFractionDigits:2,maximumFractionDigits:8})})]})}),s.jsx("td",{className:"px-4 py-3 text-xs text-[#333333] text-right",children:s.jsx("button",{onClick:()=>{t({orderId:e.orderId})},className:"text-xs text-[#333333] text-nowrap border border-gray-200 rounded-sm px-2 py-1 hover:cursor-pointer",children:"주문취소"})})]},e.orderId)};h.__docgenInfo={description:"",methods:[],displayName:"UnSettledItem",props:{item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  orderId: number;
  categoryId: number;
  symbol: string;
  categoryName: string;
  orderType: string;
  orderStatus: string;
  orderPrice: number;
  orderCount: number;
  remainingCount: number;
  executedCount: number;
  totalAmount: number;
  orderTime: string;
}`,signature:{properties:[{key:"orderId",value:{name:"number",required:!0}},{key:"categoryId",value:{name:"number",required:!0}},{key:"symbol",value:{name:"string",required:!0}},{key:"categoryName",value:{name:"string",required:!0}},{key:"orderType",value:{name:"string",required:!0}},{key:"orderStatus",value:{name:"string",required:!0}},{key:"orderPrice",value:{name:"number",required:!0}},{key:"orderCount",value:{name:"number",required:!0}},{key:"remainingCount",value:{name:"number",required:!0}},{key:"executedCount",value:{name:"number",required:!0}},{key:"totalAmount",value:{name:"number",required:!0}},{key:"orderTime",value:{name:"string",required:!0}}]}},description:""}}};const O={title:"UnSettledItem",component:h,parameters:{backgrounds:{default:"white"}},argTypes:{item:{control:"object"}}},a={name:"매수 아이템",args:{item:{orderId:1,orderTime:"2024-01-01T12:00:00",orderPrice:1e4,orderCount:10,remainingCount:10,orderType:"BUY"}}},u={name:"매도 아이템",args:{item:{orderId:1,orderTime:"2024-01-01T12:00:00",orderPrice:1e4,orderCount:10,remainingCount:10,orderType:"SELL"}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: '매수 아이템',
  args: {
    item: {
      orderId: 1,
      orderTime: '2024-01-01T12:00:00',
      orderPrice: 10000,
      orderCount: 10,
      remainingCount: 10,
      orderType: 'BUY'
    }
  }
}`,...a.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: '매도 아이템',
  args: {
    item: {
      orderId: 1,
      orderTime: '2024-01-01T12:00:00',
      orderPrice: 10000,
      orderCount: 10,
      remainingCount: 10,
      orderType: 'SELL'
    }
  }
}`,...u.parameters?.docs?.source}}};const E=["BuyItem","SellItem"];export{a as BuyItem,u as SellItem,E as __namedExportsOrder,O as default};
