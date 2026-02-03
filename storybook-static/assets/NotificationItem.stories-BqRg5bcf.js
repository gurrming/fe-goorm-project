import{j as e}from"./iframe-oUI-Itw7.js";import"./preload-helper-PPVm8Dsz.js";const u=t=>{const c=(new Date().getTime()-new Date(t).getTime())/1e3,o=c/60,a=o/60,d=a/24;return d>1?`${Math.floor(d)}일 전`:a>1?`${Math.floor(a)}시간 전`:o>1?`${Math.floor(o)}분 전`:`${Math.floor(c)}초 전`};function f({item:t}){const r={TRADE:"체결",SYSTEM:"시스템"},s=u(t.createdAt);return e.jsxs("div",{className:`${t.notificationIsRead?"bg-gray-100":"bg-white"} p-4 flex flex-col gap-1 hover:bg-gray-100`,children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("p",{className:`text-sm ${t.notificationIsRead?"text-gray-500":"font-bold text-gray-700"}`,children:r[t.notificationType]}),e.jsx("p",{className:"text-xs text-gray-500",children:s})]}),e.jsx("p",{className:`text-sm ${t.notificationIsRead?"text-gray-500":"text-gray-700"}`,children:t.notificationContent})]},t.notificationId)}f.__docgenInfo={description:"",methods:[],displayName:"NotificationItem",props:{item:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  notificationId: number;
  notificationContent: string;
  notificationType: string;
  notificationIsRead: boolean;
  createdAt: string;
}`,signature:{properties:[{key:"notificationId",value:{name:"number",required:!0}},{key:"notificationContent",value:{name:"string",required:!0}},{key:"notificationType",value:{name:"string",required:!0}},{key:"notificationIsRead",value:{name:"boolean",required:!0}},{key:"createdAt",value:{name:"string",required:!0}}]}},description:""}}};const y={component:f,title:"Layout/NotificationItem"},m={notificationId:1,notificationContent:"비트코인이 50,000,000원에 체결되었습니다.",notificationType:"TRADE",notificationIsRead:!1,createdAt:new Date().toISOString()},n={args:{item:m}},i={args:{item:{...m,notificationId:2,notificationIsRead:!0,notificationContent:"시스템 점검 예정 안내",notificationType:"SYSTEM"}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    item: baseNotification
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    item: {
      ...baseNotification,
      notificationId: 2,
      notificationIsRead: true,
      notificationContent: '시스템 점검 예정 안내',
      notificationType: 'SYSTEM'
    }
  }
}`,...i.parameters?.docs?.source}}};const x=["Unread","Read"];export{i as Read,n as Unread,x as __namedExportsOrder,y as default};
