/* ================= 1.4 FELADATOK ================= */
c2hero("feladatok-bevezeto",420,10,fr=>{
  const s=$("#w-hero"),W=420,H=250;clear(s);s.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const tiers=[["bemelegítő",3,"var(--good)"],["alap",2,"var(--accent)"],["haladó",2,"var(--accent-2)"],["kutatási",2,"var(--bad)"]];
  const bw=70,gap=24,x0=(W-4*bw-3*gap)/2,bh=34;let shown=0,total=0;
  el("line",{x1:20,x2:W-20,y1:H-44,y2:H-44,style:"stroke:var(--line);stroke-width:2"},s);
  tiers.forEach(([name,cnt,col],i)=>{
    const x=x0+i*(bw+gap);
    for(let j=0;j<cnt;j++){
      const idx=total+j;if(idx<=fr-1||fr>=9){shown++;
        el("rect",{x,y:H-44-(j+1)*(bh+6),width:bw,height:bh,rx:7,style:`fill:${col};opacity:.88`},s);
        txt(s,x+bw/2,H-44-(j+1)*(bh+6)+bh/2+4,String(idx+1),"ink");}
    }
    total+=cnt;
    txt(s,x+bw/2,H-24,name,"");
  });
  $("#w-hero-k").textContent=Math.min(9,shown);
});

/* --- kísérlet: Hanoi p rúddal, szélességi kereséssel --- */
function wBfs(n,p){
  const S=p**n,dist=new Int32Array(S).fill(-1),q=new Int32Array(S),pw=[];for(let i=0;i<n;i++)pw.push(p**i);
  const goal=(S-1)/(p-1)*(p-1); /* minden korong a (p-1). rúdon */
  dist[0]=0;let h=0,t=0;q[t++]=0;
  while(h<t){
    const s=q[h++];if(s===goal)return dist[s];
    const top=new Array(p).fill(-1);let x=s;const pg=[];
    for(let d=0;d<n;d++){const r=x%p;x=(x-r)/p;pg.push(r);if(top[r]<0)top[r]=d;}
    for(let a=0;a<p;a++){const d=top[a];if(d<0)continue;
      for(let b=0;b<p;b++){if(b===a)continue;if(top[b]>=0&&top[b]<d)continue;
        const ns=s+(b-a)*pw[d];if(dist[ns]<0){dist[ns]=dist[s]+1;q[t++]=ns;}}}
  }
  return -1;
}
const wFSm={};
function wFS(n,p){if(n===0)return 0;if(p===3)return 2**n-1;if(n===1)return 1;const k0=p+"_"+n;if(wFSm[k0]!==undefined)return wFSm[k0];
  let b=Infinity;for(let k=1;k<n;k++)b=Math.min(b,2*wFS(k,p)+wFS(n-k,p-1));return wFSm[k0]=b;}
const wNab=i=>{let j=0;while((j+1)*(j+2)/2<=i)j++;return j;}; /* a legnagyobb j: j(j+1)/2 ≤ i */
const wClosed4=n=>{let s=0;for(let i=0;i<n;i++)s+=2**wNab(i);return s;};
function wHanoi(){
  const p=+$("#w-p").value,N={3:8,4:7,5:6}[p];let h=`<tr><th>n</th><th>BFS (igazi minimum)</th><th>Frame–Stewart</th>${p===4?"<th>Σ 2<sup>∇i</sup></th>":""}<th></th></tr>`,all=true;
  for(let n=1;n<=N;n++){
    const b=wBfs(n,p),f=wFS(n,p),c=p===4?wClosed4(n):null,good=b===f&&(c===null||c===f);if(!good)all=false;
    h+=`<tr><th>${n}</th><td>${b}</td><td>${f}</td>${p===4?`<td>${c}</td>`:""}<td>${ok(good)}</td></tr>`;
  }
  $("#w-t").innerHTML=h;
  $("#w-info").innerHTML=`${p} rúd, n ≤ ${N}: a BFS és a stratégia ${all?"egyezik":"ELTÉR"} ${ok(all)}${p>=4?" – ez kis esetek ellenőrzése, nem bizonyítás.":""}`;
}
$("#w-p").addEventListener("input",wHanoi);wHanoi();

/* --- kísérlet: Josephus minden k-adik --- */
function wJ(n,k){let r=0;for(let m=2;m<=n;m++)r=(r+k)%m;return r+1;}
function wJform(n,k){let D=1;while(D<=(k-1)*n)D=Math.ceil(k*D/(k-1)-1e-12);return k*n+1-D;}
function wJos(){
  const k=+$("#w-k").value;$("#w-kv").textContent=k;let h="",prev=0,ws=[];
  for(let n=1;n<=40;n++){const j=wJ(n,k),drop=n>1&&j<prev;if(drop)ws.push(n);prev=j;h+=`<span class="jc${drop?" dr":""}"><i>${n}</i>${j}</span>`;}
  $("#w-j").innerHTML=h;
  let all=true;for(let n=1;n<=300;n++)if(wJ(n,k)!==wJform(n,k)){all=false;break;}
  $("#w-jinfo").innerHTML=`k = ${k}: a túlélő helye leesik (kiemelve) n = ${ws.join(", ")} esetén.<br>J<sub>k</sub>(n) = kn + 1 − D<sub>j</sub> a szimulációval n ≤ 300-ig ${all?"egyezik":"ELTÉR"} ${ok(all)}`;
}
$("#w-k").addEventListener("input",wJos);wJos();
