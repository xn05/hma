const $=s=>document.querySelector(s),NS='http://www.w3.org/2000/svg';
/* Base map = map/map.svg. Calibration (see the comment at the top of that file). */
const MAP={file:'map/map.svg',w:3742.6667,h:2138.6667,x0:1744.5,sx:9.114,c:1410.2,R:589.4,
 home:{x:170,y:190,w:3350,h:1870}};            // area of the canvas that actually contains land
const X=lon=>MAP.x0+MAP.sx*lon,
 Y=lat=>MAP.c-MAP.R*1.25*Math.log(Math.tan(Math.PI/4+0.4*lat*Math.PI/180)),
 WORLD=360*MAP.sx, K=MAP.w/360;                // WORLD = width of 360 degrees; K = scale vs the old 360-unit map
const P=DB.placeMap(); // id -> [lon, lat, name]
const bg=$('#bg'),lay=$('#lay'),svg=$('#map');
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);(p||lay).appendChild(e);return e};
for(let l=-180;l<=180;l+=30)el('path',{d:`M${X(l)} 0V${MAP.h}`,class:'grat'},bg);
for(let l=-60;l<=80;l+=30)el('path',{d:`M0 ${Y(l)}H${MAP.w}`,class:'grat'},bg);
el('image',{href:MAP.file,x:0,y:0,width:MAP.w,height:MAP.h,class:'coast'},bg);
/* View */
let vb={...MAP.home},moved=0;
const cw=()=>svg.clientWidth||800,ch=()=>svg.clientHeight||500;
function clamp(v){const mw=Math.max(MAP.w,MAP.h*cw()/ch());v.w=Math.min(Math.max(v.w,MAP.w*.05),mw);v.h=v.w*ch()/cw();
 v.x=v.w>=MAP.w?(MAP.w-v.w)/2:Math.min(Math.max(v.x,0),MAP.w-v.w);v.y=v.h>=MAP.h?(MAP.h-v.h)/2:Math.min(Math.max(v.y,0),MAP.h-v.h);return v}
const home=()=>{const w=Math.max(MAP.home.w,MAP.home.h*cw()/ch());return{x:MAP.home.x+MAP.home.w/2-w/2,y:MAP.home.y+MAP.home.h/2-w*ch()/cw()/2,w}};
function apply(v){vb=clamp({...v});svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);const s=vb.w/cw();
 lay.querySelectorAll('.px').forEach(e=>e.setAttribute('transform',`translate(${e.dataset.x} ${e.dataset.y}) scale(${s}) rotate(${e.dataset.r||0})`))}
function fly(t){t=clamp({...t});const f={...vb},st=performance.now();(function f2(now){let k=Math.min(1,(now-st)/650);k=1-(1-k)**3;
 apply({x:f.x+(t.x-f.x)*k,y:f.y+(t.y-f.y)*k,w:f.w+(t.w-f.w)*k});if(k<1)requestAnimationFrame(f2)})(st)}
function fit(keys,min){if(!keys.length)return fly(home());let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
 keys.forEach(k=>{const x=X(P[k][0]),y=Y(P[k][1]);x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)});
 const w=Math.max(x1-x0+40*K,(y1-y0+30*K)*cw()/ch(),(min||90)*K),h=w*ch()/cw();fly({x:(x0+x1)/2-w/2,y:(y0+y1)/2-h/2,w})}
function zoom(f,cx,cy){const px=cx??.5,py=cy??.5,nw=vb.w*f;apply({x:vb.x+vb.w*px-nw*px,y:vb.y+vb.h*py-nw*ch()/cw()*py,w:nw})}
svg.addEventListener('wheel',e=>{e.preventDefault();const r=svg.getBoundingClientRect();zoom(e.deltaY>0?1.15:1/1.15,(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height)},{passive:false});
let dr=null;svg.addEventListener('pointerdown',e=>{dr={x:e.clientX,y:e.clientY,v:{...vb}};moved=0});
addEventListener('pointermove',e=>{if(!dr)return;const dx=e.clientX-dr.x,dy=e.clientY-dr.y;if(Math.abs(dx)+Math.abs(dy)>4)moved=1;if(moved){const s=dr.v.w/cw();apply({...dr.v,x:dr.v.x-dx*s,y:dr.v.y-dy*s})}});
addEventListener('pointerup',()=>dr=null);
$('#zi').onclick=()=>zoom(1/1.4);$('#zo').onclick=()=>zoom(1.4);$('#zr').onclick=()=>fly(home());
addEventListener('resize',()=>apply(vb));
/* Drawing */
function px(x,y,r,p){return el('g',{class:'px','data-x':x,'data-y':y,'data-r':r||0},p)}
function seg(s){const a=P[s.a],b=P[s.b];let x1=X(a[0]),y1=Y(a[1]),x2=X(b[0]),y2=Y(b[1]);
 let wrap=0;if(x2-x1>WORLD/2){x2-=WORLD;wrap=1}else if(x2-x1<-WORLD/2){x2+=WORLD;wrap=1}
 const sh=[0];if(Math.min(x1,x2)<0)sh.push(WORLD);if(Math.max(x1,x2)>MAP.w)sh.push(-WORLD);
 if(wrap&&sh.length<2)sh.push(x2>x1?-WORLD:WORLD);   // routes crossing the map edge are drawn on both sides
 const dx=x2-x1,dy=y2-y1,cx=(x1+x2)/2-dy*.12,cy=(y1+y2)/2+dx*.12,mx=.25*x1+.5*cx+.25*x2,my=.25*y1+.5*cy+.25*y2;
 sh.forEach(d=>{const g=el('g',{opacity:s.dim?.3:1,transform:`translate(${d} 0)`});
  el('path',{d:`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`,class:'flow',stroke:s.col},g);
  const ar=px(mx,my,Math.atan2(y2-y1,x2-x1)*180/Math.PI,g);el('polygon',{points:'-6,-5 6,0 -6,5',fill:s.col,stroke:'#0a1020','stroke-width':1},ar);
  if(s.l&&!s.dim){const lb=px(mx,my,0,g);el('text',{class:'lb s',y:-10,'text-anchor':'middle'},lb).textContent=s.l}})}
function node(n){const [lo,la,nm]=P[n.k],x=X(lo),y=Y(la),g=px(x,y,0);g.classList.add('nd');
 const c={cur:['#f5b942',9],sel:['#fff',8],kid:['#4fd1c5',7],anc:['#8da0c4',5],ex:['#fff',7]}[n.cls||'kid'];
 if(n.cls=='cur'||n.cls=='sel')el('circle',{r:c[1],fill:'none',stroke:c[0],'stroke-width':2,class:'pulse'},g);
 el('circle',{r:c[1],fill:c[0],stroke:'#0a1020','stroke-width':2},g);
 el('text',{class:'lb',x:c[1]+5,y:4},g).textContent=nm;if(n.sub)el('text',{class:'lb s',x:c[1]+5,y:17},g).textContent=n.sub;
 g.addEventListener('click',()=>{if(!moved&&n.cb)n.cb()})}
function draw(nodes,segs){lay.innerHTML='';segs.forEach(seg);nodes.forEach(node);apply(vb)}
