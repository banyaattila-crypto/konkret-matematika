/* ================= 3.5 ÖSSZEGEK ================= */
const tGcd=(a,b)=>b?tGcd(b,a%b):a;
c2hero("padloosszeg-bevezeto",350,10,fr=>{
  const s=$("#t-hero"),W=420,H=250,a=3,b=5;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const gx=(W-60)/(b+1),gy=(H-50)/(a+1);let n=0;
  for(let x=1;x<=b;x++)for(let y=1;y<=a;y++){
    const under=a*x>=b*y; /* y ≤ ax/b */
    const px=30+x*gx,py=H-25-y*gy;
    if(fr>=x*2-1||fr>=10)el("circle",{cx:px,cy:py,r:6,style:`fill:${under?"var(--accent)":"var(--line)"};opacity:.9`},s);
  }
  for(let x=1;x<b;x++){if(fr>=x*2-1||fr>=10)n+=Math.floor(a*x/b);}
  el("line",{x1:30,y1:H-25,x2:30+(b+1)*gx,y2:H-25-(a/b)*(b+1)*gy,style:"stroke:var(--accent-2);stroke-width:2"},s);
  $("#t-hero-b").textContent=n;
});

/* --- §1 rácspontok --- */
function tRac(){
  const a=+$("#t-r-a").value,b=+$("#t-r-b").value;$("#t-r-av").textContent=a;$("#t-r-bv").textContent=b;
  const W=640,H=300,s=c2svg("#t-r-svg",W,H),m=Math.max(a,b)+1,u=Math.min((W-60)/(b+1),(H-50)/(a+1));
  const X=x=>40+x*u,Y=y=>H-30-y*u;
  el("line",{x1:X(0),y1:Y(0),x2:X(b),y2:Y(a),style:"stroke:var(--accent-2);stroke-width:2"},s);
  el("rect",{x:X(0),y:Y(a),width:b*u,height:a*u,style:"fill:none;stroke:var(--line)"},s);
  let below=0,on=0,above=0;
  for(let x=1;x<b;x++)for(let y=1;y<a;y++){const d=a*x-b*y;
    const cls=d>0?"var(--accent)":d===0?"var(--accent-2)":"var(--line)";
    if(d>0)below++;else if(d===0)on++;else above++;
    el("circle",{cx:X(x),cy:Y(y),r:Math.max(3,Math.min(7,u/4)),style:`fill:${cls}`},s);}
  let sum=0;for(let k=1;k<b;k++)sum+=Math.floor(a*k/b);
  let sum2=0;for(let k=1;k<a;k++)sum2+=Math.floor(b*k/a);
  const g=tGcd(a,b),f=((a-1)*(b-1)+g-1)/2;
  /* az összeg tartalmazza az átló pontjait és az y=a pontokat is, ha ⌊ak/b⌋ = a nem fordul elő (k<b ⇒ ak/b<a) */
  $("#t-r-info").innerHTML=`Σ⌊${a}k/${b}⌋ (k=1…${b-1}) = ${sum} &nbsp;·&nbsp; ((a−1)(b−1) + g − 1)/2 = ((${a-1})(${b-1}) + ${g} − 1)/2 = ${f} ${ok(sum===f)}<br>reciprocitás: ${sum} + ${sum2} = ${sum+sum2} = (a−1)(b−1) + g − 1 = ${(a-1)*(b-1)+g-1} ${ok(sum+sum2===(a-1)*(b-1)+g-1)} &nbsp;·&nbsp; a belső pontok: alatta ${below}, rajta ${on}, fölötte ${above}`;
}
["#t-r-a","#t-r-b"].forEach(id=>$(id).addEventListener("input",tRac));tRac();

/* --- §2 gyökök --- */
function tGyok(){
  const n=+$("#t-g-n").value;$("#t-g-nv").textContent=n;
  const v=[];for(let k=1;k<=100;k++)v.push(Math.floor(Math.sqrt(k)+1e-9)); /* egész gyökre pontos: ellenőrzés lent */
  /* egész négyzetekre a lebegőpontos gyök pontos, de biztosra megyünk */
  const isq=k=>{let r=Math.floor(Math.sqrt(k));while(r*r>k)r--;while((r+1)*(r+1)<=k)r++;return r;};
  for(let k=1;k<=100;k++)v[k-1]=isq(k);
  c2bars(c2svg("#t-g-svg",640,190),v,{H:190,label:false,color:(i)=>i+1<=n?"var(--accent)":"var(--line)",alpha:(i)=>i+1<=n?.9:.5});
  let S=0;for(let k=1;k<=n;k++)S+=isq(k);
  const m=isq(n),f=m*(n+1)-m*(m+1)*(2*m+1)/6;
  $("#t-g-info").innerHTML=`m = ⌊√${n}⌋ = ${m} &nbsp;·&nbsp; közvetlen összeg = ${S} &nbsp;·&nbsp; m(n+1) − m(m+1)(2m+1)/6 = ${m}·${n+1} − ${m*(m+1)*(2*m+1)/6} = ${f} ${ok(S===f)}`;
}
$("#t-g-n").addEventListener("input",tGyok);tGyok();
