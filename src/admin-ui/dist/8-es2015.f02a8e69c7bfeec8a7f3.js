(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"42hq":function(t,e,c){"use strict";c.r(e),c.d(e,"DEFAULT_DASHBOARD_WIDGET_LAYOUT",function(){return N}),c.d(e,"DEFAULT_WIDGETS",function(){return Z}),c.d(e,"DashboardComponent",function(){return z}),c.d(e,"DashboardModule",function(){return tt}),c.d(e,"DashboardWidgetComponent",function(){return F}),c.d(e,"LatestOrdersWidgetComponent",function(){return A}),c.d(e,"LatestOrdersWidgetModule",function(){return q}),c.d(e,"OrderSummaryWidgetComponent",function(){return X}),c.d(e,"OrderSummaryWidgetModule",function(){return B}),c.d(e,"TestWidgetComponent",function(){return E}),c.d(e,"TestWidgetModule",function(){return U}),c.d(e,"WelcomeWidgetComponent",function(){return Y}),c.d(e,"WelcomeWidgetModule",function(){return K}),c.d(e,"dashboardRoutes",function(){return R}),c.d(e,"\u02750",function(){return G}),c.d(e,"\u02751",function(){return J}),c.d(e,"\u02752",function(){return H}),c.d(e,"\u02753",function(){return Q});var n=c("EM62"),i=c("ixhn"),r=c("hG4v"),o=c("YtkY"),a=c("8j5Y"),d=c("Ohay"),s=c("wqq/"),l=c("TLy2"),u=c("D57K"),g=c("sEIs"),p=c("OxKu"),h=c("BQ33"),b=c.n(h),m=c("C05f"),f=c("Kej3"),y=c("2kYt"),v=c("oqI+"),w=c("s2Ay");function O(t,e){if(1&t){const t=n.kc();n.jc(0,"button",7),n.qc("click",function(){n.Mc(t);const c=e.$implicit;return n.sc().addWidget(c)}),n.Vc(1),n.ic()}if(2&t){const t=e.$implicit;n.Sb(1),n.Xc(" ",t," ")}}const j=function(t){return{width:t}};function S(t,e){if(1&t){const t=n.kc();n.jc(0,"button",22),n.qc("click",function(){n.Mc(t);const c=e.$implicit,i=n.sc(2).$implicit;return n.sc(2).setWidgetWidth(i,c)}),n.Vc(1),n.tc(2,"translate"),n.ic()}if(2&t){const t=e.$implicit,c=n.sc(2).$implicit;n.zc("disabled",t===c.width),n.Sb(1),n.Xc(" ",n.vc(2,2,"dashboard.widget-width",n.Dc(5,j,t))," ")}}function C(t,e){if(1&t){const t=n.kc();n.jc(0,"vdr-dashboard-widget",12),n.jc(1,"div",13),n.jc(2,"div",14),n.ec(3,"clr-icon",15),n.ic(),n.jc(4,"vdr-dropdown"),n.jc(5,"button",16),n.ec(6,"clr-icon",17),n.ic(),n.jc(7,"vdr-dropdown-menu",3),n.jc(8,"h4",18),n.Vc(9),n.tc(10,"translate"),n.ic(),n.Tc(11,S,3,7,"button",19),n.ec(12,"div",20),n.jc(13,"button",7),n.qc("click",function(){n.Mc(t);const e=n.sc().$implicit;return n.sc(2).removeWidget(e)}),n.ec(14,"clr-icon",21),n.Vc(15),n.tc(16,"translate"),n.ic(),n.ic(),n.ic(),n.ic(),n.ic()}if(2&t){const t=n.sc().$implicit,e=n.sc(2);n.zc("widgetConfig",t.config),n.Sb(9),n.Wc(n.uc(10,4,"dashboard.widget-resize")),n.Sb(2),n.zc("ngForOf",e.getSupportedWidths(t.config)),n.Sb(4),n.Xc(" ",n.uc(16,6,"dashboard.remove-widget")," ")}}function k(t,e){if(1&t&&(n.jc(0,"div",10),n.Tc(1,C,17,8,"vdr-dashboard-widget",11),n.ic()),2&t){const t=e.$implicit,c=n.sc(2);n.zc("ngClass",c.getClassForWidth(t.width))("cdkDragData",t),n.Sb(1),n.zc("vdrIfPermissions",t.config.requiresPermissions||null)}}const D=function(t){return{index:t}};function W(t,e){if(1&t){const t=n.kc();n.jc(0,"div",8),n.qc("cdkDropListDropped",function(e){n.Mc(t);return n.sc().drop(e)}),n.Tc(1,k,2,3,"div",9),n.ic()}if(2&t){const t=e.$implicit,c=e.index,i=n.sc();n.zc("cdkDropListData",n.Dc(3,D,c)),n.Sb(1),n.zc("ngForOf",t)("ngForTrackBy",i.trackRowItem)}}const L=["portal"];function M(t,e){if(1&t&&(n.hc(0),n.Vc(1),n.tc(2,"translate"),n.gc()),2&t){const t=e.ngIf;n.Sb(1),n.Wc(n.uc(2,1,t))}}function P(t,e){}const I=function(t){return["/orders/",t]};function x(t,e){if(1&t&&(n.jc(0,"td",1),n.Vc(1),n.ec(2,"vdr-order-state-label",2),n.ic(),n.jc(3,"td",1),n.ec(4,"vdr-customer-label",3),n.ic(),n.jc(5,"td",1),n.Vc(6),n.tc(7,"localeCurrency"),n.ic(),n.jc(8,"td",1),n.Vc(9),n.tc(10,"timeAgo"),n.ic(),n.jc(11,"td",4),n.ec(12,"vdr-table-row-action",5),n.tc(13,"translate"),n.ic()),2&t){const t=e.item;n.Sb(1),n.Xc(" ",t.code," "),n.Sb(1),n.zc("state",t.state),n.Sb(2),n.zc("customer",t.customer),n.Sb(2),n.Wc(n.vc(7,7,t.total,t.currencyCode)),n.Sb(3),n.Wc(n.uc(10,10,t.orderPlacedAt)),n.Sb(3),n.zc("label",n.uc(13,12,"common.open"))("linkTo",n.Dc(14,I,t.id))}}function V(t,e){if(1&t){const t=n.kc();n.jc(0,"div",7),n.jc(1,"button",8),n.qc("click",function(){n.Mc(t);const e=n.sc();return e.selection$.next({timeframe:"day",date:e.today})}),n.Vc(2),n.tc(3,"translate"),n.ic(),n.jc(4,"button",8),n.qc("click",function(){n.Mc(t);const e=n.sc();return e.selection$.next({timeframe:"day",date:e.yesterday})}),n.Vc(5),n.tc(6,"translate"),n.ic(),n.jc(7,"button",8),n.qc("click",function(){n.Mc(t);return n.sc().selection$.next({timeframe:"week"})}),n.Vc(8),n.tc(9,"translate"),n.ic(),n.jc(10,"button",8),n.qc("click",function(){n.Mc(t);return n.sc().selection$.next({timeframe:"month"})}),n.Vc(11),n.tc(12,"translate"),n.ic(),n.ic()}if(2&t){const t=e.ngIf,c=n.sc();n.Sb(1),n.Vb("btn-primary",t.date===c.today),n.Sb(1),n.Xc(" ",n.uc(3,12,"dashboard.today")," "),n.Sb(2),n.Vb("btn-primary",t.date===c.yesterday),n.Sb(1),n.Xc(" ",n.uc(6,14,"dashboard.yesterday")," "),n.Sb(2),n.Vb("btn-primary","week"===t.timeframe),n.Sb(1),n.Xc(" ",n.uc(9,16,"dashboard.thisWeek")," "),n.Sb(2),n.Vb("btn-primary","month"===t.timeframe),n.Sb(1),n.Xc(" ",n.uc(12,18,"dashboard.thisMonth")," ")}}function $(t,e){if(1&t&&(n.jc(0,"div",9),n.Vc(1),n.tc(2,"localeDate"),n.tc(3,"localeDate"),n.ic()),2&t){const t=e.ngIf;n.Sb(1),n.Yc(" ",n.uc(2,2,t.start)," - ",n.uc(3,4,t.end)," ")}}function _(t,e){if(1&t&&(n.jc(0,"p",4),n.Vc(1),n.ic()),2&t){const t=n.sc(2);n.Sb(1),n.Yc(" ",t.hideVendureBranding?"":"Vendure"," ",t.hideVersion?"":"Admin UI v"+t.version," ")}}function T(t,e){if(1&t&&(n.jc(0,"div"),n.jc(1,"h4",3),n.Vc(2),n.ec(3,"br"),n.jc(4,"small",4),n.Vc(5),n.tc(6,"timeAgo"),n.ic(),n.ic(),n.Tc(7,_,2,2,"p",5),n.ic()),2&t){const t=e.ngIf,c=n.sc();n.Sb(2),n.Yc(" Welcome, ",t.firstName," ",t.lastName,""),n.Sb(3),n.Xc("Last login: ",n.uc(6,4,t.user.lastLogin),""),n.Sb(2),n.zc("ngIf",!c.hideVendureBranding||!c.hideVersion)}}class z{constructor(t,e,c,n){this.dashboardWidgetService=t,this.localStorageService=e,this.changedDetectorRef=c,this.dataService=n,this.deletionMarker="__delete__"}ngOnInit(){this.availableWidgetIds$=this.dataService.client.userStatus().stream$.pipe(Object(o.a)(({userStatus:t})=>t.permissions),Object(o.a)(t=>this.dashboardWidgetService.getAvailableIds(t)),Object(a.a)(t=>this.widgetLayout=this.initLayout(t)))}getClassForWidth(t){switch(t){case 3:return"clr-col-12 clr-col-sm-6 clr-col-lg-3";case 4:return"clr-col-12 clr-col-sm-6 clr-col-lg-4";case 6:return"clr-col-12 clr-col-lg-6";case 8:return"clr-col-12 clr-col-lg-8";case 12:return"clr-col-12";default:Object(r.assertNever)(t)}}getSupportedWidths(t){return t.supportedWidths||[3,4,6,8,12]}setWidgetWidth(t,e){t.width=e,this.recalculateLayout()}trackRow(t,e){return e.map(t=>`${t.id}:${t.width}`).join("|")}trackRowItem(t,e){return e.config}addWidget(t){var e;const c=this.dashboardWidgetService.getWidgetById(t);if(c){const n={id:t,config:c,width:this.getSupportedWidths(c)[0]};let i;this.widgetLayout&&this.widgetLayout.length?i=this.widgetLayout[this.widgetLayout.length-1]:(i=[],null===(e=this.widgetLayout)||void 0===e||e.push(i)),i.push(n),this.recalculateLayout()}}removeWidget(t){t.id=this.deletionMarker,this.recalculateLayout()}drop(t){const{currentIndex:e,previousIndex:c,previousContainer:n,container:i}=t;if((c!==e||n.data.index!==i.data.index)&&this.widgetLayout){const r=this.widgetLayout[n.data.index],o=this.widgetLayout[i.data.index];r.splice(c,1),o.splice(e,0,t.item.data),this.recalculateLayout()}}initLayout(t){const e=this.localStorageService.get("dashboardWidgetLayout");let c;return e&&(c=e.filter(e=>t.includes(e.id))),this.dashboardWidgetService.getWidgetLayout(c)}recalculateLayout(){if(this.widgetLayout){const t=this.widgetLayout.reduce((t,e)=>[...t,...e],[]).filter(t=>t.id!==this.deletionMarker).map(t=>({id:t.id,width:t.width}));this.widgetLayout=this.dashboardWidgetService.getWidgetLayout(t),this.localStorageService.set("dashboardWidgetLayout",t),setTimeout(()=>this.changedDetectorRef.markForCheck())}}}z.\u0275fac=function(t){return new(t||z)(n.dc(i.K),n.dc(i.xb),n.dc(n.k),n.dc(i.L))},z.\u0275cmp=n.Xb({type:z,selectors:[["vdr-dashboard"]],decls:11,vars:8,consts:[[1,"widget-header"],["vdrDropdownTrigger","",1,"btn","btn-secondary","btn-sm"],["shape","plus"],["vdrPosition","bottom-right"],["class","button","vdrDropdownItem","",3,"click",4,"ngFor","ngForOf"],["cdkDropListGroup",""],["class","clr-row dashboard-row","cdkDropList","","cdkDropListOrientation","horizontal",3,"cdkDropListData","cdkDropListDropped",4,"ngFor","ngForOf","ngForTrackBy"],["vdrDropdownItem","",1,"button",3,"click"],["cdkDropList","","cdkDropListOrientation","horizontal",1,"clr-row","dashboard-row",3,"cdkDropListData","cdkDropListDropped"],["class","dashboard-item","cdkDrag","",3,"ngClass","cdkDragData",4,"ngFor","ngForOf","ngForTrackBy"],["cdkDrag","",1,"dashboard-item",3,"ngClass","cdkDragData"],[3,"widgetConfig",4,"vdrIfPermissions"],[3,"widgetConfig"],[1,"flex"],["cdkDragHandle","",1,"drag-handle"],["shape","drag-handle","size","24"],["vdrDropdownTrigger","",1,"icon-button"],["shape","ellipsis-vertical"],[1,"dropdown-header"],["class","button","vdrDropdownItem","",3,"disabled","click",4,"ngFor","ngForOf"],["role","separator",1,"dropdown-divider"],["shape","trash",1,"is-danger"],["vdrDropdownItem","",1,"button",3,"disabled","click"]],template:function(t,e){1&t&&(n.jc(0,"div",0),n.jc(1,"vdr-dropdown"),n.jc(2,"button",1),n.ec(3,"clr-icon",2),n.Vc(4),n.tc(5,"translate"),n.ic(),n.jc(6,"vdr-dropdown-menu",3),n.Tc(7,O,2,1,"button",4),n.tc(8,"async"),n.ic(),n.ic(),n.ic(),n.jc(9,"div",5),n.Tc(10,W,2,5,"div",6),n.ic()),2&t&&(n.Sb(4),n.Xc(" ",n.uc(5,4,"dashboard.add-widget")," "),n.Sb(3),n.zc("ngForOf",n.uc(8,6,e.availableWidgetIds$)),n.Sb(3),n.zc("ngForOf",e.widgetLayout)("ngForTrackBy",e.trackRow))},directives:function(){return[i.T,i.W,f.o,i.V,y.n,v.d,f.l,i.U,v.c,v.a,y.m,i.qb,F,v.b]},pipes:function(){return[w.d,y.b]},styles:[".widget-header[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.placeholder[_ngcontent-%COMP%]{color:var(--color-grey-300);text-align:center}.placeholder[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]{font-size:3em;margin:24px;line-height:1em}.placeholder[_ngcontent-%COMP%]     .clr-i-outline{fill:var(--color-grey-200)}vdr-dashboard-widget[_ngcontent-%COMP%]{margin-bottom:24px}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.dashboard-row[_ngcontent-%COMP%]{padding:0;border-width:1;margin-bottom:6px;transition:padding .2s,margin .2s}.dashboard-row.cdk-drop-list-dragging[_ngcontent-%COMP%], .dashboard-row.cdk-drop-list-receiving[_ngcontent-%COMP%]{border:1px dashed var(--color-component-border-200);padding:6px}.dashboard-row.cdk-drop-list-dragging[_ngcontent-%COMP%]   .dashboard-item[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"],changeDetection:0}),z.ctorParameters=()=>[{type:i.K},{type:i.xb},{type:n.k},{type:i.L}];class F{constructor(t){this.componentFactoryResolver=t}ngAfterViewInit(){this.loadWidget()}loadWidget(){return Object(u.b)(this,void 0,void 0,function*(){const t=this.widgetConfig.loadComponent(),e=t instanceof Promise?yield t:t;this.componentRef=this.portal.createComponent(this.componentFactoryResolver.resolveComponentFactory(e)),this.componentRef.changeDetectorRef.markForCheck()})}ngOnDestroy(){this.componentRef&&this.componentRef.destroy()}}F.\u0275fac=function(t){return new(t||F)(n.dc(n.n))},F.\u0275cmp=n.Xb({type:F,selectors:[["vdr-dashboard-widget"]],viewQuery:function(t,e){if(1&t&&n.ad(L,1,n.hb),2&t){let t;n.Ic(t=n.rc())&&(e.portal=t.first)}},inputs:{widgetConfig:"widgetConfig"},ngContentSelectors:["*"],decls:9,vars:1,consts:[[1,"card"],[1,"card-header"],[1,"title"],[4,"ngIf"],[1,"controls"],[1,"card-block"],["portal",""]],template:function(t,e){1&t&&(n.yc(),n.jc(0,"div",0),n.jc(1,"div",1),n.jc(2,"div",2),n.Tc(3,M,3,3,"ng-container",3),n.ic(),n.jc(4,"div",4),n.xc(5),n.ic(),n.ic(),n.jc(6,"div",5),n.Tc(7,P,0,0,"ng-template",null,6,n.Uc),n.ic(),n.ic()),2&t&&(n.Sb(3),n.zc("ngIf",e.widgetConfig.title))},directives:[y.o],pipes:[w.d],styles:["[_nghost-%COMP%]{display:block}.card[_ngcontent-%COMP%]{margin-top:0;min-height:200px}.card-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between}"],changeDetection:0}),F.ctorParameters=()=>[{type:n.n}],F.propDecorators={widgetConfig:[{type:n.E}],portal:[{type:n.fb,args:["portal",{read:n.hb}]}]};const R=[{path:"",component:z,pathMatch:"full"}];class A{constructor(t){this.dataService=t}ngOnInit(){this.latestOrders$=this.dataService.order.getOrders({take:10,filter:{active:{eq:!1}},sort:{orderPlacedAt:i.Pb.DESC}}).refetchOnChannelChange().mapStream(t=>t.orders.items)}}A.\u0275fac=function(t){return new(t||A)(n.dc(i.L))},A.\u0275cmp=n.Xb({type:A,selectors:[["vdr-latest-orders-widget"]],decls:3,vars:3,consts:[[3,"items"],[1,"left","align-middle"],[3,"state"],[3,"customer"],[1,"right","align-middle"],["iconShape","shopping-cart",3,"label","linkTo"]],template:function(t,e){1&t&&(n.jc(0,"vdr-data-table",0),n.tc(1,"async"),n.Tc(2,x,14,16,"ng-template"),n.ic()),2&t&&n.zc("items",n.uc(1,1,e.latestOrders$))},directives:[i.N,i.Gb,i.J,i.Tb],pipes:[y.b,i.zb,i.Ub,w.d],styles:["vdr-data-table[_ngcontent-%COMP%]     table{margin-top:0}"],changeDetection:0}),A.ctorParameters=()=>[{type:i.L}];class q{}q.\u0275fac=function(t){return new(t||q)},q.\u0275mod=n.bc({type:q}),q.\u0275inj=n.ac({imports:[[i.F,i.Nb]]});class X{constructor(t){this.dataService=t,this.today=new Date,this.yesterday=new Date((new Date).setDate(this.today.getDate()-1)),this.selection$=new m.a({timeframe:"day",date:this.today})}ngOnInit(){this.dateRange$=this.selection$.pipe(Object(d.a)(),Object(o.a)(t=>({start:b()(t.date).startOf(t.timeframe).toDate(),end:b()(t.date).endOf(t.timeframe).toDate()})),Object(s.a)(1));const t=this.dateRange$.pipe(Object(l.a)(({start:t,end:e})=>this.dataService.order.getOrderSummary(t,e).refetchOnChannelChange().mapStream(t=>t.orders)),Object(s.a)(1));this.totalOrderCount$=t.pipe(Object(o.a)(t=>t.totalItems)),this.totalOrderValue$=t.pipe(Object(o.a)(t=>t.items.reduce((t,e)=>t+e.total,0)/100)),this.currencyCode$=this.dataService.settings.getActiveChannel().refetchOnChannelChange().mapStream(t=>t.activeChannel.currencyCode||void 0)}}X.\u0275fac=function(t){return new(t||X)(n.dc(i.L))},X.\u0275cmp=n.Xb({type:X,selectors:[["vdr-order-summary-widget"]],decls:22,vars:23,consts:[[1,"stats"],[1,"stat"],[1,"stat-figure"],[1,"stat-label"],[1,"footer"],["class","btn-group btn-outline-primary btn-sm",4,"ngIf"],["class","date-range p5",4,"ngIf"],[1,"btn-group","btn-outline-primary","btn-sm"],[1,"btn",3,"click"],[1,"date-range","p5"]],template:function(t,e){1&t&&(n.jc(0,"div",0),n.jc(1,"div",1),n.jc(2,"div",2),n.Vc(3),n.tc(4,"async"),n.ic(),n.jc(5,"div",3),n.Vc(6),n.tc(7,"translate"),n.ic(),n.ic(),n.jc(8,"div",1),n.jc(9,"div",2),n.Vc(10),n.tc(11,"currency"),n.tc(12,"async"),n.tc(13,"async"),n.ic(),n.jc(14,"div",3),n.Vc(15),n.tc(16,"translate"),n.ic(),n.ic(),n.ic(),n.jc(17,"div",4),n.Tc(18,V,13,20,"div",5),n.tc(19,"async"),n.Tc(20,$,4,6,"div",6),n.tc(21,"async"),n.ic()),2&t&&(n.Sb(3),n.Wc(n.uc(4,6,e.totalOrderCount$)),n.Sb(3),n.Wc(n.uc(7,8,"dashboard.total-orders")),n.Sb(4),n.Xc(" ",n.vc(11,10,n.uc(12,13,e.totalOrderValue$),n.uc(13,15,e.currencyCode$)||void 0)," "),n.Sb(5),n.Wc(n.uc(16,17,"dashboard.total-order-value")),n.Sb(3),n.zc("ngIf",n.uc(19,19,e.selection$)),n.Sb(2),n.zc("ngIf",n.uc(21,21,e.dateRange$)))},directives:[y.o],pipes:[y.b,w.d,y.d,i.Ab],styles:[".stats[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly}.stat[_ngcontent-%COMP%]{text-align:center}.stat-figure[_ngcontent-%COMP%]{font-size:2rem;line-height:3rem}.stat-label[_ngcontent-%COMP%]{text-transform:uppercase}.date-range[_ngcontent-%COMP%]{margin-top:0}.footer[_ngcontent-%COMP%]{margin-top:24px;display:flex;flex-direction:column;justify-content:space-between}@media screen and (min-width:768px){.footer[_ngcontent-%COMP%]{flex-direction:row}}"],changeDetection:0}),X.ctorParameters=()=>[{type:i.L}];class B{}B.\u0275fac=function(t){return new(t||B)},B.\u0275mod=n.bc({type:B}),B.\u0275inj=n.ac({imports:[[i.F]]});class E{}E.\u0275fac=function(t){return new(t||E)},E.\u0275cmp=n.Xb({type:E,selectors:[["vdr-test-widget"]],decls:2,vars:0,template:function(t,e){1&t&&(n.jc(0,"p"),n.Vc(1,"This is a test widget!"),n.ic())},styles:[""],changeDetection:0});class U{}U.\u0275fac=function(t){return new(t||U)},U.\u0275mod=n.bc({type:U}),U.\u0275inj=n.ac({});class Y{constructor(t){this.dataService=t,this.version=i.a,this.brand=Object(i.gc)().brand,this.hideVendureBranding=Object(i.gc)().hideVendureBranding,this.hideVersion=Object(i.gc)().hideVersion}ngOnInit(){this.administrator$=this.dataService.administrator.getActiveAdministrator().mapStream(t=>t.activeAdministrator||null)}}Y.\u0275fac=function(t){return new(t||Y)(n.dc(i.L))},Y.\u0275cmp=n.Xb({type:Y,selectors:[["vdr-welcome-widget"]],decls:4,vars:3,consts:[[4,"ngIf"],[1,"placeholder"],["shape","line-chart","size","128"],[1,"h4"],[1,"p5"],["class","p5",4,"ngIf"]],template:function(t,e){1&t&&(n.Tc(0,T,8,6,"div",0),n.tc(1,"async"),n.jc(2,"div",1),n.ec(3,"clr-icon",2),n.ic()),2&t&&n.zc("ngIf",n.uc(1,1,e.administrator$))},directives:[y.o,f.o],pipes:[y.b,i.Ub],styles:["[_nghost-%COMP%]{display:flex;justify-content:space-between}.placeholder[_ngcontent-%COMP%]{color:var(--color-grey-200)}"],changeDetection:0}),Y.ctorParameters=()=>[{type:i.L}];class K{}K.\u0275fac=function(t){return new(t||K)},K.\u0275mod=n.bc({type:K}),K.\u0275inj=n.ac({imports:[[i.F]]});const N=[{id:"welcome",width:12},{id:"orderSummary",width:6},{id:"latestOrders",width:6}],G=()=>Y,J=()=>X,H=()=>A,Q=()=>E,Z={welcome:{loadComponent:G},orderSummary:{title:Object(p.a)("dashboard.orders-summary"),loadComponent:J,requiresPermissions:[i.Ib.ReadOrder]},latestOrders:{title:Object(p.a)("dashboard.latest-orders"),loadComponent:H,supportedWidths:[6,8,12],requiresPermissions:[i.Ib.ReadOrder]},testWidget:{title:"Test Widget",loadComponent:Q}};class tt{constructor(t){Object.entries(Z).map(([e,c])=>t.registerWidget(e,c)),0===t.getDefaultLayout().length&&t.setDefaultLayout(N)}}tt.\u0275fac=function(t){return new(t||tt)(n.nc(i.K))},tt.\u0275mod=n.bc({type:tt}),tt.\u0275inj=n.ac({imports:[[i.Nb,g.i.forChild(R)]]}),tt.ctorParameters=()=>[{type:i.K}]}}]);
//# sourceMappingURL=8-es2015.f02a8e69c7bfeec8a7f3.js.map