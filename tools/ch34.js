/* ================= 3.4 A MOD MŰVELET ================= */
/* x = v/2 (fél lépések), y egész. Pontos: mod = (v − 2y·⌊v/(2y)⌋)/2 */
const sMod=(v,y)=>y===0?v/2:(v-2*y*Math.floor(v/(2*y)))/2;
c2hero("mod-bevezeto",350,13,fr=>{
  const s=$("#u-hero"),W=420,H=250,cx=W/2,cy=H/2,R=95;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const x=fr*5+9; /* 9, 14, 19 … */
  el("circle",{cx,cy,r:R,style:"fill:none;stroke:var(--line);stroke-width:2"},s);
  for(let h=0;h<12;h++){const a=-Math.PI/2+h*Math.PI/6;el("line",{x1:cx+R*Math.cos(a),y1:cy+R*Math.sin(a),x2:cx+(R-9)*Math.cos(a),y2:cy+(R-9)*Math.sin(a),style:"stroke:var(--muted)"},s);txt(s,cx+(R-24)*Math.cos(a),cy+(R-24)*Math.sin(a)+4,h===0?12:h,"");}
  const m=((x%12)+12)%12,a=-Math.PI/2+m*Math.PI/6;
  el("line",{x1:cx,y1:cy,x2:cx+(R-30)*Math.cos(a),y2:cy+(R-30)*Math.sin(a),style:"stroke:var(--accent-2);stroke-width:4;stroke-linecap:round"},s);
  el("circle",{cx,cy,r:5,style:"fill:var(--accent-2)"},s);
  $("#u-hero-a").textContent="x = "+x;$("#u-hero-b").textContent=m;
});

/* --- §1 definíció --- */
function sDef(){
  const v=+$("#u-d-x").value,y=+$("#u-d-y").value;$("#u-d-xv").textContent=fm(v/2);$("#u-d-yv").textContent=y;
  const x=v/2,m=sMod(v,y);
  /* ábra: a [0,y) szakasz és a maradék */
  const W=640,H=120,s=c2svg("#u-d-svg",W,H),L=60,R=W-40,span=Math.max(1,Math.abs(y));
  const X=t=>y===0?L:(y>0?L+(R-L)*t/span:R+(R-L)*t/span*1); /* y<0: a szakasz balra nyúlik (R-től) */
  const x0=y>=0?L:R-0,tx=t=>y>=0?L+(R-L)*t/span:R-(R-L)*(-t)/span*1;
  el("line",{x1:L,x2:R,y1:70,y2:70,class:"axis"},s);
  const A=y>=0?0:y,B=y>=0?y:0;
  el("rect",{x:y>=0?L:L,y:58,width:R-L,height:24,rx:4,style:"fill:var(--accent);opacity:.25"},s);
  for(let t=0;t<=span;t++){const px=L+(R-L)*t/span;txt(s,px,100,y>=0?t:y+t,"");el("line",{x1:px,x2:px,y1:62,y2:78,style:"stroke:var(--muted)"},s);}
  if(y!==0){const t=y>0?m:m-y;const px=L+(R-L)*t/span;el("circle",{cx:px,cy:70,r:8,style:"fill:var(--accent-2);stroke:var(--ink)"},s);txt(s,px,48,"x mod y = "+fm(m),"");}
  else txt(s,W/2,48,"y = 0: x mod 0 = x = "+fm(x),"");
  const q=y===0?null:Math.floor(v/(2*y)),trunc=y===0?x:x-y*Math.trunc(x/y);
  $("#u-d-info").innerHTML=y===0?`x mod 0 = x = ${fm(x)}`:
   `⌊x/y⌋ = ⌊${fm(x/y)}⌋ = ${q} &nbsp;·&nbsp; x mod y = ${fm(x)} − ${y}·${q} = <b>${fm(m)}</b> ${ok(y>0?(m>=0&&m<y):(m<=0&&m>y))} (${y>0?"0 ≤ eredmény < y":"y < eredmény ≤ 0"})<br>levágó maradék (a nulla felé kerekítő osztással): ${fm(trunc)}${Math.abs(trunc-m)>1e-9?" – eltér a mod értékétől":""}`;
}
["#u-d-x","#u-d-y"].forEach(id=>$(id).addEventListener("input",sDef));sDef();

/* --- §2 azonosságok --- */
const sFl=(p,q)=>Math.floor(p/q); /* egészek, q≠0 */
/* x = j/12; modJ(j,y) = x mod y szorozva 12-vel: j − 12y⌊j/(12y)⌋ */
const sMj=(j,y)=>y===0?j:j-12*y*sFl(j,12*y);
const sRules=[
 {t:"c·(x mod y) = (cx) mod (cy)",f:(j,y,c)=>c===0||y===0||c*sMj(j,y)===sMj(c*j,c*y)},
 {t:"(x + k·y) mod y = x mod y  (k egész)",f:(j,y,c)=>y===0||sMj(j+12*y*c,y)===sMj(j,y)},
 {t:"0 ≤ x mod y < y  (y > 0)",f:(j,y,c)=>y<=0||(sMj(j,y)>=0&&sMj(j,y)<12*y)},
 {t:"(x + w) mod y = x mod y + w mod y  (w = c, HAMIS)",f:(j,y,c)=>y===0||sMj(j+12*c,y)===sMj(j,y)+sMj(12*c,y)}
];
$("#u-t-r").innerHTML=sRules.map((r,i)=>`<option value="${i}">${r.t}</option>`).join("");
function sTul(){
  const r=sRules[+$("#u-t-r").value];let n=0,bad=0,first=null;
  for(let j=-60;j<=60;j++)for(let y=-7;y<=7;y++)for(let c=-3;c<=3;c++){n++;if(!r.f(j,y,c)){bad++;if(!first)first=[j,y,c];}}
  const fr=a=>a%12===0?String(a/12):`${a}/12`;
  $("#u-t-info").innerHTML=bad===0?`${n} esetből mind teljesül ${ok(true)}`:`${n} esetből ${bad} hibás ${ok(false)}; első ellenpélda: x = ${fr(first[0])}, y = ${first[1]}, c = ${first[2]}`;
}
$("#u-t-r").addEventListener("input",sTul);sTul();

/* --- §3 igazságos felosztás, Hermite --- */
function sFel(){
  const n=+$("#u-f-n").value,m=+$("#u-f-m").value;$("#u-f-nv").textContent=n;$("#u-f-mv").textContent=m;
  const g=Array.from({length:m},(_,k)=>Math.floor((n+k)/m)),S=g.reduce((a,b)=>a+b,0);
  c2bars(c2svg("#u-f-svg",640,170),g,{H:170,xl:i=>i,color:()=>"var(--accent)",fmt:v=>String(v)});
  $("#u-f-info").innerHTML=`csoportméretek ⌊(n+k)/m⌋: ${g.join(", ")} &nbsp;·&nbsp; összeg = ${S} ${ok(S===n)} &nbsp;·&nbsp; max − min = ${Math.max(...g)-Math.min(...g)} ${ok(Math.max(...g)-Math.min(...g)<=1)} &nbsp;·&nbsp; ⌈n/m⌉ méretű csoportok száma = n mod m = ${n%m}`;
  const a=+$("#u-h-a").value;$("#u-h-av").textContent=a;
  const terms=Array.from({length:m},(_,k)=>Math.floor((a*m+12*k)/(12*m))),T=terms.reduce((x,y)=>x+y,0),R=Math.floor(a*m/12);
  $("#u-h-info").innerHTML=`Hermite: x = ${a}/12 = ${fm(a/12)}, m = ${m}: Σ⌊x + k/m⌋ = ${terms.join(" + ")} = ${T} &nbsp;·&nbsp; ⌊m·x⌋ = ${R} ${ok(T===R)}`;
}
["#u-f-n","#u-f-m","#u-h-a"].forEach(id=>$(id).addEventListener("input",sFel));sFel();
