/* ================= 2.7 VÉGTELEN ÖSSZEGEK ================= */
const hH=n=>{let s=0;for(let k=1;k<=n;k++)s+=1/k;return s;};
const hPs=(p,q,m)=>hH(2*p*m)-hH(p*m)/2-hH(q*m)/2; /* m blokk: p pozitív (1/(2i-1)), q negatív (−1/(2i)) */
c2hero("vegtelen-bevezeto",650,9,fr=>{
  const s=$("#h-hero"),N=8,W=420,H=250,bw=(W-40)/N,u=H-60;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  el("line",{x1:16,x2:W-16,y1:H-26-u,y2:H-26-u,style:"stroke:var(--accent-2);stroke-dasharray:4 4;stroke-width:1.2"},s);
  txt(s,W-18,H-30-u,"1","","end");
  const f=Math.min(Math.max(fr,1),N);
  for(let n=1;n<=N;n++){const v=1-2**-n,on=n<=f,x=20+(n-1)*bw;
    el("rect",{x:x+3,y:H-26-(on?v*u:0),width:bw-6,height:on?v*u:0,rx:3,style:`fill:${n===f?"var(--accent-2)":"var(--accent)"};opacity:${on?1:0}`},s);txt(s,x+bw/2,H-8,n);}
  $("#h-hero-a").textContent="n = "+f;$("#h-hero-b").textContent=fm(1-2**-f);
});

/* --- §1 mértani sor --- */
function hGeo(){
  const x=+(+$("#h-g-x").value).toFixed(2),N=+$("#h-g-n").value;$("#h-g-xv").textContent=fm(x);$("#h-g-nv").textContent=N;
  const S=[];let t=1,s=0;for(let k=0;k<=N;k++){s+=t;S.push(s);t*=x;}
  c2bars(c2svg("#h-g-svg",640,210),S,{H:210,label:false,xl:i=>i,color:(i)=>i===N?"var(--accent-2)":"var(--accent)"});
  const i=$("#h-g-info");
  if(Math.abs(x)<1){const L=1/(1-x),err=Math.abs(x)**(N+1)/Math.abs(1-x);
    i.innerHTML=`S<sub>${N}</sub> = ${fm(S[N])} &nbsp;·&nbsp; határérték 1/(1−x) = ${fm(L)} &nbsp;·&nbsp; hiba = ${fm(Math.abs(L-S[N]))} = |x|<sup>N+1</sup>/|1−x| = ${fm(err)} ${ok(Math.abs(Math.abs(L-S[N])-err)<1e-9*Math.max(1,err))}`;
  }else i.innerHTML=`|x| ≥ 1: S<sub>${N}</sub> = ${fm(S[N])}; a részletösszegek ${x>=1?"korlátlanul nőnek":"nem közelednek egy számhoz (előjelesen ugrálnak)"}, tehát az összeg nem létezik.`;
}
["#h-g-x","#h-g-n"].forEach(id=>$(id).addEventListener("input",hGeo));hGeo();

/* --- §2 sorok --- */
const hSer={
  tel:{t:k=>1/(k*(k+1)),lim:"1",lv:1},
  sq:{t:k=>1/(k*k),lim:"π²/6 ≈ 1,644934",lv:Math.PI**2/6},
  harm:{t:k=>1/k,lim:null},
  geo:{t:k=>2**-k,lim:"1",lv:1},
  alt:{t:k=>(k%2?1:-1)/k,lim:"ln 2 ≈ 0,693147",lv:Math.log(2)}
};
function hTel(){
  const key=$("#h-t-s").value,N=+$("#h-t-n").value;$("#h-t-nv").textContent=N;const sr=hSer[key];
  const S=[];let s=0;for(let k=1;k<=N;k++){s+=sr.t(k);S.push(s);}
  c2bars(c2svg("#h-t-svg",640,210),S,{H:210,label:false,color:(i)=>i+1===N?"var(--accent-2)":"var(--accent)"});
  let extra="";
  if(key==="tel")extra=` &nbsp;·&nbsp; 1 − 1/(N+1) = ${fm(1-1/(N+1))} ${ok(Math.abs(S[N-1]-(1-1/(N+1)))<1e-12)}`;
  if(key==="sq")extra=` &nbsp;·&nbsp; felső korlát 2 − 1/N = ${fm(2-1/N)} ${ok(S[N-1]<=2-1/N+1e-12)}`;
  if(key==="harm")extra=` &nbsp;·&nbsp; alsó korlát 1 + (log₂N)/2 ≈ ${fm(1+Math.log2(N)/2)} ${ok(S[N-1]>=1+Math.floor(Math.log2(N))/2-1e-12)}`;
  $("#h-t-info").innerHTML=`S<sub>${N}</sub> = ${fm(S[N-1])}`+(sr.lim?` &nbsp;·&nbsp; határérték: ${sr.lim}; eltérés ${fm(Math.abs(sr.lv-S[N-1]))}`:" &nbsp;·&nbsp; nincs határérték (a sor divergens)")+extra;
}
["#h-t-s","#h-t-n"].forEach(id=>$(id).addEventListener("input",hTel));hTel();

/* --- §3 átrendezés --- */
function hAtr(){
  const p=+$("#h-a-p").value,q=+$("#h-a-q").value,M=+$("#h-a-m").value;
  $("#h-a-pv").textContent=p;$("#h-a-qv").textContent=q;$("#h-a-mv").textContent=M;
  /* mintavétel: 40 blokkszám M-ig, a részletösszegeket növekményesen számoljuk */
  const pts=[],K=40;let sPos=0,sNeg=0,iPos=0,iNeg=0;
  for(let j=1;j<=K;j++){const m=Math.max(1,Math.round(j*M/K));
    while(iPos<p*m){iPos++;sPos+=1/(2*iPos-1);}while(iNeg<q*m){iNeg++;sNeg+=1/(2*iNeg);}
    pts.push(sPos-sNeg);}
  const lo=Math.min(...pts),hi=Math.max(...pts),pad=(hi-lo||0.01)*0.15+0.002;
  c2bars(c2svg("#h-a-svg",640,210),pts,{H:210,ymin:lo-pad,label:false,xl:i=>Math.round((i+1)*M/K),color:(i)=>i===K-1?"var(--accent-2)":"var(--accent)"});
  const T=Math.log(2)+0.5*Math.log(p/q),S=pts[K-1];
  $("#h-a-info").innerHTML=`${M} blokk (${p*M} pozitív + ${q*M} negatív tag): S = ${fm(S)} &nbsp;·&nbsp; ln2 + ½·ln(p/q) = ${fm(T)} &nbsp;·&nbsp; eltérés ${fm(Math.abs(S-T))}<br>képlettel: H<sub>2pm</sub> − ½H<sub>pm</sub> − ½H<sub>qm</sub> = ${fm(hPs(p,q,M))} ${ok(Math.abs(hPs(p,q,M)-S)<1e-9)} &nbsp;·&nbsp; az eredeti sor összege: ${fm(Math.log(2))}<br><i>A függőleges tengely csonkolt: így látszik, hogy az oszlopok hova közelítenek.</i>`;
}
["#h-a-p","#h-a-q","#h-a-m"].forEach(id=>$(id).addEventListener("input",hAtr));hAtr();

/* --- §4 abszolút vs. feltételes --- */
function hAbs(){
  const p=+$("#h-b-p").value,q=+$("#h-b-q").value,M=+$("#h-b-m").value;
  $("#h-b-pv").textContent=p;$("#h-b-qv").textContent=q;$("#h-b-mv").textContent=M;
  const r=(pw)=>{let sPos=0,sNeg=0;for(let i=1;i<=p*M;i++)sPos+=1/(2*i-1)**pw;for(let i=1;i<=q*M;i++)sNeg+=1/(2*i)**pw;return sPos-sNeg;};
  const orig=pw=>{let s=0;for(let k=1;k<=2*M;k++)s+=(k%2?1:-1)/k**pw;return s;};
  const absS=pw=>{let s=0;for(let k=1;k<=2*M;k++)s+=1/k**pw;return s;};
  const c=[orig(1),r(1),absS(1)],d=[orig(2),r(2),absS(2)];
  $("#h-b-info").innerHTML=
   `<b>Σ(−1)<sup>k+1</sup>/k</b> (feltételes): eredeti sorrend (${2*M} tag) = ${fm(c[0])}, átrendezve ${p}:${q} = ${fm(c[1])}, a tagok abszolút értékeinek összege ${fm(c[2])} (nő) → <b>más összeg</b><br>`+
   `<b>Σ(−1)<sup>k+1</sup>/k²</b> (abszolút): eredeti = ${fm(d[0])}, átrendezve ${p}:${q} = ${fm(d[1])}, abszolút összeg ${fm(d[2])} (korlátos) → <b>ugyanaz</b>, π²/12 = ${fm(Math.PI**2/12)} ${ok(Math.abs(d[0]-d[1])<1/M)}`;
}
["#h-b-p","#h-b-q","#h-b-m"].forEach(id=>$(id).addEventListener("input",hAbs));hAbs();
