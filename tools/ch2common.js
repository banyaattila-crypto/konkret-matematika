/* ================= 2. FEJEZET: KÖZÖS ESZKÖZÖK ================= */
const rgcd=(a,b)=>{if(a<0n)a=-a;if(b<0n)b=-b;while(b){[a,b]=[b,a%b];}return a;};
class Rat{
  constructor(n,d=1n){n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=rgcd(n,d)||1n;this.n=n/g;this.d=d/g;}
  add(o){return new Rat(this.n*o.d+o.n*this.d,this.d*o.d);}
  sub(o){return new Rat(this.n*o.d-o.n*this.d,this.d*o.d);}
  mul(o){return new Rat(this.n*o.n,this.d*o.d);}
  div(o){return new Rat(this.n*o.d,this.d*o.n);}
  neg(){return new Rat(-this.n,this.d);}
  eq(o){return this.n===o.n&&this.d===o.d;}
  num(){return Number(this.n)/Number(this.d);}
  toString(){const a=this.n<0n?-this.n:this.n,s=this.n<0n?"−":"";return this.d===1n?s+a:`${s}${a}/${this.d}`;}
}
const rat=(n,d=1)=>new Rat(n,d);
const fm=x=>{if(Math.abs(x)<1e-9)return"0";const t=Math.abs(x)>=1e6?x.toExponential(4):(+x.toFixed(6)).toString();return t.replace(".",",").replace("-","−");};
const c2sub=n=>String(n).split("").map(c=>"₀₁₂₃₄₅₆₇₈₉"[c]).join("");
const c2sg=v=>v<0?"−"+Math.abs(v):""+v;
const c2svg=(id,W,H)=>{const s=$(id);clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);return s;};
const ok=b=>b?"✓":"✗";
/* hero-hurok: csak akkor lép, ha az oldal látszik */
function c2hero(page,ms,nFrames,draw){
  draw(reduce?nFrames-1:0);
  if(reduce)return;
  let i=0;
  (async function(){for(;;){await sleep(ms);while(document.hidden||curPage!==page)await sleep(400);i=(i+1)%(nFrames+3);draw(Math.min(i,nFrames-1));}})();
}
/* oszlopdiagram (negatív értékekkel is) */
function c2bars(s,vals,o){
  o=Object.assign({ymin:null,W:640,H:220,l:44,r:10,t:18,b:26,color:()=>"var(--accent)",label:true,fmt:v=>fm(v),xl:i=>i+1,alpha:()=>1},o||{});
  const {W,H,l,r,t,b}=o,n=vals.length;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const ymin=o.ymin!==null?o.ymin:Math.min(0,...vals),ymax=Math.max(o.ymin!==null?-Infinity:0,...vals),span=(ymax-ymin)||1;
  const Y=v=>H-b-(H-b-t)*(v-ymin)/span,bw=(W-l-r)/n;
  for(let g=0;g<=3;g++){const v=ymin+span*g/3;el("line",{x1:l,x2:W-r,y1:Y(v),y2:Y(v),class:"grid-l"},s);txt(s,l-6,Y(v)+4,fm(+v.toPrecision(3)),"","end");}
  el("line",{x1:l,x2:W-r,y1:Y(0),y2:Y(0),class:"axis"},s);
  vals.forEach((v,i)=>{
    const x=l+i*bw,y0=o.ymin!==null?Y(ymin):Y(0),y1=Y(v);
    el("rect",{x:x+bw*.12,y:Math.min(y0,y1),width:bw*.76,height:Math.max(1,Math.abs(y1-y0)),rx:2,style:`fill:${o.color(i,v)};opacity:${o.alpha(i,v)}`},s);
    if(o.label&&n<=16)txt(s,x+bw/2,(v>=0?y1-4:y1+12),o.fmt(v),"");
    if(n<=20||i%Math.ceil(n/12)===0)txt(s,x+bw/2,H-8,o.xl(i),"");
  });
}
/* biztonságos kifejezés-kiértékelő: csak k, számok, + - * / ^ ( ) */
function c2expr(src){
  const s=String(src).replace(/\s+/g,"").replace(/−/g,"-").replace(/·/g,"*").replace(/\^/g,"**").replace(/,/g,".");
  if(!s||!/^[0-9k+\-*/().]*$/.test(s))return null;
  try{const f=new Function("k",`return (${s});`);const t=f(1);if(typeof t!=="number")return null;return f;}catch(e){return null;}
}
const c2ptsum=(v)=>Math.abs(v-Math.round(v))<1e-9?String(Math.round(v)).replace("-","−"):fm(v);
const c2join=(a)=>a.map((x,i)=>i===0?x:(x.startsWith("−")?" − "+x.slice(1):" + "+x)).join("");

/* közös: a feladat-oldalak hero-ja (oszlopok nehézségi szintenként) */
function exHero(page,sv,kEl,counts){
  const tot=counts.reduce((a,b)=>a+b,0),cols=["var(--good)","var(--accent)","var(--accent-2)","var(--bad)"],names=["bemelegítő","alap","haladó","kutatási"];
  c2hero(page,420,tot+1,fr=>{
    const s=$(sv),W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
    const bw=70,gap=24,x0=(W-4*bw-3*gap)/2,bh=30;let shown=0,total=0;
    el("line",{x1:20,x2:W-20,y1:H-44,y2:H-44,style:"stroke:var(--line);stroke-width:2"},s);
    counts.forEach((cnt,i)=>{const x=x0+i*(bw+gap);
      for(let j=0;j<cnt;j++){const idx=total+j;if(idx<=fr-1||fr>=tot){shown++;
        el("rect",{x,y:H-44-(j+1)*(bh+5),width:bw,height:bh,rx:7,style:`fill:${cols[i]};opacity:.88`},s);
        txt(s,x+bw/2,H-44-(j+1)*(bh+5)+bh/2+4,String(idx+1),"ink");}}
      total+=cnt;txt(s,x+bw/2,H-24,names[i],"");});
    $(kEl).textContent=Math.min(tot,shown);
  });
}
