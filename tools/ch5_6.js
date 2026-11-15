/* ================= 5.6 HIPERGEOMETRIKUS TRANSZFORMÁCIÓK ================= */
const bdZ=s=>{const[p,q]=s.split("/");return rat(BigInt(p),BigInt(q||1));};
const bdMin=v=>(v<0?"−"+(-v):""+v);
function bdTerms(a,b,c,z,K){/* polinomnál a tagok véget érnek; K a maximális tagszám */
  const t=[rat(1)];for(let k=0;k<K-1;k++){if(a+k===0||b+k===0)break;t.push(t[k].mul(rat(k+a)).mul(rat(k+b)).mul(z).div(rat(k+c)).div(rat(k+1)));}return t;}
const bdSum=t=>t.reduce((s,x)=>s.add(x),rat(0));
const bdPow=(x,e)=>{let r=rat(1);const b=e<0?rat(1).div(x):x;for(let i=0;i<Math.abs(e);i++)r=r.mul(b);return r;};
const bdRise=(x,m)=>{let r=rat(1);for(let i=0;i<m;i++)r=r.mul(x.add(rat(i)));return r;};
c2hero("hipertrafo-bevezeto",520,6,fr=>{
  const n=fr+2,B=2,c=4,z=rat(1,2),s=c2svg("#bd-hero",420,250);
  const L=bdTerms(-n,B,c,z,n+1),w=z.div(z.sub(rat(1))),R=bdTerms(-n,c-B,c,w,n+1).map(x=>x.mul(bdPow(rat(1).sub(z),n)));
  const all=[...L,...R].map(x=>Math.abs(x.num())),mx=Math.max(...all),bw=Math.min(22,170/(n+1));
  [[L,"bal","var(--accent)",20],[R,"jobb","var(--muted, #888)",230]].forEach(([arr,nm,col,x0])=>{
    arr.forEach((v,k)=>{const h=Math.abs(v.num())/mx*90,pos=v.num()>=0;el("rect",{x:x0+k*bw+1,y:pos?125-h:125,width:bw-2,height:Math.max(h,1),rx:2,style:`fill:${col};opacity:.55`},s);});
    txt(s,x0+(arr.length*bw)/2,16,nm==="bal"?"F(a,b;c|z)":"(1−z)ⁿ·F(a,c−b;c|z/(z−1))","","middle");});
  el("line",{x1:10,y1:125,x2:410,y2:125,style:"stroke:var(--line)"},s);
  const SL=bdSum(L),SR=bdSum(R);
  txt(s,115,235,"Σ = "+SL,"","middle");txt(s,305,235,"Σ = "+SR,"","middle");
  $("#bd-hero-a").textContent=`n = ${n}, b = 2, c = 4, z = 1/2`;$("#bd-hero-b").textContent=SL.eq(SR)?"két alak, azonos összeg ✓":"✗";
});
function bdP(){
  const n=+$("#bd-p-n").value,B=+$("#bd-p-b").value,c=+$("#bd-p-c").value,z=bdZ($("#bd-p-z").value);
  $("#bd-p-nv").textContent=n;$("#bd-p-bv").textContent=bdMin(B);$("#bd-p-cv").textContent=c;
  const L=bdSum(bdTerms(-n,B,c,z,n+1)),w=z.div(z.sub(rat(1))),R=bdPow(rat(1).sub(z),n).mul(bdSum(bdTerms(-n,c-B,c,w,n+1)));
  $("#bd-p-info").innerHTML=`bal: F(−${n}, ${bdMin(B)}; ${c} | ${z}) = <b>${L}</b><br>jobb: (1−z)<sup>${n}</sup>·F(−${n}, ${bdMin(c-B)}; ${c} | z/(z−1) = ${w}) = <b>${R}</b> ${ok(L.eq(R))}`;
}
["#bd-p-n","#bd-p-b","#bd-p-c"].forEach(i=>$(i).addEventListener("input",bdP));$("#bd-p-z").addEventListener("change",bdP);bdP();
function bdSer(a,b,c,K){const t=[rat(1)];for(let k=0;k<K-1;k++)t.push(t[k].mul(rat(k+a)).mul(rat(k+b)).div(rat(k+c)).div(rat(k+1)));return t;}
function bdE(){
  const a=+$("#bd-e-a").value,b=+$("#bd-e-b").value,c=+$("#bd-e-c").value;
  $("#bd-e-av").textContent=bdMin(a);$("#bd-e-bv").textContent=bdMin(b);$("#bd-e-cv").textContent=c;
  const K=8,e=c-a-b,L=bdSer(a,b,c,K),Fs=bdSer(c-a,c-b,c,K);
  /* (1−z)^e együtthatói: u_k = (−e)^{k rising}/k! */
  const U=[rat(1)];for(let k=0;k<K-1;k++)U.push(U[k].mul(rat(-e+k)).div(rat(k+1)));
  const R=Array.from({length:K},(_,n)=>{let s=rat(0);for(let k=0;k<=n;k++)s=s.add(U[k].mul(Fs[n-k]));return s;});
  $("#bd-e-t").innerHTML="<tr><th>k</th>"+L.map((_,k)=>`<td>${k}</td>`).join("")+"</tr><tr><th>F(a,b;c)</th>"+L.map(x=>`<td>${x}</td>`).join("")+"</tr><tr><th>(1−z)<sup>e</sup>F(c−a,c−b;c)</th>"+R.map(x=>`<td>${x}</td>`).join("")+"</tr>";
  $("#bd-e-info").innerHTML=`e = c − a − b = ${e}; c − a = ${c-a}, c − b = ${c-b}; az első ${K} együttható egyezik ${ok(L.every((x,i)=>x.eq(R[i])))}`;
}
["#bd-e-a","#bd-e-b","#bd-e-c"].forEach(i=>$(i).addEventListener("input",bdE));bdE();
function bdR(){
  const n=+$("#bd-r-n").value,d=+$("#bd-r-d").value,c=+$("#bd-r-c").value,z=bdZ($("#bd-r-z").value),b=n+d;
  $("#bd-r-nv").textContent=n;$("#bd-r-dv").textContent=d;$("#bd-r-cv").textContent=c;
  const L=bdSum(bdTerms(-n,b,c,z,n+1)),pre=bdPow(z.neg(),n).mul(bdRise(rat(b),n)).div(bdRise(rat(c),n)),R=pre.mul(bdSum(bdTerms(-n,1-c-n,1-b-n,rat(1).div(z),n+1)));
  $("#bd-r-info").innerHTML=`b = ${b}<br>bal: F(−${n}, ${b}; ${c} | ${z}) = <b>${L}</b><br>jobb: (−z)<sup>${n}</sup>·b<sup>(${n})</sup>/c<sup>(${n})</sup>·F(−${n}, ${bdMin(1-c-n)}; ${bdMin(1-b-n)} | 1/z) = <b>${R}</b> ${ok(L.eq(R))}`;
}
["#bd-r-n","#bd-r-d","#bd-r-c"].forEach(i=>$(i).addEventListener("input",bdR));$("#bd-r-z").addEventListener("change",bdR);bdR();
