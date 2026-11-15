/* ================= 8.1 VALÓSZÍNŰSÉGI TÉR ================= */
const vkDist=n=>{let c=[1];for(let t=0;t<n;t++){const d=Array(c.length+6).fill(0);c.forEach((v,i)=>{for(let f=1;f<=6;f++)d[i+f]+=v;});c=d;}return c;};
c2hero("valalap-bevezeto",900,6,fr=>{
  const n=1+fr,s=$("#an-hero"),W=420,H=250,d=vkDist(n),tot=6**n,mx=Math.max(...d),L=6*n+1,bw=(W-40)/L;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  for(let k=n;k<=6*n;k++){const h=d[k]/mx*170;el("rect",{x:20+(k-n)*bw*(L/(5*n+1))+0,y:H-30-h,width:Math.max(2,(W-40)/(5*n+1)-2),height:h,rx:2,style:"fill:var(--accent);opacity:.85"},s);}
  $("#an-hero-a").textContent=`n = ${n} kocka`;$("#an-hero-b").textContent=d.indexOf(mx);
});
function anK(){
  const n=+$("#an-k-n").value;let sv=+$("#an-k-s").value;const smax=6*n;$("#an-k-s").max=smax;if(sv>smax){sv=smax;$("#an-k-s").value=sv;}if(sv<n){sv=n;$("#an-k-s").value=n;}
  $("#an-k-nv").textContent=n;$("#an-k-sv").textContent=sv;
  const d=vkDist(n),tot=6**n,W=640,H=190,s=c2svg("#an-k-svg",W,H),mx=Math.max(...d),cnt=5*n+1,bw=(W-40)/cnt;
  for(let k=n;k<=smax;k++){const h=d[k]/mx*(H-50);el("rect",{x:20+(k-n)*bw+1,y:H-26-h,width:Math.max(1.5,bw-2),height:h,rx:2,style:`fill:${k===sv?"var(--accent-2)":"var(--accent)"};opacity:${k===sv?1:.7}`},s);}
  txt(s,20,H-8,n,"");txt(s,W-20,H-8,smax,"");
  let br="";if(n<=5){let c=0;const rec=(i,sum)=>{if(i===n){if(sum===sv)c++;return;}for(let f=1;f<=6;f++)rec(i+1,sum+f);};rec(0,0);br=` &nbsp;·&nbsp; kimenetelek végigszámolva: ${c} ${ok(c===d[sv])}`;}
  const sum=d.reduce((a,b)=>a+b,0);
  $("#an-k-info").innerHTML=`${n} kocka, összeg ${sv}: N<sub>s</sub> = <b>${d[sv]}</b> a ${tot}-ből, P = ${d[sv]}/${tot} = ${fm(+(d[sv]/tot).toFixed(6))}${br}<br>az együtthatók összege 6<sup>${n}</sup> = ${tot} ${ok(sum===tot)}`;
}
["#an-k-n","#an-k-s"].forEach(i=>$(i).addEventListener("input",anK));anK();
function anF(){
  const p=+$("#an-f-p").value,a=+$("#an-f-a").value,b=+$("#an-f-b").value;$("#an-f-pv").textContent=p;$("#an-f-av").textContent=a;$("#an-f-bv").textContent=b;
  const N=10000,sick=p*100,healthy=N-sick,tp=sick*a/100,fp=healthy*(100-b)/100;
  const bay=rat(p*a,100*100).div(rat(p*a,10000).add(rat((100-p)*(100-b),10000)));
  const fr=tp/(tp+fp);
  $("#an-f-info").innerHTML=`${N} emberből ${sick} beteg, ${healthy} egészséges<br>pozitív betegek: ${fm(tp)}, pozitív egészségesek: ${fm(fp)}<br>P(beteg | pozitív) = ${fm(tp)}/${fm(tp+fp)} = <b>${fm(+fr.toFixed(4))}</b><br>Bayes-képlet (pontos tört): ${bay} = ${fm(+bay.num().toFixed(4))} ${ok(Math.abs(bay.num()-fr)<1e-12)}`;
}
["#an-f-p","#an-f-a","#an-f-b"].forEach(i=>$(i).addEventListener("input",anF));anF();
