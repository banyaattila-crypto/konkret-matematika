/* ================= 2.4 TÖBBSZÖRÖS ÖSSZEGEK ================= */
c2hero("tobbszoros-bevezeto",650,7,fr=>{
  const s=$("#d-hero"),N=6,W=420,H=250,u=Math.min((W-60)/N,(H-50)/N);clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const x0=(W-N*u)/2,y0=14;let tot=0;
  for(let j=1;j<=N;j++)for(let k=1;k<=N;k++){
    const on=j<=fr;if(on)tot+=j*k;
    el("rect",{x:x0+(k-1)*u+1,y:y0+(j-1)*u+1,width:u-2,height:u-2,rx:4,style:`fill:${on?(j===fr?"var(--accent-2)":"var(--accent)"):"none"};opacity:${on?.25+.75*j*k/(N*N):1};stroke:${on?"none":"var(--line)"}`},s);
    txt(s,x0+(k-1)*u+u/2,y0+(j-1)*u+u/2+4,on?j*k:"","");
  }
  $("#d-hero-a").textContent="sorok: "+Math.min(fr,N);$("#d-hero-b").textContent=tot;
});

/* --- §1 rács --- */
const dCond={all:()=>true,lt:(j,k)=>j<k,le:(j,k)=>j<=k,anti:(j,k,n)=>j+k<=n+1,div:(j,k)=>k%j===0};
function dRacs(){
  const n=+$("#d-r-n").value;$("#d-r-nv").textContent=n;const c=dCond[$("#d-r-c").value];
  let tot=0,rows=Array(n+1).fill(0),cols=Array(n+1).fill(0),h="";
  for(let j=1;j<=n;j++)for(let k=1;k<=n;k++){const on=c(j,k,n);if(on){tot+=j*k;rows[j]+=j*k;cols[k]+=j*k;}}
  h=`<div class="cells" style="--nc:${n+1}"><div class="cell"><span class="ck"></span></div>`;
  for(let k=1;k<=n;k++)h+=`<div class="cell"><span class="ck">k=${k}</span></div>`;
  for(let j=1;j<=n;j++){h+=`<div class="cell"><span class="ck">j=${j}</span></div>`;
    for(let k=1;k<=n;k++){const on=c(j,k,n);h+=`<div class="cell"><span class="cv${on?" on":""}">${on?j*k:"·"}</span></div>`;}}
  h+="</div>";$("#d-r-grid").innerHTML=h;
  const sr=rows.slice(1).reduce((a,b)=>a+b,0),sc=cols.slice(1).reduce((a,b)=>a+b,0);
  let extra="";const sk=n*(n+1)/2,sq=n*(n+1)*(2*n+1)/6;
  if($("#d-r-c").value==="all")extra=` &nbsp;·&nbsp; (n(n+1)/2)² = ${sk*sk} ${ok(sk*sk===tot)}`;
  if($("#d-r-c").value==="lt")extra=` &nbsp;·&nbsp; ½[(Σk)² − Σk²] = ${(sk*sk-sq)/2} ${ok((sk*sk-sq)/2===tot)}`;
  $("#d-r-info").innerHTML=`soronként: ${sr} &nbsp;·&nbsp; oszloponként: ${sc} ${ok(sr===sc&&sr===tot)} &nbsp;·&nbsp; összeg = <b>${tot}</b>${extra}`;
}
["#d-r-n","#d-r-c"].forEach(id=>$(id).addEventListener("input",dRacs));dRacs();

/* --- §2 sorrendcsere --- */
const dF={inv:(j,k)=>rat(1,j),jk:(j,k)=>rat(j*k),k:(j,k)=>rat(k),diff:(j,k)=>rat(j-k),inv2:(j,k)=>rat(1,j*k)};
function dCsere(){
  const n=+$("#d-c-n").value;$("#d-c-nv").textContent=n;const f=dF[$("#d-c-f").value];
  let A=rat(0),B=rat(0);
  for(let j=1;j<=n;j++)for(let k=1;k<=j;k++)A=A.add(f(j,k));
  for(let k=1;k<=n;k++)for(let j=k;j<=n;j++)B=B.add(f(j,k));
  let ex="";
  if($("#d-c-f").value==="inv"){
    let H=[rat(0)];for(let i=1;i<=n;i++)H.push(H[i-1].add(rat(1,i)));
    let s=rat(0);for(let k=0;k<=n-1;k++)s=s.add(H[k]);const cl=rat(n).mul(H[n]).sub(rat(n));
    ex=`<br>Σ<sub>k=0</sub><sup>n−1</sup> H<sub>k</sub> = ${s} &nbsp;·&nbsp; nH<sub>n</sub> − n = ${cl} ${ok(s.eq(cl))}`;
  }
  $("#d-c-info").innerHTML=`Σ<sub>j=1</sub><sup>${n}</sup>Σ<sub>k=1</sub><sup>j</sup> a = <b>${A}</b> &nbsp;·&nbsp; Σ<sub>k=1</sub><sup>${n}</sup>Σ<sub>j=k</sub><sup>${n}</sup> a = <b>${B}</b> ${ok(A.eq(B))}${ex}`;
}
["#d-c-f","#d-c-n"].forEach(id=>$(id).addEventListener("input",dCsere));dCsere();

/* --- §3 szimmetria-trükk --- */
function dSzim(){
  const n=+$("#d-s-n").value;$("#d-s-nv").textContent=n;const fa=c2expr($("#d-s-a").value),fb=c2expr($("#d-s-b").value),i=$("#d-s-info");
  if(!fa||!fb){i.textContent="Hibás kifejezés (használd a k változót).";return;}
  const a=[],b=[];for(let k=1;k<=n;k++){a.push(fa(k));b.push(fb(k));}
  if(![...a,...b].every(isFinite)){i.textContent="A kifejezés valamelyik k-ra nem értelmezett.";return;}
  let L=0,sa=0,sb=0,sab=0;
  for(let j=0;j<n;j++){sa+=a[j];sb+=b[j];sab+=a[j]*b[j];for(let k=0;k<n;k++)L+=(a[j]-a[k])*(b[j]-b[k]);}
  const R=2*n*sab-2*sa*sb,eq=Math.abs(L-R)<1e-9*Math.max(1,Math.abs(L));
  const rel=n*sab-sa*sb;
  i.innerHTML=`Σ<sub>j,k</sub>(a<sub>j</sub>−a<sub>k</sub>)(b<sub>j</sub>−b<sub>k</sub>) = ${c2ptsum(L)} &nbsp;·&nbsp; 2nΣab − 2ΣaΣb = ${c2ptsum(R)} ${ok(eq)}<br>`+
    `n·Σab = ${c2ptsum(n*sab)} &nbsp;${rel>1e-9?"≥":rel<-1e-9?"≤":"="}&nbsp; (Σa)(Σb) = ${c2ptsum(sa*sb)}`+(rel>1e-9?" (azonos monotonitás)":rel<-1e-9?" (ellentétes monotonitás)":" (egyenlőség)");
}
["#d-s-a","#d-s-b","#d-s-n"].forEach(id=>$(id).addEventListener("input",dSzim));
document.querySelectorAll("#d-s-pre button").forEach(b=>b.onclick=()=>{$("#d-s-a").value=b.dataset.a;$("#d-s-b").value=b.dataset.b;document.querySelectorAll("#d-s-pre button").forEach(x=>x.classList.toggle("primary",x===b));dSzim();});
dSzim();
