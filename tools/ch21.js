/* ================= 2.1 JELÖLÉSEK ================= */
c2hero("jelolesek-bevezeto",650,10,fr=>{
  const s=$("#a-hero"),N=8,W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const bw=(W-40)/N;let tot=0;
  for(let k=1;k<=N;k++){
    const on=k<=fr;const h=on?k*(H-60)/N:0,x=20+(k-1)*bw;
    el("rect",{x:x+4,y:H-26-(on?h:0),width:bw-8,height:on?h:0,rx:3,style:`fill:${k===fr?"var(--accent-2)":"var(--accent)"};opacity:${on?1:0}`},s);
    el("rect",{x:x+4,y:H-26-(N*(H-60)/N),width:bw-8,height:H-60,rx:3,style:"fill:none;stroke:var(--line);stroke-dasharray:3 4"},s);
    txt(s,x+bw/2,H-8,k);
    if(on)tot+=k;
  }
  $("#a-hero-b").textContent=Math.min(fr,N)<1?0:tot;
});

/* --- §1 szigma-gép --- */
const aClosed={
  "k":(n)=>n*(n+1)/2,"k^2":(n)=>n*(n+1)*(2*n+1)/6,"2*k-1":(n)=>n*n,"2^k":(n)=>2**(n+1)-2,
  "1/(k*(k+1))":(n)=>n/(n+1),"(-1)^k":(n)=>n%2===0?0:-1
};
const aClosedTxt={"k":"n(n+1)/2","k^2":"n(n+1)(2n+1)/6","2*k-1":"n²","2^k":"2ⁿ⁺¹ − 2","1/(k*(k+1))":"n/(n+1)","(-1)^k":"0 vagy −1"};
function aSigma(){
  const src=$("#a-sz-expr").value,lo=Math.round(+$("#a-sz-lo").value),hi=Math.round(+$("#a-sz-hi").value);
  const info=$("#a-sz-info"),f=c2expr(src);
  if(!f||!isFinite(lo)||!isFinite(hi)){info.innerHTML="Ezt a kifejezést nem tudom kiértékelni. Használd a k változót, számokat és a + − * / ^ jeleket, például <span class=\"mono\">2*k+1</span>.";return;}
  if(hi-lo>39){info.textContent="A két határ különbsége legfeljebb 39 lehet.";return;}
  const ks=[];for(let k=lo;k<=hi;k++)ks.push(k);
  const vals=ks.map(k=>f(k));
  if(vals.some(v=>!isFinite(v))){info.textContent="A kifejezés valamelyik k-ra nem értelmezett (nullával osztás?).";return;}
  const tot=vals.reduce((a,b)=>a+b,0);
  $("#a-sz-cnt").textContent=ks.length;$("#a-sz-sum").textContent=c2ptsum(tot);
  const str=vals.map(c2ptsum);
  const ts=str.length<=10?c2join(str):c2join(str.slice(0,4))+" + … + "+c2join(str.slice(-2));
  const nm=src.replace(/\s+/g,"").replace(/−/g,"-").replace(/,/g,".");
  let cl="–",chk="";
  if(lo===1&&aClosed[nm]&&hi>=0){const c=aClosed[nm](hi);cl=aClosedTxt[nm];chk=` &nbsp;·&nbsp; zárt alak: ${aClosedTxt[nm]} = ${c2ptsum(c)} ${ok(Math.abs(c-tot)<1e-9)}`;}
  $("#a-sz-cl").textContent=cl.length>10?"lásd lent":cl;
  info.innerHTML=ks.length===0?`Üres összeg (${hi} &lt; ${lo}): az érték 0.`:`Σ<sub>k=${lo}</sub><sup>${hi}</sup> (${src}) = ${ts} = <b>${c2ptsum(tot)}</b>${chk}`;
  c2bars(c2svg("#a-sz-bars",640,200),vals,{H:200,xl:i=>ks[i],color:(i,v)=>v<0?"var(--bad)":"var(--accent)"});
}
["#a-sz-expr","#a-sz-lo","#a-sz-hi"].forEach(id=>$(id).addEventListener("input",aSigma));
document.querySelectorAll("#a-sz-pre button").forEach(b=>b.onclick=()=>{$("#a-sz-expr").value=b.dataset.e;document.querySelectorAll("#a-sz-pre button").forEach(x=>x.classList.toggle("primary",x===b));aSigma();});
aSigma();

/* --- §2 Iverson-zárójel --- */
const aPrime=k=>{if(k<2)return false;for(let d=2;d*d<=k;d++)if(k%d===0)return false;return true;};
function aIver(){
  const n=+$("#a-iv-n").value;$("#a-iv-nv").textContent=n;
  const conds=[["páratlan",$("#a-iv-odd").checked,k=>k%2===1],["prím",$("#a-iv-prime").checked,aPrime],["négyzetszám",$("#a-iv-sq").checked,k=>Number.isInteger(Math.sqrt(k))],[">5",$("#a-iv-gt").checked,k=>k>5]].filter(c=>c[1]);
  const box=$("#a-iv-cells");box.style.setProperty("--nc",n);
  let h="";const inc=[];
  for(let k=1;k<=n;k++){const b=conds.every(c=>c[2](k))?1:0;if(b)inc.push(k);
    h+=`<div class="cell"><span class="ck">${k}</span><span class="cb${b?" on":""}">${b}</span><span class="cv${b?" on":""}">${b?k*k:0}</span></div>`;}
  box.innerHTML=`<div class="cellkey"><span>k</span><span>[…]</span><span>k²·[…]</span></div><div class="cells" style="--nc:${n}">${h}</div>`;
  const tot=inc.reduce((a,k)=>a+k*k,0),names=["1 ≤ k ≤ "+n,...conds.map(c=>"k "+(c[0]===">5"?"> 5":"("+c[0]+")"))];
  $("#a-iv-info").innerHTML=`Σ<sub>k</sub> k²·${names.map(x=>"["+x+"]").join("")} = ${inc.length?c2join(inc.map(k=>String(k*k))):"0"} = <b>${tot}</b>`+(conds.length===0?` &nbsp;·&nbsp; n(n+1)(2n+1)/6 = ${n*(n+1)*(2*n+1)/6} ${ok(n*(n+1)*(2*n+1)/6===tot)}`:"");
}
["#a-iv-n","#a-iv-odd","#a-iv-prime","#a-iv-sq","#a-iv-gt"].forEach(id=>$(id).addEventListener("input",aIver));aIver();

/* --- §3 összeg-téglalapok --- */
const aTgF={k:k=>k,k2:k=>k*k,odd:k=>2*k-1,inv:k=>1/k};
function aTeg(){
  const kind=$("#a-tg-f").value,f=aTgF[kind];let lo=+$("#a-tg-lo").value,hi=+$("#a-tg-hi").value;
  $("#a-tg-lov").textContent=lo;$("#a-tg-hiv").textContent=hi;
  const N=12,vals=Array.from({length:N},(_,i)=>f(i+1));
  c2bars(c2svg("#a-tg-svg",640,230),vals,{H:230,color:(i)=>(i+1>=lo&&i+1<=hi)?"var(--accent-2)":"var(--accent)",alpha:(i)=>(i+1>=lo&&i+1<=hi)?1:.35,fmt:v=>kind==="inv"?fm(v).slice(0,5):fm(v)});
  let s=0;for(let k=lo;k<=hi;k++)s+=f(k);
  const names={k:"k",k2:"k²",odd:"2k − 1",inv:"1/k"};
  $("#a-tg-info").innerHTML=lo>hi?`Üres összeg (${hi} &lt; ${lo}) = 0`:`Σ<sub>k=${lo}</sub><sup>${hi}</sup> ${names[kind]} = <b>${c2ptsum(s)}</b>`;
}
["#a-tg-f","#a-tg-lo","#a-tg-hi"].forEach(id=>$(id).addEventListener("input",aTeg));aTeg();
function aGnom(){
  const n=+$("#a-gn-n").value;$("#a-gn-nv").textContent=n;const W=320,u=Math.min(40,(W-20)/n),s=c2svg("#a-gn-svg",W,W*(n*u+20)/W);
  const x0=(W-n*u)/2;
  for(let i=0;i<n;i++)for(let j=0;j<n;j++){const L=Math.max(i,j)+1,p=n>1?100-100*(L-1)/(n-1):100;
    el("rect",{x:x0+j*u+1,y:10+i*u+1,width:u-2,height:u-2,rx:3,style:`fill:color-mix(in srgb,var(--accent) ${p}%,var(--accent-2))`},s);
    if(u>=22&&i===j)txt(s,x0+j*u+u/2,10+i*u+u/2+4,2*L-1,"ink");}
  $("#a-gn-info").innerHTML=`${Array.from({length:n},(_,k)=>2*k+1).join(" + ")} = <b>${n*n}</b> = ${n}² ${ok(Array.from({length:n},(_,k)=>2*k+1).reduce((a,b)=>a+b,0)===n*n)}`;
}
$("#a-gn-n").addEventListener("input",aGnom);aGnom();

/* --- §4 kötött változó --- */
function aKot(){
  const n=+$("#a-ko-n").value;$("#a-ko-nv").textContent=n;const a=k=>k*k;
  const A=Array.from({length:n},(_,i)=>a(i+1)),B=Array.from({length:n},(_,i)=>a(i+1)),C=Array.from({length:n},(_,i)=>a(n-i));
  const S=v=>v.reduce((x,y)=>x+y,0);
  $("#a-ko-info").innerHTML=`eredeti: Σ<sub>k=1</sub><sup>${n}</sup> k² = ${A.join(" + ")} = <b>${S(A)}</b><br>`+
   `eltolt: Σ<sub>k=0</sub><sup>${n-1}</sup> (k+1)² = ${Array.from({length:n},(_,k)=>`${k+1}²`.replace(/²/,"²")).join(" + ")} → ${S(B)} ${ok(S(B)===S(A))}<br>`+
   `megfordított: Σ<sub>k=1</sub><sup>${n}</sup> (${n}+1−k)² = ${C.join(" + ")} = ${S(C)} ${ok(S(C)===S(A))}`;
}
$("#a-ko-n").addEventListener("input",aKot);aKot();
