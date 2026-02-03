import{j as r}from"./iframe-oUI-Itw7.js";import{c as h,p as x,a as y}from"./middleware-CQpMi9V1.js";import"./preload-helper-PPVm8Dsz.js";const f=h()(x(e=>({user:null,setUser:s=>e({user:{id:s.id,nickname:s.nickname}}),logout:()=>{localStorage.removeItem("accessToken"),e({user:null})}}),{name:"user-storage",storage:y(()=>localStorage)})),T=({userId:e})=>{const s=f(a=>a.user);return e===s?.id},d=({nickname:e,message:s,time:a,hideDay:l,userId:u})=>{const c=T({userId:u}),p=a.split("T")[0],m=new Date(a);m.setHours(m.getHours());const g=m.toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"});return r.jsxs("div",{className:"flex flex-col gap-1 mb-3",children:[!l&&r.jsx("p",{className:" text-xs text-gray-500 text-center bg-gray-100 p-1 rounded-md",children:p}),r.jsxs("p",{className:"text-sm font-bold",children:[e," ",c?"(Me)":""]}),r.jsxs("div",{className:"flex gap-1 items-end",children:[r.jsx("p",{className:`${c?"bg-[#ebf2ff]":"bg-gray-100"} p-2 rounded-md text-sm`,children:s}),r.jsx("p",{className:"text-xs text-gray-500",children:g})]})]})};d.__docgenInfo={description:"",methods:[],displayName:"Chat",props:{nickname:{required:!0,tsType:{name:"string"},description:""},message:{required:!0,tsType:{name:"string"},description:""},time:{required:!0,tsType:{name:"string"},description:""},hideDay:{required:!0,tsType:{name:"boolean"},description:""},userId:{required:!0,tsType:{name:"number"},description:""}}};const H={title:"Chat",component:d,parameters:{backgrounds:{default:"white"}},argTypes:{nickname:{control:"text"},message:{control:"text"},time:{control:"text"},hideDay:{control:"boolean"},userId:{control:"number"}}},t={name:"기본",args:{nickname:"test",message:"Hello, world!",time:"2024-01-01T12:00:00",hideDay:!1,userId:1}},n={name:"다른 사람의 메시지",args:{nickname:"other",message:"Hello, world!",time:"2024-01-01T12:00:00",hideDay:!1,userId:2}},o={name:"날짜 숨김",args:{nickname:"test",message:"Hello, world!",time:"2024-01-01T12:00:00",hideDay:!0,userId:1}},i={name:"긴 메시지",args:{nickname:"test",message:"Hello, world!".repeat(100),time:"2024-01-01T12:00:00",hideDay:!1,userId:1}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  name: '기본',
  args: {
    nickname: 'test',
    message: 'Hello, world!',
    time: '2024-01-01T12:00:00',
    hideDay: false,
    userId: 1
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: '다른 사람의 메시지',
  args: {
    nickname: 'other',
    message: 'Hello, world!',
    time: '2024-01-01T12:00:00',
    hideDay: false,
    userId: 2
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: '날짜 숨김',
  args: {
    nickname: 'test',
    message: 'Hello, world!',
    time: '2024-01-01T12:00:00',
    hideDay: true,
    userId: 1
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: '긴 메시지',
  args: {
    nickname: 'test',
    message: 'Hello, world!'.repeat(100),
    time: '2024-01-01T12:00:00',
    hideDay: false,
    userId: 1
  }
}`,...i.parameters?.docs?.source}}};const b=["Default","Other","HideDay","LongMessage"];export{t as Default,o as HideDay,i as LongMessage,n as Other,b as __namedExportsOrder,H as default};
