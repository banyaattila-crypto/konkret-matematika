/* ================= 8.4 PÉNZFELDOBÁS ================= */
function bnSolve(M,b){
  const n=b.length,A=M.map((r,i)=>[...r,b[i]]);
  for(let c=0;c<n;c++){let p=c;while(p<n&&A[p][c].eq(rat(0)))p++;[A[c],A[p]]=[A[p],A[c]];const pv=A[c][c];A[c]=A[c].map(x=>x.div(pv));
    for(let r=0;r<n;r++)if(r!==c&&!A[r][c].eq(rat(0))){const f=A[r][c];A[r]=A[r].map((x,j)=>x.sub(f.mul(A[c][j])));}}
  return A.map(r=>r[n]);
}
const bnT=s=>s.replace(/F/g,"H").replace(/I/g,"T");
const bnLab=s=>s.replace(/H/g,"F").replace(/T/g,"I");
function bnOv(A,B){let s=0;for(let k=1;k<=Math.min(A.length,B.length);k++)if(A.slice(-k)===B.slice(0,k))s+=2**k;return s;}
function bnState(A,i,c){const s=A.slice(0,i)+c;for(let k=Math.min(s.length,A.length);k>=0;k--)if(s.slice(s.length-k)===A.slice(0,k))return k;return 0;}
function bnE(A){const n=A.length,M=[],b=[];
  for(let i=0;i<n;i++){const row=Array(n).fill(0).map(()=>rat(0));row[i]=row[i].add(rat(1));
    for(const c of "HT"){const j=bnState(A,i,c);if(j<n)row[j]=row[j].sub(rat(1,2));}M.push(row);b.push(rat(1));}
  return bnSolve(M,b)[0];}
function bnP(A,B){/* A előbb jelenik meg, mint B */
  const L=Math.max(A.length,B.length),sts=[];for(let l=0;l<L;l++)for(let m=0;m<(1<<l);m++){let s="";for(let i=l-1;i>=0;i--)s+=(m>>i&1)?"T":"H";sts.push(s);}
  const idx={};sts.forEach((s,i)=>idx[s]=i);const n=sts.length,M=[],b=[];
  sts.forEach((s,i)=>{const row=Array(n).fill(0).map(()=>rat(0));row[i]=rat(1);let bb=rat(0);
    for(const c of "HT"){const t=s+c;if(t.endsWith(A))bb=bb.add(rat(1,2));else if(t.endsWith(B)){}else{const t2=L>1?t.slice(-(L-1)):"";const j=idx[t2];row[j]=row[j].sub(rat(1,2));}}
    M.push(row);b.push(bb);});
  return bnSolve(M,b)[idx[""]];}
function bnRng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
c2hero("penzfeldobas-bevezeto",800,9,fr=>{
  const s=c2svg("#bn-hero",420,250),P=["HHH","HHT","HTH","HTT","THH","THT","TTH","TTT"],N=Math.min(fr+1,8),w=44,x0=34;
  P.forEach((p,i)=>{const v=Number(bnE(p).toString());const h=v/14*170;
    el("rect",{x:x0+i*w+4,y:205-h,width:w-8,height:h,rx:2,style:`fill:var(--accent);opacity:${i<N?.6:.14}`},s);txt(s,x0+i*w+w/2,222,bnLab(p),"","middle");if(i<N)txt(s,x0+i*w+w/2,205-h-5,v,"","middle");});
  $("#bn-hero-b").textContent=`${bnLab(P[N-1])}: ${bnE(P[N-1])}`;
});
function bnW(){
  const lab=$("#bn-w-p").value,A=bnT(lab),n=A.length,E=bnE(A),f=bnOv(A,A);
  const rnd=bnRng(12345),trials=4000;let sum=0;
  for(let t=0;t<trials;t++){let st=0,c=0;while(st<n){c++;st=bnState(A,st,rnd()<.5?"H":"T");}sum+=c;}
  $("#bn-w-info").innerHTML=`${lab}: állapotegyenletek megoldása E = <b>${E}</b><br>Σ 2<sup>k</sup> (k ∈ K) = ${f} ${ok(E.eq(rat(f)))}<br>szimuláció (${trials} kísérlet): átlag ${(sum/trials).toFixed(2)}`;
}
$("#bn-w-p").addEventListener("change",bnW);bnW();
function bnK(){
  const lab=$("#bn-k-p").value,A=bnT(lab),n=A.length,K=[];for(let k=1;k<=n;k++)if(A.slice(0,k)===A.slice(n-k))K.push(k);
  const f=K.reduce((s,k)=>s+2**k,0),E=bnE(A);
  $("#bn-k-info").innerHTML=`${lab}: K = {${K.join(", ")}}<br>Σ 2<sup>k</sup> = ${K.map(k=>2**k).join(" + ")} = <b>${f}</b><br>pontos várható idő = ${E} ${ok(E.eq(rat(f)))}`;
}
$("#bn-k-p").addEventListener("change",bnK);bnK();
function bnPn(){
  const la=$("#bn-p-a").value,lb=$("#bn-p-b").value,A=bnT(la),B=bnT(lb);
  if(A===lb||A===B){$("#bn-p-info").innerHTML="Válassz két különböző mintát.";return;}
  const pa=bnP(A,B),pb=rat(1).sub(pa),AA=bnOv(A,A),AB=bnOv(A,B),BB=bnOv(B,B),BA=bnOv(B,A);
  const lhsB=pb.mul(rat(AA-AB)),rhsA=pa.mul(rat(BB-BA));
  $("#bn-p-info").innerHTML=`P(${la} előbb) = <b>${pa}</b>, P(${lb} előbb) = ${pb}<br>AA=${AA}, AB=${AB}, BB=${BB}, BA=${BA}: (AA−AB):(BB−BA) = ${AA-AB}:${BB-BA}<br>P(B előbb)·(BB−BA) = P(A előbb)·(AA−AB)? ${ok(pb.mul(rat(BB-BA)).eq(pa.mul(rat(AA-AB))))}`;
}
["#bn-p-a","#bn-p-b"].forEach(i=>$(i).addEventListener("change",bnPn));bnPn();
