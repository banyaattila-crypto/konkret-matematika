/* ================= 3.3 REKURZIÓK ================= */
const rCl=n=>n<=1?0:(n-1).toString(2).length;
c2hero("padlorek-bevezeto",900,5,fr=>{
  const s=$("#r-hero"),W=420,H=250,n=13;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  /* a felezés fája n = 13-ra, fr szintig */
  const lv=[[n]];for(let d=1;d<=4;d++){const nx=[];lv[d-1].forEach(m=>{if(m>1){nx.push(Math.ceil(m/2),Math.floor(m/2));}});if(!nx.length)break;lv.push(nx);}
  const rowH=(H-40)/5;
  lv.forEach((L,d)=>{if(d>fr)return;const bw=(W-30)/L.length;
    L.forEach((m,i)=>{const w=Math.max(10,bw-6);
      el("rect",{x:15+i*bw+3,y:14+d*rowH,width:w,height:rowH-10,rx:6,style:`fill:${m===1?"var(--accent-2)":"var(--accent)"};opacity:.85`},s);
      txt(s,15+i*bw+3+w/2,14+d*rowH+(rowH-10)/2+4,m,"ink");});});
  $("#r-hero-b").textContent=Math.min(fr,lv.length-1);
});

/* --- §1 bináris keresés --- */
function rBin(){
  const n=+$("#r-b-n").value;$("#r-b-nv").textContent=n;
  const B=[0];for(let i=1;i<=200;i++)B.push(B[Math.floor(i/2)]+1);
  const N=64,vals=B.slice(1,N+1);
  c2bars(c2svg("#r-b-svg",640,190),vals,{H:190,label:false,color:(i)=>i+1===n?"var(--accent-2)":"var(--accent)",alpha:(i)=>(i+1===n)?1:.6});
  let steps=[],m=n;while(m>0){steps.push(m);m=Math.floor(m/2);}
  const cl=Math.floor(Math.log2(n))+1;
  $("#r-b-info").innerHTML=`n = ${n} = ${n.toString(2)}₂ &nbsp;·&nbsp; felezés: ${steps.join(" → ")} → 0 &nbsp;·&nbsp; B(n) = ${B[n]} = ⌊lg n⌋ + 1 = ${cl} ${ok(B[n]===cl&&B[n]===n.toString(2).length)} (a bináris jegyek száma)`;
}
$("#r-b-n").addEventListener("input",rBin);rBin();

/* --- §2 összefésülő rendezés --- */
const rM=(()=>{const M=[0,0];for(let n=2;n<=130;n++)M.push(M[Math.ceil(n/2)]+M[Math.floor(n/2)]+n-1);return M;})();
function rMerge(){
  const n=+$("#r-m-n").value;$("#r-m-nv").textContent=n;
  const N=64,vals=rM.slice(1,N+1);
  c2bars(c2svg("#r-m-svg",640,200),vals,{H:200,label:false,color:(i)=>i+1===n?"var(--accent-2)":"var(--accent)",alpha:(i)=>(i+1===n)?1:.6});
  const c=rCl(n),cf=n*c-2**c+1;let all=true;for(let k=1;k<=128;k++)if(rM[k]!==k*rCl(k)-2**rCl(k)+1)all=false;
  $("#r-m-info").innerHTML=`M(${n}) = M(${Math.ceil(n/2)}) + M(${Math.floor(n/2)}) + ${n-1} = ${rM[n]} &nbsp;·&nbsp; n⌈lg n⌉ − 2<sup>⌈lg n⌉</sup> + 1 = ${n}·${c} − ${2**c} + 1 = ${cf} ${ok(cf===rM[n])}<br>zárt alak és rekurzió egyezik az összes n ≤ 128-ra ${ok(all)}`+(n>1?` &nbsp;·&nbsp; M(n)/(n·lg n) = ${fm(rM[n]/(n*Math.log2(n)))}`:"");
}
$("#r-m-n").addEventListener("input",rMerge);rMerge();

/* --- §3 általánosított Josephus --- */
function rSim(n,q){const a=Array.from({length:n},(_,i)=>i+1),ord=[];let idx=0;while(a.length>1){idx=(idx+q-1)%a.length;ord.push(a.splice(idx,1)[0]);}return {ord,surv:a[0]};}
function rForm(n,q){let D=1;while(D<=(q-1)*n)D=Math.ceil(q*D/(q-1)-1e-12);return q*n+1-D;} /* D egész, a lebegőpontos hiba ellen */
function rJos(){
  const q=+$("#r-j-q").value,n=+$("#r-j-n").value;$("#r-j-qv").textContent=q;$("#r-j-nv").textContent=n;
  const {ord,surv}=rSim(n,q),s=c2svg("#r-j-svg",640,300),R=115,cx=320,cy=150;
  const place=new Map(ord.map((p,i)=>[p,i+1]));
  for(let p=1;p<=n;p++){const ang=-Math.PI/2+2*Math.PI*(p-1)/n,x=cx+R*Math.cos(ang),y=cy+R*Math.sin(ang),isS=p===surv,r=Math.max(9,Math.min(17,170/n));
    el("circle",{cx:x,cy:y,r,style:`fill:${isS?"var(--accent-2)":"var(--accent)"};opacity:${isS?1:.8}`},s);
    txt(s,x,y+4,isS?"★":place.get(p),"ink");
    if(n<=24)txt(s,cx+(R+30)*Math.cos(ang),cy+(R+30)*Math.sin(ang)+4,p,"");}
  txt(s,cx,cy+4,"q = "+q,"");
  const f=rForm(n,q);
  /* D sorozat */
  const Ds=[1];let D=1;while(D<=(q-1)*n){D=Math.ceil(q*D/(q-1)-1e-12);Ds.push(D);}
  $("#r-j-info").innerHTML=`kiesési sorrend: ${ord.join(", ")}; túlélő: <b>${surv}</b><br>D: ${Ds.join(", ")} (az utolsó &gt; ${(q-1)*n}) &nbsp;·&nbsp; J<sub>${q}</sub>(${n}) = ${q*n+1} − ${Ds[Ds.length-1]} = ${f} ${ok(f===surv)}`;
}
["#r-j-q","#r-j-n"].forEach(id=>$(id).addEventListener("input",rJos));rJos();
