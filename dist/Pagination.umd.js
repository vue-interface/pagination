(function(o,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(o=typeof globalThis<"u"?globalThis:o||self,e(o.Pagination={},o.Vue))})(this,function(o,e){"use strict";const d=e.defineComponent({props:{dropShadow:{type:[Boolean,String],default:void 0},dropShadowableClassPrefix:{type:String,default:"drop-shadow"},shadow:{type:[Boolean,String],default:void 0},shadowableClassPrefix:{type:String,default:"shadow"}},computed:{shadowableClass(){const t=this.dropShadow===!0?"":this.dropShadow&&`-${this.dropShadow}`,s=this.shadow===!0?"":this.shadow&&`-${this.shadow}`;return{[`${this.dropShadowableClassPrefix}${t}`]:!!this.dropShadow,[`${this.shadowableClassPrefix}${s}`]:!!this.shadow}}}}),h=e.defineComponent({props:{componentPrefix:String,size:String,sizePrefix:String},computed:{sizeableClassPrefix(){return this.sizePrefix||this.componentPrefix},hasSizeablePrefix(){return this.size===void 0?!1:!!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`))},sizeableClass(){return this.size?!this.sizeableClassPrefix||this.hasSizeablePrefix?this.size:`${this.sizeableClassPrefix}-${this.size}`:""}}}),c=(t,s)=>{const i=t.__vccOpts||t;for(const[l,n]of s)i[l]=n;return i},g={name:"Pagination",mixins:[d,h],props:{align:{type:String,validate:t=>["start","end","center"].indexOf(t)!==-1},disabled:Boolean,page:{type:Number,default:1},showPages:{type:Number,default:6},totalPages:{type:Number,default:1},componentPrefix:{type:String,default:"pagination"}},data(){return{currentPage:this.page}},computed:{pages(){return this.generate()},classes(){return Object.assign({[this.sizeableClass]:!!this.sizeableClass,[`justify-content-${this.align}`]:!!this.align},this.shadowableClass)}},methods:{next(t){this.paginate(this.currentPage>=this.totalPages?this.currentPage:this.currentPage+1,t)},prev(t){this.paginate(this.currentPage<=1?this.currentPage:this.currentPage-1,t)},paginate(t,s){s.currentTarget.parentNode.classList.contains("disabled")||(this.currentPage=t,this.$emit("paginate",t,s))},generate(){const t=[],s=this.showPages%2?this.showPages+1:this.showPages;let i=this.currentPage>=s?this.currentPage-s/2:1;const l=s+i,n=this.totalPages<l?this.totalPages:l,r=i-n+s;i-=i-r>0?r:0,i>1&&t.push({page:1}),i>2&&t.push({divider:!0});for(let a=i;a<n;a++)t.push({page:a});return n<=this.totalPages&&(this.totalPages-1>n&&t.push({divider:!0}),t.push({page:this.totalPages<1/0?this.totalPages:"&#8734;",disabled:this.totalPages===1/0})),t}}},p=[e.createElementVNode("span",{"aria-hidden":"true"}," \xAB ",-1)],f=["data-page"],P={key:0,class:"page-link"},u=["disabled","data-label","onClick"],b=["innerHTML"],m=["innerHTML"],_=[e.createElementVNode("span",{"aria-hidden":"true"}," \xBB ",-1)];function k(t,s,i,l,n,r){return e.openBlock(),e.createElementBlock("nav",null,[e.createElementVNode("ul",{class:e.normalizeClass(["pagination",r.classes])},[e.createElementVNode("li",{class:e.normalizeClass(["page-item",{disabled:i.disabled||n.currentPage===1}])},[e.createElementVNode("a",{href:"#",class:"page-link","aria-label":"Previous",onClick:s[0]||(s[0]=e.withModifiers(a=>r.prev(a),["prevent"]))},p)],2),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(r.pages,(a,C)=>(e.openBlock(),e.createElementBlock("li",{key:C,"data-page":a.page,class:e.normalizeClass(["page-item",{active:a.page===n.currentPage,disabled:i.disabled||!!a.divider||!!a.disabled}])},[e.renderSlot(t.$slots,"default",{item:a},()=>[a.divider?(e.openBlock(),e.createElementBlock("a",P," \u2026 ")):(e.openBlock(),e.createElementBlock("a",{key:1,href:"#",class:e.normalizeClass(["page-link",a.class]),disabled:i.disabled,"data-label":a.label,onClick:e.withModifiers(x=>r.paginate(a.page,x),["prevent"])},[a.label?(e.openBlock(),e.createElementBlock("span",{key:0,"aria-hidden":"true",innerHTML:a.label},null,8,b)):e.createCommentVNode("",!0),a.page?(e.openBlock(),e.createElementBlock("span",{key:1,"aria-hidden":"true",innerHTML:a.page},null,8,m)):e.createCommentVNode("",!0)],10,u))])],10,f))),128)),e.createElementVNode("li",{class:e.normalizeClass(["page-item",{disabled:i.disabled||n.currentPage>=i.totalPages}])},[e.createElementVNode("a",{href:"#",class:"page-link","aria-label":"Next",onClick:s[1]||(s[1]=e.withModifiers(a=>r.next(a),["prevent"]))},_)],2)],2)])}const w=c(g,[["render",k]]);o.Pagination=w,Object.defineProperties(o,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
