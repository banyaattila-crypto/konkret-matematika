/* ================= 5.2 ÖSSZEGEK ================= */
c2hero("binomosszeg-bevezeto",800,7,fr=>{
  const s=$("#z-hero"),W=420,H=250,R=9,r1=2+Math.min(fr,6);clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);let sum=0;
  for(let r=0;r<R;r++)for(let k=0;k<=r;k++){const x=W/2+(k-r/2)*40,y=20+r*26;
    const on=k===2&&r>=2&&r<=r1,res=k===3&&r===r1+1;if(on)sum+=bC(r,2);
    el("rect",{x:x-17,y:y-11,width:34,height:21,rx:5,style:`fill:${on?"var(--accent)":res?"var(--accent-2)":"var(--paper)"};stroke:var(--line);opacity:${on||res?.95:.7}`},s);
    txt(s,x,y+4,bC(r,k),on||res?"ink":"");}
  $("#z-hero-a").textContent=`∑ C(k,2), k ≤ ${r1}`;$("#z-hero-b").textContent=sum+" = C("+(r1+1)+",3)";
});
function zHoki(){
  const t=$("#z-h-t").value,a=+$("#z-h-a").value,b=+$("#z-h-b").value;$("#z-h-av").textContent=a;$("#z-h-bv").textContent=b;
  let S=0,terms=[],rhs,desc;
  if(t==="u"){for(let k=0;k<=a;k++){S+=bC(k,b);if(k>=b)terms.push(`C(${k},${b})=${bC(k,b)}`);}rhs=bC(a+1,b+1);desc=`Σ C(k,${b}), k = 0…${a}`;
    $("#z-h-info").innerHTML=`${desc} = ${S} &nbsp;·&nbsp; C(${a+1},${b+1}) = ${rhs} ${ok(S===rhs)}<br>nem nulla tagok: ${terms.slice(0,12).join(" + ")||"nincs"}${terms.length>12?" + …":""}`;}
  else{for(let k=0;k<=b;k++){S+=bC(a+k,k);terms.push(`C(${a+k},${k})=${bC(a+k,k)}`);}rhs=bC(a+b+1,b);desc=`Σ C(${a}+k, k), k = 0…${b}`;
    $("#z-h-info").innerHTML=`${desc} = ${S} &nbsp;·&nbsp; C(${a+b+1},${b}) = ${rhs} ${ok(S===rhs)}<br>tagok: ${terms.slice(0,12).join(" + ")}${terms.length>12?" + …":""}`;}
}
["#z-h-t","#z-h-a","#z-h-b"].forEach(i=>$(i).addEventListener("input",zHoki));zHoki();
function zVan(){
  const r=+$("#z-v-r").value,s=+$("#z-v-s").value;$("#z-v-n").max=r+s;let n=+$("#z-v-n").value;if(n>r+s){n=r+s;$("#z-v-n").value=n;}
  $("#z-v-rv").textContent=r;$("#z-v-sv").textContent=s;$("#z-v-nv").textContent=n;
  let h="<tr><th>k</th><th>C(r,k)</th><th>C(s,n−k)</th><th>szorzat</th></tr>",S=0;
  for(let k=0;k<=n;k++){const p=bC(r,k)*bC(s,n-k);if(p)h+=`<tr><td>${k}</td><td>${bC(r,k)}</td><td>${bC(s,n-k)}</td><td>${p}</td></tr>`;S+=p;}
  $("#z-v-t").innerHTML=h;const rhs=bC(r+s,n);
  $("#z-v-info").innerHTML=`összeg = ${S} &nbsp;·&nbsp; C(${r}+${s}, ${n}) = ${rhs} ${ok(S===rhs)}`;
}
["#z-v-r","#z-v-s","#z-v-n"].forEach(i=>$(i).addEventListener("input",zVan));zVan();
function zSul(){
  const n=+$("#z-s-n").value;$("#z-s-nv").textContent=n;let a=0,b=0,c=0;
  for(let k=0;k<=n;k++){a+=k*bC(n,k);b+=k*k*bC(n,k);c+=bC(n,k)/(k+1);}
  const f=(2**(n+1)-1)/(n+1);
  $("#z-s-info").innerHTML=`Σ k·C(n,k) = ${a} = n·2<sup>n−1</sup> = ${n*2**(n-1)} ${ok(a===n*2**(n-1))}<br>Σ k²·C(n,k) = ${b} = n(n+1)·2<sup>n−2</sup> = ${n*(n+1)*2**(n-2)} ${ok(b===n*(n+1)*2**(n-2))}<br>Σ C(n,k)/(k+1) = ${fm(+c.toFixed(6))} = (2<sup>n+1</sup> − 1)/(n + 1) = ${fm(+f.toFixed(6))} ${ok(Math.abs(c-f)<1e-6*f)}`;
}
$("#z-s-n").addEventListener("input",zSul);zSul();
