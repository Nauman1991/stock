(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{tB2i:function(e,c,t){"use strict";t.r(c),t.d(c,"HealthCheckComponent",function(){return N}),t.d(c,"JobListComponent",function(){return Z}),t.d(c,"JobStateLabelComponent",function(){return F}),t.d(c,"SystemModule",function(){return A}),t.d(c,"systemRoutes",function(){return L}),t.d(c,"\u02750",function(){return q}),t.d(c,"\u02751",function(){return M});var n=t("EM62"),s=t("ixhn"),r=t("nIj0"),a=t("sEIs"),o=t("8lHc"),l=t("kuMc"),i=t("xVbo"),d=t("YtkY"),b=t("OxKu"),u=t("2kYt"),m=t("Kej3"),h=t("s2Ay"),g=t("jY47");function p(e,c){1&e&&(n.jc(0),n.bd(1),n.yc(2,"translate"),n.ic()),2&e&&(n.Tb(1),n.dd(" ",n.zc(2,1,"system.health-all-systems-up")," "))}function f(e,c){1&e&&(n.bd(0),n.yc(1,"translate")),2&e&&n.dd(" ",n.zc(1,1,"system.health-error")," ")}const y=function(e,c){return{"is-success":e,"is-danger":c}};function k(e,c){if(1&e&&(n.lc(0,"div",7),n.lc(1,"div",8),n.gc(2,"clr-icon",9),n.kc(),n.lc(3,"div",10),n.Zc(4,p,3,3,"ng-container",11),n.Zc(5,f,2,3,"ng-template",null,12,n.ad),n.lc(7,"div",13),n.bd(8),n.yc(9,"translate"),n.yc(10,"localeDate"),n.yc(11,"async"),n.kc(),n.kc(),n.kc()),2&e){const e=c.ngIf,t=n.Oc(6),s=n.xc();n.Tb(2),n.Ec("ngClass",n.Jc(13,y,"ok"===e,"ok"!==e)),n.Ub("shape","ok"===e?"check-circle":"exclamation-circle"),n.Tb(2),n.Ec("ngIf","ok"===e)("ngIfElse",t),n.Tb(4),n.ed(" ",n.zc(9,6,"system.health-last-checked"),": ",n.Ac(10,8,n.zc(11,11,s.healthCheckService.lastCheck$),"mediumTime")," ")}}function v(e,c){1&e&&(n.jc(0),n.gc(1,"clr-icon",17),n.bd(2),n.yc(3,"translate"),n.ic()),2&e&&(n.Tb(2),n.dd(" ",n.zc(3,1,"system.health-status-up")," "))}function T(e,c){1&e&&(n.gc(0,"clr-icon",18),n.bd(1),n.yc(2,"translate")),2&e&&(n.Tb(1),n.dd(" ",n.zc(2,1,"system.health-status-down")," "))}function E(e,c){if(1&e&&(n.lc(0,"tr"),n.lc(1,"td",14),n.bd(2),n.kc(),n.lc(3,"td",14),n.lc(4,"vdr-chip",15),n.Zc(5,v,4,3,"ng-container",11),n.Zc(6,T,3,3,"ng-template",null,16,n.ad),n.kc(),n.kc(),n.lc(8,"td",14),n.bd(9),n.kc(),n.kc()),2&e){const e=c.$implicit,t=n.Oc(7);n.Tb(2),n.cd(e.key),n.Tb(2),n.Ec("colorType","up"===e.result.status?"success":"error"),n.Tb(1),n.Ec("ngIf","up"===e.result.status)("ngIfElse",t),n.Tb(4),n.cd(e.result.message)}}function j(e,c){1&e&&(n.jc(0),n.bd(1),n.yc(2,"translate"),n.ic()),2&e&&(n.Tb(1),n.dd(" ",n.zc(2,1,"system.all-job-queues")," "))}function I(e,c){if(1&e&&(n.lc(0,"vdr-chip",8),n.bd(1),n.kc()),2&e){const e=n.xc().item;n.Ec("colorFrom",e.name),n.Tb(1),n.cd(e.name)}}function w(e,c){if(1&e&&(n.Zc(0,j,3,3,"ng-container",6),n.Zc(1,I,2,2,"ng-template",null,7,n.ad)),2&e){const e=c.item,t=n.Oc(2);n.Ec("ngIf","all"===e.name)("ngIfElse",t)}}function C(e,c){if(1&e&&(n.lc(0,"vdr-dropdown"),n.lc(1,"button",14),n.yc(2,"translate"),n.gc(3,"clr-icon",15),n.kc(),n.lc(4,"vdr-dropdown-menu"),n.lc(5,"div",16),n.gc(6,"vdr-object-tree",17),n.kc(),n.kc(),n.kc()),2&e){const e=n.xc().item;n.Tb(1),n.Ec("title",n.zc(2,2,"system.job-data")),n.Tb(5),n.Ec("value",e.data)}}function z(e,c){if(1&e&&(n.lc(0,"vdr-dropdown"),n.lc(1,"button",18),n.gc(2,"clr-icon",15),n.bd(3),n.yc(4,"translate"),n.kc(),n.lc(5,"vdr-dropdown-menu"),n.lc(6,"div",16),n.gc(7,"vdr-object-tree",17),n.kc(),n.kc(),n.kc()),2&e){const e=n.xc().item;n.Tb(3),n.dd(" ",n.zc(4,2,"system.job-result")," "),n.Tb(4),n.Ec("value",e.result)}}function P(e,c){if(1&e&&(n.lc(0,"vdr-dropdown"),n.lc(1,"button",18),n.gc(2,"clr-icon",19),n.bd(3),n.yc(4,"translate"),n.kc(),n.lc(5,"vdr-dropdown-menu"),n.lc(6,"div",16),n.bd(7),n.kc(),n.kc(),n.kc()),2&e){const e=n.xc().item;n.Tb(3),n.dd(" ",n.zc(4,2,"system.job-error")," "),n.Tb(4),n.dd(" ",e.error," ")}}const x=function(){return["DeleteSettings","DeleteSystem"]};function O(e,c){if(1&e){const e=n.mc();n.lc(0,"vdr-dropdown"),n.lc(1,"button",20),n.gc(2,"clr-icon",21),n.kc(),n.lc(3,"vdr-dropdown-menu",22),n.lc(4,"button",23),n.vc("click",function(){n.Sc(e);const c=n.xc().item;return n.xc().cancelJob(c.id)}),n.yc(5,"hasPermission"),n.gc(6,"clr-icon",24),n.bd(7),n.yc(8,"translate"),n.kc(),n.kc(),n.kc()}2&e&&(n.Tb(4),n.Ec("disabled",!n.zc(5,2,n.Hc(6,x))),n.Tb(3),n.dd(" ",n.zc(8,4,"common.cancel")," "))}function S(e,c){if(1&e&&(n.lc(0,"td",9),n.gc(1,"vdr-entity-info",10),n.kc(),n.lc(2,"td",9),n.Zc(3,C,7,4,"vdr-dropdown",11),n.lc(4,"vdr-chip",8),n.bd(5),n.kc(),n.kc(),n.lc(6,"td",9),n.bd(7),n.yc(8,"timeAgo"),n.kc(),n.lc(9,"td",9),n.gc(10,"vdr-job-state-label",12),n.kc(),n.lc(11,"td",9),n.bd(12),n.yc(13,"duration"),n.kc(),n.lc(14,"td",9),n.Zc(15,z,8,4,"vdr-dropdown",11),n.Zc(16,P,8,4,"vdr-dropdown",11),n.kc(),n.lc(17,"td",13),n.Zc(18,O,9,7,"vdr-dropdown",11),n.kc()),2&e){const e=c.item,t=n.xc();n.Tb(1),n.Ec("entity",e),n.Tb(2),n.Ec("ngIf",e.data),n.Tb(1),n.Ec("colorFrom",e.queueName),n.Tb(1),n.cd(e.queueName),n.Tb(2),n.cd(n.zc(8,10,e.createdAt)),n.Tb(3),n.Ec("job",e),n.Tb(2),n.cd(n.zc(13,12,e.duration)),n.Tb(3),n.Ec("ngIf",t.hasResult(e)),n.Tb(1),n.Ec("ngIf",e.error),n.Tb(2),n.Ec("ngIf",!e.isSettled&&"FAILED"!==e.state)}}function D(e,c){if(1&e&&(n.lc(0,"span",2),n.bd(1),n.yc(2,"percent"),n.kc()),2&e){const e=n.xc();n.Tb(1),n.dd(" ",n.zc(2,1,e.job.progress/100)," ")}}class N{constructor(e){this.healthCheckService=e}}N.\u0275fac=function(e){return new(e||N)(n.fc(s.jb))},N.\u0275cmp=n.Zb({type:N,selectors:[["vdr-health-check"]],decls:25,vars:18,consts:[["class","system-status-header",4,"ngIf"],["locationId","system-status"],[1,"btn","btn-secondary",3,"click"],["shape","refresh"],[1,"table"],[1,"left"],[4,"ngFor","ngForOf"],[1,"system-status-header"],[1,"status-icon"],["size","48",3,"ngClass"],[1,"status-detail"],[4,"ngIf","ngIfElse"],["error",""],[1,"last-checked"],[1,"align-middle","left"],[3,"colorType"],["down",""],["shape","check-circle"],["shape","exclamation-circle"]],template:function(e,c){1&e&&(n.lc(0,"vdr-action-bar"),n.lc(1,"vdr-ab-left"),n.Zc(2,k,12,16,"div",0),n.yc(3,"async"),n.kc(),n.lc(4,"vdr-ab-right"),n.gc(5,"vdr-action-bar-items",1),n.lc(6,"button",2),n.vc("click",function(){return c.healthCheckService.refresh()}),n.gc(7,"clr-icon",3),n.bd(8),n.yc(9,"translate"),n.kc(),n.kc(),n.kc(),n.lc(10,"table",4),n.lc(11,"thead"),n.lc(12,"tr"),n.lc(13,"th",5),n.bd(14),n.yc(15,"translate"),n.kc(),n.lc(16,"th",5),n.bd(17),n.yc(18,"translate"),n.kc(),n.lc(19,"th",5),n.bd(20),n.yc(21,"translate"),n.kc(),n.kc(),n.kc(),n.lc(22,"tbody"),n.Zc(23,E,10,5,"tr",6),n.yc(24,"async"),n.kc(),n.kc()),2&e&&(n.Tb(2),n.Ec("ngIf",n.zc(3,6,c.healthCheckService.status$)),n.Tb(6),n.dd(" ",n.zc(9,8,"system.health-refresh")," "),n.Tb(6),n.dd(" ",n.zc(15,10,"common.name")," "),n.Tb(3),n.dd(" ",n.zc(18,12,"system.health-status")," "),n.Tb(3),n.dd(" ",n.zc(21,14,"system.health-message")," "),n.Tb(3),n.Ec("ngForOf",n.zc(24,16,c.healthCheckService.details$)))},directives:[s.c,s.e,u.o,s.f,s.d,m.o,u.n,u.m,s.D],pipes:[u.b,h.d,s.Ab],styles:[".system-status-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start}.system-status-header[_ngcontent-%COMP%]   .status-detail[_ngcontent-%COMP%]{font-weight:700}.system-status-header[_ngcontent-%COMP%]   .last-checked[_ngcontent-%COMP%]{font-weight:400;color:var(--color-grey-500)}"],changeDetection:0}),N.ctorParameters=()=>[{type:s.jb}];class Z extends s.y{constructor(e,c,t,n,a){super(n,a),this.dataService=e,this.modalService=c,this.notificationService=t,this.liveUpdate=new r.f(!0),this.hideSettled=new r.f(!0),this.queueFilter=new r.f("all"),super.setQueryFn((...e)=>this.dataService.settings.getAllJobs(...e),e=>e.jobs,(e,c)=>{const t="all"===this.queueFilter.value?null:{queueName:{eq:this.queueFilter.value}},n=this.hideSettled.value;return{options:{skip:e,take:c,filter:Object.assign(Object.assign({},t),n?{isSettled:{eq:!1}}:{}),sort:{createdAt:s.Pb.DESC}}}})}ngOnInit(){super.ngOnInit(),Object(o.a)(5e3,2e3).pipe(Object(l.a)(this.destroy$),Object(i.a)(()=>this.liveUpdate.value)).subscribe(()=>{this.refresh()}),this.queues$=this.dataService.settings.getJobQueues().mapStream(e=>e.jobQueues).pipe(Object(d.a)(e=>[{name:"all",running:!0},...e]))}hasResult(e){const c=e.result;return null!=c&&("object"!=typeof c||Object.keys(c).length>0)}cancelJob(e){this.dataService.settings.cancelJob(e).subscribe(()=>this.refresh())}}Z.\u0275fac=function(e){return new(e||Z)(n.fc(s.L),n.fc(s.Db),n.fc(s.Eb),n.fc(a.e),n.fc(a.a))},Z.\u0275cmp=n.Zb({type:Z,selectors:[["vdr-job-list"]],features:[n.Qb],decls:41,vars:45,consts:[["type","checkbox","clrCheckbox","","name","live-update",3,"formControl"],["type","checkbox","clrCheckbox","","name","hide-settled",3,"formControl","change"],["bindValue","name",3,"addTag","items","hideSelected","multiple","markFirst","clearable","searchable","formControl","change"],["ng-label-tmp","","ng-option-tmp",""],["locationId","job-list"],[3,"items","itemsPerPage","totalItems","currentPage","pageChange","itemsPerPageChange"],[4,"ngIf","ngIfElse"],["others",""],[3,"colorFrom"],[1,"left","align-middle"],[3,"entity"],[4,"ngIf"],[3,"job"],[1,"right","align-middle"],["vdrDropdownTrigger","",1,"btn","btn-link","btn-icon",3,"title"],["shape","details"],[1,"result-detail"],[3,"value"],["vdrDropdownTrigger","",1,"btn","btn-link","btn-sm","details-button"],["shape","exclamation-circle"],["vdrDropdownTrigger","",1,"icon-button"],["shape","ellipsis-vertical"],["vdrPosition","bottom-right"],["type","button","vdrDropdownItem","",1,"delete-button",3,"disabled","click"],["shape","ban",1,"is-danger"]],template:function(e,c){1&e&&(n.lc(0,"vdr-action-bar"),n.lc(1,"vdr-ab-left"),n.lc(2,"clr-checkbox-container"),n.lc(3,"clr-checkbox-wrapper"),n.gc(4,"input",0),n.lc(5,"label"),n.bd(6),n.yc(7,"translate"),n.kc(),n.kc(),n.lc(8,"clr-checkbox-wrapper"),n.lc(9,"input",1),n.vc("change",function(){return c.refresh()}),n.kc(),n.lc(10,"label"),n.bd(11),n.yc(12,"translate"),n.kc(),n.kc(),n.kc(),n.kc(),n.lc(13,"vdr-ab-right"),n.lc(14,"ng-select",2),n.vc("change",function(){return c.refresh()}),n.yc(15,"async"),n.Zc(16,w,3,2,"ng-template",3),n.kc(),n.gc(17,"vdr-action-bar-items",4),n.kc(),n.kc(),n.lc(18,"vdr-data-table",5),n.vc("pageChange",function(e){return c.setPageNumber(e)})("itemsPerPageChange",function(e){return c.setItemsPerPage(e)}),n.yc(19,"async"),n.yc(20,"async"),n.yc(21,"async"),n.yc(22,"async"),n.gc(23,"vdr-dt-column"),n.lc(24,"vdr-dt-column"),n.bd(25),n.yc(26,"translate"),n.kc(),n.lc(27,"vdr-dt-column"),n.bd(28),n.yc(29,"translate"),n.kc(),n.lc(30,"vdr-dt-column"),n.bd(31),n.yc(32,"translate"),n.kc(),n.lc(33,"vdr-dt-column"),n.bd(34),n.yc(35,"translate"),n.kc(),n.lc(36,"vdr-dt-column"),n.bd(37),n.yc(38,"translate"),n.kc(),n.gc(39,"vdr-dt-column"),n.Zc(40,S,19,14,"ng-template"),n.kc()),2&e&&(n.Tb(4),n.Ec("formControl",c.liveUpdate),n.Tb(2),n.cd(n.zc(7,21,"common.live-update")),n.Tb(3),n.Ec("formControl",c.hideSettled),n.Tb(2),n.cd(n.zc(12,23,"system.hide-settled-jobs")),n.Tb(3),n.Ec("addTag",!1)("items",n.zc(15,25,c.queues$))("hideSelected",!0)("multiple",!1)("markFirst",!1)("clearable",!1)("searchable",!1)("formControl",c.queueFilter),n.Tb(4),n.Ec("items",n.zc(19,27,c.items$))("itemsPerPage",n.zc(20,29,c.itemsPerPage$))("totalItems",n.zc(21,31,c.totalItems$))("currentPage",n.zc(22,33,c.currentPage$)),n.Tb(7),n.cd(n.zc(26,35,"system.job-queue-name")),n.Tb(3),n.cd(n.zc(29,37,"common.created-at")),n.Tb(3),n.cd(n.zc(32,39,"system.job-state")),n.Tb(3),n.cd(n.zc(35,41,"system.job-duration")),n.Tb(3),n.cd(n.zc(38,43,"system.job-result")))},directives:function(){return[s.c,s.e,m.j,m.k,s.eb,r.a,m.i,r.p,r.g,m.u,s.f,g.a,g.e,g.d,s.d,s.N,s.M,u.o,s.D,s.ab,F,s.T,s.W,m.o,s.V,s.Fb,s.U]},pipes:function(){return[h.d,u.b,s.Ub,s.X,s.ib]},styles:[".result-detail[_ngcontent-%COMP%]{margin:0 12px}"],changeDetection:0}),Z.ctorParameters=()=>[{type:s.L},{type:s.Db},{type:s.Eb},{type:a.e},{type:a.a}];class F{get iconShape(){switch(this.job.state){case s.tb.COMPLETED:return"check-circle";case s.tb.FAILED:return"exclamation-circle";case s.tb.CANCELLED:return"ban";case s.tb.PENDING:case s.tb.RETRYING:return"hourglass";case s.tb.RUNNING:return"sync"}}get colorType(){switch(this.job.state){case s.tb.COMPLETED:return"success";case s.tb.FAILED:case s.tb.CANCELLED:return"error";case s.tb.PENDING:case s.tb.RETRYING:return"";case s.tb.RUNNING:return"warning"}}}F.\u0275fac=function(e){return new(e||F)},F.\u0275cmp=n.Zb({type:F,selectors:[["vdr-job-state-label"]],inputs:{job:"job"},decls:5,vars:6,consts:[[3,"colorType"],["class","progress",4,"ngIf"],[1,"progress"]],template:function(e,c){1&e&&(n.lc(0,"vdr-chip",0),n.gc(1,"clr-icon"),n.bd(2),n.yc(3,"titlecase"),n.Zc(4,D,3,3,"span",1),n.kc()),2&e&&(n.Ec("colorType",c.colorType),n.Tb(1),n.Ub("shape",c.iconShape),n.Tb(1),n.dd(" ",n.zc(3,4,c.job.state)," "),n.Tb(2),n.Ec("ngIf","RUNNING"===c.job.state))},directives:[s.D,m.o,u.o],pipes:[u.y,u.v],styles:[".progress[_ngcontent-%COMP%]{margin-left:3px}clr-icon[_ngcontent-%COMP%]{min-width:12px}"],changeDetection:0}),F.propDecorators={job:[{type:n.E}]};const q={breadcrumb:Object(b.a)("breadcrumb.job-queue")},M={breadcrumb:Object(b.a)("breadcrumb.system-status")},L=[{path:"jobs",component:Z,data:q},{path:"system-status",component:N,data:M}];class A{}A.\u0275fac=function(e){return new(e||A)},A.\u0275mod=n.dc({type:A}),A.\u0275inj=n.cc({imports:[[s.Nb,a.i.forChild(L)]]})}}]);
//# sourceMappingURL=13-es2015.68f2bd6e6a011e1cc351.js.map