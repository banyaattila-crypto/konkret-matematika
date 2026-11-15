import json,os,sys
os.chdir('/home/claude/km')
base=open('index.base.html',encoding='utf-8').read()
T='tools/'
SRC="R. L. Graham – D. E. Knuth – O. Patashnik: <i>Konkrét matematika</i>, {ch}. fejezet, {n} {t}. A szöveg saját feldolgozás, a magyar kiadás szövege nélkül."
MODS=[
 ("jelolesek","2.1","Jelölés","a-","ch21",[["bevezeto","Bevezető"],["szigma","A szigma-gép"],["iverson","Az Iverson-zárójel"],["teglalap","Összeg-téglalapok"],["kotott","Kötött változó"],["gyak","Gyakorlatok"],["modszer","Összefoglalás"]],"Szigma-jel, feltétel az összegzés alatt, Iverson-zárójel. Szigma-gép és összeg-téglalapok."),
 ("rekurziok","2.2","Összeg és rekurzió","b-","ch22",[["bevezeto","Bevezető"],["atiras","Összeg és rekurzió"],["tenyezo","Az összegzőtényező"],["gyorsrendezes","Gyorsrendezés"],["gyak","Gyakorlatok"],["modszer","Összefoglalás"]],"Minden összeg rekurzió, és sok rekurzió összeggé alakítható. Összegzőtényező, a gyorsrendezés átlagos költsége."),
 ("kezeles","2.3","Összeg átalakításai","c-","ch23",[["bevezeto","Bevezető"],["szabalyok","A három szabály"],["gauss","Tükrözés"],["perturbacio","A perturbáció módszere"],["gyak","Gyakorlatok"],["modszer","Összefoglalás"]],"Elosztás, csoportosítás, átrendezés, tükrözés és a perturbáció módszere."),
 ("tobbszoros","2.4","Többszörös összeg","d-","ch24",[["bevezeto","Bevezető"],["racs","A rács"],["csere","Sorrendcsere"],["szimmetria","A szimmetria-trükk"],["gyak","Gyakorlatok"],["modszer","Összefoglalás"]],"Kétszeres összegek, tartományok, a szummák felcserélése."),
 ("modszerek","2.5","Általános módszerek","f-","ch25",[["bevezeto","Bevezető"],["sejtes","Sejtés és indukció"],["perturbacio","Perturbáció"],["repertoar","Repertoár"],["integral","Integrálás"],["kibontas","Kibontás és összevonás"],["osszevetes","Összevetés"]],"A négyzetek összege öt módszerrel."),
 ("veges","2.6","Véges és végtelen kalkulus","g-","ch26",[["bevezeto","Bevezető"],["kulonbseg","A differenciaoperátor"],["esespoli","Eséspolinomok"],["osszegzes","Összegzés"],["reszleges","Összegzés részenként"],["gyak","Gyakorlatok"],["modszer","Összefoglalás"]],"Differencia az derivált helyett, eséspolinomok, az összegzés alaptétele."),
 ("vegtelen","2.7","Végtelen összeg","h-","ch27",[["bevezeto","Bevezető"],["geometria","A geometriai sor"],["teleszkop","Teleszkopikus összegek"],["atrendezes","Átrendezés"],["abszolut","Abszolút konvergencia"],["gyak","Gyakorlatok"],["modszer","Összefoglalás"]],"Konvergencia, teleszkópos összegek, az átrendezés tétele."),
 ("feladatokosszeg","2.8","Feladatok","x-","ch28",[["bevezeto","Bevezető"],["bemelegito","Bemelegítő"],["halado","Alap és haladó"],["kutatas","Kutatás"]],"Tíz saját feladat négy szinten az összegekről, megoldással, programmal ellenőrizve."),
]
MODS1=[("feladatok","1.4","Feladatok","w-","ch14",[["bevezeto","Bevezető"],["bemelegito","Bemelegítő"],["halado","Alap és haladó"],["kutatas","Kutatás"]],"Kilenc saját feladat négy szinten: bemelegítő, alap, haladó, kutatási. Minden megoldás levezetve és programmal ellenőrizve.")]
exec(open('tools/mods3.py',encoding='utf-8').read())
exec(open('tools/mods4.py',encoding='utf-8').read())
exec(open('tools/mods5.py',encoding='utf-8').read())
exec(open('tools/mods6.py',encoding='utf-8').read())
exec(open('tools/mods7.py',encoding='utf-8').read())
exec(open('tools/mods8.py',encoding='utf-8').read())
exec(open('tools/mods9.py',encoding='utf-8').read())
exec(open('tools/mods10.py',encoding='utf-8').read())
MODS=MODS+MODS3+MODS4+MODS5+MODS6+MODS7+MODS8+MODS9+MODS10+MODS1
built=[m for m in MODS if os.path.exists(T+m[4]+'.html') and os.path.exists(T+m[4]+'.js')]
css=open(T+'ch2.css',encoding='utf-8').read()
s=base
def rep(a,b):
    global s
    assert s.count(a)==1,a[:60]
    s=s.replace(a,b)
rep('/* ---- animált háttér',css+'\n/* ---- animált háttér')
rep('</style>\n<script>\nwindow.MathJax=',open(T+'design.gen.css',encoding='utf-8').read()+open(T+'design.css',encoding='utf-8').read()+'\n</style>\n<script>\nwindow.MathJax=')
rep('{id:"josephus",d:"Körben állók, minden második kiesik: ki marad utoljára? Bináris forgatás és repertoármódszer."}]},','{id:"josephus",d:"Körben állók, minden második kiesik: ki marad utoljára? Bináris forgatás és repertoármódszer."},{id:"feladatok",d:"Kilenc saját feladat négy szinten, a fejezet végén: számolás, bizonyítás, kísérlet. Teljes megoldásokkal."}]},')
# router: fejezetszám témánként
rep('return {ch:1,topic:m[1],page:m[2]};','return {ch:TOPICS[m[1]].ch||1,topic:m[1],page:m[2]};')
rep(':"fejezet-1";}',':"fejezet-"+(TOPICS[curTopic].ch||1);}')
ent=""
for (tid,n,t,pre,fn,pages,d) in built:
    o={"n":n,"t":t,"ch":int(n.split(".")[0]),"prefix":pre,"pages":pages,"foot":SRC.format(n=n,t=t,ch=n.split(".")[0])}
    ent+=',\n  '+tid+':'+json.dumps(o,ensure_ascii=False)
rep('\n};\nconst CH=[',ent+'\n};\nconst CH=[')
tops=[]
for (tid,n,t,pre,fn,pages,d) in [m for m in MODS if m[1].startswith('2.')]:
    if (tid,n,t,pre,fn,pages,d) in built: tops.append({"id":tid,"d":d})
    else: tops.append({"n":n,"t":t,"d":d})
ch2={"n":2,"t":"Összegek","d":"Szigma-jelölés, összegek és rekurziók, többszörös összegek, véges analízis, végtelen összegek.","lead":"Az összegek a diszkrét matematika alapműveletei. A fejezet azt tanítja meg, hogyan lehet őket felírni, átalakítani és kiszámolni: a jelöléstől a zárt alakig, véges és végtelen esetben.","topics":tops}
rep(' {n:2,t:"Összegek",d:"Összegzési jelölés, perturbáció, többszörös összegek."},',' '+json.dumps(ch2,ensure_ascii=False)+',')
tops3=[]
for (tid,n,t,pre,fn,pages,d) in MODS3:
    tops3.append({"id":tid,"d":d} if (tid,n,t,pre,fn,pages,d) in built else {"n":n,"t":t,"d":d})
ch3={k:v for k,v in CH3.items() if k!='old'};ch3['topics']=tops3
rep(CH3['old'],' '+json.dumps(ch3,ensure_ascii=False)+',')
tops4=[]
for (tid,n,t,pre,fn,pages,d) in MODS4:
    tops4.append({"id":tid,"d":d} if (tid,n,t,pre,fn,pages,d) in built else {"n":n,"t":t,"d":d})
ch4={k:v for k,v in CH4.items() if k!='old'};ch4['topics']=tops4
rep(CH4['old'],' '+json.dumps(ch4,ensure_ascii=False)+',')
tops5=[]
for (tid,n,t,pre,fn,pages,d) in MODS5:
    tops5.append({"id":tid,"d":d} if (tid,n,t,pre,fn,pages,d) in built else {"n":n,"t":t,"d":d})
ch5={k:v for k,v in CH5.items() if k!='old'};ch5['topics']=tops5
rep(CH5['old'],' '+json.dumps(ch5,ensure_ascii=False)+',')
tops6=[]
for (tid,n,t,pre,fn,pages,d) in MODS6:
    tops6.append({"id":tid,"d":d} if (tid,n,t,pre,fn,pages,d) in built else {"n":n,"t":t,"d":d})
ch6={k:v for k,v in CH6.items() if k!='old'};ch6['topics']=tops6
rep(CH6['old'],' '+json.dumps(ch6,ensure_ascii=False)+',')
tops7=[]
for (tid,n,t,pre,fn,pages,d) in MODS7:
    tops7.append({"id":tid,"d":d} if (tid,n,t,pre,fn,pages,d) in built else {"n":n,"t":t,"d":d})
ch7={k:v for k,v in CH7.items() if k!='old'};ch7['topics']=tops7
rep(CH7['old'],' '+json.dumps(ch7,ensure_ascii=False)+',')
tops8=[]
for (tid,n,t,pre,fn,pages,d) in MODS8:
    tops8.append({"id":tid,"d":d} if (tid,n,t,pre,fn,pages,d) in built else {"n":n,"t":t,"d":d})
ch8={k:v for k,v in CH8.items() if k!='old'};ch8['topics']=tops8
rep(CH8['old'],' '+json.dumps(ch8,ensure_ascii=False)+',')
tops9=[]
for (tid,n,t,pre,fn,pages,d) in MODS9:
    tops9.append({"id":tid,"d":d} if (tid,n,t,pre,fn,pages,d) in built else {"n":n,"t":t,"d":d})
ch9={k:v for k,v in CH9.items() if k!='old'};ch9['topics']=tops9
tops10=[]
for (tid,n,t,pre,fn,pages,d) in MODS10:
    tops10.append({"id":tid,"d":d} if (tid,n,t,pre,fn,pages,d) in built else {"n":n,"t":t,"d":d})
ch10={k:v for k,v in CH10.items() if k!='old'};ch10['topics']=tops10
rep(CH9['old'],' '+json.dumps(ch9,ensure_ascii=False)+',\n '+json.dumps(ch10,ensure_ascii=False))
html="".join(open(T+m[4]+'.html',encoding='utf-8').read() for m in built)
js=open(T+'landing.js',encoding='utf-8').read()+"\n"+open(T+'ch2common.js',encoding='utf-8').read()+"\n"+"\n".join(open(T+m[4]+'.js',encoding='utf-8').read() for m in built)
rep('<footer id="foot"></footer>',html+'\n<footer id="foot"></footer>')
rep('const side=$("#side"),mb=$("#menuBtn");',js+'\n/* ---- router ---- */\nconst side=$("#side"),mb=$("#menuBtn");')
open('index.html','w',encoding='utf-8').write(s)
print("built:",[m[0] for m in built],len(s))
