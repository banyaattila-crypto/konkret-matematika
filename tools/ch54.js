/* ================= 5.4 GENERÁTORFÜGGVÉNYEK ================= */
const abFib=(n)=>{let a=0,b=1;for(let i=0;i<n;i++)[a,b]=[b,a+b];return a;};
c2hero("binomgf-bevezeto",900,8,fr=>{
  const s=$("#ab-hero"),W=420,H=250,R=9,n=1+Math.min(fr,7);clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);let sum=0;
  for(let r=0;r<R;r++)for(let k=0;k<=r;k++){const x=W/2+(k-r/2)*40,y=20+r*26,on=r+k===n&&k<=r;if(on)sum+=bC(r,k);
    el("rect",{x:x-17,y:y-11,width:34,height:21,rx:5,style:`fill:${on?"var(--accent)":"var(--paper)"};stroke:var(--line);opacity:${on?.95:.7}`},s);txt(s,x,y+4,bC(r,k),on?"ink":"");}
  $("#ab-hero-a").textContent="n = "+n;$("#ab-hero-b").textContent=sum+" = F"+c2sub(n+1);
});
function abSz(){
  const r=+$("#ab-s-r").value,s=+$("#ab-s-s").value;$("#ab-s-rv").textContent=r;$("#ab-s-sv").textContent=s;
  const A=[],B=[],C=[];for(let k=0;k<=r;k++)A.push(bC(r,k));for(let k=0;k<=s;k++)B.push(bC(s,k));
  let h="<tr><th>k</th><th>(1+x)<sup>r</sup></th><th>(1+x)<sup>s</sup></th><th>konvolúció</th><th>(1+x)<sup>r+s</sup></th></tr>",all=true;
  for(let n=0;n<=r+s;n++){let c=0;for(let k=0;k<=n;k++)c+=(A[k]||0)*(B[n-k]||0);C.push(c);const ex=bC(r+s,n);if(c!==ex)all=false;h+=`<tr><td>${n}</td><td>${A[n]??0}</td><td>${B[n]??0}</td><td>${c}</td><td>${ex}</td></tr>`;}
  $("#ab-s-t").innerHTML=h;$("#ab-s-info").innerHTML=`a konvolúció minden együtthatója egyezik a (1+x)<sup>${r+s}</sup> együtthatóival ${ok(all)}`;
}
["#ab-s-r","#ab-s-s"].forEach(i=>$(i).addEventListener("input",abSz));abSz();
function abOl(){
  const m=+$("#ab-o-m").value;$("#ab-o-mv").textContent=m;const N=20;
  /* x^m/(1-x)^(m+1) sora: (m+1)-szeres szorzás 1/(1-x)-szel */
  let ser=Array(N+1).fill(0);ser[m]=1;for(let t=0;t<m+1;t++){let acc=0;for(let i=0;i<=N;i++){acc+=ser[i];ser[i]=acc;}}
  const ex=[];for(let n=0;n<=N;n++)ex.push(bC(n,m));
  $("#ab-o-info").innerHTML=`x<sup>${m}</sup>/(1−x)<sup>${m+1}</sup> együtthatói (n = 0…${N}): ${ser.slice(0,12).join(", ")}, …<br>ugyanez C(n, ${m})-mel ${ok(ser.every((c,i)=>c===ex[i]))}`;
}
$("#ab-o-m").addEventListener("input",abOl);abOl();
function abFi(){
  const n=+$("#ab-f-n").value;$("#ab-f-nv").textContent=n;
  const t=[];let S=0;for(let k=0;2*k<=n;k++){const v=bC(n-k,k);S+=v;t.push(`C(${n-k},${k})=${v}`);}
  const ph=(1+Math.sqrt(5))/2,ps=(1-Math.sqrt(5))/2,bi=Math.round((ph**(n+1)-ps**(n+1))/Math.sqrt(5));
  const D=[1,1];for(let i=2;i<=24;i++)D.push(D[i-1]+D[i-2]);let ok2=true;for(let i=0;i<=24;i++){const e=(i===0?1:0)-0;const c=D[i]-(i>=1?D[i-1]:0)-(i>=2?D[i-2]:0);if(c!==(i===0?1:0)&&i!==1&&i!==0){ok2=false;}}
  $("#ab-f-info").innerHTML=`${t.join(" + ")} = <b>${S}</b><br>F<sub>${n+1}</sub> = ${abFib(n+1)} ${ok(S===abFib(n+1))} &nbsp;·&nbsp; Binet: ${bi} ${ok(bi===S)}<br>D<sub>n</sub> − D<sub>n−1</sub> − D<sub>n−2</sub> = 0 minden 2 ≤ n ≤ 24-re ${ok(ok2)}`;
}
$("#ab-f-n").addEventListener("input",abFi);abFi();
