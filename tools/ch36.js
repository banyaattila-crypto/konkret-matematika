/* ================= 3.6 FELADATOK ================= */
exHero("feladatokpadlo-bevezeto","#y-hero","#y-hero-k",[3,3,2,2]);
function yJ(n,q){let r=0;for(let m=2;m<=n;m++)r=(r+q)%m;return r+1;}
function yD(q,n){const D=[1];let d=1;while(d<=(q-1)*n){d=Math.ceil(q*d/(q-1)-1e-12);D.push(d);}return D;}
function yJos(){
  const q=+$("#y-q").value,n=+$("#y-n").value;$("#y-qv").textContent=q;$("#y-nv").textContent=n;
  const D=yD(q,n),last=D[D.length-1],f=q*n+1-last,sim=yJ(n,q);
  $("#y-jinfo").innerHTML=`D: ${D.join(", ")} (küszöb (q−1)n = ${(q-1)*n}, az első nagyobb: ${last})<br>J<sub>${q}</sub>(${n}) = ${q}·${n}+1 − ${last} = <b>${f}</b> &nbsp;·&nbsp; szimuláció: ${sim} ${ok(f===sim)}`;
}
["#y-q","#y-n"].forEach(i=>$(i).addEventListener("input",yJos));yJos();
function yIroot(k,r){let x=Math.round(Math.pow(k,1/r));while(x**r>k)x--;while((x+1)**r<=k)x++;return x;}
const yPow={2:m=>m*(m+1)*(2*m+1)/6,3:m=>(m*(m+1)/2)**2,4:m=>m*(m+1)*(2*m+1)*(3*m*m+3*m-1)/30};
function yRoot(){
  const r=+$("#y-r").value,n=+$("#y-m").value;$("#y-mv").textContent=n;
  let S=0;for(let k=1;k<=n;k++)S+=yIroot(k,r);
  const m=yIroot(n,r),f=m*(n+1)-yPow[r](m);
  $("#y-rinfo").innerHTML=`m = ⌊n<sup>1/${r}</sup>⌋ = ${m} &nbsp;·&nbsp; tagonkénti összeg = ${S}<br>m(n+1) − Σ j<sup>${r}</sup> = ${m}·${n+1} − ${yPow[r](m)} = ${f} ${ok(S===f)}`;
}
["#y-r","#y-m"].forEach(i=>$(i).addEventListener("input",yRoot));yRoot();
