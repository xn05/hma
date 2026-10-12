const {ALL,ROOT}=DB.journeyTree(),C=DB.countries();
const BYPLACE={};C.forEach((c,ci)=>c.g.forEach((g,gi)=>{const u=new Set();g.r.forEach(r=>r.pts.forEach(p=>u.add(p.k)));u.forEach(k=>(BYPLACE[k]=BYPLACE[k]||[]).push([ci,gi]))}));
/* App state */
let tab='ex',path=[],sel=null,pc=null,ps=null,q='',items=[];
const anc=n=>{const a=[];for(let p=n.p;p;p=p.p)a.unshift(p);return a};
const nm=n=>P[n.k][2],dc=d=>`hsl(${45+d*14} 90% 60%)`,PAL=['#f5b942','#4fd1c5','#f472b6','#a78bfa','#fb7185'];
const hint=t=>{$('#hint').textContent=t;$('#hint').style.display=t?'':'none'};
const info=h=>$('#info').innerHTML=h;
function row(ic,t,sub,go,on,i){return`<div class="row${on?' on':''}" data-i="${i}"><span>${ic}</span><span class="nm">${t}<small>${sub}</small></span>${go?'<b class="go" data-go="1">›</b>':''}</div>`}
/* Journey tab */
function exList(){const cur=path.at(-1);
 if(q){const s=q.toLowerCase();items=Object.values(ALL).filter(n=>(nm(n)+' '+n.t+' '+n.d).toLowerCase().includes(s));$('#crumb').textContent=items.length+' result'+(items.length==1?'':'s')}
 else{items=cur?cur.c:[ROOT];$('#crumb').innerHTML=['<span data-c="-1">🌍 Origins</span>',...path.map((n,i)=>`<span data-c="${i}">${nm(n)}</span>`)].join(' › ')}
 $('#list').innerHTML=items.length?items.map((n,i)=>row(n.c.length?'📁':'📍',nm(n),q?[...anc(n),n].map(nm).join(' › '):n.d,n.c.length,sel==n,i)).join(''):'<p class="m" style="padding:10px">End of this branch, no further stops recorded.</p>'}
function exScene(){const cur=path.at(-1),nodes=[],segs=[],keys=[];
 const go=n=>()=>exAct(n,0),add=(n,cls)=>{nodes.push({k:n.k,cls:sel==n&&cls!='cur'?'sel':cls,sub:n.d,cb:go(n)});keys.push(n.k)};
 if(!cur)add(ROOT,'kid');else{path.forEach((n,i)=>{add(n,i==path.length-1?'cur':'anc');if(n.p)segs.push({a:n.p.k,b:n.k,col:dc(n.dp),l:n.d,dim:1})});
  cur.c.forEach(n=>{add(n,'kid');segs.push({a:cur.k,b:n.k,col:dc(n.dp),l:n.d})})}
 if(sel&&!keys.includes(sel.k))add(sel,'sel');
 draw(nodes,segs);fit(keys);hint(cur?(cur.c.length?'Double-click a stop to follow the journey further':'End of this branch'):'Double-click the folder to see where people went next')}
function exInfo(){const n=sel;if(!n)return info('<p class="m">Select a place to see its date and story.</p>');
 const pe=(BYPLACE[n.k]||[]),shown=pe.slice(0,14);
 info(`<h3>${nm(n)}</h3><span class="chip">${n.d}</span><p>${n.t}</p><p class="m">${[...anc(n),n].map(nm).join(' → ')}</p>`+(pe.length?`<p class="m">Peoples whose routes pass through here:</p><div class="chips">${shown.map(([a,b])=>`<span class="chip lk" data-pg="${a}:${b}">${C[a].g[b].n}</span>`).join('')}${pe.length>shown.length?`<span class="m"> +${pe.length-shown.length} more (search in Peoples)</span>`:''}</div>`:''))}
function exAct(n,dbl){const sr=!!q;if(sr){q='';$('#q').value=''}
 if(dbl&&n.c.length)path=[...anc(n),n];else if(sr)path=anc(n);
 sel=n;if(sr||dbl)exList();else document.querySelectorAll('.row').forEach((r,i)=>r.classList.toggle('on',items[i]==n));
 exScene();exInfo()}
/* Peoples tab */
function ppList(){const s=q.toLowerCase();
 if(q){const cs=C.map((c,i)=>[c,i]).filter(([c])=>c.n.toLowerCase().includes(s)),gs=C.flatMap(c=>c.g).filter(g=>(g.n+' '+g.t+' '+C[g.ci].n).toLowerCase().includes(s));
  items=[...cs.map(([c,i])=>({c:i})),...gs.map(g=>({g}))];$('#crumb').textContent=items.length+' result'+(items.length==1?'':'s');
  $('#list').innerHTML=items.map((it,i)=>it.g?row('🧬',it.g.n,C[it.g.ci].n,0,ps==it.g,i):row('📁',C[it.c].n,C[it.c].g.length+' peoples · '+C[it.c].region,1,0,i)).join('')}
 else if(pc==null){items=C.map((c,i)=>({c:i}));$('#crumb').innerHTML='<span data-c="-1">🌐 Countries</span>';
  $('#list').innerHTML=items.map((it,i)=>row('📁',C[i].n,C[i].g.length+' peoples · '+C[i].region,1,0,i)).join('')}
 else{items=C[pc].g.map(g=>({g}));$('#crumb').innerHTML=`<span data-c="-1">🌐 Countries</span> › <span>${C[pc].n}</span>`;
  $('#list').innerHTML=items.map((it,i)=>row('🧬',it.g.n,it.g.r[0].pts.at(-1).d?'main route ends '+it.g.r[0].pts.at(-1).d:'',0,ps==it.g,i)).join('')}}
function ppScene(){if(pc==null){draw([],[]);hint('Open a country folder, then pick a people to trace their journey');fit([]);return}
 const nodes=[],segs=[],keys=[],seen={};
 C[pc].g.forEach((g,gi)=>{const on=ps==g,dim=ps&&!on;
  g.r.forEach((r,ri)=>{const col=dim?'#6b7fa8':ps?PAL[ri%5]:PAL[gi%5];
   r.pts.forEach((p,i)=>{keys.push(p.k);if(i)segs.push({a:r.pts[i-1].k,b:p.k,col,l:p.d,dim:dim||(!ps&&ri>0)});
    if(!dim&&(on||i==r.pts.length-1&&ri==0)&&!seen[p.k+gi]){seen[p.k+gi]=1;nodes.push({k:p.k,cls:i==r.pts.length-1&&ri==0?'cur':'kid',sub:on?p.d:g.n,cb:()=>ppAct({g},0)})}})})});
 draw(nodes,segs);fit(keys,110);hint(ps?'':'Pick a people to see their path')}
function ppInfo(){const g=ps;if(!g)return info(pc==null?'<p class="m">Open a country to explore the origins of its peoples.</p>':'<p class="m">Select a people to see where their ancestors travelled from.</p>');
 info(`<h3>${g.n}</h3><span class="chip">${C[g.ci].n}</span><p>${g.t}</p><p class="m">Tap a place to find it on the Journey tab.</p>`+g.r.map((r,i)=>`<div class="rt"><i style="background:${PAL[i%5]}"></i><span>${r.l?'<b>'+r.l+':</b> ':''}${r.pts.map(p=>`<span class="lk" data-pk="${p.k}">${P[p.k][2]}</span>`+(p.d?' ('+p.d+')':'')).join(' → ')}</span></div>`).join(''))}
function ppAct(it,dbl){if(it.c!=null){pc=it.c;ps=null;q='';$('#q').value='';return ppAll()}
 if(q){pc=it.g.ci;q='';$('#q').value='';ps=it.g;return ppAll()}
 ps=it.g;document.querySelectorAll('.row').forEach((r,i)=>r.classList.toggle('on',items[i].g==ps));ppScene();ppInfo()}
const ppAll=()=>{ppList();ppScene();ppInfo()},exAll=()=>{exList();exScene();exInfo()};
const all=()=>tab=='ex'?exAll():ppAll();
/* Events */
$('#list').addEventListener('click',e=>{const r=e.target.closest('.row');if(!r)return;const it=items[+r.dataset.i];
 if(tab=='ex')exAct(it,e.target.dataset.go?1:0);else ppAct(it,0)});
$('#list').addEventListener('dblclick',e=>{const r=e.target.closest('.row');if(r&&tab=='ex')exAct(items[+r.dataset.i],1)});
$('#crumb').addEventListener('click',e=>{const c=e.target.dataset.c;if(c==null)return;
 if(tab=='ex'){path=path.slice(0,+c+1);sel=path.at(-1)||null}else{pc=null;ps=null}all()});
$('#q').addEventListener('input',e=>{q=e.target.value.trim();tab=='ex'?exList():ppList()});
function setTab(t){tab=t;document.body.dataset.tab=t;q='';$('#q').value='';
 document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x.dataset.t==t));
 $('#q').placeholder=tab=='ex'?'Search places or dates…':'Search countries or peoples…';all()}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>setTab(b.dataset.t));
function goPlace(k){const n=ALL[k];if(!n)return;setTab('ex');path=anc(n);sel=n;exList();exScene();exInfo();
 const r=[...document.querySelectorAll('.row')][items.indexOf(n)];if(r)r.scrollIntoView({block:'nearest'})}
function goPeople(ci,gi){setTab('pp');pc=ci;ps=C[ci].g[gi];ppList();ppScene();ppInfo();
 const r=[...document.querySelectorAll('.row')][gi];if(r)r.scrollIntoView({block:'nearest'})}
$('#info').addEventListener('click',e=>{const a=e.target.closest('[data-pk],[data-pg]');if(!a)return;
 if(a.dataset.pk)goPlace(a.dataset.pk);else{const[c,g]=a.dataset.pg.split(':');goPeople(+c,+g)}});
apply(vb);exAll();
/* Collapsible map key */
const key=$('#key');
function setKey(open){key.classList.toggle('closed',!open);$('#keyt').setAttribute('aria-expanded',open);$('#keyx').textContent=open?'–':'+';try{localStorage.setItem('hmKey',open?'1':'0')}catch(e){}}
let keyOpen=innerWidth>800;try{const v=localStorage.getItem('hmKey');if(v!=null)keyOpen=v=='1'}catch(e){}
setKey(keyOpen);$('#keyt').onclick=()=>setKey(key.classList.contains('closed'));
