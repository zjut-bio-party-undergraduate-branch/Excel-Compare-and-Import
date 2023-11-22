import{h as S,i as o,U,I as ae,L as ce,k as G,l as re,m as D,n as ue,q as H,s as ee,t as le,v as K,E as W,w as ge,S as fe,x as me,y as pe}from"./index-_g9PC3ll.js";var z=(e=>(e.Update="update",e.Delete="delete",e.Add="add",e.Link="link",e.Async="async",e))(z||{});async function C(e=5e3,a=0,r,n){if(r.length!==0)if(r.length<=e)await n(r);else{const t=Math.ceil(r.length/e);for(let s=0;s<t;s++)await n(r.slice(s*e,(s+1)*e)),a>0&&await me(a)}}async function ye(e,a){const r=await e.getName();return async n=>{try{const t=await e.addRecords(n.map(s=>s.data));n.forEach((s,d)=>{t[d]&&(s.result=t[d],s.status=D.Success)}),a(o.onAddRecords,{stage:"addRecords",data:{success:n,message:{text:"importInfo.addRecordsMessage",params:{table:r}}}})}catch(t){W({title:"addRecordsFailure",message:String(t),error:t}),n.forEach(s=>{s.status=D.Error}),a(o.onAddRecords,{stage:"addRecords",data:{error:n}})}}}async function be(e,a){const r=await e.getName();return async n=>{try{const t=await e.setRecords(n.map(s=>s.data).flat());n.forEach((s,d)=>{t[d]&&(s.result=t[d],s.status=D.Success)}),a(o.onUpdateRecords,{stage:"updateRecords",data:{success:n,message:{text:"importInfo.updateRecordsMessage",params:{table:r}}}})}catch(t){W({title:"updateRecordsFailure",message:String(t),error:t}),n.forEach(s=>{s.status=D.Error}),a(o.onUpdateRecords,{stage:"updateRecords",data:{error:n}})}}}async function he(e,a){const r=await e.getName();return async n=>{try{const t=await e.deleteRecords(n.map(s=>s.data).flat());t&&n.forEach(s=>{s.result=t,s.status=D.Success}),a(o.onDeleteRecords,{stage:"deleteRecords",data:{success:n,message:{text:"importInfo.deleteRecordsMessage",params:{table:r}}}})}catch(t){W({title:"deleteRecordsFailure",message:String(t),error:t}),n.forEach(s=>{s.status=D.Error}),a(o.onDeleteRecords,{stage:"deleteRecords",data:{error:n}})}}}async function Re(e,a,r=500,n=500,t){await C(r,n,e,await ye(a,t))}async function we(e,a,r=500,n=500,t){return await C(r,n,e,await be(a,t))}async function Ie(e,a,r=500,n=500,t){return await C(r,n,e,await he(a,t))}async function Fe(e,a,r,n,t){return e===a?null:r===G.merge_direct||a===null?await S.getCell(n,t,e):await S.getCell(n,t,a)}async function se(e,a,r=!1,n,t){try{const s=await pe.base.getTable(e),[d,m,R]=await Promise.all([s.getName(),s.getFieldList(),s.getFieldMetaList()]);n(o.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.getTable",params:{name:d,id:e}}}});const p=R.filter(c=>c.isPrimary)[0].id;return{id:e,table:s,name:d,primaryField:p,indexId:t!=null&&t.length?t:[p],root:r,fields:m.reduce((c,u)=>(c[u.id]=u,c),{}),fieldMaps:a}}catch(s){throw W({title:"getTableFailure",message:String(s),error:s,notice:!0,noticeParams:{text:"message.getTableFailure",params:{id:e}}}),s}}async function ne(e,a,r=1e4,n=0){const t=[];return await C(r,n,e,async s=>{await Promise.allSettled(s.map(async d=>{const m=await a(d);Array.isArray(m)?t.push(...m):t.push(m)}))}),t}async function oe(e,a,r,n,t,s,d,m){if(!S.asyncTypes.includes(a.field.type))return null;const R=await S.normalization(e,a);if(!R)return null;const p=[R],V={table:{name:n[a.table].name,id:a.table},action:z.Async,data:p,result:void 0,status:D.Wait,target:m,asyncField:a,value:e,field:r};s.push(V)}async function ie(e,a,r,n,t,s,d,m){var j;if(!((j=a.children)!=null&&j.length))return null;const{linkConfig:R}=a,{allowAdd:p,primaryKey:V}=R??{};if(!V||p===void 0)return null;const c=await S.normalization(e,a),u=n[a.field.property.tableId],$=t[u.id],v=[];d(o.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.getLinkRecord",params:{indexValue:c.join("|"),fieldName:a.field.name,fieldId:r.id,table:u.name}}}});const J=c.map(O=>{const N=$.filter(_=>_.indexValue[0]===O);return N.length===0?(v.push(O),null):N.map(_=>_.recordId)}).flat().filter(O=>O!==null);if((!v.length||!p)&&J.length){const O=await S.getCell(r,a,J.join(a.config.separator??","));return O||null}}async function de(e,a,r,n,t,s,d){var u;if(!a.excel_field||!a.writable)return null;const m=e[a.excel_field]??null;if(!m)return null;const R=r[a.table].fields[a.field.id],p=le.includes(a.field.type),{linkConfig:V}=a,{primaryKey:c}=V??{};if(p&&a.hasChildren&&((u=a.children)!=null&&u.length)&&c)return await ie(m,a,R,r,n,t,s);if(S.asyncTypes.includes(a.field.type)&&await oe(m,a,R,r,n,t,s,d),!p){const $=await S.getCell(R,a,m);if($)return $}return null}async function Te(e,a){try{let r=!1;if(!a){const t=await e.addField({type:re.ModifiedTime});a=await e.getField(t),r=!0}const n=await a.getFieldValueList();return r&&e.deleteField(a),n.reduce((t,s)=>(s.record_id&&(t[s.record_id]=s.value),t),{})}catch(r){return W({title:"getModifiedTimeFailure",message:String(r),error:r,notice:!0,noticeParams:{text:"message.getModifiedTimeFailure",params:{id:e.id}}}),{}}}async function Se(e,a,r){return await Promise.all(a.map(async t=>{r(o.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.getFieldCellString",params:{field:e.id,record:t}}}});const s=await e.getCellString(t);return{recordId:t,value:s}}))}async function xe(e,a,r){let n={};const t=e[0].table;n[t]=await se(t,e,e[0].root,r,a);for(const s of e)if(s.excel_field&&s.hasChildren&&s.linkConfig&&!Object.keys(n).includes(s.field.property.tableId)){const d=s.field.property.tableId;n[d]=await se(d,s.children??[],!1,r,s.linkConfig.primaryKey?[s.linkConfig.primaryKey]:void 0)}return n}async function Ae(e,a,r){const n=await e.getRecordIdList();return await Promise.all(a.map(async s=>{const d=await e.getField(s.field.id);return r(o.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.getIndexField",params:{name:s.field.name,id:s.field.id}}}}),{values:await Se(d,n,r),fieldMap:s}})).then(async s=>Promise.all(n.map(async d=>{var R;const m=[];for(const p of s){const V=((R=p.values.find(u=>u.recordId===d))==null?void 0:R.value)??"";r(o.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.analyzeIndexFieldValue",params:{fieldName:p.fieldMap.field.name,fieldId:p.fieldMap.field.id,recordId:d}}}});const c=await S.normalization(V,p.fieldMap,{separator:",",format:["yyyy/MM/dd","yyyy/MM/dd HH:mm","yyyy-MM-dd HH:mm","yyyy-MM-dd","MM-dd","MM/dd/yyyy","dd/MM/yyyy"]});m.push(c)}return{indexValue:m,table:e.id,recordId:d,fieldMaps:a}})).catch(d=>{throw W({title:"getTableIndexFailure",message:String(d),error:d,notice:!0,noticeParams:{text:"message.getTableIndexFailure",params:{id:e.id}}}),d}))}async function Ve(e){const a=[];let r;for(;;){const n=await e.getRecords({pageSize:5e3,pageToken:r});if(r=n.pageToken,a.push(...n.records),!n.hasMore||!r)break}return a.reduce((n,t)=>(n[t.recordId]=t.fields,n),{})}async function Ee(e,a,r,n){for(const t of e){if(!fe.includes(t.field.type))continue;const s=t.excel_field;if(!s)continue;n(o.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.checkSelectFieldOptions",params:{fieldName:t.field.name,fieldId:t.field.id}}}});const d=r.map(c=>c[s]).filter(ee),m=a[t.field.id],R=(await m.getOptions()).map(c=>c.name),V=H((await Promise.all(d.map(async c=>await S.normalization(c,t)))).filter(ee).flat()).filter(c=>!R.includes(c));V.length&&(n(o.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.setSelectFieldOptions",params:{fieldName:t.field.name,fieldId:t.field.id,newOptionsNum:String(V.length)}}}}),await m.addOptions(V.map(c=>({name:c}))))}}async function Oe(e,a,r,n=null,t=G.append,s={},d=ge){var te;console.log(S),d(o.onStart,{stage:"start"}),S.refresh(),d(o.beforeReadFieldMap,{stage:"readFieldMap",data:{progress:!1}});const{parallel:m={records:1e4,fields:10},interval:R={records:0,fields:0},allowAction:p={add:!0,update:!0,delete:!0},updateOption:V={mode:[U.SAVE_MOST,U.SAVE_LATEST]}}=s;ae({title:"importInfo.start",message:`
    Mode: ${t}
    SheetIndex: ${r}
    index: ${n}
    parallel:
      - fields: ${m.fields}
      - records: ${m.records}
    interval:
      - fields: ${R.fields}
      - records: ${R.records}
    allowAction:
      - add: ${p.add}
      - update: ${p.update}
      - delete: ${p.delete}
    updateOption:
      - mode: ${V.mode}
    `});const c=a.sheets[r].tableData.records,u=await xe(e,n??[],d);ce({title:"tables",message:JSON.stringify(u,null,2)});const $=[],v=u[e[0].table].table;let J={};if(t!==G.append){d(o.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.getRecordsModifiedTime"}}});const f=(te=e.find(b=>b.field.type===re.ModifiedTime))==null?void 0:te.field.id,x=f?await v.getField(f):void 0;J=await Te(v,x)}await Ee(e,u[e[0].table].fields,c,d);const j={};await Promise.all(Object.values(u).map(async f=>{const x=f.indexId,b=await Ae(f.table,x.map(w=>f.fieldMaps.find(g=>g.field.id===w)),d);j[f.id]=b.map(w=>({...w,modifiedTime:J[w.recordId]??0}))})),n&&n.length&&$.push(...j[v.id]),d(o.onReadFieldMapEnd,{stage:"readFieldMap"});const O=[];if(d(o.beforeAnalyzeRecords,{stage:"analyzeRecords",data:{progress:!0,number:c.length,success:0,error:0}}),t===G.append||!n){const f=await ne(c,async x=>{const b=[],w={table:{id:e[0].table,name:u[e[0].table].name},action:z.Add,data:[],result:void 0,status:D.Wait},g=[];for(const I of e){const F=await de(x,I,u,j,b,d,w);F&&g.push(F)}return d(o.onAnalyzeRecords,{stage:"analyzeRecords",data:{number:c.length,success:1,error:0}}),g.length&&(w.data.push(...g),b.push(w)),b},m.records,R.records);O.push(...f)}else{const f=n.map(g=>{const I=e.find(F=>F.field.id===g);return I||null});ae({title:"excelIndexField",message:JSON.stringify(f,null,2)}),d(o.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.getTableRecords",params:{table:v.id}}}});const x=await Ve(v),b=[],w=await ne(c,async g=>{var k;const I=[],F=await Promise.all(f.map(async l=>await S.normalization(g[l.excel_field]??"",l))),P=$.filter(l=>ue(l.indexValue,F));d(o.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.findSameRecord",params:{indexValue:F.join("|"),number:String(P.length)}}}});const M=[];let E=null;if(P.length>=1){for(const l of P){d(o.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.getSameRecord",params:{indexValue:F.join("|"),recordId:l.recordId}}}});const T=x[l.recordId],h={...l,tableValues:Object.keys(T).reduce((y,i)=>(T[i]!==null&&(y[i]=T[i]),y),{})};M.push(h)}if(M.length>1){const{mode:l}=V;if([U.SAVE_LATEST,U.SAVE_OLDEST].includes(l[0])){const T=H(M.map(i=>i.modifiedTime)),h=l[0]===U.SAVE_LATEST?Math.max(...T):Math.min(...T),y=M.filter(i=>i.modifiedTime===h);if(y.length===1){const i=y[0];E={id:i.recordId,table:i.table,tableValues:i.tableValues}}else{y.sort((Y,q)=>Object.values(Y.tableValues).length-Object.values(q.tableValues).length);const i=l[1]===U.SAVE_MOST?y[y.length-1]:y[0];E={id:i.recordId,table:i.table,tableValues:i.tableValues}}}else{const T=H(M.map(i=>Object.values(i.tableValues).length)),h=l[0]===U.SAVE_MOST?Math.max(...T):Math.min(...T),y=M.filter(i=>Object.values(i.tableValues).length===h);if(y.length===1){const i=y[0];E={id:i.recordId,table:i.table,tableValues:i.tableValues}}else{y.sort((Y,q)=>Y.modifiedTime-q.modifiedTime);const i=l[1]===U.SAVE_LATEST?y[y.length-1]:y[0];E={id:i.recordId,table:i.table,tableValues:i.tableValues}}}if(ee(E)){const T=M.map(h=>h.recordId).filter(h=>h!==E.id).filter(h=>!b.includes(h));b.push(...T),I.push(...T.map(h=>({table:{id:v.id,name:u[v.id].name},action:z.Delete,data:[h],result:void 0,status:D.Wait})))}}else{const l=M[0];E={id:l.recordId,table:l.table,tableValues:l.tableValues}}}const A={table:{id:v.id,name:u[v.id].name},action:z.Add,data:[],result:void 0,status:D.Wait},L=[];for(const l of e){if(!l.excel_field||!l.writable)continue;const T=g[l.excel_field]??"",h=u[l.table].fields[l.field.id];if(d(o.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.compareRecordField",params:{fieldName:l.field.name,fieldId:h.id,indexValue:F.join("|")}}}}),p.add&&!P.length){const B=await de(g,l,u,j,I,d,A);L.push(B)}if(!p.update||!E)continue;const y=le.includes(l.field.type),{linkConfig:i}=l,{primaryKey:Y}=i??{},q=E.tableValues[l.field.id]??null;if(y&&l.hasChildren&&((k=l.children)!=null&&k.length)&&Y&&(t===G.merge_direct||q===null)){const B=await ie(T,l,h,u,j,O,d);L.push(B)}if(S.asyncTypes.includes(l.field.type)&&await oe(T,l,h,u,j,O,d,A),!y){const B=await Fe(T,q,t,h,l);B&&L.push(B)}}if(d(o.onAnalyzeRecords,{stage:"analyzeRecords",data:{number:c.length,success:1,error:0}}),M.length){A.action=z.Update;const l={};for(const h of L.filter(y=>y!==null)){const[y,i]=await Promise.all([h.getFieldId(),h.getValue()]);l[y]=i}const T={recordId:E.id,fields:l};return A.data.push(T),I.push(A),I}return A.data.push(...L.filter(l=>l!==null)),I.push(A),I},m.records,R.records);O.push(...w)}d(o.onAnalyzeRecordsEnd,{stage:"analyzeRecords"});const N=K(O,"action");console.log(N);const _=N[z.Async];if(_&&_.length){const f=K(_,"asyncField.field.type");console.log("groupedAsyncTasks",f);const x=Object.keys(f),b=x.reduce((g,I)=>(g[I]=f[I].map(F=>F.data).flat(),g),{});d(o.beforeAsyncData,{stage:"asyncData",data:{progress:!0,number:_.length,success:[],error:[]}});for(const g of x){const I=f[g];await S.asyncMethod({data:b[g],onProgress:F=>{const{message:P="",loaded:M,total:E}=F;d(o.onAsyncData,{stage:"asyncData",data:{message:{text:P+`
${M}/${E}`}}})},onError:F=>{W({title:"asyncDataFailure",message:String(F),error:F})}},I[0].asyncField)}const w=K(_,"table.id");for(const g of Object.keys(w)){const I=u[g],F=w[g],P=K(F,"asyncField.field.id");for(const M of Object.keys(P)){const E=I.fields[M];for(const A of P[M]){d(o.onAsyncData,{stage:"asyncData",data:{message:{text:"importInfo.createCell",params:{fieldId:E.id,tableId:g}}}});const L=await S.getCell(E,A.asyncField,A.value);if(!(!L||!A.target)){if(A.target.action===z.Add)A.target.data.push(L);else if(A.target.action===z.Update){const[k,l]=await Promise.all([L.getFieldId(),L.getValue()]);A.target.data[0].fields[k]=l}A.status=D.Success}}}}d(o.onAsyncDataEnd,{stage:"asyncData"})}const Z=N[z.Delete];if(Z&&p.delete&&Z.length){d(o.beforeDeleteRecords,{stage:"deleteRecords",data:{progress:!0,number:Z.length,success:[],error:[]}});const f=K(Z,"table.id"),x=Object.keys(f);for(const b of x){const w=u[b],g=f[b];await Ie(g,w.table,5e3,0,d)}d(o.onDeleteRecordsEnd,{stage:"deleteRecords"})}const Q=N[z.Add];if(Q&&(t===G.append||p.add)&&Q&&Q.length){d(o.beforeAddRecords,{stage:"addRecords",data:{progress:!0,number:Q.length,success:[],error:[]}});const f=K(Q,"table.id"),x=Object.keys(f);for(const b of x){const w=u[b],g=f[b];await Re(g,w.table,5e3,0,d)}d(o.onAddRecordsEnd,{stage:"addRecords"})}const X=N[z.Update];if(console.log("updateTasks",X),X&&p.update&&X.length){d(o.beforeUpdateRecords,{stage:"updateRecords",data:{progress:!0,number:X.length,success:[],error:[]}});const f=K(X,"table.id"),x=Object.keys(f);for(const b of x){const w=u[b],g=f[b];await we(g,w.table,5e3,0,d)}d(o.onUpdateRecordsEnd,{stage:"updateRecords"})}S.reset(),d(o.onEnd,{stage:"end"})}export{Oe as importExcel};
