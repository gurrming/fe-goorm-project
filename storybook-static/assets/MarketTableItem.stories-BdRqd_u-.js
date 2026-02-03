import{R as Mt,r as $,j as x}from"./iframe-oUI-Itw7.js";import{c as rt,u as nt}from"./useCategoryId-CwJJs4e0.js";import{a as Ga}from"./price-C8jZ1Iff.js";import{c as Xa}from"./middleware-CQpMi9V1.js";import"./preload-helper-PPVm8Dsz.js";var Ja={prefix:"far",iconName:"star",icon:[576,512,[11088,61446],"f005","M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"]};var Qa={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]};function Ne(e,t){(t==null||t>e.length)&&(t=e.length);for(var a=0,r=Array(t);a<t;a++)r[a]=e[a];return r}function Za(e){if(Array.isArray(e))return e}function er(e){if(Array.isArray(e))return Ne(e)}function tr(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ar(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,Dt(r.key),r)}}function rr(e,t,a){return t&&ar(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function ce(e,t){var a=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=qe(e))||t){a&&(e=a);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(l){throw l},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o,i=!0,s=!1;return{s:function(){a=a.call(e)},n:function(){var l=a.next();return i=l.done,l},e:function(l){s=!0,o=l},f:function(){try{i||a.return==null||a.return()}finally{if(s)throw o}}}}function p(e,t,a){return(t=Dt(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function nr(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ir(e,t){var a=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(a!=null){var r,n,o,i,s=[],l=!0,u=!1;try{if(o=(a=a.call(e)).next,t===0){if(Object(a)!==a)return;l=!1}else for(;!(l=(r=o.call(a)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(c){u=!0,n=c}finally{try{if(!l&&a.return!=null&&(i=a.return(),Object(i)!==i))return}finally{if(u)throw n}}return s}}function or(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function sr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function it(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,r)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=arguments[t]!=null?arguments[t]:{};t%2?it(Object(a),!0).forEach(function(r){p(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):it(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}function he(e,t){return Za(e)||ir(e,t)||qe(e,t)||or()}function N(e){return er(e)||nr(e)||qe(e)||sr()}function lr(e,t){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var r=a.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Dt(e){var t=lr(e,"string");return typeof t=="symbol"?t:t+""}function ve(e){"@babel/helpers - typeof";return ve=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ve(e)}function qe(e,t){if(e){if(typeof e=="string")return Ne(e,t);var a={}.toString.call(e).slice(8,-1);return a==="Object"&&e.constructor&&(a=e.constructor.name),a==="Map"||a==="Set"?Array.from(e):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Ne(e,t):void 0}}var ot=function(){},He={},zt={},Wt=null,Ut={mark:ot,measure:ot};try{typeof window<"u"&&(He=window),typeof document<"u"&&(zt=document),typeof MutationObserver<"u"&&(Wt=MutationObserver),typeof performance<"u"&&(Ut=performance)}catch{}var fr=He.navigator||{},st=fr.userAgent,lt=st===void 0?"":st,M=He,k=zt,ft=Wt,oe=Ut;M.document;var R=!!k.documentElement&&!!k.head&&typeof k.addEventListener=="function"&&typeof k.createElement=="function",Yt=~lt.indexOf("MSIE")||~lt.indexOf("Trident/"),Ae,ur=/fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,cr=/Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Whiteboard)?.*/i,Bt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"},slab:{"fa-regular":"regular",faslr:"regular"},"slab-press":{"fa-regular":"regular",faslpr:"regular"},thumbprint:{"fa-light":"light",fatl:"light"},whiteboard:{"fa-semibold":"semibold",fawsb:"semibold"},notdog:{"fa-solid":"solid",fans:"solid"},"notdog-duo":{"fa-solid":"solid",fands:"solid"},etch:{"fa-solid":"solid",faes:"solid"},jelly:{"fa-regular":"regular",fajr:"regular"},"jelly-fill":{"fa-regular":"regular",fajfr:"regular"},"jelly-duo":{"fa-regular":"regular",fajdr:"regular"},chisel:{"fa-regular":"regular",facr:"regular"},utility:{"fa-semibold":"semibold",fausb:"semibold"},"utility-duo":{"fa-semibold":"semibold",faudsb:"semibold"},"utility-fill":{"fa-semibold":"semibold",faufsb:"semibold"}},dr={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},qt=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],P="classic",ae="duotone",Ht="sharp",Kt="sharp-duotone",Vt="chisel",Gt="etch",Xt="jelly",Jt="jelly-duo",Qt="jelly-fill",Zt="notdog",ea="notdog-duo",ta="slab",aa="slab-press",ra="thumbprint",na="utility",ia="utility-duo",oa="utility-fill",sa="whiteboard",mr="Classic",vr="Duotone",gr="Sharp",pr="Sharp Duotone",hr="Chisel",br="Etch",yr="Jelly",xr="Jelly Duo",wr="Jelly Fill",kr="Notdog",Ar="Notdog Duo",Sr="Slab",Ir="Slab Press",Pr="Thumbprint",Fr="Utility",Er="Utility Duo",Cr="Utility Fill",Nr="Whiteboard",la=[P,ae,Ht,Kt,Vt,Gt,Xt,Jt,Qt,Zt,ea,ta,aa,ra,na,ia,oa,sa];Ae={},p(p(p(p(p(p(p(p(p(p(Ae,P,mr),ae,vr),Ht,gr),Kt,pr),Vt,hr),Gt,br),Xt,yr),Jt,xr),Qt,wr),Zt,kr),p(p(p(p(p(p(p(p(Ae,ea,Ar),ta,Sr),aa,Ir),ra,Pr),na,Fr),ia,Er),oa,Cr),sa,Nr);var Tr={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"},slab:{400:"faslr"},"slab-press":{400:"faslpr"},whiteboard:{600:"fawsb"},thumbprint:{300:"fatl"},notdog:{900:"fans"},"notdog-duo":{900:"fands"},etch:{900:"faes"},chisel:{400:"facr"},jelly:{400:"fajr"},"jelly-fill":{400:"fajfr"},"jelly-duo":{400:"fajdr"},utility:{600:"fausb"},"utility-duo":{600:"faudsb"},"utility-fill":{600:"faufsb"}},jr={"Font Awesome 7 Free":{900:"fas",400:"far"},"Font Awesome 7 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 7 Brands":{400:"fab",normal:"fab"},"Font Awesome 7 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 7 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 7 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"},"Font Awesome 7 Jelly":{400:"fajr",normal:"fajr"},"Font Awesome 7 Jelly Fill":{400:"fajfr",normal:"fajfr"},"Font Awesome 7 Jelly Duo":{400:"fajdr",normal:"fajdr"},"Font Awesome 7 Slab":{400:"faslr",normal:"faslr"},"Font Awesome 7 Slab Press":{400:"faslpr",normal:"faslpr"},"Font Awesome 7 Thumbprint":{300:"fatl",normal:"fatl"},"Font Awesome 7 Notdog":{900:"fans",normal:"fans"},"Font Awesome 7 Notdog Duo":{900:"fands",normal:"fands"},"Font Awesome 7 Etch":{900:"faes",normal:"faes"},"Font Awesome 7 Chisel":{400:"facr",normal:"facr"},"Font Awesome 7 Whiteboard":{600:"fawsb",normal:"fawsb"},"Font Awesome 7 Utility":{600:"fausb",normal:"fausb"},"Font Awesome 7 Utility Duo":{600:"faudsb",normal:"faudsb"},"Font Awesome 7 Utility Fill":{600:"faufsb",normal:"faufsb"}},Or=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["chisel",{defaultShortPrefixId:"facr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["etch",{defaultShortPrefixId:"faes",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["jelly",{defaultShortPrefixId:"fajr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-duo",{defaultShortPrefixId:"fajdr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["jelly-fill",{defaultShortPrefixId:"fajfr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["notdog",{defaultShortPrefixId:"fans",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["notdog-duo",{defaultShortPrefixId:"fands",defaultStyleId:"solid",styleIds:["solid"],futureStyleIds:[],defaultFontWeight:900}],["slab",{defaultShortPrefixId:"faslr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["slab-press",{defaultShortPrefixId:"faslpr",defaultStyleId:"regular",styleIds:["regular"],futureStyleIds:[],defaultFontWeight:400}],["thumbprint",{defaultShortPrefixId:"fatl",defaultStyleId:"light",styleIds:["light"],futureStyleIds:[],defaultFontWeight:300}],["utility",{defaultShortPrefixId:"fausb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-duo",{defaultShortPrefixId:"faudsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["utility-fill",{defaultShortPrefixId:"faufsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}],["whiteboard",{defaultShortPrefixId:"fawsb",defaultStyleId:"semibold",styleIds:["semibold"],futureStyleIds:[],defaultFontWeight:600}]]),_r={chisel:{regular:"facr"},classic:{brands:"fab",light:"fal",regular:"far",solid:"fas",thin:"fat"},duotone:{light:"fadl",regular:"fadr",solid:"fad",thin:"fadt"},etch:{solid:"faes"},jelly:{regular:"fajr"},"jelly-duo":{regular:"fajdr"},"jelly-fill":{regular:"fajfr"},notdog:{solid:"fans"},"notdog-duo":{solid:"fands"},sharp:{light:"fasl",regular:"fasr",solid:"fass",thin:"fast"},"sharp-duotone":{light:"fasdl",regular:"fasdr",solid:"fasds",thin:"fasdt"},slab:{regular:"faslr"},"slab-press":{regular:"faslpr"},thumbprint:{light:"fatl"},utility:{semibold:"fausb"},"utility-duo":{semibold:"faudsb"},"utility-fill":{semibold:"faufsb"},whiteboard:{semibold:"fawsb"}},fa=["fak","fa-kit","fakd","fa-kit-duotone"],ut={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Lr=["kit"],Rr="kit",$r="kit-duotone",Mr="Kit",Dr="Kit Duotone";p(p({},Rr,Mr),$r,Dr);var zr={kit:{"fa-kit":"fak"}},Wr={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Ur={kit:{fak:"fa-kit"}},ct={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},Se,se={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Yr=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone","fa-thumbprint","fa-whiteboard","fa-notdog","fa-notdog-duo","fa-chisel","fa-etch","fa-jelly","fa-jelly-fill","fa-jelly-duo","fa-slab","fa-slab-press","fa-utility","fa-utility-duo","fa-utility-fill"],Br="classic",qr="duotone",Hr="sharp",Kr="sharp-duotone",Vr="chisel",Gr="etch",Xr="jelly",Jr="jelly-duo",Qr="jelly-fill",Zr="notdog",en="notdog-duo",tn="slab",an="slab-press",rn="thumbprint",nn="utility",on="utility-duo",sn="utility-fill",ln="whiteboard",fn="Classic",un="Duotone",cn="Sharp",dn="Sharp Duotone",mn="Chisel",vn="Etch",gn="Jelly",pn="Jelly Duo",hn="Jelly Fill",bn="Notdog",yn="Notdog Duo",xn="Slab",wn="Slab Press",kn="Thumbprint",An="Utility",Sn="Utility Duo",In="Utility Fill",Pn="Whiteboard";Se={},p(p(p(p(p(p(p(p(p(p(Se,Br,fn),qr,un),Hr,cn),Kr,dn),Vr,mn),Gr,vn),Xr,gn),Jr,pn),Qr,hn),Zr,bn),p(p(p(p(p(p(p(p(Se,en,yn),tn,xn),an,wn),rn,kn),nn,An),on,Sn),sn,In),ln,Pn);var Fn="kit",En="kit-duotone",Cn="Kit",Nn="Kit Duotone";p(p({},Fn,Cn),En,Nn);var Tn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"},slab:{"fa-regular":"faslr"},"slab-press":{"fa-regular":"faslpr"},whiteboard:{"fa-semibold":"fawsb"},thumbprint:{"fa-light":"fatl"},notdog:{"fa-solid":"fans"},"notdog-duo":{"fa-solid":"fands"},etch:{"fa-solid":"faes"},jelly:{"fa-regular":"fajr"},"jelly-fill":{"fa-regular":"fajfr"},"jelly-duo":{"fa-regular":"fajdr"},chisel:{"fa-regular":"facr"},utility:{"fa-semibold":"fausb"},"utility-duo":{"fa-semibold":"faudsb"},"utility-fill":{"fa-semibold":"faufsb"}},jn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"],slab:["faslr"],"slab-press":["faslpr"],whiteboard:["fawsb"],thumbprint:["fatl"],notdog:["fans"],"notdog-duo":["fands"],etch:["faes"],jelly:["fajr"],"jelly-fill":["fajfr"],"jelly-duo":["fajdr"],chisel:["facr"],utility:["fausb"],"utility-duo":["faudsb"],"utility-fill":["faufsb"]},Te={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"},slab:{faslr:"fa-regular"},"slab-press":{faslpr:"fa-regular"},whiteboard:{fawsb:"fa-semibold"},thumbprint:{fatl:"fa-light"},notdog:{fans:"fa-solid"},"notdog-duo":{fands:"fa-solid"},etch:{faes:"fa-solid"},jelly:{fajr:"fa-regular"},"jelly-fill":{fajfr:"fa-regular"},"jelly-duo":{fajdr:"fa-regular"},chisel:{facr:"fa-regular"},utility:{fausb:"fa-semibold"},"utility-duo":{faudsb:"fa-semibold"},"utility-fill":{faufsb:"fa-semibold"}},On=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands","fa-semibold"],ua=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt","faslr","faslpr","fawsb","fatl","fans","fands","faes","fajr","fajfr","fajdr","facr","fausb","faudsb","faufsb"].concat(Yr,On),_n=["solid","regular","light","thin","duotone","brands","semibold"],ca=[1,2,3,4,5,6,7,8,9,10],Ln=ca.concat([11,12,13,14,15,16,17,18,19,20]),Rn=["aw","fw","pull-left","pull-right"],$n=[].concat(N(Object.keys(jn)),_n,Rn,["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","inverse","layers","layers-bottom-left","layers-bottom-right","layers-counter","layers-text","layers-top-left","layers-top-right","li","pull-end","pull-start","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul","width-auto","width-fixed",se.GROUP,se.SWAP_OPACITY,se.PRIMARY,se.SECONDARY]).concat(ca.map(function(e){return"".concat(e,"x")})).concat(Ln.map(function(e){return"w-".concat(e)})),Mn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},_="___FONT_AWESOME___",je=16,da="fa",ma="svg-inline--fa",U="data-fa-i2svg",Oe="data-fa-pseudo-element",Dn="data-fa-pseudo-element-pending",Ke="data-prefix",Ve="data-icon",dt="fontawesome-i2svg",zn="async",Wn=["HTML","HEAD","STYLE","SCRIPT"],va=["::before","::after",":before",":after"],ga=(function(){try{return!0}catch{return!1}})();function re(e){return new Proxy(e,{get:function(a,r){return r in a?a[r]:a[P]}})}var pa=f({},Bt);pa[P]=f(f(f(f({},{"fa-duotone":"duotone"}),Bt[P]),ut.kit),ut["kit-duotone"]);var Un=re(pa),_e=f({},_r);_e[P]=f(f(f(f({},{duotone:"fad"}),_e[P]),ct.kit),ct["kit-duotone"]);var mt=re(_e),Le=f({},Te);Le[P]=f(f({},Le[P]),Ur.kit);var Ge=re(Le),Re=f({},Tn);Re[P]=f(f({},Re[P]),zr.kit);re(Re);var Yn=ur,ha="fa-layers-text",Bn=cr,qn=f({},Tr);re(qn);var Hn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Ie=dr,Kn=[].concat(N(Lr),N($n)),J=M.FontAwesomeConfig||{};function Vn(e){var t=k.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Gn(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(k&&typeof k.querySelector=="function"){var Xn=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-search-pseudo-elements","searchPseudoElements"],["data-search-pseudo-elements-warnings","searchPseudoElementsWarnings"],["data-search-pseudo-elements-full-scan","searchPseudoElementsFullScan"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Xn.forEach(function(e){var t=he(e,2),a=t[0],r=t[1],n=Gn(Vn(a));n!=null&&(J[r]=n)})}var ba={styleDefault:"solid",familyDefault:P,cssPrefix:da,replacementClass:ma,autoReplaceSvg:!0,autoAddCss:!0,searchPseudoElements:!1,searchPseudoElementsWarnings:!0,searchPseudoElementsFullScan:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};J.familyPrefix&&(J.cssPrefix=J.familyPrefix);var V=f(f({},ba),J);V.autoReplaceSvg||(V.observeMutations=!1);var m={};Object.keys(ba).forEach(function(e){Object.defineProperty(m,e,{enumerable:!0,set:function(a){V[e]=a,Q.forEach(function(r){return r(m)})},get:function(){return V[e]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){V.cssPrefix=t,Q.forEach(function(a){return a(m)})},get:function(){return V.cssPrefix}});M.FontAwesomeConfig=m;var Q=[];function Jn(e){return Q.push(e),function(){Q.splice(Q.indexOf(e),1)}}var B=je,T={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Qn(e){if(!(!e||!R)){var t=k.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var a=k.head.childNodes,r=null,n=a.length-1;n>-1;n--){var o=a[n],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(r=o)}return k.head.insertBefore(t,r),e}}var Zn="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function vt(){for(var e=12,t="";e-- >0;)t+=Zn[Math.random()*62|0];return t}function G(e){for(var t=[],a=(e||[]).length>>>0;a--;)t[a]=e[a];return t}function Xe(e){return e.classList?G(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function ya(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ei(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,'="').concat(ya(e[a]),'" ')},"").trim()}function be(e){return Object.keys(e||{}).reduce(function(t,a){return t+"".concat(a,": ").concat(e[a].trim(),";")},"")}function Je(e){return e.size!==T.size||e.x!==T.x||e.y!==T.y||e.rotate!==T.rotate||e.flipX||e.flipY}function ti(e){var t=e.transform,a=e.containerWidth,r=e.iconWidth,n={transform:"translate(".concat(a/2," 256)")},o="translate(".concat(t.x*32,", ").concat(t.y*32,") "),i="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),s="rotate(".concat(t.rotate," 0 0)"),l={transform:"".concat(o," ").concat(i," ").concat(s)},u={transform:"translate(".concat(r/2*-1," -256)")};return{outer:n,inner:l,path:u}}function ai(e){var t=e.transform,a=e.width,r=a===void 0?je:a,n=e.height,o=n===void 0?je:n,i="";return Yt?i+="translate(".concat(t.x/B-r/2,"em, ").concat(t.y/B-o/2,"em) "):i+="translate(calc(-50% + ".concat(t.x/B,"em), calc(-50% + ").concat(t.y/B,"em)) "),i+="scale(".concat(t.size/B*(t.flipX?-1:1),", ").concat(t.size/B*(t.flipY?-1:1),") "),i+="rotate(".concat(t.rotate,"deg) "),i}var ri=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 7 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 7 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 7 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 7 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 7 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 7 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 7 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 7 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 7 Sharp Duotone";
  --fa-font-slab-regular: normal 400 1em/1 "Font Awesome 7 Slab";
  --fa-font-slab-press-regular: normal 400 1em/1 "Font Awesome 7 Slab Press";
  --fa-font-whiteboard-semibold: normal 600 1em/1 "Font Awesome 7 Whiteboard";
  --fa-font-thumbprint-light: normal 300 1em/1 "Font Awesome 7 Thumbprint";
  --fa-font-notdog-solid: normal 900 1em/1 "Font Awesome 7 Notdog";
  --fa-font-notdog-duo-solid: normal 900 1em/1 "Font Awesome 7 Notdog Duo";
  --fa-font-etch-solid: normal 900 1em/1 "Font Awesome 7 Etch";
  --fa-font-jelly-regular: normal 400 1em/1 "Font Awesome 7 Jelly";
  --fa-font-jelly-fill-regular: normal 400 1em/1 "Font Awesome 7 Jelly Fill";
  --fa-font-jelly-duo-regular: normal 400 1em/1 "Font Awesome 7 Jelly Duo";
  --fa-font-chisel-regular: normal 400 1em/1 "Font Awesome 7 Chisel";
  --fa-font-utility-semibold: normal 600 1em/1 "Font Awesome 7 Utility";
  --fa-font-utility-duo-semibold: normal 600 1em/1 "Font Awesome 7 Utility Duo";
  --fa-font-utility-fill-semibold: normal 600 1em/1 "Font Awesome 7 Utility Fill";
}

.svg-inline--fa {
  box-sizing: content-box;
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285714em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left,
.svg-inline--fa .fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-pull-right,
.svg-inline--fa .fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: var(--fa-width, 1.25em);
}
.fa-layers .svg-inline--fa {
  inset: 0;
  margin: auto;
  position: absolute;
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xs {
  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-sm {
  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-lg {
  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-xl {
  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-2xl {
  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */
  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */
  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */
}

.fa-width-auto {
  --fa-width: auto;
}

.fa-fw,
.fa-width-fixed {
  --fa-width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-inline-start: var(--fa-li-margin, 2.5em);
  padding-inline-start: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

/* Heads Up: Bordered Icons will not be supported in the future!
  - This feature will be deprecated in the next major release of Font Awesome (v8)!
  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.
*/
/* Notes:
* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)
* --@{v.$css-prefix}-border-padding =
  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)
  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)
*/
.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.0625em);
  box-sizing: var(--fa-border-box-sizing, content-box);
  padding: var(--fa-border-padding, 0.1875em 0.25em);
}

.fa-pull-left,
.fa-pull-start {
  float: inline-start;
  margin-inline-end: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right,
.fa-pull-end {
  float: inline-end;
  margin-inline-start: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
  .fa-bounce,
  .fa-fade,
  .fa-beat-fade,
  .fa-flip,
  .fa-pulse,
  .fa-shake,
  .fa-spin,
  .fa-spin-pulse {
    animation: none !important;
    transition: none !important;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.svg-inline--fa.fa-inverse {
  fill: var(--fa-inverse, #fff);
}

.fa-stack {
  display: inline-block;
  height: 2em;
  line-height: 2em;
  position: relative;
  vertical-align: middle;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.svg-inline--fa.fa-stack-1x {
  --fa-width: 1.25em;
  height: 1em;
  width: var(--fa-width);
}
.svg-inline--fa.fa-stack-2x {
  --fa-width: 2.5em;
  height: 2em;
  width: var(--fa-width);
}

.fa-stack-1x,
.fa-stack-2x {
  inset: 0;
  margin: auto;
  position: absolute;
  z-index: var(--fa-stack-z-index, auto);
}`;function xa(){var e=da,t=ma,a=m.cssPrefix,r=m.replacementClass,n=ri;if(a!==e||r!==t){var o=new RegExp("\\.".concat(e,"\\-"),"g"),i=new RegExp("\\--".concat(e,"\\-"),"g"),s=new RegExp("\\.".concat(t),"g");n=n.replace(o,".".concat(a,"-")).replace(i,"--".concat(a,"-")).replace(s,".".concat(r))}return n}var gt=!1;function Pe(){m.autoAddCss&&!gt&&(Qn(xa()),gt=!0)}var ni={mixout:function(){return{dom:{css:xa,insertCss:Pe}}},hooks:function(){return{beforeDOMElementCreation:function(){Pe()},beforeI2svg:function(){Pe()}}}},L=M||{};L[_]||(L[_]={});L[_].styles||(L[_].styles={});L[_].hooks||(L[_].hooks={});L[_].shims||(L[_].shims=[]);var C=L[_],wa=[],ka=function(){k.removeEventListener("DOMContentLoaded",ka),ge=1,wa.map(function(t){return t()})},ge=!1;R&&(ge=(k.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(k.readyState),ge||k.addEventListener("DOMContentLoaded",ka));function ii(e){R&&(ge?setTimeout(e,0):wa.push(e))}function ne(e){var t=e.tag,a=e.attributes,r=a===void 0?{}:a,n=e.children,o=n===void 0?[]:n;return typeof e=="string"?ya(e):"<".concat(t," ").concat(ei(r),">").concat(o.map(ne).join(""),"</").concat(t,">")}function pt(e,t,a){if(e&&e[t]&&e[t][a])return{prefix:t,iconName:a,icon:e[t][a]}}var Fe=function(t,a,r,n){var o=Object.keys(t),i=o.length,s=a,l,u,c;for(r===void 0?(l=1,c=t[o[0]]):(l=0,c=r);l<i;l++)u=o[l],c=s(c,t[u],u,t);return c};function Aa(e){return N(e).length!==1?null:e.codePointAt(0).toString(16)}function ht(e){return Object.keys(e).reduce(function(t,a){var r=e[a],n=!!r.icon;return n?t[r.iconName]=r.icon:t[a]=r,t},{})}function $e(e,t){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=a.skipHooks,n=r===void 0?!1:r,o=ht(t);typeof C.hooks.addPack=="function"&&!n?C.hooks.addPack(e,ht(t)):C.styles[e]=f(f({},C.styles[e]||{}),o),e==="fas"&&$e("fa",t)}var ee=C.styles,oi=C.shims,Sa=Object.keys(Ge),si=Sa.reduce(function(e,t){return e[t]=Object.keys(Ge[t]),e},{}),Qe=null,Ia={},Pa={},Fa={},Ea={},Ca={};function li(e){return~Kn.indexOf(e)}function fi(e,t){var a=t.split("-"),r=a[0],n=a.slice(1).join("-");return r===e&&n!==""&&!li(n)?n:null}var Na=function(){var t=function(o){return Fe(ee,function(i,s,l){return i[l]=Fe(s,o,{}),i},{})};Ia=t(function(n,o,i){if(o[3]&&(n[o[3]]=i),o[2]){var s=o[2].filter(function(l){return typeof l=="number"});s.forEach(function(l){n[l.toString(16)]=i})}return n}),Pa=t(function(n,o,i){if(n[i]=i,o[2]){var s=o[2].filter(function(l){return typeof l=="string"});s.forEach(function(l){n[l]=i})}return n}),Ca=t(function(n,o,i){var s=o[2];return n[i]=i,s.forEach(function(l){n[l]=i}),n});var a="far"in ee||m.autoFetchSvg,r=Fe(oi,function(n,o){var i=o[0],s=o[1],l=o[2];return s==="far"&&!a&&(s="fas"),typeof i=="string"&&(n.names[i]={prefix:s,iconName:l}),typeof i=="number"&&(n.unicodes[i.toString(16)]={prefix:s,iconName:l}),n},{names:{},unicodes:{}});Fa=r.names,Ea=r.unicodes,Qe=ye(m.styleDefault,{family:m.familyDefault})};Jn(function(e){Qe=ye(e.styleDefault,{family:m.familyDefault})});Na();function Ze(e,t){return(Ia[e]||{})[t]}function ui(e,t){return(Pa[e]||{})[t]}function W(e,t){return(Ca[e]||{})[t]}function Ta(e){return Fa[e]||{prefix:null,iconName:null}}function ci(e){var t=Ea[e],a=Ze("fas",e);return t||(a?{prefix:"fas",iconName:a}:null)||{prefix:null,iconName:null}}function D(){return Qe}var ja=function(){return{prefix:null,iconName:null,rest:[]}};function di(e){var t=P,a=Sa.reduce(function(r,n){return r[n]="".concat(m.cssPrefix,"-").concat(n),r},{});return la.forEach(function(r){(e.includes(a[r])||e.some(function(n){return si[r].includes(n)}))&&(t=r)}),t}function ye(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.family,r=a===void 0?P:a,n=Un[r][e];if(r===ae&&!e)return"fad";var o=mt[r][e]||mt[r][n],i=e in C.styles?e:null,s=o||i||null;return s}function mi(e){var t=[],a=null;return e.forEach(function(r){var n=fi(m.cssPrefix,r);n?a=n:r&&t.push(r)}),{iconName:a,rest:t}}function bt(e){return e.sort().filter(function(t,a,r){return r.indexOf(t)===a})}var yt=ua.concat(fa);function xe(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.skipLookups,r=a===void 0?!1:a,n=null,o=bt(e.filter(function(v){return yt.includes(v)})),i=bt(e.filter(function(v){return!yt.includes(v)})),s=o.filter(function(v){return n=v,!qt.includes(v)}),l=he(s,1),u=l[0],c=u===void 0?null:u,d=di(o),g=f(f({},mi(i)),{},{prefix:ye(c,{family:d})});return f(f(f({},g),hi({values:e,family:d,styles:ee,config:m,canonical:g,givenPrefix:n})),vi(r,n,g))}function vi(e,t,a){var r=a.prefix,n=a.iconName;if(e||!r||!n)return{prefix:r,iconName:n};var o=t==="fa"?Ta(n):{},i=W(r,n);return n=o.iconName||i||n,r=o.prefix||r,r==="far"&&!ee.far&&ee.fas&&!m.autoFetchSvg&&(r="fas"),{prefix:r,iconName:n}}var gi=la.filter(function(e){return e!==P||e!==ae}),pi=Object.keys(Te).filter(function(e){return e!==P}).map(function(e){return Object.keys(Te[e])}).flat();function hi(e){var t=e.values,a=e.family,r=e.canonical,n=e.givenPrefix,o=n===void 0?"":n,i=e.styles,s=i===void 0?{}:i,l=e.config,u=l===void 0?{}:l,c=a===ae,d=t.includes("fa-duotone")||t.includes("fad"),g=u.familyDefault==="duotone",v=r.prefix==="fad"||r.prefix==="fa-duotone";if(!c&&(d||g||v)&&(r.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(r.prefix="fab"),!r.prefix&&gi.includes(a)){var h=Object.keys(s).find(function(w){return pi.includes(w)});if(h||u.autoFetchSvg){var b=Or.get(a).defaultShortPrefixId;r.prefix=b,r.iconName=W(r.prefix,r.iconName)||r.iconName}}return(r.prefix==="fa"||o==="fa")&&(r.prefix=D()||"fas"),r}var bi=(function(){function e(){tr(this,e),this.definitions={}}return rr(e,[{key:"add",value:function(){for(var a=this,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];var i=n.reduce(this._pullDefinitions,{});Object.keys(i).forEach(function(s){a.definitions[s]=f(f({},a.definitions[s]||{}),i[s]),$e(s,i[s]);var l=Ge[P][s];l&&$e(l,i[s]),Na()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(a,r){var n=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(n).map(function(o){var i=n[o],s=i.prefix,l=i.iconName,u=i.icon,c=u[2];a[s]||(a[s]={}),c.length>0&&c.forEach(function(d){typeof d=="string"&&(a[s][d]=u)}),a[s][l]=u}),a}}])})(),xt=[],H={},K={},yi=Object.keys(K);function xi(e,t){var a=t.mixoutsTo;return xt=e,H={},Object.keys(K).forEach(function(r){yi.indexOf(r)===-1&&delete K[r]}),xt.forEach(function(r){var n=r.mixout?r.mixout():{};if(Object.keys(n).forEach(function(i){typeof n[i]=="function"&&(a[i]=n[i]),ve(n[i])==="object"&&Object.keys(n[i]).forEach(function(s){a[i]||(a[i]={}),a[i][s]=n[i][s]})}),r.hooks){var o=r.hooks();Object.keys(o).forEach(function(i){H[i]||(H[i]=[]),H[i].push(o[i])})}r.provides&&r.provides(K)}),a}function Me(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];var o=H[e]||[];return o.forEach(function(i){t=i.apply(null,[t].concat(r))}),t}function Y(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];var n=H[e]||[];n.forEach(function(o){o.apply(null,a)})}function z(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return K[e]?K[e].apply(null,t):void 0}function De(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,a=e.prefix||D();if(t)return t=W(a,t)||t,pt(Oa.definitions,a,t)||pt(C.styles,a,t)}var Oa=new bi,wi=function(){m.autoReplaceSvg=!1,m.observeMutations=!1,Y("noAuto")},ki={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return R?(Y("beforeI2svg",t),z("pseudoElements2svg",t),z("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,ii(function(){Si({autoReplaceSvgRoot:a}),Y("watch",t)})}},Ai={icon:function(t){if(t===null)return null;if(ve(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:W(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var a=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=ye(t[0]);return{prefix:r,iconName:W(r,a)||a}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match(Yn))){var n=xe(t.split(" "),{skipLookups:!0});return{prefix:n.prefix||D(),iconName:W(n.prefix,n.iconName)||n.iconName}}if(typeof t=="string"){var o=D();return{prefix:o,iconName:W(o,t)||t}}}},F={noAuto:wi,config:m,dom:ki,parse:Ai,library:Oa,findIconDefinition:De,toHtml:ne},Si=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=t.autoReplaceSvgRoot,r=a===void 0?k:a;(Object.keys(C.styles).length>0||m.autoFetchSvg)&&R&&m.autoReplaceSvg&&F.dom.i2svg({node:r})};function we(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return ne(r)})}}),Object.defineProperty(e,"node",{get:function(){if(R){var r=k.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function Ii(e){var t=e.children,a=e.main,r=e.mask,n=e.attributes,o=e.styles,i=e.transform;if(Je(i)&&a.found&&!r.found){var s=a.width,l=a.height,u={x:s/l/2,y:.5};n.style=be(f(f({},o),{},{"transform-origin":"".concat(u.x+i.x/16,"em ").concat(u.y+i.y/16,"em")}))}return[{tag:"svg",attributes:n,children:t}]}function Pi(e){var t=e.prefix,a=e.iconName,r=e.children,n=e.attributes,o=e.symbol,i=o===!0?"".concat(t,"-").concat(m.cssPrefix,"-").concat(a):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},n),{},{id:i}),children:r}]}]}function Fi(e){var t=["aria-label","aria-labelledby","title","role"];return t.some(function(a){return a in e})}function et(e){var t=e.icons,a=t.main,r=t.mask,n=e.prefix,o=e.iconName,i=e.transform,s=e.symbol,l=e.maskId,u=e.extra,c=e.watchable,d=c===void 0?!1:c,g=r.found?r:a,v=g.width,h=g.height,b=[m.replacementClass,o?"".concat(m.cssPrefix,"-").concat(o):""].filter(function(y){return u.classes.indexOf(y)===-1}).filter(function(y){return y!==""||!!y}).concat(u.classes).join(" "),w={children:[],attributes:f(f({},u.attributes),{},{"data-prefix":n,"data-icon":o,class:b,role:u.attributes.role||"img",viewBox:"0 0 ".concat(v," ").concat(h)})};!Fi(u.attributes)&&!u.attributes["aria-hidden"]&&(w.attributes["aria-hidden"]="true"),d&&(w.attributes[U]="");var A=f(f({},w),{},{prefix:n,iconName:o,main:a,mask:r,maskId:l,transform:i,symbol:s,styles:f({},u.styles)}),S=r.found&&a.found?z("generateAbstractMask",A)||{children:[],attributes:{}}:z("generateAbstractIcon",A)||{children:[],attributes:{}},I=S.children,E=S.attributes;return A.children=I,A.attributes=E,s?Pi(A):Ii(A)}function wt(e){var t=e.content,a=e.width,r=e.height,n=e.transform,o=e.extra,i=e.watchable,s=i===void 0?!1:i,l=f(f({},o.attributes),{},{class:o.classes.join(" ")});s&&(l[U]="");var u=f({},o.styles);Je(n)&&(u.transform=ai({transform:n,width:a,height:r}),u["-webkit-transform"]=u.transform);var c=be(u);c.length>0&&(l.style=c);var d=[];return d.push({tag:"span",attributes:l,children:[t]}),d}function Ei(e){var t=e.content,a=e.extra,r=f(f({},a.attributes),{},{class:a.classes.join(" ")}),n=be(a.styles);n.length>0&&(r.style=n);var o=[];return o.push({tag:"span",attributes:r,children:[t]}),o}var Ee=C.styles;function ze(e){var t=e[0],a=e[1],r=e.slice(4),n=he(r,1),o=n[0],i=null;return Array.isArray(o)?i={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(Ie.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Ie.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(Ie.PRIMARY),fill:"currentColor",d:o[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:t,height:a,icon:i}}var Ci={found:!1,width:512,height:512};function Ni(e,t){!ga&&!m.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function We(e,t){var a=t;return t==="fa"&&m.styleDefault!==null&&(t=D()),new Promise(function(r,n){if(a==="fa"){var o=Ta(e)||{};e=o.iconName||e,t=o.prefix||t}if(e&&t&&Ee[t]&&Ee[t][e]){var i=Ee[t][e];return r(ze(i))}Ni(e,t),r(f(f({},Ci),{},{icon:m.showMissingIcons&&e?z("missingIconAbstract")||{}:{}}))})}var kt=function(){},Ue=m.measurePerformance&&oe&&oe.mark&&oe.measure?oe:{mark:kt,measure:kt},X='FA "7.1.0"',Ti=function(t){return Ue.mark("".concat(X," ").concat(t," begins")),function(){return _a(t)}},_a=function(t){Ue.mark("".concat(X," ").concat(t," ends")),Ue.measure("".concat(X," ").concat(t),"".concat(X," ").concat(t," begins"),"".concat(X," ").concat(t," ends"))},tt={begin:Ti,end:_a},de=function(){};function At(e){var t=e.getAttribute?e.getAttribute(U):null;return typeof t=="string"}function ji(e){var t=e.getAttribute?e.getAttribute(Ke):null,a=e.getAttribute?e.getAttribute(Ve):null;return t&&a}function Oi(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(m.replacementClass)}function _i(){if(m.autoReplaceSvg===!0)return me.replace;var e=me[m.autoReplaceSvg];return e||me.replace}function Li(e){return k.createElementNS("http://www.w3.org/2000/svg",e)}function Ri(e){return k.createElement(e)}function La(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.ceFn,r=a===void 0?e.tag==="svg"?Li:Ri:a;if(typeof e=="string")return k.createTextNode(e);var n=r(e.tag);Object.keys(e.attributes||[]).forEach(function(i){n.setAttribute(i,e.attributes[i])});var o=e.children||[];return o.forEach(function(i){n.appendChild(La(i,{ceFn:r}))}),n}function $i(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var me={replace:function(t){var a=t[0];if(a.parentNode)if(t[1].forEach(function(n){a.parentNode.insertBefore(La(n),a)}),a.getAttribute(U)===null&&m.keepOriginalSource){var r=k.createComment($i(a));a.parentNode.replaceChild(r,a)}else a.remove()},nest:function(t){var a=t[0],r=t[1];if(~Xe(a).indexOf(m.replacementClass))return me.replace(t);var n=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var o=r[0].attributes.class.split(" ").reduce(function(s,l){return l===m.replacementClass||l.match(n)?s.toSvg.push(l):s.toNode.push(l),s},{toNode:[],toSvg:[]});r[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?a.removeAttribute("class"):a.setAttribute("class",o.toNode.join(" "))}var i=r.map(function(s){return ne(s)}).join(`
`);a.setAttribute(U,""),a.innerHTML=i}};function St(e){e()}function Ra(e,t){var a=typeof t=="function"?t:de;if(e.length===0)a();else{var r=St;m.mutateApproach===zn&&(r=M.requestAnimationFrame||St),r(function(){var n=_i(),o=tt.begin("mutate");e.map(n),o(),a()})}}var at=!1;function $a(){at=!0}function Ye(){at=!1}var pe=null;function It(e){if(ft&&m.observeMutations){var t=e.treeCallback,a=t===void 0?de:t,r=e.nodeCallback,n=r===void 0?de:r,o=e.pseudoElementsCallback,i=o===void 0?de:o,s=e.observeMutationsRoot,l=s===void 0?k:s;pe=new ft(function(u){if(!at){var c=D();G(u).forEach(function(d){if(d.type==="childList"&&d.addedNodes.length>0&&!At(d.addedNodes[0])&&(m.searchPseudoElements&&i(d.target),a(d.target)),d.type==="attributes"&&d.target.parentNode&&m.searchPseudoElements&&i([d.target],!0),d.type==="attributes"&&At(d.target)&&~Hn.indexOf(d.attributeName))if(d.attributeName==="class"&&ji(d.target)){var g=xe(Xe(d.target)),v=g.prefix,h=g.iconName;d.target.setAttribute(Ke,v||c),h&&d.target.setAttribute(Ve,h)}else Oi(d.target)&&n(d.target)})}}),R&&pe.observe(l,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Mi(){pe&&pe.disconnect()}function Di(e){var t=e.getAttribute("style"),a=[];return t&&(a=t.split(";").reduce(function(r,n){var o=n.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(r[i]=s.join(":").trim()),r},{})),a}function zi(e){var t=e.getAttribute("data-prefix"),a=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",n=xe(Xe(e));return n.prefix||(n.prefix=D()),t&&a&&(n.prefix=t,n.iconName=a),n.iconName&&n.prefix||(n.prefix&&r.length>0&&(n.iconName=ui(n.prefix,e.innerText)||Ze(n.prefix,Aa(e.innerText))),!n.iconName&&m.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(n.iconName=e.firstChild.data)),n}function Wi(e){var t=G(e.attributes).reduce(function(a,r){return a.name!=="class"&&a.name!=="style"&&(a[r.name]=r.value),a},{});return t}function Ui(){return{iconName:null,prefix:null,transform:T,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Pt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},a=zi(e),r=a.iconName,n=a.prefix,o=a.rest,i=Wi(e),s=Me("parseNodeAttributes",{},e),l=t.styleParser?Di(e):[];return f({iconName:r,prefix:n,transform:T,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:l,attributes:i}},s)}var Yi=C.styles;function Ma(e){var t=m.autoReplaceSvg==="nest"?Pt(e,{styleParser:!1}):Pt(e);return~t.extra.classes.indexOf(ha)?z("generateLayersText",e,t):z("generateSvgReplacementMutation",e,t)}function Bi(){return[].concat(N(fa),N(ua))}function Ft(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!R)return Promise.resolve();var a=k.documentElement.classList,r=function(d){return a.add("".concat(dt,"-").concat(d))},n=function(d){return a.remove("".concat(dt,"-").concat(d))},o=m.autoFetchSvg?Bi():qt.concat(Object.keys(Yi));o.includes("fa")||o.push("fa");var i=[".".concat(ha,":not([").concat(U,"])")].concat(o.map(function(c){return".".concat(c,":not([").concat(U,"])")})).join(", ");if(i.length===0)return Promise.resolve();var s=[];try{s=G(e.querySelectorAll(i))}catch{}if(s.length>0)r("pending"),n("complete");else return Promise.resolve();var l=tt.begin("onTree"),u=s.reduce(function(c,d){try{var g=Ma(d);g&&c.push(g)}catch(v){ga||v.name==="MissingIcon"&&console.error(v)}return c},[]);return new Promise(function(c,d){Promise.all(u).then(function(g){Ra(g,function(){r("active"),r("complete"),n("pending"),typeof t=="function"&&t(),l(),c()})}).catch(function(g){l(),d(g)})})}function qi(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Ma(e).then(function(a){a&&Ra([a],t)})}function Hi(e){return function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:De(t||{}),n=a.mask;return n&&(n=(n||{}).icon?n:De(n||{})),e(r,f(f({},a),{},{mask:n}))}}var Ki=function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,n=r===void 0?T:r,o=a.symbol,i=o===void 0?!1:o,s=a.mask,l=s===void 0?null:s,u=a.maskId,c=u===void 0?null:u,d=a.classes,g=d===void 0?[]:d,v=a.attributes,h=v===void 0?{}:v,b=a.styles,w=b===void 0?{}:b;if(t){var A=t.prefix,S=t.iconName,I=t.icon;return we(f({type:"icon"},t),function(){return Y("beforeDOMElementCreation",{iconDefinition:t,params:a}),et({icons:{main:ze(I),mask:l?ze(l.icon):{found:!1,width:null,height:null,icon:{}}},prefix:A,iconName:S,transform:f(f({},T),n),symbol:i,maskId:c,extra:{attributes:h,styles:w,classes:g}})})}},Vi={mixout:function(){return{icon:Hi(Ki)}},hooks:function(){return{mutationObserverCallbacks:function(a){return a.treeCallback=Ft,a.nodeCallback=qi,a}}},provides:function(t){t.i2svg=function(a){var r=a.node,n=r===void 0?k:r,o=a.callback,i=o===void 0?function(){}:o;return Ft(n,i)},t.generateSvgReplacementMutation=function(a,r){var n=r.iconName,o=r.prefix,i=r.transform,s=r.symbol,l=r.mask,u=r.maskId,c=r.extra;return new Promise(function(d,g){Promise.all([We(n,o),l.iconName?We(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(v){var h=he(v,2),b=h[0],w=h[1];d([a,et({icons:{main:b,mask:w},prefix:o,iconName:n,transform:i,symbol:s,maskId:u,extra:c,watchable:!0})])}).catch(g)})},t.generateAbstractIcon=function(a){var r=a.children,n=a.attributes,o=a.main,i=a.transform,s=a.styles,l=be(s);l.length>0&&(n.style=l);var u;return Je(i)&&(u=z("generateAbstractTransformGrouping",{main:o,transform:i,containerWidth:o.width,iconWidth:o.width})),r.push(u||o.icon),{children:r,attributes:n}}}},Gi={mixout:function(){return{layer:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.classes,o=n===void 0?[]:n;return we({type:"layer"},function(){Y("beforeDOMElementCreation",{assembler:a,params:r});var i=[];return a(function(s){Array.isArray(s)?s.map(function(l){i=i.concat(l.abstract)}):i=i.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers")].concat(N(o)).join(" ")},children:i}]})}}}},Xi={mixout:function(){return{counter:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.title;var n=r.classes,o=n===void 0?[]:n,i=r.attributes,s=i===void 0?{}:i,l=r.styles,u=l===void 0?{}:l;return we({type:"counter",content:a},function(){return Y("beforeDOMElementCreation",{content:a,params:r}),Ei({content:a.toString(),extra:{attributes:s,styles:u,classes:["".concat(m.cssPrefix,"-layers-counter")].concat(N(o))}})})}}}},Ji={mixout:function(){return{text:function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=r.transform,o=n===void 0?T:n,i=r.classes,s=i===void 0?[]:i,l=r.attributes,u=l===void 0?{}:l,c=r.styles,d=c===void 0?{}:c;return we({type:"text",content:a},function(){return Y("beforeDOMElementCreation",{content:a,params:r}),wt({content:a,transform:f(f({},T),o),extra:{attributes:u,styles:d,classes:["".concat(m.cssPrefix,"-layers-text")].concat(N(s))}})})}}},provides:function(t){t.generateLayersText=function(a,r){var n=r.transform,o=r.extra,i=null,s=null;if(Yt){var l=parseInt(getComputedStyle(a).fontSize,10),u=a.getBoundingClientRect();i=u.width/l,s=u.height/l}return Promise.resolve([a,wt({content:a.innerHTML,width:i,height:s,transform:n,extra:o,watchable:!0})])}}},Da=new RegExp('"',"ug"),Et=[1105920,1112319],Ct=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),jr),Mn),Wr),Be=Object.keys(Ct).reduce(function(e,t){return e[t.toLowerCase()]=Ct[t],e},{}),Qi=Object.keys(Be).reduce(function(e,t){var a=Be[t];return e[t]=a[900]||N(Object.entries(a))[0][1],e},{});function Zi(e){var t=e.replace(Da,"");return Aa(N(t)[0]||"")}function eo(e){var t=e.getPropertyValue("font-feature-settings").includes("ss01"),a=e.getPropertyValue("content"),r=a.replace(Da,""),n=r.codePointAt(0),o=n>=Et[0]&&n<=Et[1],i=r.length===2?r[0]===r[1]:!1;return o||i||t}function to(e,t){var a=e.replace(/^['"]|['"]$/g,"").toLowerCase(),r=parseInt(t),n=isNaN(r)?"normal":r;return(Be[a]||{})[n]||Qi[a]}function Nt(e,t){var a="".concat(Dn).concat(t.replace(":","-"));return new Promise(function(r,n){if(e.getAttribute(a)!==null)return r();var o=G(e.children),i=o.filter(function(ie){return ie.getAttribute(Oe)===t})[0],s=M.getComputedStyle(e,t),l=s.getPropertyValue("font-family"),u=l.match(Bn),c=s.getPropertyValue("font-weight"),d=s.getPropertyValue("content");if(i&&!u)return e.removeChild(i),r();if(u&&d!=="none"&&d!==""){var g=s.getPropertyValue("content"),v=to(l,c),h=Zi(g),b=u[0].startsWith("FontAwesome"),w=eo(s),A=Ze(v,h),S=A;if(b){var I=ci(h);I.iconName&&I.prefix&&(A=I.iconName,v=I.prefix)}if(A&&!w&&(!i||i.getAttribute(Ke)!==v||i.getAttribute(Ve)!==S)){e.setAttribute(a,S),i&&e.removeChild(i);var E=Ui(),y=E.extra;y.attributes[Oe]=t,We(A,v).then(function(ie){var Ka=et(f(f({},E),{},{icons:{main:ie,mask:ja()},prefix:v,iconName:S,extra:y,watchable:!0})),ke=k.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(ke,e.firstChild):e.appendChild(ke),ke.outerHTML=Ka.map(function(Va){return ne(Va)}).join(`
`),e.removeAttribute(a),r()}).catch(n)}else r()}else r()})}function ao(e){return Promise.all([Nt(e,"::before"),Nt(e,"::after")])}function ro(e){return e.parentNode!==document.head&&!~Wn.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(Oe)&&(!e.parentNode||e.parentNode.tagName!=="svg")}var no=function(t){return!!t&&va.some(function(a){return t.includes(a)})},io=function(t){if(!t)return[];var a=new Set,r=t.split(/,(?![^()]*\))/).map(function(l){return l.trim()});r=r.flatMap(function(l){return l.includes("(")?l:l.split(",").map(function(u){return u.trim()})});var n=ce(r),o;try{for(n.s();!(o=n.n()).done;){var i=o.value;if(no(i)){var s=va.reduce(function(l,u){return l.replace(u,"")},i);s!==""&&s!=="*"&&a.add(s)}}}catch(l){n.e(l)}finally{n.f()}return a};function Tt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(R){var a;if(t)a=e;else if(m.searchPseudoElementsFullScan)a=e.querySelectorAll("*");else{var r=new Set,n=ce(document.styleSheets),o;try{for(n.s();!(o=n.n()).done;){var i=o.value;try{var s=ce(i.cssRules),l;try{for(s.s();!(l=s.n()).done;){var u=l.value,c=io(u.selectorText),d=ce(c),g;try{for(d.s();!(g=d.n()).done;){var v=g.value;r.add(v)}}catch(b){d.e(b)}finally{d.f()}}}catch(b){s.e(b)}finally{s.f()}}catch(b){m.searchPseudoElementsWarnings&&console.warn("Font Awesome: cannot parse stylesheet: ".concat(i.href," (").concat(b.message,`)
If it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.`))}}}catch(b){n.e(b)}finally{n.f()}if(!r.size)return;var h=Array.from(r).join(", ");try{a=e.querySelectorAll(h)}catch{}}return new Promise(function(b,w){var A=G(a).filter(ro).map(ao),S=tt.begin("searchPseudoElements");$a(),Promise.all(A).then(function(){S(),Ye(),b()}).catch(function(){S(),Ye(),w()})})}}var oo={hooks:function(){return{mutationObserverCallbacks:function(a){return a.pseudoElementsCallback=Tt,a}}},provides:function(t){t.pseudoElements2svg=function(a){var r=a.node,n=r===void 0?k:r;m.searchPseudoElements&&Tt(n)}}},jt=!1,so={mixout:function(){return{dom:{unwatch:function(){$a(),jt=!0}}}},hooks:function(){return{bootstrap:function(){It(Me("mutationObserverCallbacks",{}))},noAuto:function(){Mi()},watch:function(a){var r=a.observeMutationsRoot;jt?Ye():It(Me("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Ot=function(t){var a={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,n){var o=n.toLowerCase().split("-"),i=o[0],s=o.slice(1).join("-");if(i&&s==="h")return r.flipX=!0,r;if(i&&s==="v")return r.flipY=!0,r;if(s=parseFloat(s),isNaN(s))return r;switch(i){case"grow":r.size=r.size+s;break;case"shrink":r.size=r.size-s;break;case"left":r.x=r.x-s;break;case"right":r.x=r.x+s;break;case"up":r.y=r.y-s;break;case"down":r.y=r.y+s;break;case"rotate":r.rotate=r.rotate+s;break}return r},a)},lo={mixout:function(){return{parse:{transform:function(a){return Ot(a)}}}},hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-transform");return n&&(a.transform=Ot(n)),a}}},provides:function(t){t.generateAbstractTransformGrouping=function(a){var r=a.main,n=a.transform,o=a.containerWidth,i=a.iconWidth,s={transform:"translate(".concat(o/2," 256)")},l="translate(".concat(n.x*32,", ").concat(n.y*32,") "),u="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),c="rotate(".concat(n.rotate," 0 0)"),d={transform:"".concat(l," ").concat(u," ").concat(c)},g={transform:"translate(".concat(i/2*-1," -256)")},v={outer:s,inner:d,path:g};return{tag:"g",attributes:f({},v.outer),children:[{tag:"g",attributes:f({},v.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:f(f({},r.icon.attributes),v.path)}]}]}}}},Ce={x:0,y:0,width:"100%",height:"100%"};function _t(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function fo(e){return e.tag==="g"?e.children:[e]}var uo={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-mask"),o=n?xe(n.split(" ").map(function(i){return i.trim()})):ja();return o.prefix||(o.prefix=D()),a.mask=o,a.maskId=r.getAttribute("data-fa-mask-id"),a}}},provides:function(t){t.generateAbstractMask=function(a){var r=a.children,n=a.attributes,o=a.main,i=a.mask,s=a.maskId,l=a.transform,u=o.width,c=o.icon,d=i.width,g=i.icon,v=ti({transform:l,containerWidth:d,iconWidth:u}),h={tag:"rect",attributes:f(f({},Ce),{},{fill:"white"})},b=c.children?{children:c.children.map(_t)}:{},w={tag:"g",attributes:f({},v.inner),children:[_t(f({tag:c.tag,attributes:f(f({},c.attributes),v.path)},b))]},A={tag:"g",attributes:f({},v.outer),children:[w]},S="mask-".concat(s||vt()),I="clip-".concat(s||vt()),E={tag:"mask",attributes:f(f({},Ce),{},{id:S,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[h,A]},y={tag:"defs",children:[{tag:"clipPath",attributes:{id:I},children:fo(g)},E]};return r.push(y,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(I,")"),mask:"url(#".concat(S,")")},Ce)}),{children:r,attributes:n}}}},co={provides:function(t){var a=!1;M.matchMedia&&(a=M.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],n={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:f(f({},n),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var i=f(f({},o),{},{attributeName:"opacity"}),s={tag:"circle",attributes:f(f({},n),{},{cx:"256",cy:"364",r:"28"}),children:[]};return a||s.children.push({tag:"animate",attributes:f(f({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},i),{},{values:"1;0;1;1;0;1;"})}),r.push(s),r.push({tag:"path",attributes:f(f({},n),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:a?[]:[{tag:"animate",attributes:f(f({},i),{},{values:"1;0;0;0;0;1;"})}]}),a||r.push({tag:"path",attributes:f(f({},n),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},mo={hooks:function(){return{parseNodeAttributes:function(a,r){var n=r.getAttribute("data-fa-symbol"),o=n===null?!1:n===""?!0:n;return a.symbol=o,a}}}},vo=[ni,Vi,Gi,Xi,Ji,oo,so,lo,uo,co,mo];xi(vo,{mixoutsTo:F});F.noAuto;var te=F.config;F.library;F.dom;var za=F.parse;F.findIconDefinition;F.toHtml;var go=F.icon;F.layer;F.text;F.counter;function po(e){return e=e-0,e===e}function Wa(e){return po(e)?e:(e=e.replace(/[_-]+(.)?/g,(t,a)=>a?a.toUpperCase():""),e.charAt(0).toLowerCase()+e.slice(1))}function ho(e){return e.charAt(0).toUpperCase()+e.slice(1)}var q=new Map,bo=1e3;function yo(e){if(q.has(e))return q.get(e);const t={};let a=0;const r=e.length;for(;a<r;){const n=e.indexOf(";",a),o=n===-1?r:n,i=e.slice(a,o).trim();if(i){const s=i.indexOf(":");if(s>0){const l=i.slice(0,s).trim(),u=i.slice(s+1).trim();if(l&&u){const c=Wa(l);t[c.startsWith("webkit")?ho(c):c]=u}}}a=o+1}if(q.size===bo){const n=q.keys().next().value;n&&q.delete(n)}return q.set(e,t),t}function Ua(e,t,a={}){if(typeof t=="string")return t;const r=(t.children||[]).map(c=>Ua(e,c)),n=t.attributes||{},o={};for(const[c,d]of Object.entries(n))switch(!0){case c==="class":{o.className=d;break}case c==="style":{o.style=yo(String(d));break}case c.startsWith("aria-"):case c.startsWith("data-"):{o[c.toLowerCase()]=d;break}default:o[Wa(c)]=d}const{style:i,role:s,"aria-label":l,...u}=a;return i&&(o.style=o.style?{...o.style,...i}:i),s&&(o.role=s),l&&(o["aria-label"]=l,o["aria-hidden"]="false"),e(t.tag,{...u,...o},...r)}var xo=Ua.bind(null,Mt.createElement),Lt=(e,t)=>{const a=$.useId();return e||(t?a:void 0)},wo=class{constructor(e="react-fontawesome"){this.enabled=!1;let t=!1;try{t=typeof process<"u"&&!1}catch{}this.scope=e,this.enabled=t}log(...e){this.enabled&&console.log(`[${this.scope}]`,...e)}warn(...e){this.enabled&&console.warn(`[${this.scope}]`,...e)}error(...e){this.enabled&&console.error(`[${this.scope}]`,...e)}},ko="searchPseudoElementsFullScan"in te?"7.0.0":"6.0.0",Ao=Number.parseInt(ko)>=7,Z="fa",j={beat:"fa-beat",fade:"fa-fade",beatFade:"fa-beat-fade",bounce:"fa-bounce",shake:"fa-shake",spin:"fa-spin",spinPulse:"fa-spin-pulse",spinReverse:"fa-spin-reverse",pulse:"fa-pulse"},So={left:"fa-pull-left",right:"fa-pull-right"},Io={90:"fa-rotate-90",180:"fa-rotate-180",270:"fa-rotate-270"},Po={"2xs":"fa-2xs",xs:"fa-xs",sm:"fa-sm",lg:"fa-lg",xl:"fa-xl","2xl":"fa-2xl","1x":"fa-1x","2x":"fa-2x","3x":"fa-3x","4x":"fa-4x","5x":"fa-5x","6x":"fa-6x","7x":"fa-7x","8x":"fa-8x","9x":"fa-9x","10x":"fa-10x"},O={border:"fa-border",fixedWidth:"fa-fw",flip:"fa-flip",flipHorizontal:"fa-flip-horizontal",flipVertical:"fa-flip-vertical",inverse:"fa-inverse",rotateBy:"fa-rotate-by",swapOpacity:"fa-swap-opacity",widthAuto:"fa-width-auto"};function Fo(e){const t=te.cssPrefix||te.familyPrefix||Z;return t===Z?e:e.replace(new RegExp(String.raw`(?<=^|\s)${Z}-`,"g"),`${t}-`)}function Eo(e){const{beat:t,fade:a,beatFade:r,bounce:n,shake:o,spin:i,spinPulse:s,spinReverse:l,pulse:u,fixedWidth:c,inverse:d,border:g,flip:v,size:h,rotation:b,pull:w,swapOpacity:A,rotateBy:S,widthAuto:I,className:E}=e,y=[];return E&&y.push(...E.split(" ")),t&&y.push(j.beat),a&&y.push(j.fade),r&&y.push(j.beatFade),n&&y.push(j.bounce),o&&y.push(j.shake),i&&y.push(j.spin),l&&y.push(j.spinReverse),s&&y.push(j.spinPulse),u&&y.push(j.pulse),c&&y.push(O.fixedWidth),d&&y.push(O.inverse),g&&y.push(O.border),v===!0&&y.push(O.flip),(v==="horizontal"||v==="both")&&y.push(O.flipHorizontal),(v==="vertical"||v==="both")&&y.push(O.flipVertical),h!=null&&y.push(Po[h]),b!=null&&b!==0&&y.push(Io[b]),w!=null&&y.push(So[w]),A&&y.push(O.swapOpacity),Ao?(S&&y.push(O.rotateBy),I&&y.push(O.widthAuto),(te.cssPrefix||te.familyPrefix||Z)===Z?y:y.map(Fo)):y}var Co=e=>typeof e=="object"&&"icon"in e&&!!e.icon;function Rt(e){if(e)return Co(e)?e:za.icon(e)}function No(e){return Object.keys(e)}var $t=new wo("FontAwesomeIcon"),Ya={border:!1,className:"",mask:void 0,maskId:void 0,fixedWidth:!1,inverse:!1,flip:!1,icon:void 0,listItem:!1,pull:void 0,pulse:!1,rotation:void 0,rotateBy:!1,size:void 0,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:void 0,transform:void 0,swapOpacity:!1,widthAuto:!1},To=new Set(Object.keys(Ya)),Ba=Mt.forwardRef((e,t)=>{const a={...Ya,...e},{icon:r,mask:n,symbol:o,title:i,titleId:s,maskId:l,transform:u}=a,c=Lt(l,!!n),d=Lt(s,!!i),g=Rt(r);if(!g)return $t.error("Icon lookup is undefined",r),null;const v=Eo(a),h=typeof u=="string"?za.transform(u):u,b=Rt(n),w=go(g,{...v.length>0&&{classes:v},...h&&{transform:h},...b&&{mask:b},symbol:o,title:i,titleId:d,maskId:c});if(!w)return $t.error("Could not find icon",g),null;const{abstract:A}=w,S={ref:t};for(const I of No(a))To.has(I)||(S[I]=a[I]);return xo(A[0],S)});Ba.displayName="FontAwesomeIcon";function qa({value:e,enabled:t=!0,durationMs:a=220,className:r,children:n}){const o=$.useRef(null),i=$.useRef(null),[s,l]=$.useState(!1),[u,c]=$.useState("same"),[d,g]=$.useState(0);return $.useEffect(()=>{if(!t){o.current=typeof e=="number"?e:null;return}if(typeof e!="number")return;const v=o.current;if(v===null){o.current=e;return}if(v!==e){const h=e>v?"up":e<v?"down":"same";c(h),l(!0),g(b=>b+1),i.current!==null&&window.clearTimeout(i.current),i.current=window.setTimeout(()=>l(!1),a),o.current=e}},[e,t,a]),$.useEffect(()=>()=>{i.current!==null&&window.clearTimeout(i.current)},[]),x.jsxs("div",{className:rt("relative",r),children:[n,s&&x.jsx("div",{className:rt("pointer-events-none absolute inset-0",u==="up"&&"flash-up",u==="down"&&"flash-down",u==="same"&&"flash"),style:{borderRadius:"inherit"}},d)]})}qa.__docgenInfo={description:`Market용: ref로 이전값을 들고 있다가 값이 바뀌면 깜빡임(방향색 포함)
- 실시간 데이터가 들어오기 전엔 enabled={false}로 두고, 나중에 value만 꽂으면 됨`,methods:[],displayName:"FlashComparison",props:{value:{required:!0,tsType:{name:"union",raw:"number | null | undefined",elements:[{name:"number"},{name:"null"},{name:"undefined"}]},description:"비교할 값(예: item 체결가). 값이 바뀌면 flash"},enabled:{required:!1,tsType:{name:"boolean"},description:"값 비교/flash를 잠시 꺼두고 싶을 때",defaultValue:{value:"true",computed:!1}},durationMs:{required:!1,tsType:{name:"number"},description:"flash 지속 시간",defaultValue:{value:"220",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"wrapper class"},children:{required:!0,tsType:{name:"ReactNode"},description:"감쌀 대상"}}};const jo=Xa(e=>({tickerByCategoryId:{},setTickerData:(t,a)=>e(r=>({tickerByCategoryId:{...r.tickerByCategoryId,[t]:a}})),clearTickerData:t=>e(a=>{if(t!==void 0){const r={...a.tickerByCategoryId};return delete r[t],{tickerByCategoryId:r}}return{tickerByCategoryId:{}}})}));function Oo(e){const t=e/1e6;return`${Math.round(t).toLocaleString("ko-KR")}`}function Ha({activeTab:e,category:t,portfolioAsset:a,isFavorite:r,onToggleFavorite:n}){const o=nt(h=>h.setCategoryId),i=nt(h=>h.categoryId),s=jo(h=>t?h.tickerByCategoryId[t.categoryId]:void 0);if(e==="holding"&&a){const h=a.evaluationAmount,b=a.evaluationProfit,w=a.profitRate,A=w>0?"text-primary-700":w<0?"text-primary-900":"text-primary-100",S=w>0?"+":"",I="flex justify-end items-center",E=i===a.categoryId;return x.jsxs("div",{className:`grid grid-cols-[1.5fr_1.2fr_2.5fr_1.3fr] border-b border-gray-200 hover:bg-gray-100 px-4 ${E?"bg-gray-100":""}`,onClick:()=>o(a.categoryId),children:[x.jsx("div",{className:"text-xs min-w-0 flex ",children:x.jsx("div",{className:"flex items-center gap-2 font-bold py-4",children:x.jsx("span",{className:"text-[14px] text-primary-100",children:a.symbol})})}),x.jsx("div",{className:`text-xs text-right text-primary-100 min-w-[90px] ${I}`,children:x.jsxs("div",{className:"flex flex-col",children:[x.jsx("span",{className:"font-semibold",children:a.investCount.toLocaleString("ko-KR",{maximumFractionDigits:8})}),x.jsxs("span",{className:"text-[11px] text-primary-300 font-normal",children:[Math.round(h).toLocaleString("ko-KR"),x.jsx("span",{className:"text-[11px] text-primary-500 font-normal ml-1",children:"KRW"})]})]})}),x.jsx("div",{className:`text-xs text-right text-primary-100 font-semibold min-w-[80px] ${I}`,children:x.jsxs("div",{className:"flex flex-col",children:[x.jsx("span",{children:a.avgPrice.toLocaleString("ko-KR",{maximumFractionDigits:2})}),x.jsx("span",{className:"text-[11px] text-primary-500 font-normal",children:"KRW"})]})}),x.jsx("div",{className:`text-xs text-right min-w-[100px] font-semibold ${A} ${I}`,children:x.jsxs("div",{className:"flex flex-col",children:[x.jsxs("span",{children:[S,w.toFixed(2),"%"]}),x.jsx("span",{className:"text-[11px]",children:Math.round(b).toLocaleString("ko-KR")})]})})]})}if(!t)return null;const l=i===t.categoryId,u=s?.price??t.tradePrice??0,c=s?.changeRate??t.changeRate??0,d=s?.amount??t.accAmount??0,g=!!s,v=Ga(c);return x.jsxs("div",{className:`grid grid-cols-[1.5fr_1.2fr_1fr_1.3fr] border-b border-gray-200 hover:bg-gray-100 px-4 py-2 transition-opacity hover:cursor-pointer ${l?"bg-gray-100":""}`,onClick:()=>o(t.categoryId),children:[x.jsx("div",{className:"text-xs min-w-0",children:x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("button",{type:"button",onClick:h=>{h.stopPropagation(),n()},className:"w-5 h-5 flex items-center justify-center text-[#ffca43] hover:text-[#ffb457] shrink-0",children:x.jsx(Ba,{icon:r?Qa:Ja})}),x.jsxs("div",{className:"flex flex-col min-w-0",children:[x.jsx("span",{className:"text-[13px] font-semibold text-primary-100",children:t.categoryName}),x.jsxs("span",{className:"text-[11px] text-primary-300",children:[t.symbol,"/(KRW)"]})]})]})}),x.jsx(qa,{value:g?u:null,enabled:g,className:`text-xs text-right min-w-[90px] font-semibold ${v.textStyle} rounded-[2px]`,children:u.toLocaleString("ko-KR")}),x.jsxs("div",{className:`text-xs text-right min-w-[80px] font-semibold ${v.textStyle}`,children:[v.text,"%"]}),x.jsxs("div",{className:"text-xs text-right text-primary-100 font-semibold min-w-[100px]",children:[Oo(d),x.jsx("span",{className:"text-primary-500 font-normal",children:"백만"})]})]})}Ha.__docgenInfo={description:"",methods:[],displayName:"MarketTableItem",props:{activeTab:{required:!0,tsType:{name:"union",raw:"'krw' | 'holding' | 'interest'",elements:[{name:"literal",value:"'krw'"},{name:"literal",value:"'holding'"},{name:"literal",value:"'interest'"}]},description:""},category:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  categoryId: number;
  categoryName: string;
  symbol: string;
  tradePrice: number;
  changeRate: number;
  changeAmount: number;
  openPrice: number;
  dailyHigh: number;
  dailyLow: number;
  accVolume: number;
  accAmount: number;
}`,signature:{properties:[{key:"categoryId",value:{name:"number",required:!0}},{key:"categoryName",value:{name:"string",required:!0}},{key:"symbol",value:{name:"string",required:!0}},{key:"tradePrice",value:{name:"number",required:!0}},{key:"changeRate",value:{name:"number",required:!0}},{key:"changeAmount",value:{name:"number",required:!0}},{key:"openPrice",value:{name:"number",required:!0}},{key:"dailyHigh",value:{name:"number",required:!0}},{key:"dailyLow",value:{name:"number",required:!0}},{key:"accVolume",value:{name:"number",required:!0}},{key:"accAmount",value:{name:"number",required:!0}}]}},description:""},portfolioAsset:{required:!1,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"categoryId",value:{name:"number",required:!0}},{key:"avgPrice",value:{name:"number",required:!0}},{key:"categoryName",value:{name:"string",required:!0}},{key:"symbol",value:{name:"string",required:!0}},{key:"investCount",value:{name:"number",required:!0}},{key:"currentPrice",value:{name:"number",required:!0}},{key:"buyAmount",value:{name:"number",required:!0}},{key:"evaluationAmount",value:{name:"number",required:!0}},{key:"evaluationProfit",value:{name:"number",required:!0}},{key:"profitRate",value:{name:"number",required:!0}}]}},description:""},isFavorite:{required:!0,tsType:{name:"boolean"},description:""},onToggleFavorite:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const Do={title:"MarketTableItem",component:Ha,argTypes:{activeTab:{control:"select"},category:{control:"object"},portfolioAsset:{control:"object"},isFavorite:{control:"boolean"},onToggleFavorite:{action:"toggleFavorite"}}},le={name:"기본",args:{activeTab:"krw",category:{categoryId:1,categoryName:"비트코인",symbol:"BTC"},portfolioAsset:{categoryId:1,categoryName:"비트코인",symbol:"BTC",avgPrice:1e4,investCount:10,evaluationAmount:1e5,evaluationProfit:1e4,profitRate:10},isFavorite:!1,onToggleFavorite:()=>{}}},fe={name:"관심 종목",args:{activeTab:"krw",category:{categoryId:1,categoryName:"비트코인",symbol:"BTC"},portfolioAsset:{categoryId:1,categoryName:"비트코인",symbol:"BTC",avgPrice:1e4,investCount:10,evaluationAmount:1e5,evaluationProfit:1e4,profitRate:10},isFavorite:!0,onToggleFavorite:()=>{}}},ue={name:"보유 종목",args:{activeTab:"holding",category:{categoryId:1,categoryName:"비트코인",symbol:"BTC"},portfolioAsset:{categoryId:1,categoryName:"비트코인",symbol:"BTC",avgPrice:1e4,investCount:10,evaluationAmount:1e5,evaluationProfit:1e4,profitRate:10},isFavorite:!1,onToggleFavorite:()=>{}}};le.parameters={...le.parameters,docs:{...le.parameters?.docs,source:{originalSource:`{
  name: '기본',
  args: {
    activeTab: 'krw',
    category: {
      categoryId: 1,
      categoryName: '비트코인',
      symbol: 'BTC'
    },
    portfolioAsset: {
      categoryId: 1,
      categoryName: '비트코인',
      symbol: 'BTC',
      avgPrice: 10000,
      investCount: 10,
      evaluationAmount: 100000,
      evaluationProfit: 10000,
      profitRate: 10
    },
    isFavorite: false,
    onToggleFavorite: () => {}
  }
}`,...le.parameters?.docs?.source}}};fe.parameters={...fe.parameters,docs:{...fe.parameters?.docs,source:{originalSource:`{
  name: '관심 종목',
  args: {
    activeTab: 'krw',
    category: {
      categoryId: 1,
      categoryName: '비트코인',
      symbol: 'BTC'
    },
    portfolioAsset: {
      categoryId: 1,
      categoryName: '비트코인',
      symbol: 'BTC',
      avgPrice: 10000,
      investCount: 10,
      evaluationAmount: 100000,
      evaluationProfit: 10000,
      profitRate: 10
    },
    isFavorite: true,
    onToggleFavorite: () => {}
  }
}`,...fe.parameters?.docs?.source}}};ue.parameters={...ue.parameters,docs:{...ue.parameters?.docs,source:{originalSource:`{
  name: '보유 종목',
  args: {
    activeTab: 'holding',
    category: {
      categoryId: 1,
      categoryName: '비트코인',
      symbol: 'BTC'
    },
    portfolioAsset: {
      categoryId: 1,
      categoryName: '비트코인',
      symbol: 'BTC',
      avgPrice: 10000,
      investCount: 10,
      evaluationAmount: 100000,
      evaluationProfit: 10000,
      profitRate: 10
    },
    isFavorite: false,
    onToggleFavorite: () => {}
  }
}`,...ue.parameters?.docs?.source}}};const zo=["Default","Favorite","Holding"];export{le as Default,fe as Favorite,ue as Holding,zo as __namedExportsOrder,Do as default};
