/* ================= 7.1 DOMINÓK ÉS PÉNZVÁLTÁS ================= */
function bjTile(m,n){
  let dp=new Map([[0,1n]]);
  for(let c=0;c<n;c++)for(let r=0;r<m;r++){const nd=new Map(),add=(k,v)=>nd.set(k,(nd.get(k)||0n)+v);
    for(const [mask,v] of dp){
      if((mask>>r)&1){add(mask&~(1<<r),v);}
      else{ if(c+1<n)add(mask|(1<<r),v); if(r+1<m&&!((mask>>(r+1))&1))add(mask|(1<<(r+1)),v); }
    } dp=nd;}
  return dp.get(0)||0n;
}
function bjFib(n){let a=0n,b=1n;for(let i=0;i<n;i++)[a,b]=[b,a+b];return a;}
function bjU(k){let a=1n,b=3n;if(k===0)return a;for(let i=1;i<k;i++)[a,b]=[b,4n*b-a];return b;}
function bjRec(m,n){
  if(m===2)return bjFib(n+1);
  if(m===3){return n%2?0n:bjU(n/2);}
  const c=[1n,1n,5n,11n];for(let i=4;i<=n;i++)c.push(c[i-1]+5n*c[i-2]+c[i-3]-c[i-4]);return c[n];
}
function bjPQ(k){let p=1n,q=0n;for(let i=0;i<k;i++)[p,q]=[2n*p+3n*q,p+2n*q];return [p,q];}
c2hero("dominok-bevezeto",900,12,fr=>{
  const s=c2svg("#bj-hero",420,250),N=Math.min(fr+2,12),r=2+Math.sqrt(3),x0=34,w=29;
  el("line",{x1:x0,x2:x0+12*w,y1:205-(r-3)*150,y2:205-(r-3)*150,style:"stroke:var(--accent);stroke-dasharray:4 4;opacity:.8"},s);
  for(let k=1;k<=12;k++){const q=Number(bjU(k))/Number(bjU(k-1)),h=(q-3)*150;
    el("rect",{x:x0+(k-1)*w+3,y:205-h,width:w-6,height:h,rx:2,style:`fill:var(--accent);opacity:${k<=N?.6:.14}`},s);
    if(k%2===1)txt(s,x0+(k-1)*w+w/2,222,k,"","middle");}
  txt(s,x0+12*w,205-(r-3)*150-6,"2+√3","","end");
  $("#bj-hero-b").textContent=`k = ${N}: ${(Number(bjU(N))/Number(bjU(N-1))).toFixed(5)}`;
});
function bjD(){
  const m=+$("#bj-d-m").value,n=+$("#bj-d-n").value;$("#bj-d-nv").textContent=n;
  const b=bjTile(m,n),r=bjRec(m,n);
  $("#bj-d-info").innerHTML=`${m}×${n} lefedés (oszlopprofil-számolás): <b>${b}</b><br>rekurzió: ${r} ${ok(b===r)}`+(m===2?`<br>F<sub>${n+1}</sub> = ${bjFib(n+1)}`:m===3&&n%2?`<br>páratlan cellaszám: nincs lefedés`:"");
}
$("#bj-d-m").addEventListener("change",bjD);$("#bj-d-n").addEventListener("input",bjD);bjD();
function bjUk(){
  const k=+$("#bj-u-k").value;$("#bj-u-kv").textContent=k;
  const [p,q]=bjPQ(k),t=bjTile(3,2*k),re=bjU(k);
  /* a_n és b_n csatolt rekurziója */
  const a=[1n,0n],b=[0n,1n];for(let n=2;n<=2*k+1;n++){a[n]=a[n-2]+2n*b[n-1];b[n]=a[n-1]+b[n-2];}
  $("#bj-u-info").innerHTML=`u<sub>${k}</sub> (3×${2*k} közvetlenül) = <b>${t}</b><br>u<sub>k</sub> = 4u<sub>k−1</sub> − u<sub>k−2</sub>: ${re} ${ok(t===re)}<br>(2+√3)<sup>${k}</sup> = ${p} + ${q}√3, p+q = ${p+q} ${ok(p+q===t)}<br>a<sub>n</sub> = a<sub>n−2</sub> + 2b<sub>n−1</sub> rekurzióval: a<sub>${2*k}</sub> = ${a[2*k]} ${ok(a[2*k]===t)}`;
}
$("#bj-u-k").addEventListener("input",bjUk);bjUk();
function bjCoin(n,c){const ways=Array(n+1).fill(0n);ways[0]=1n;for(const v of c)for(let i=v;i<=n;i++)ways[i]+=ways[i-v];return ways[n];}
function bjBrute(n,c,i=0){if(n===0)return 1n;if(i>=c.length||n<0)return 0n;let t=0n;for(let k=0;k*c[i]<=n;k++)t+=bjBrute(n-k*c[i],c,i+1);return t;}
function bjC(){
  const c=$("#bj-c-s").value.split(",").map(Number),n=+$("#bj-c-n").value;$("#bj-c-nv").textContent=n;
  const g=bjCoin(n,c);
  $("#bj-c-info").innerHTML=`kifizetések száma (${c.join(", ")} érmékkel, ${n}): <b>${g}</b> (soronkénti szorzás)`+(n<=120?`<br>összes kombináció felsorolva: ${bjBrute(n,c)} ${ok(bjBrute(n,c)===g)}`:`<br>(a felsorolás 120 fölött kimarad)`)+(c.join()==="1,2"?`<br>⌊n/2⌋+1 = ${Math.floor(n/2)+1} ${ok(BigInt(Math.floor(n/2)+1)===g)}`:"")+(c.join()==="1,5"?`<br>⌊n/5⌋+1 = ${Math.floor(n/5)+1} ${ok(BigInt(Math.floor(n/5)+1)===g)}`:"");
}
$("#bj-c-s").addEventListener("change",bjC);$("#bj-c-n").addEventListener("input",bjC);bjC();
