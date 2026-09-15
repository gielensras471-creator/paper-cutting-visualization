import{d as U,c as o,a as l,e as h,F as f,r as C,t as n,m as v,I as b,o as s,J as A,u as V,f as H,T as Y,k as j,n as x,O as K,g as G}from"./index-DQ4d-AuK.js";function W(u,m){const M=new XMLSerializer().serializeToString(u),p=new Blob([M],{type:"image/svg+xml"}),$=URL.createObjectURL(p),c=document.createElement("a");c.href=$,c.download=m,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL($)}const X={class:"paper-generator"},J=["aria-label"],q=["r"],Q=["transform"],ll=["d"],tl=["d"],el=["d"],nl=["r"],sl=["d"],ol={key:1,x:"300",y:"337","text-anchor":"middle",fill:"black","font-family":"STKaiti, KaiTi, serif","font-size":"118","font-weight":"700"},rl={key:2,cx:"300",cy:"300",r:"207",fill:"none",stroke:"black","stroke-width":"6","stroke-dasharray":"5 20"},ul=["r"],il=["stop-color"],al=["stop-color"],dl=["stop-color"],cl=["filter"],vl=["fill","mask"],fl=["mask"],pl=["stroke"],yl=["r","stroke"],Cl=["transform"],gl=["fill"],kl=["mask"],ml=["transform"],bl=["fill"],$l=["fill"],Ll=["r","stroke"],hl={class:"paper-generator__axis"},P="paper-cut-mask-v053",B="paper-gradient-v053",D="paper-shadow-v053",Ml=U({__name:"PaperGenerator",props:{folds:{},stylePreset:{},density:{},colorScheme:{},motif:{}},setup(u,{expose:m}){const i=u,M=v(()=>Math.round(360/i.folds));function p(O){return`
    rotate(
      ${O*(360/i.folds)}
      300
      300
    )
  `}const $=v(()=>{switch(i.stylePreset){case"南方剪纸":return`
          M 300 184
          C 287 206
            284 232
            294 253
          C 303 236
            309 213
            300 184
          Z
        `;case"彩色蔚县":return`
          M 300 180
          C 278 200
            277 232
            300 255
          C 323 232
            322 200
            300 180
          Z
        `;case"民族图腾":return`
          M 300 180
          L 322 204
          L 310 226
          L 331 250
          L 300 241
          L 269 250
          L 290 226
          L 278 204
          Z
        `;case"北方剪纸":default:return`
          M 300 176
          C 272 200
            274 235
            300 258
          C 326 235
            328 200
            300 176
          Z
        `}}),c=v(()=>{switch(i.motif){case"花":return[`
            M 300 68
            C 279 88
              274 113
              300 141
            C 326 113
              321 88
              300 68
            Z
          `,`
            M 298 136
            C 275 119
              251 124
              245 147
            C 266 153
              283 150
              298 136
            Z
          `,`
            M 302 136
            C 325 119
              349 124
              355 147
            C 334 153
              317 150
              302 136
            Z
          `];case"鸟":return[`
            M 291 82
            C 277 94
              273 112
              281 127
            C 288 140
              303 145
              318 139
            C 307 128
              302 115
              304 99
            C 301 91
              297 86
              291 82
            Z
          `,`
            M 286 126
            C 263 124
              247 137
              244 158
            C 263 151
              282 152
              302 164
            C 297 148
              292 136
              286 126
            Z
          `,`
            M 302 158
            L 330 180
            L 315 174
            L 323 193
            L 299 171
            Z
          `,`
            M 304 97
            L 328 103
            L 305 110
            Z
          `];case"鱼":return[`
            M 300 82
            C 270 82
              251 102
              251 126
            C 251 151
              273 170
              300 170
            C 327 170
              349 151
              349 126
            C 349 102
              330 82
              300 82
            Z
          `,`
            M 300 166
            L 271 199
            L 300 190
            L 329 199
            Z
          `,`
            M 274 126
            L 252 146
            L 282 142
            Z
          `,`
            M 326 126
            L 348 146
            L 318 142
            Z
          `];case"蝶":return[`
            M 294 120
            C 277 91
              247 88
              239 111
            C 233 130
              250 148
              291 148
            Z
          `,`
            M 306 120
            C 323 91
              353 88
              361 111
            C 367 130
              350 148
              309 148
            Z
          `,`
            M 293 146
            C 265 147
              251 161
              257 181
            C 270 183
              286 171
              298 151
            Z
          `,`
            M 307 146
            C 335 147
              349 161
              343 181
            C 330 183
              314 171
              302 151
            Z
          `,`
            M 295 113
            C 297 104
              303 104
              305 113
            L 306 171
            C 304 179
              296 179
              294 171
            Z
          `];case"福":return[`
            M 300 79
            C 280 79
              268 91
              270 104
            C 272 116
              285 119
              297 112
            C 308 104
              319 106
              325 117
            C 333 104
              327 87
              312 82
            C 308 80
              304 79
              300 79
            Z
          `,`
            M 276 133
            C 257 126
              243 136
              245 151
            C 248 166
              267 170
              285 159
            C 279 151
              276 142
              276 133
            Z
          `,`
            M 324 133
            C 343 126
              357 136
              355 151
            C 352 166
              333 170
              315 159
            C 321 151
              324 142
              324 133
            Z
          `];default:return[]}}),e=v(()=>{switch(i.stylePreset){case"南方剪纸":return`
          M 276 206
          C 252 218
            248 244
            267 259
          C 279 243
            290 221
            300 204
          C 291 203
            283 204
            276 206
          Z
        `;case"民族图腾":return`
          M 260 207
          L 283 214
          L 300 198
          L 317 214
          L 340 207
          L 324 239
          L 300 252
          L 276 239
          Z
        `;case"彩色蔚县":return`
          M 267 204
          C 245 218
            248 248
            274 263
          C 286 241
            294 220
            300 203
          C 287 201
            277 201
            267 204
          Z
        `;case"北方剪纸":default:return`
          M 260 202
          C 242 221
            250 251
            278 267
          C 287 241
            294 218
            300 201
          C 286 198
            273 199
            260 202
          Z
        `}}),d=v(()=>i.motif==="鱼"?`
        M 300 106
        C 286 112
          286 137
          300 146
        C 314 137
          314 112
          300 106
        Z
      `:i.motif==="蝶"?`
        M 278 123
        C 267 116
          257 122
          259 134
        C 266 139
          274 138
          282 132
        Z
      `:i.motif==="鸟"?`
        M 284 108
        C 275 113
          273 124
          280 131
        C 289 126
          294 119
          296 111
        Z
      `:`
      M 274 134
      C 257 149
        260 173
        280 185
      C 288 164
        294 147
        300 134
      C 291 131
        282 131
        274 134
      Z
    `),g=v(()=>{if(i.motif==="福")return 0;switch(i.density){case"简":return 30;case"繁":return 45;default:return 38}}),L=v(()=>i.stylePreset==="南方剪纸"?4:7),S=v(()=>i.motif==="福"?92:i.density==="繁"?62:54),R=v(()=>{switch(i.colorScheme){case"彩色":return"#a8332d";case"红金":return"#9f2824";default:return"#a62f29"}}),E=v(()=>{switch(i.colorScheme){case"彩色":return"#c84a3f";case"红金":return"#bd3c31";default:return"#c44237"}}),T=v(()=>{switch(i.stylePreset){case"南方剪纸":return"#922822";case"彩色蔚县":return"#8e2823";case"民族图腾":return"#84241f";default:return"#86231f"}}),_=v(()=>i.colorScheme==="彩色"?"#d6aa4f":"#c89c48"),Z=b(null);return m({getSVG(){return Z.value}}),(O,a)=>(s(),o("div",X,[(s(),o("svg",{ref_key:"svgRef",ref:Z,class:"paper-generator__svg",viewBox:"0 0 600 600",role:"img","aria-label":`${u.stylePreset} · ${u.motif}纹 · ${u.folds}折数字剪纸`},[l("defs",null,[l("mask",{id:P,maskUnits:"userSpaceOnUse",x:"0",y:"0",width:"600",height:"600"},[a[3]||(a[3]=l("rect",{width:"600",height:"600",fill:"black"},null,-1)),a[4]||(a[4]=l("circle",{cx:"300",cy:"300",r:"246",fill:"white"},null,-1)),g.value>0?(s(),o("circle",{key:0,cx:"300",cy:"300",r:g.value,fill:"black"},null,8,q)):h("",!0),(s(!0),o(f,null,C(u.folds,y=>(s(),o("g",{key:`sector-${y}`,transform:p(y-1)},[l("path",{d:$.value,fill:"black"},null,8,ll),(s(!0),o(f,null,C(c.value,(N,F)=>(s(),o("path",{key:`motif-${y}-${F}`,d:N,fill:"black"},null,8,tl))),128)),u.density!=="简"?(s(),o(f,{key:0},[l("path",{d:e.value,fill:"black"},null,8,el),l("circle",{cx:"300",cy:"202",r:L.value,fill:"black"},null,8,nl)],64)):h("",!0),u.density==="繁"?(s(),o(f,{key:1},[l("path",{d:d.value,fill:"black"},null,8,sl),a[0]||(a[0]=l("circle",{cx:"300",cy:"120",r:"5",fill:"black"},null,-1)),a[1]||(a[1]=l("circle",{cx:"276",cy:"153",r:"4",fill:"black"},null,-1)),a[2]||(a[2]=l("circle",{cx:"324",cy:"153",r:"4",fill:"black"},null,-1))],64)):h("",!0)],8,Q))),128)),u.motif==="福"?(s(),o("text",ol," 福 ")):h("",!0),u.density!=="简"&&u.motif!=="福"?(s(),o("circle",rl)):h("",!0),u.density==="繁"?(s(),o("circle",{key:3,cx:"300",cy:"300",r:u.motif==="福"?112:159,fill:"none",stroke:"black","stroke-width":"4","stroke-dasharray":"3 14"},null,8,ul)):h("",!0)]),l("radialGradient",{id:B,cx:"42%",cy:"35%",r:"72%"},[l("stop",{offset:"0%","stop-color":E.value},null,8,il),l("stop",{offset:"72%","stop-color":R.value},null,8,al),l("stop",{offset:"100%","stop-color":T.value},null,8,dl)]),l("filter",{id:D,x:"-30%",y:"-30%",width:"160%",height:"160%"},[...a[5]||(a[5]=[l("feDropShadow",{dx:"0",dy:"16",stdDeviation:"16","flood-color":"#6e3029","flood-opacity":".16"},null,-1)])])]),a[6]||(a[6]=l("circle",{cx:"300",cy:"310",r:"247",fill:"#eadfd4",opacity:".55"},null,-1)),l("g",{class:"paper-figure",filter:`url(#${D})`},[l("circle",{cx:"300",cy:"300",r:"246",fill:`url(#${B})`,mask:`url(#${P})`},null,8,vl),u.colorScheme==="红金"?(s(),o("g",{key:0,mask:`url(#${P})`,opacity:".9"},[l("circle",{cx:"300",cy:"300",r:"227",fill:"none",stroke:_.value,"stroke-width":"3"},null,8,pl),l("circle",{cx:"300",cy:"300",r:u.motif==="福"?92:82,fill:"none",stroke:_.value,"stroke-width":"3"},null,8,yl),(s(!0),o(f,null,C(u.folds,y=>(s(),o("g",{key:`gold-${y}`,transform:p(y-1)},[l("circle",{cx:"300",cy:"84",r:"5",fill:_.value},null,8,gl)],8,Cl))),128))],8,fl)):h("",!0),u.colorScheme==="彩色"?(s(),o("g",{key:1,mask:`url(#${P})`},[(s(!0),o(f,null,C(u.folds,y=>(s(),o("g",{key:`color-${y}`,transform:p(y-1)},[l("ellipse",{cx:"300",cy:"103",rx:"10",ry:"19",fill:y%3===0?"#d0a64b":y%3===1?"#326d69":"#d57a61",opacity:".88"},null,8,bl),l("circle",{cx:"300",cy:"192",r:"7",fill:y%2===0?"#e0ad4a":"#3f7771"},null,8,$l)],8,ml))),128))],8,kl)):h("",!0),l("circle",{cx:"300",cy:"300",r:S.value,fill:"none",stroke:u.colorScheme==="单红"?"#f3d3c7":_.value,"stroke-width":"3",opacity:".84"},null,8,Ll)],8,cl)],8,J)),l("div",hl,[l("span",null,n(u.motif)+" MOTIF ",1),l("strong",null,n(u.folds),1),a[7]||(a[7]=l("small",null," FOLD ",-1)),a[8]||(a[8]=l("i",null,null,-1)),l("b",null,n(M.value)+"° ",1),a[9]||(a[9]=l("em",null," 单元旋转角 ",-1))])]))}}),_l=A(Ml,[["__scopeId","data-v-2fd7f1be"]]),w=[{key:"花",name:"花卉纹",english:"FLORAL MOTIF",meaning:"繁盛、生命、吉祥",structure:"花瓣沿中心轴展开，适合形成放射式对称结构。",regions:["陕西","河北","山西","山东"],description:"以花瓣和枝叶为基本视觉单位，是传统剪纸中最常见的装饰语言之一。"},{key:"鸟",name:"鸟纹",english:"BIRD MOTIF",meaning:"祥瑞、自由、生命延续",structure:"以鸟身、羽翼和尾羽构成具有方向性的剪刻单元。",regions:["陕西","山东","江苏","浙江"],description:"鸟纹常与花草组合出现，在婚庆、节令与生命主题剪纸中较为常见。"},{key:"鱼",name:"鱼纹",english:"FISH MOTIF",meaning:"富足、有余、繁衍",structure:"椭圆鱼身与三角尾部形成清晰轮廓，适合连续与环形排列。",regions:["河北","山东","江苏","福建"],description:"鱼纹常借“鱼”与“余”的谐音表达丰收、富足和年年有余。"},{key:"蝶",name:"蝶纹",english:"BUTTERFLY MOTIF",meaning:"美好、爱情、生命变化",structure:"双翼镜像展开，本身具有天然的左右对称特征。",regions:["江苏","浙江","广东","福建"],description:"蝴蝶结构轻盈而对称，经常用于花蝶、喜庆和爱情主题的剪纸作品。"},{key:"福",name:"福字纹",english:"FORTUNE MOTIF",meaning:"福运、吉祥、团圆",structure:"以中央文字为视觉核心，外围配合放射式几何纹样形成团花。",regions:["全国"],description:"“福”是春节与吉庆剪纸中的核心文字纹样，常与花卉、祥云等元素组合。"}],z={花:w[0],鸟:w[1],鱼:w[2],蝶:w[3],福:w[4]},xl={class:"pattern-lab"},wl={class:"pattern-grid"},Tl=["onClick"],Sl={class:"pattern-icon"},Zl={viewBox:"0 0 120 120"},Rl={key:4,x:"60",y:"82","text-anchor":"middle"},Ol={class:"detail-main"},Il={class:"detail-grid"},Pl=U({__name:"PatternLab",emits:["select-pattern"],setup(u,{emit:m}){const i=b("花"),M=m,p=v(()=>z[i.value]);function $(c){i.value=c,M("select-pattern",c)}return(c,e)=>(s(),o("section",xl,[e[14]||(e[14]=l("header",{class:"pattern-header"},[l("div",null,[l("span",null," PATTERN LAB "),l("h2",null,"剪纸纹样基因库")]),l("p",null,"探索传统剪纸中的视觉符号， 从纹样结构、文化寓意到地域来源， 解析非遗艺术中的图形基因。")],-1)),l("div",wl,[(s(!0),o(f,null,C(V(w),d=>(s(),o("article",{key:d.key,class:x(["pattern-card",{active:i.value===d.key}]),onClick:g=>$(d.key)},[l("div",Sl,[(s(),o("svg",Zl,[d.key==="花"?(s(),o(f,{key:0},[e[0]||(e[0]=l("circle",{cx:"60",cy:"35",r:"18"},null,-1)),e[1]||(e[1]=l("circle",{cx:"35",cy:"60",r:"18"},null,-1)),e[2]||(e[2]=l("circle",{cx:"85",cy:"60",r:"18"},null,-1)),e[3]||(e[3]=l("circle",{cx:"60",cy:"85",r:"18"},null,-1))],64)):d.key==="鸟"?(s(),o(f,{key:1},[e[4]||(e[4]=l("path",{d:`
                M30 60
                C45 30
                80 35
                90 60
                C75 85
                45 90
                30 60Z
                `},null,-1)),e[5]||(e[5]=l("path",{d:`
                M70 55
                L105 45
                L80 65
                `},null,-1))],64)):d.key==="鱼"?(s(),o(f,{key:2},[e[6]||(e[6]=l("ellipse",{cx:"58",cy:"60",rx:"35",ry:"25"},null,-1)),e[7]||(e[7]=l("path",{d:`
                M90 60
                L112 42
                L112 78
                Z
                `},null,-1))],64)):d.key==="蝶"?(s(),o(f,{key:3},[e[8]||(e[8]=l("path",{d:`
                M60 55
                C20 10 10 70 60 70
                C110 70 100 10 60 55
                `},null,-1)),e[9]||(e[9]=l("line",{x1:"60",y1:"45",x2:"60",y2:"90"},null,-1))],64)):(s(),o("text",Rl,"福"))]))]),l("div",null,[l("h3",null,n(d.name),1),l("small",null,n(d.english),1)])],10,Tl))),128))]),H(Y,{name:"fade",mode:"out-in"},{default:j(()=>[(s(),o("article",{class:"pattern-detail",key:p.value.key},[l("div",Ol,[e[10]||(e[10]=l("span",null," CULTURAL DNA ",-1)),l("h3",null,n(p.value.name),1),l("p",null,n(p.value.description),1)]),l("div",Il,[l("div",null,[e[11]||(e[11]=l("label",null," 文化寓意 ",-1)),l("strong",null,n(p.value.meaning),1)]),l("div",null,[e[12]||(e[12]=l("label",null," 结构特征 ",-1)),l("strong",null,n(p.value.structure),1)]),l("div",null,[e[13]||(e[13]=l("label",null," 常见地域 ",-1)),l("strong",null,[(s(!0),o(f,null,C(p.value.regions,d=>(s(),o("span",{key:d},n(d),1))),128))])])])]))]),_:1})]))}}),El=A(Pl,[["__scopeId","data-v-be1608eb"]]),Nl={class:"creator-page"},Fl={class:"creator-workspace"},Ul={class:"creator-panel"},Al={class:"control-group"},Gl={class:"option-list option-list--style"},Bl=["onClick"],Dl={class:"control-group"},Vl={class:"control-group__heading"},Hl={class:"option-list option-list--fold"},zl=["onClick"],Yl={class:"control-group"},jl={class:"option-list"},Kl=["onClick"],Wl={class:"control-group"},Xl={class:"option-list"},Jl=["onClick"],ql={class:"control-group"},Ql={class:"option-list"},lt=["onClick"],tt={class:"creator-preview"},et={class:"preview-title"},nt={class:"paper-stage"},st={class:"preview-bottom"},ot={class:"creator-info"},rt={class:"creator-info__name"},ut={class:"creator-info__tags"},it={class:"creator-code"},at={class:"creator-info__principle"},dt=U({__name:"Creator",setup(u){const m=[{value:"北方剪纸",label:"北方",english:"NORTHERN",description:"块面饱满，强调民俗气息与强烈的视觉节奏。"},{value:"南方剪纸",label:"南方",english:"SOUTHERN",description:"线条纤细，镂空轻盈，更强调结构与留白。"},{value:"彩色蔚县",label:"蔚县",english:"YUXIAN COLOR",description:"以彩色点染与套色表现形成鲜明装饰性。"},{value:"民族图腾",label:"民族",english:"ETHNIC TOTEM",description:"几何符号更突出，强调图腾、仪式与地域文化。"}],i=[4,6,8,12],M=w.map(k=>k.key),p=["简","中","繁"],$=["单红","红金","彩色"],c=b("北方剪纸"),e=b(8),d=b("花"),g=b("中"),L=b("单红"),S=b(1),R=b(),E=v(()=>[c.value,d.value,e.value,g.value,L.value,S.value].join("-")),T=v(()=>Math.round(360/e.value)),_=v(()=>m.find(k=>k.value===c.value)??m[0]),Z=v(()=>z[d.value]),O=v(()=>_.value.english),a=v(()=>`
PC-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${d.value}-${e.value}-${String(S.value).padStart(3,"0")}
 `.trim());function y(){S.value+=1}function N(k){switch(k){case"红金":return"gold";case"彩色":return"multi";default:return"red"}}function F(){var t;const k=(t=R.value)==null?void 0:t.getSVG();k&&W(k,a.value+".svg")}return(k,t)=>(s(),o("main",Nl,[t[27]||(t[27]=l("section",{class:"creator-header"},[l("div",null,[l("span",null," DIGITAL PAPER-CUTTING LAB "),l("h1",null,"数字剪纸实验室")]),l("p",null," 将传统剪纸折叠结构、地域风格与数字生成技术结合， 通过参数改变观察一张虚拟红纸如何形成不同的对称结构。 ")],-1)),l("section",Fl,[l("aside",Ul,[t[7]||(t[7]=l("header",null,[l("span",null," GENERATOR PANEL "),l("h2",null,"参数设置")],-1)),l("div",Al,[t[1]||(t[1]=l("div",{class:"control-group__heading"},[l("label",null," 地域风格 "),l("small",null," STYLE ")],-1)),l("div",Gl,[(s(),o(f,null,C(m,r=>l("button",{key:r.value,type:"button",class:x({active:c.value===r.value}),onClick:I=>c.value=r.value},[l("strong",null,n(r.label),1),l("span",null,n(r.description),1)],10,Bl)),64))])]),l("div",Dl,[l("div",Vl,[t[2]||(t[2]=l("label",null," 折叠结构 ",-1)),l("small",null,n(T.value)+"° / 单元 ",1)]),l("div",Hl,[(s(),o(f,null,C(i,r=>l("button",{key:r,type:"button",class:x({active:e.value===r}),onClick:I=>e.value=r},[l("strong",null,n(r),1),t[3]||(t[3]=l("span",null,"折",-1))],10,zl)),64))])]),l("div",Yl,[t[4]||(t[4]=l("div",{class:"control-group__heading"},[l("label",null," 基础纹样 "),l("small",null," PATTERN ")],-1)),l("div",jl,[(s(!0),o(f,null,C(V(M),r=>(s(),o("button",{key:r,type:"button",class:x({active:d.value===r}),onClick:I=>d.value=r},n(r),11,Kl))),128))])]),l("div",Wl,[t[5]||(t[5]=l("div",{class:"control-group__heading"},[l("label",null," 纹样复杂度 "),l("small",null," DENSITY ")],-1)),l("div",Xl,[(s(),o(f,null,C(p,r=>l("button",{key:r,type:"button",class:x({active:g.value===r}),onClick:I=>g.value=r},n(r),11,Jl)),64))])]),l("div",ql,[t[6]||(t[6]=l("div",{class:"control-group__heading"},[l("label",null," 色彩方案 "),l("small",null," COLOR ")],-1)),l("div",Ql,[(s(),o(f,null,C($,r=>l("button",{key:r,type:"button",class:x({active:L.value===r}),onClick:I=>L.value=r},[l("i",{class:x(["color-dot",`color-dot--${N(r)}`])},null,2),G(" "+n(r),1)],10,lt)),64))])])]),l("section",tt,[l("div",et,[t[8]||(t[8]=l("div",null,[l("span",null," LIVE PREVIEW "),l("strong",null," 参数化剪纸生成 ")],-1)),l("small",null," SVG · "+n(e.value)+" FOLD · "+n(c.value),1)]),l("div",nt,[t[9]||(t[9]=l("div",{class:"paper-stage__corner paper-stage__corner--lt"},null,-1)),t[10]||(t[10]=l("div",{class:"paper-stage__corner paper-stage__corner--rb"},null,-1)),(s(),K(_l,{ref_key:"generatorRef",ref:R,key:E.value,folds:e.value,"style-preset":c.value,density:g.value,"color-scheme":L.value,motif:d.value},null,8,["folds","style-preset","density","color-scheme","motif"]))]),l("div",st,[l("p",null,[t[11]||(t[11]=l("span",null," STRUCTURE ",-1)),G(" "+n(e.value)+" 个对称单元围绕圆心旋转， 单元角度为 "+n(T.value)+"°。 ",1)]),l("button",{type:"button",class:"generate-btn",onClick:y},[t[12]||(t[12]=l("span",null," 重新生成 ",-1)),l("button",{class:"generate-btn download-btn",onClick:F},"下载SVG"),t[13]||(t[13]=l("i",null,"↻",-1))])])]),l("aside",ot,[t[25]||(t[25]=l("div",{class:"creator-info__watermark"},"剪",-1)),l("header",null,[t[14]||(t[14]=l("div",null,[l("span",null," CREATION INFO "),l("small",null," 当前生成参数 ")],-1)),l("strong",null,n(e.value),1)]),l("div",rt,[l("span",null,n(O.value),1),l("h2",null,n(c.value),1),l("p",null,n(_.value.description),1)]),l("div",ut,[l("span",null,n(e.value)+"折 ",1),l("span",null,n(g.value)+"密度 ",1),l("span",null,n(L.value),1)]),l("dl",null,[l("div",null,[t[15]||(t[15]=l("dt",null,"地域风格",-1)),l("dd",null,n(c.value),1)]),l("div",null,[t[16]||(t[16]=l("dt",null,"对称结构",-1)),l("dd",null,n(e.value)+" 重旋转对称",1)]),l("div",null,[t[17]||(t[17]=l("dt",null,"单元角度",-1)),l("dd",null,n(T.value)+"°",1)]),l("div",null,[t[18]||(t[18]=l("dt",null,"基础纹样",-1)),l("dd",null,n(Z.value.name),1)]),l("div",null,[t[19]||(t[19]=l("dt",null,"文化寓意",-1)),l("dd",null,n(Z.value.meaning),1)]),l("div",null,[t[20]||(t[20]=l("dt",null,"复杂程度",-1)),l("dd",null,n(g.value),1)]),l("div",null,[t[21]||(t[21]=l("dt",null,"色彩方案",-1)),l("dd",null,n(L.value),1)]),l("div",null,[t[22]||(t[22]=l("dt",null,"当前编号",-1)),l("dd",it,n(a.value),1)])]),l("div",at,[t[23]||(t[23]=l("span",null," GENERATION PRINCIPLE ",-1)),t[24]||(t[24]=l("strong",null," 单元纹样 × 旋转复制 ",-1)),l("p",null," 以圆心为基准，将一个基础镂空单元按 "+n(T.value)+"° 间隔复制 "+n(e.value)+" 次， 形成传统窗花常见的放射式对称结构。 ",1)]),t[26]||(t[26]=l("footer",null,[l("i"),l("p",null,"当前作品由地域风格、折叠结构、 文化纹样、复杂度与色彩参数共同生成。")],-1))])]),H(El,{onSelectPattern:t[0]||(t[0]=r=>d.value=r)})]))}}),vt=A(dt,[["__scopeId","data-v-25b72843"]]);export{vt as default};
