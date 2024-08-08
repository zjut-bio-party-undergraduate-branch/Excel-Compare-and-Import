import{i as l,g as E,U as N,I as se,L as fe,h as q,H as oe,j as z,k as pe,l as H,n as ee,r as le,s as K,E as $,t as ye,v as C,S as be,w as he}from"./index-Blet0nkJ.js";var v=(t=>(t.Update="update",t.Delete="delete",t.Add="add",t.Link="link",t.Async="async",t))(v||{});const ie=200,ce=200,ue=200,Re=200,we=200;async function Ie(t,a){const r=await t.getName();return async s=>{try{const e=await t.addRecords(s.map(n=>n.data));s.forEach((n,d)=>{e[d]&&(n.result=e[d],n.status=z.Success)}),a(l.onAddRecords,{stage:"addRecords",data:{success:s,message:{text:"importInfo.addRecordsMessage",params:{table:r}}}})}catch(e){$({title:"addRecordsFailure",message:String(e),error:e}),s.forEach(n=>{n.status=z.Error}),a(l.onAddRecords,{stage:"addRecords",data:{error:s}})}}}async function Te(t,a){const r=await t.getName();return async s=>{try{const e=await t.setRecords(s.map(n=>n.data).flat());s.forEach((n,d)=>{e[d]&&(n.result=e[d],n.status=z.Success)}),a(l.onUpdateRecords,{stage:"updateRecords",data:{success:s,message:{text:"importInfo.updateRecordsMessage",params:{table:r}}}})}catch(e){$({title:"updateRecordsFailure",message:String(e),error:e}),s.forEach(n=>{n.status=z.Error}),a(l.onUpdateRecords,{stage:"updateRecords",data:{error:s}})}}}async function Fe(t,a){const r=await t.getName();return async s=>{try{const e=await t.deleteRecords(s.map(n=>n.data).flat());e&&s.forEach(n=>{n.result=e,n.status=z.Success}),a(l.onDeleteRecords,{stage:"deleteRecords",data:{success:s,message:{text:"importInfo.deleteRecordsMessage",params:{table:r}}}})}catch(e){$({title:"deleteRecordsFailure",message:String(e),error:e}),s.forEach(n=>{n.status=z.Error}),a(l.onDeleteRecords,{stage:"deleteRecords",data:{error:s}})}}}async function Se(t,a,r=ie,s=500,e){await C(r,s,t,await Ie(a,e))}async function xe(t,a,r=ue,s=500,e){return await C(r,s,t,await Te(a,e))}async function Ee(t,a,r=ce,s=500,e){return await C(r,s,t,await Fe(a,e))}async function Ae(t,a,r,s,e){return t===a?null:r===q.merge_direct||a===null?await E.getCell(s,e,t):await E.getCell(s,e,a)}async function ne(t,a,r=!1,s,e){try{const n=await he.base.getTable(t),[d,g,R]=await Promise.all([n.getName(),n.getFieldList(),n.getFieldMetaList()]);s(l.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.getTable",params:{name:d,id:t}}}});const f=R.filter(c=>c.isPrimary)[0].id;return{id:t,table:n,name:d,primaryField:f,indexId:e!=null&&e.length?e:[f],root:r,fields:g.reduce((c,u)=>(c[u.id]=u,c),{}),fieldMaps:a}}catch(n){throw $({title:"getTableFailure",message:String(n),error:n,notice:!0,noticeParams:{text:"message.getTableFailure",params:{id:t}}}),n}}async function de(t,a,r=1e4,s=0){const e=[];return await C(r,s,t,async n=>{await Promise.allSettled(n.map(async d=>{const g=await a(d);Array.isArray(g)?e.push(...g):e.push(g)}))}),e}async function ge(t,a,r,s,e,n,d,g){if(!E.asyncTypes.includes(a.field.type))return null;const R=await E.normalization(t,a);if(!R)return null;const f=[R],A={table:{name:s[a.table].name,id:a.table},action:v.Async,data:f,result:void 0,status:z.Wait,target:g,asyncField:a,value:t,field:r};n.push(A)}async function me(t,a,r,s,e,n,d,g){var L;if(!((L=a.children)!=null&&L.length))return null;const{linkConfig:R}=a,{allowAdd:f,primaryKey:A}=R??{};if(!A||f===void 0)return null;const c=await E.normalization(t,a),u=s[a.field.property.tableId],U=e[u.id],D=[];d(l.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.getLinkRecord",params:{indexValue:c.join("|"),fieldName:a.field.name,fieldId:r.id,table:u.name}}}});const J=c.map(O=>{const B=U.filter(j=>j.indexValue[0]===O);return B.length===0?(D.push(O),null):B.map(j=>j.recordId)}).flat().filter(O=>O!==null);if((!D.length||!f)&&J.length){const O=await E.getCell(r,a,J.join(a.config.separator??","));return O||null}}async function re(t,a,r,s,e,n,d){var u;if(!a.excel_field||!a.writable)return null;const g=t[a.excel_field]??null;if(!g)return null;const R=r[a.table].fields[a.field.id],f=le.includes(a.field.type),{linkConfig:A}=a,{primaryKey:c}=A??{};if(f&&a.hasChildren&&((u=a.children)!=null&&u.length)&&c)return await me(g,a,R,r,s,e,n);if(E.asyncTypes.includes(a.field.type)&&await ge(g,a,R,r,s,e,n,d),!f){const U=await E.getCell(R,a,g);if(U)return U}return null}async function Ve(t,a){try{let r=!1;if(!a){const e=await t.addField({type:oe.ModifiedTime});a=await t.getField(e),r=!0}const s=await a.getFieldValueList();return r&&t.deleteField(a),s.reduce((e,n)=>(n.record_id&&(e[n.record_id]=n.value),e),{})}catch(r){return $({title:"getModifiedTimeFailure",message:String(r),error:r,notice:!0,noticeParams:{text:"message.getModifiedTimeFailure",params:{id:t.id}}}),{}}}async function Me(t,a,r){return await Promise.all(a.map(async e=>{r(l.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.getFieldCellString",params:{field:t.id,record:e}}}});const n=await t.getCellString(e);return{recordId:e,value:n}}))}async function Oe(t,a,r){let s={};const e=t[0].table;s[e]=await ne(e,t,t[0].root,r,a);for(const n of t)if(n.excel_field&&n.hasChildren&&n.linkConfig&&!Object.keys(s).includes(n.field.property.tableId)){const d=n.field.property.tableId;s[d]=await ne(d,n.children??[],!1,r,n.linkConfig.primaryKey?[n.linkConfig.primaryKey]:void 0)}return s}async function te(t,a=3){try{return await t()}catch(r){if(a<=0)throw r;return await te(t,a-1)}}async function De(t,a=we){let r=!0,s,e=[];for(;r;){const{hasMore:n,recordIds:d,pageToken:g}=await te(async()=>await t.getRecordIdListByPage({pageSize:a,pageToken:s}));r=n,s=g,e.push(...d)}return e}async function ve(t,a,r){const s=await De(t);return await Promise.all(a.map(async n=>{const d=await t.getField(n.field.id);return r(l.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.getIndexField",params:{name:n.field.name,id:n.field.id}}}}),{values:await Me(d,s,r),fieldMap:n}})).then(async n=>Promise.all(s.map(async d=>{var R;const g=[];for(const f of n){const A=((R=f.values.find(u=>u.recordId===d))==null?void 0:R.value)??"";r(l.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.analyzeIndexFieldValue",params:{fieldName:f.fieldMap.field.name,fieldId:f.fieldMap.field.id,recordId:d}}}});const c=await E.normalization(A,f.fieldMap,{separator:",",format:["yyyy/MM/dd","yyyy/MM/dd HH:mm","yyyy-MM-dd HH:mm","yyyy-MM-dd","MM-dd","MM/dd/yyyy","dd/MM/yyyy"]});g.push(c)}return{indexValue:g,table:t.id,recordId:d,fieldMaps:a}})).catch(d=>{throw $({title:"getTableIndexFailure",message:String(d),error:d,notice:!0,noticeParams:{text:"message.getTableIndexFailure",params:{id:t.id}}}),d}))}async function _e(t){const a=[];let r;for(;;){const s=await te(async()=>await t.getRecordsByPage({pageSize:Re,pageToken:r}));if(r=s.pageToken,a.push(...s.records),!s.hasMore||!r)break}return a.reduce((s,e)=>(s[e.recordId]=e.fields,s),{})}async function ze(t,a,r,s){for(const e of t){if(!be.includes(e.field.type))continue;const n=e.excel_field;if(!n)continue;s(l.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.checkSelectFieldOptions",params:{fieldName:e.field.name,fieldId:e.field.id}}}});const d=r.map(c=>c[n]).filter(ee),g=a[e.field.id],R=(await g.getOptions()).map(c=>c.name),A=H((await Promise.all(d.map(async c=>await E.normalization(c,e)))).filter(ee).flat()).filter(c=>!R.includes(c));if(A.length){s(l.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.setSelectFieldOptions",params:{fieldName:e.field.name,fieldId:e.field.id,newOptionsNum:String(A.length)}}}});try{await g.addOptions(A.map(c=>({name:c})))}catch(c){const u=await g.getName();$({title:"setSelectFieldOptionsFailure",message:`set select field ${u}[${g.id}] options failure`,error:c,notice:!0,noticeParams:{text:"message.setSelectFieldOptionsFailure",params:{id:e.field.id,name:u}}})}}}}async function je(t,a,r,s=null,e=q.append,n={},d=ye){var ae;console.log(t),d(l.onStart,{stage:"start"}),E.refresh(),d(l.beforeReadFieldMap,{stage:"readFieldMap",data:{progress:!1}});const{parallel:g={records:1e4,fields:10},interval:R={records:0,fields:0},allowAction:f={add:!0,update:!0,delete:!0},updateOption:A={mode:[N.SAVE_MOST,N.SAVE_LATEST]}}=n;se({title:"importInfo.start",message:`
    Mode: ${e}
    SheetIndex: ${r}
    index: ${s}
    parallel:
      - fields: ${g.fields}
      - records: ${g.records}
    interval:
      - fields: ${R.fields}
      - records: ${R.records}
    allowAction:
      - add: ${f.add}
      - update: ${f.update}
      - delete: ${f.delete}
    updateOption:
      - mode: ${A.mode}
    `});const c=a.sheets[r].tableData.records,u=await Oe(t,s??[],d);fe({title:"tables",message:JSON.stringify(u,null,2)});const U=[],D=u[t[0].table].table;let J={};if(e!==q.append){d(l.onReadFieldMap,{stage:"readFieldMap",data:{message:{text:"importInfo.getRecordsModifiedTime"}}});const p=(ae=t.find(b=>b.field.type===oe.ModifiedTime))==null?void 0:ae.field.id,x=p?await D.getField(p):void 0;J=await Ve(D,x)}await ze(t,u[t[0].table].fields,c,d);const L={};await Promise.all(Object.values(u).map(async p=>{const x=p.indexId,b=await ve(p.table,x.map(w=>p.fieldMaps.find(m=>m.field.id===w)),d);L[p.id]=b.map(w=>({...w,modifiedTime:J[w.recordId]??0}))})),s&&s.length&&U.push(...L[D.id]),d(l.onReadFieldMapEnd,{stage:"readFieldMap"});const O=[];if(d(l.beforeAnalyzeRecords,{stage:"analyzeRecords",data:{progress:!0,number:c.length,success:0,error:0}}),e===q.append||!s){const p=await de(c,async x=>{const b=[],w={table:{id:t[0].table,name:u[t[0].table].name},action:v.Add,data:[],result:void 0,status:z.Wait},m=[];for(const I of t){const T=await re(x,I,u,L,b,d,w);T&&m.push(T)}return d(l.onAnalyzeRecords,{stage:"analyzeRecords",data:{number:c.length,success:1,error:0}}),m.length&&(w.data.push(...m),b.push(w)),b},g.records,R.records);O.push(...p)}else{const p=s.map(m=>{const I=t.find(T=>T.field.id===m);return I||null});se({title:"excelIndexField",message:JSON.stringify(p,null,2)}),d(l.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.getTableRecords",params:{table:D.id}}}});const x=await _e(D),b=[],w=await de(c,async m=>{var k;const I=[],T=await Promise.all(p.map(async o=>await E.normalization(m[o.excel_field]??"",o))),P=U.filter(o=>pe(o.indexValue,T));d(l.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.findSameRecord",params:{indexValue:T.join("|"),number:String(P.length)}}}});const M=[];let V=null;if(P.length>=1){for(const o of P){d(l.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.getSameRecord",params:{indexValue:T.join("|"),recordId:o.recordId}}}});const F=x[o.recordId],h={...o,tableValues:Object.keys(F).reduce((y,i)=>(F[i]!==null&&(y[i]=F[i]),y),{})};M.push(h)}if(M.length>1){const{mode:o}=A;if([N.SAVE_LATEST,N.SAVE_OLDEST].includes(o[0])){const F=H(M.map(i=>i.modifiedTime)),h=o[0]===N.SAVE_LATEST?Math.max(...F):Math.min(...F),y=M.filter(i=>i.modifiedTime===h);if(y.length===1){const i=y[0];V={id:i.recordId,table:i.table,tableValues:i.tableValues}}else{y.sort((X,G)=>Object.values(X.tableValues).length-Object.values(G.tableValues).length);const i=o[1]===N.SAVE_MOST?y[y.length-1]:y[0];V={id:i.recordId,table:i.table,tableValues:i.tableValues}}}else{const F=H(M.map(i=>Object.values(i.tableValues).length)),h=o[0]===N.SAVE_MOST?Math.max(...F):Math.min(...F),y=M.filter(i=>Object.values(i.tableValues).length===h);if(y.length===1){const i=y[0];V={id:i.recordId,table:i.table,tableValues:i.tableValues}}else{y.sort((X,G)=>X.modifiedTime-G.modifiedTime);const i=o[1]===N.SAVE_LATEST?y[y.length-1]:y[0];V={id:i.recordId,table:i.table,tableValues:i.tableValues}}}if(ee(V)){const F=M.map(h=>h.recordId).filter(h=>h!==V.id).filter(h=>!b.includes(h));b.push(...F),I.push(...F.map(h=>({table:{id:D.id,name:u[D.id].name},action:v.Delete,data:[h],result:void 0,status:z.Wait})))}}else{const o=M[0];V={id:o.recordId,table:o.table,tableValues:o.tableValues}}}const S={table:{id:D.id,name:u[D.id].name},action:v.Add,data:[],result:void 0,status:z.Wait},_=[];for(const o of t){if(!o.excel_field||!o.writable)continue;const F=m[o.excel_field]??"",h=u[o.table].fields[o.field.id];if(d(l.onAnalyzeRecords,{stage:"analyzeRecords",data:{message:{text:"importInfo.compareRecordField",params:{fieldName:o.field.name,fieldId:h.id,indexValue:T.join("|")}}}}),f.add&&!P.length){const W=await re(m,o,u,L,I,d,S);_.push(W)}if(!f.update||!V)continue;const y=le.includes(o.field.type),{linkConfig:i}=o,{primaryKey:X}=i??{},G=V.tableValues[o.field.id]??null;if(y&&o.hasChildren&&((k=o.children)!=null&&k.length)&&X&&(e===q.merge_direct||G===null)){const W=await me(F,o,h,u,L,O,d);_.push(W)}if(E.asyncTypes.includes(o.field.type)&&await ge(F,o,h,u,L,O,d,S),!y){const W=await Ae(F,G,e,h,o);W&&_.push(W)}}if(d(l.onAnalyzeRecords,{stage:"analyzeRecords",data:{number:c.length,success:1,error:0}}),M.length){S.action=v.Update;const o={};for(const h of _.filter(y=>y!==null)){const[y,i]=await Promise.all([h.getFieldId(),h.getValue()]);o[y]=i}const F={recordId:V.id,fields:o};return S.data.push(F),I.push(S),I}return S.data.push(..._.filter(o=>o!==null)),I.push(S),I},g.records,R.records);O.push(...w)}d(l.onAnalyzeRecordsEnd,{stage:"analyzeRecords"});const B=K(O,"action"),j=B[v.Async];if(j&&j.length){const p=K(j,"asyncField.field.type"),x=Object.keys(p),b=x.reduce((m,I)=>(m[I]=p[I].map(T=>T.data).flat(),m),{});d(l.beforeAsyncData,{stage:"asyncData",data:{progress:!0,number:j.length,success:[],error:[]}});for(const m of x){const I=p[m];await E.asyncMethod({data:b[m],onProgress:T=>{const{message:P="",loaded:M,total:V}=T;d(l.onAsyncData,{stage:"asyncData",data:{message:{text:P+`
${M}/${V}`}}})},onError:T=>{$({title:"asyncDataFailure",message:String(T),error:T})}},I[0].asyncField)}const w=K(j,"table.id");for(const m of Object.keys(w)){const I=u[m],T=w[m],P=K(T,"asyncField.field.id");for(const M of Object.keys(P)){const V=I.fields[M];for(const S of P[M]){d(l.onAsyncData,{stage:"asyncData",data:{message:{text:"importInfo.createCell",params:{fieldId:V.id,tableId:m}}}});const _=await E.getCell(V,S.asyncField,S.value);if(console.log(_,S.target),!(!_||!S.target)){if(S.target.action===v.Add)S.target.data.push(_);else if(S.target.action===v.Update){const[k,o]=await Promise.all([_.getFieldId(),_.getValue()]);S.target.data[0].fields[k]=o}S.status=z.Success}}}}d(l.onAsyncDataEnd,{stage:"asyncData"})}const Y=B[v.Delete];if(Y&&f.delete&&Y.length){d(l.beforeDeleteRecords,{stage:"deleteRecords",data:{progress:!0,number:Y.length,success:[],error:[]}});const p=K(Y,"table.id"),x=Object.keys(p);for(const b of x){const w=u[b],m=p[b];await Ee(m,w.table,ce,0,d)}d(l.onDeleteRecordsEnd,{stage:"deleteRecords"})}const Q=B[v.Add];if(Q&&(e===q.append||f.add)&&Q&&Q.length){d(l.beforeAddRecords,{stage:"addRecords",data:{progress:!0,number:Q.length,success:[],error:[]}});const p=K(Q,"table.id"),x=Object.keys(p);for(const b of x){const w=u[b],m=p[b];await Se(m,w.table,ie,0,d)}d(l.onAddRecordsEnd,{stage:"addRecords"})}const Z=B[v.Update];if(Z&&f.update&&Z.length){d(l.beforeUpdateRecords,{stage:"updateRecords",data:{progress:!0,number:Z.length,success:[],error:[]}});const p=K(Z,"table.id"),x=Object.keys(p);for(const b of x){const w=u[b],m=p[b];await xe(m,w.table,ue,0,d)}d(l.onUpdateRecordsEnd,{stage:"updateRecords"})}E.reset(),d(l.onEnd,{stage:"end"})}export{je as importExcel};
