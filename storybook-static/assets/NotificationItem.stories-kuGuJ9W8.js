var l={exports:{}},r={};var m;function g(){if(m)return r;m=1;var e=Symbol.for("react.transitional.element"),s=Symbol.for("react.fragment");function o(c,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var d in t)d!=="key"&&(n[d]=t[d])}else n=t;return t=n.ref,{$$typeof:e,type:c,key:i,ref:t!==void 0?t:null,props:n}}return r.Fragment=s,r.jsx=o,r.jsxs=o,r}var p;function y(){return p||(p=1,l.exports=g()),l.exports}var a=y();const T=e=>{const c=(new Date().getTime()-new Date(e).getTime())/1e3,t=c/60,n=t/60,i=n/24;return i>1?`${Math.floor(i)}일 전`:n>1?`${Math.floor(n)}시간 전`:t>1?`${Math.floor(t)}분 전`:`${Math.floor(c)}초 전`};function x({item:e}){const s={TRADE:"체결",SYSTEM:"시스템"},o=T(e.createdAt);return a.jsxs("div",{className:`${e.notificationIsRead?"bg-gray-100":"bg-white"} p-4 flex flex-col gap-1 hover:bg-gray-100`,children:[a.jsxs("div",{className:"flex justify-between items-center",children:[a.jsx("p",{className:`text-sm ${e.notificationIsRead?"text-gray-500":"font-bold text-gray-700"}`,children:s[e.notificationType]}),a.jsx("p",{className:"text-xs text-gray-500",children:o})]}),a.jsx("p",{className:`text-sm ${e.notificationIsRead?"text-gray-500":"text-gray-700"}`,children:e.notificationContent})]},e.notificationId)}x.__docgenInfo={description:"",methods:[],displayName:"NotificationItem",props:{item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  notificationId: number;
  notificationContent: string;
  notificationType: string;
  notificationIsRead: boolean;
  createdAt: string;
}`,signature:{properties:[{key:"notificationId",value:{name:"number",required:!0}},{key:"notificationContent",value:{name:"string",required:!0}},{key:"notificationType",value:{name:"string",required:!0}},{key:"notificationIsRead",value:{name:"boolean",required:!0}},{key:"createdAt",value:{name:"string",required:!0}}]}},description:""}}};const v={component:x,title:"Layout/NotificationItem"},R={notificationId:1,notificationContent:"비트코인이 50,000,000원에 체결되었습니다.",notificationType:"TRADE",notificationIsRead:!1,createdAt:new Date().toISOString()},u={args:{item:R}},f={args:{item:{...R,notificationId:2,notificationIsRead:!0,notificationContent:"시스템 점검 예정 안내",notificationType:"SYSTEM"}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    item: baseNotification
  }
}`,...u.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    item: {
      ...baseNotification,
      notificationId: 2,
      notificationIsRead: true,
      notificationContent: '시스템 점검 예정 안내',
      notificationType: 'SYSTEM'
    }
  }
}`,...f.parameters?.docs?.source}}};const I=["Unread","Read"];export{f as Read,u as Unread,I as __namedExportsOrder,v as default};
