/* ================= 6.7 KONTINUÁNSOK ================= */
const biGcd=(a,b)=>b?biGcd(b,a%b):a;
function biK(x){if(!x.length)return 1n;let p=1n,q=BigInt(x[0]);for(let i=1;i<x.length;i++){[p,q]=[q,q*BigInt(x[i])+p];}return q;}
function biEuler(x){/* szomszédos párok kihúzása */
  const n=x.length;let tot=0n;(function rec(i,prod){if(i>=n){tot+=prod;return;}rec(i+1,prod*BigInt(x[i]));if(i+1<n)rec(i+2,prod);})(0,1n);return tot;}
function biCF(p,q){const a=[];while(q){a.push(Math.floor(p/q));[p,q]=[q,p%q];}return a;}
c2hero("kontinuans-bevezeto",900,3,fr=>{
  const pairs=[[43,19],[34,21],[55,17]],[P,Q]=pairs[fr%3],s=c2svg("#bi-hero",420,250),sc=Math.min(380/P,190/Q),x0=(420-P*sc)/2,y0=24,cols=["var(--accent)","#3f9d8f","#c98a2b","#9a6bd1","#cc5c5c","#5c8bcc"];
  let x=0,y=0,w=P,h=Q,gi=0,steps=[];
  while(w>0&&h>0){if(w>=h){const k=Math.floor(w/h);for(let i=0;i<k;i++){steps.push([x+i*h,y,h,gi]);}x+=k*h;w-=k*h;steps.push(null);gi++;}else{const k=Math.floor(h/w);for(let i=0;i<k;i++){steps.push([x,y+i*w,w,gi]);}y+=k*w;h-=k*w;steps.push(null);gi++;}}
  steps.filter(Boolean).forEach(([sx,sy,sz,g])=>{el("rect",{x:x0+sx*sc+1,y:y0+sy*sc+1,width:sz*sc-2,height:sz*sc-2,rx:2,style:`fill:${cols[g%cols.length]};opacity:.45;stroke:${cols[g%cols.length]}`},s);if(sz*sc>14)txt(s,x0+(sx+sz/2)*sc,y0+(sy+sz/2)*sc+4,sz,"","middle");});
  const a=biCF(P,Q);$("#bi-hero-a").textContent=`${P} × ${Q}`;$("#bi-hero-b").textContent=`[${a[0]}; ${a.slice(1).join(", ")}] ⇒ K = ${biK(a)}`;
});
function biD(){
  const x=$("#bi-d-s").value.split(",").map(Number),k=biK(x),e=biEuler(x),rev=biK([...x].reverse()),front=BigInt(x[0])*biK(x.slice(1))+biK(x.slice(2));
  const fib=x.every(v=>v===1)?(()=>{let a=0n,b=1n;for(let i=0;i<=x.length;i++)[a,b]=[b,a+b];return a;})():null;
  $("#bi-d-info").innerHTML=`K(${x.join(", ")}) = <b>${k}</b> (rekurzió)<br>Euler-szabály (${(()=>{let c=0;(function r(i){if(i>=x.length){c++;return;}r(i+1);if(i+1<x.length)r(i+2);})(0);return c;})()} kihúzási mód): ${e} ${ok(e===k)}<br>megfordítva: K = ${rev} ${ok(rev===k)} · az elejéről futó rekurzió: ${front} ${ok(front===k)}`+(fib!==null?`<br>minden x = 1: K = F<sub>${x.length+1}</sub> = ${fib} ${ok(fib===k)}`:"");
}
$("#bi-d-s").addEventListener("change",biD);biD();
function biE(){
  const p=+$("#bi-e-p").value,q=+$("#bi-e-q").value;$("#bi-e-pv").textContent=p;$("#bi-e-qv").textContent=q;
  const a=biCF(p,q),g=biGcd(p,q),rows=[];
  for(let k=0;k<a.length;k++){const num=biK(a.slice(0,k+1)),den=biK(a.slice(1,k+1));rows.push([k,a[k],num,den,Number(num)/Number(den)]);}
  $("#bi-e-t").innerHTML="<tr><th>k</th>"+rows.map(r=>`<td>${r[0]}</td>`).join("")+"</tr><tr><th>aₖ</th>"+rows.map(r=>`<td>${r[1]}</td>`).join("")+"</tr><tr><th>számláló</th>"+rows.map(r=>`<td>${r[2]}</td>`).join("")+"</tr><tr><th>nevező</th>"+rows.map(r=>`<td>${r[3]}</td>`).join("")+"</tr>";
  const last=rows[rows.length-1];
  $("#bi-e-info").innerHTML=`p/q = ${p}/${q}, gcd = ${g} → a = [${a.join("; ")}]<br>K(a₀..aₙ) = ${last[2]} = p/g = ${p/g} ${ok(last[2]===BigInt(p/g))} · K(a₁..aₙ) = ${last[3]} = q/g = ${q/g} ${ok(last[3]===BigInt(q/g))}`;
}
["#bi-e-p","#bi-e-q"].forEach(i=>$(i).addEventListener("input",biE));biE();
function biM(){
  const n=+$("#bi-m-n").value,r=+$("#bi-m-r").value;$("#bi-m-nv").textContent=n;$("#bi-m-rv").textContent=r;
  const x=[];let v=r;for(let i=0;i<n;i++){x.push(1+(v%7));v=(v*31+17)%101;}
  const s1=biK(x),s2=biK(x.slice(1,n-1)),s3=biK(x.slice(0,n-1)),s4=biK(x.slice(1)),det=s1*s2-s3*s4,want=n%2?-1n:1n;
  $("#bi-m-info").innerHTML=`x = (${x.join(", ")})<br>K(x₁..xₙ)·K(x₂..xₙ₋₁) − K(x₁..xₙ₋₁)·K(x₂..xₙ) = ${s1}·${s2} − ${s3}·${s4} = ${det} = (−1)<sup>${n}</sup> ${ok(det===want)}<br>gcd(K(x₁..xₙ), K(x₂..xₙ)) = ${biGcd(Number(s1),Number(s4))} ${ok(biGcd(Number(s1),Number(s4))===1)}`;
}
["#bi-m-n","#bi-m-r"].forEach(i=>$(i).addEventListener("input",biM));biM();
