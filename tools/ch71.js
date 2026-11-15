/* ================= 7.2 ALAPFOGALMAK ================= */
const gN=14;
const gfMul=(a,b,N=gN)=>{const c=Array(N).fill(0);for(let i=0;i<N;i++)for(let j=0;i+j<N;j++)c[i+j]+=(a[i]||0)*(b[j]||0);return c;};
const gfDiv=(p,q,N=gN)=>{const a=[];for(let n=0;n<N;n++){let s=(p[n]||0);for(let k=1;k<=n;k++)s-=(q[k]||0)*a[n-k];a.push(s/(q[0]||1));}return a;};
const gfPoly=(...c)=>c;
const gfFib=n=>{let a=0,b=1;for(let i=0;i<n;i++)[a,b]=[b,a+b];return a;};
const giSeq=[Array(gN).fill(1),Array.from({length:gN},(_,n)=>n),Array.from({length:gN},(_,n)=>n*n),Array.from({length:gN},(_,n)=>2**n),Array.from({length:gN},(_,n)=>gfFib(n))];
const gfTxt=a=>a.slice(0,10).join(", ")+", …";
c2hero("gfalap-bevezeto",1100,5,fr=>{
  const defs=[["1/(1−x)",giSeq[0]],["x/(1−x)²",giSeq[1]],["x(1+x)/(1−x)³",giSeq[2]],["1/(1−2x)",giSeq[3]],["x/(1−x−x²)",giSeq[4]]],[nm,sq]=defs[fr];
  const s=$("#ai-hero"),W=420,H=250,v=sq.slice(0,10),mx=Math.max(...v),bw=(W-40)/10;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  v.forEach((y,i)=>{const h=Math.max(2,y/mx*170);el("rect",{x:20+i*bw+3,y:H-30-h,width:bw-6,height:h,rx:3,style:"fill:var(--accent);opacity:.85"},s);txt(s,20+i*bw+bw/2,H-12,i,"");});
  $("#ai-hero-a").textContent=nm;$("#ai-hero-b").textContent=gfTxt(sq);
});
function aiM(){
  const A=giSeq[+$("#ai-m-s").value],o=+$("#ai-m-o").value,N=gN;let R,D,nm;
  if(o===0){R=gfMul([0,1],A);D=A.map((_,n)=>n?A[n-1]:0);nm="x·A";}
  else if(o===1){R=gfDiv(A,[1,-1]);let s=0;D=A.map(v=>(s+=v));nm="A/(1−x)";}
  else if(o===2){R=gfMul([1,-1],A);D=A.map((v,n)=>v-(n?A[n-1]:0));nm="(1−x)·A";}
  else if(o===3){R=A.slice(1).map((v,n)=>(n+1)*v);D=Array.from({length:N-1},(_,n)=>(n+1)*A[n+1]);nm="A′";}
  else if(o===4){R=A.map((v,n)=>n*v);D=A.map((v,n)=>n*v);nm="x·A′";}
  else{R=A.map((v,n)=>3**n*v);D=A.map((v,n)=>3**n*v);nm="A(3x)";}
  const L=Math.min(R.length,D.length),same=R.slice(0,L).every((v,i)=>v===D[i]);
  $("#ai-m-info").innerHTML=`A: ${gfTxt(A)}<br>${nm}: ${gfTxt(R)}<br>a definíció szerinti közvetlen számolás ugyanezt adja (első ${L} tag) ${ok(same)}`;
}
["#ai-m-s","#ai-m-o"].forEach(i=>$(i).addEventListener("input",aiM));aiM();
function aiA(){
  const g=+$("#ai-a-g").value,N=20;let p,q,f;
  const one=[1],omx=[1,-1];
  const pw=(b,e)=>{let r=[1];for(let i=0;i<e;i++)r=gfMul(r,b,N);return r;};
  if(g===0){p=one;q=omx;f=n=>1;}
  else if(g===1){p=one;q=[1,-2];f=n=>2**n;}
  else if(g===2){p=one;q=pw(omx,3);f=n=>(n+2)*(n+1)/2;}
  else if(g===3){p=[0,1];q=pw(omx,2);f=n=>n;}
  else if(g===4){p=[0,1,1];q=pw(omx,3);f=n=>n*n;}
  else if(g===5){p=one;q=[1,-1,-1];f=n=>gfFib(n+1);}
  else{p=one;q=[1,1];f=n=>(n%2?-1:1);}
  const a=gfDiv(p,q,N),ex=Array.from({length:N},(_,n)=>f(n));
  $("#ai-a-info").innerHTML=`sorfejtés: ${a.slice(0,12).join(", ")}, …<br>képlet: ${ex.slice(0,12).join(", ")}, …<br>első ${N} együttható egyezik ${ok(a.every((v,i)=>v===ex[i]))}`;
}
$("#ai-a-g").addEventListener("input",aiA);aiA();
