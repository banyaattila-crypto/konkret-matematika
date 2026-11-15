/* ================= 4.4 A FAKTORIÁLIS OSZTÓI ================= */
function mEps(n,p){let s=0,q=p;while(q<=n){s+=Math.floor(n/q);q*=p;}return s;}
function mSd(n,p){let s=0;while(n){s+=n%p;n=Math.floor(n/p);}return s;}
function mDirect(n,p){let s=0;for(let k=2;k<=n;k++){let m=k;while(m%p===0){m/=p;s++;}}return s;}
const mNs=[4,10,20,40,70,100];
c2hero("faktorialis-bevezeto",900,6,fr=>{
  const n=mNs[Math.min(fr,5)],v=[2,3,5,7].map(p=>mEps(n,p));
  c2bars(c2svg("#m-hero",420,250),v,{W:420,H:250,xl:i=>[2,3,5,7][i],color:i=>["var(--accent)","var(--accent-2)","var(--good)","var(--bad)"][i],fmt:x=>x});
  $("#m-hero-a").textContent="n = "+n;$("#m-hero-b").textContent=v.join(", ");
});
function mLeg(){
  const n=+$("#m-l-n").value,p=+$("#m-l-p").value;$("#m-l-nv").textContent=n;
  let h="<tr><th>j</th><th>p<sup>j</sup></th><th>⌊n/p<sup>j</sup>⌋</th></tr>",s=0,q=p,j=1;
  while(q<=n){const t=Math.floor(n/q);s+=t;h+=`<tr><td>${j}</td><td>${q}</td><td>${t}</td></tr>`;q*=p;j++;}
  h+=`<tr><th colspan="2">összeg</th><td><b>${s}</b></td></tr>`;$("#m-l-t").innerHTML=h;
  const d=mDirect(n,p),sd=mSd(n,p),g=(n-sd)/(p-1);
  $("#m-l-info").innerHTML=`${n}! tényezőinek bontásából: ${d} &nbsp;·&nbsp; Legendre: ${s} ${ok(d===s)}<br>számjegyösszeg ${p}-es alapban: s = ${sd}, (n − s)/(p − 1) = (${n} − ${sd})/${p-1} = ${g} ${ok(g===s)}`;
}
$("#m-l-n").addEventListener("input",mLeg);$("#m-l-p").addEventListener("change",mLeg);mLeg();
function mNull(){
  const n=+$("#m-n-n").value,t=+$("#m-n-z").value;$("#m-n-nv").textContent=n;$("#m-n-zv").textContent=t;
  const z=mEps(n,5);let f=-1;for(let k=0;k<=5*(t+2)+5;k++)if(mEps(k,5)===t){f=k;break;}
  const terms=[];for(let q=5;q<=n;q*=5)terms.push(Math.floor(n/q));
  let big=1n;for(let k=2n;k<=BigInt(Math.min(n,400));k++)big*=k;let zs=0;const st=big.toString();for(let i=st.length-1;i>=0&&st[i]==="0";i--)zs++;
  $("#m-n-info").innerHTML=`z(${n}) = ${terms.join(" + ")||"0"} = <b>${z}</b>${n<=400?` &nbsp;·&nbsp; a ${n}! tényleg ${zs} nullára végződik ${ok(zs===z)}`:""}<br>${f>=0?`z = ${t}-et először n = <b>${f}</b>-nél éri el az n!`:`z = <b>${t}</b>-et egyetlen n! sem éri el`}`;
}
["#m-n-n","#m-n-z"].forEach(i=>$(i).addEventListener("input",mNull));mNull();
