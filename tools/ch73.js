/* ================= 7.8 PARTÍCIÓK ================= */
const pcWays=(coins,N)=>{const c=Array(N+1).fill(0);c[0]=1;for(const a of coins)for(let i=a;i<=N;i++)c[i]+=c[i-a];return c;};
const pcDist=N=>{const c=Array(N+1).fill(0);c[0]=1;for(let a=1;a<=N;a++)for(let i=N;i>=a;i--)c[i]+=c[i-a];return c;};
const pcList=(n,mx,ok2)=>{const out=[];const rec=(rem,m,cur)=>{if(rem===0){out.push(cur.slice());return;}for(let k=Math.min(rem,m);k>=1;k--){if(!ok2(k,cur))continue;cur.push(k);rec(rem-k,ok2.strict?k-1:k,cur);cur.pop();}};rec(n,mx,[]);return out;};
const pcAll=pcList(6,6,()=>true);
c2hero("gfparticio-bevezeto",700,pcAll.length,fr=>{
  const s=$("#ak-hero"),W=420,H=250,p=pcAll[fr],q=22;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  p.forEach((len,r)=>{for(let c=0;c<len;c++)el("rect",{x:W/2-3*q+c*q+1,y:30+r*q+1,width:q-2,height:q-2,rx:4,style:`fill:var(--accent);opacity:${.95-0.1*r}`},s);});
  txt(s,W/2,H-20,p.join(" + "),"");
  $("#ak-hero-a").textContent=(fr+1)+". partíció";$("#ak-hero-b").textContent=(fr+1);
});
function akS(){
  const n=+$("#ak-s-n").value;$("#ak-s-nv").textContent=n;const N=100,p=pcWays(Array.from({length:N},(_,i)=>i+1),N);
  const rc=[1];for(let m=1;m<=N;m++){let s=0;for(let k=1;;k++){const a=k*(3*k-1)/2,b=k*(3*k+1)/2;if(a>m)break;const sg=k%2?1:-1;s+=sg*rc[m-a];if(b<=m)s+=sg*rc[m-b];}rc.push(s);}
  const same=rc.every((v,i)=>v===p[i]);
  $("#ak-s-info").innerHTML=`p(0…12): ${p.slice(0,13).join(", ")}, …<br>p(${n}) = <b>${p[n]}</b><br>az ötszögszám-rekurzió p(0…100)-ra ugyanazt adja ${ok(same)}`;
}
$("#ak-s-n").addEventListener("input",akS);akS();
function akE(){
  const n=+$("#ak-e-n").value;$("#ak-e-nv").textContent=n;const d=pcDist(60)[n],o=pcWays(Array.from({length:30},(_,i)=>2*i+1),60)[n];
  let lst="";
  if(n<=12){const D=[],O=[];const rd=(rem,m,cur)=>{if(rem===0){D.push(cur.join("+"));return;}for(let k=Math.min(rem,m);k>=1;k--){cur.push(k);rd(rem-k,k-1,cur);cur.pop();}};rd(n,n,[]);
    const ro=(rem,m,cur)=>{if(rem===0){O.push(cur.join("+"));return;}for(let k=Math.min(rem,m);k>=1;k--){if(k%2===0)continue;cur.push(k);ro(rem-k,k,cur);cur.pop();}};ro(n,n,[]);
    lst=`<br>különböző tagok: ${D.join(" ; ")}<br>páratlan tagok: ${O.join(" ; ")}`;}
  let all=true;const dd=pcDist(60),oo=pcWays(Array.from({length:30},(_,i)=>2*i+1),60);for(let k=0;k<=60;k++)if(dd[k]!==oo[k])all=false;
  $("#ak-e-info").innerHTML=`különböző tagokkal: <b>${d}</b> &nbsp;·&nbsp; páratlan tagokkal: <b>${o}</b> ${ok(d===o)}${lst}<br>0 ≤ n ≤ 60 minden értékére egyezik ${ok(all)}`;
}
$("#ak-e-n").addEventListener("input",akE);akE();
function akP(){
  const set=[[1,5,10,25,50],[1,2,3],[5,10,20,50,100,200],[1,2,5,10,20,50,100]][+$("#ak-p-c").value],n=+$("#ak-p-n").value;$("#ak-p-nv").textContent=n;
  const w=pcWays(set,500);
  $("#ak-p-info").innerHTML=`címletek: ${set.join(", ")}<br>${n} kifizetése: <b>${w[n]}</b> módon${set.join()==="1,5,10,25,50"&&n===100?` ${ok(w[n]===292)}`:""}`;
}
["#ak-p-c","#ak-p-n"].forEach(i=>$(i).addEventListener("input",akP));akP();
