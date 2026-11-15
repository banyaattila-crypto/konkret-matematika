# Változásnapló

Minden jelentős változás ebben a fájlban szerepel.
A formátum a [Keep a Changelog](https://keepachangelog.com/hu/1.1.0/) szerinti,
a verziózás a [Szemantikus verziózás 2.0.0](https://semver.org/lang/hu/) szerinti.
A publikus interfész az oldalak hash-útvonala (`#téma-oldal`, `#fejezet-N`).

## [Unreleased]

## [1.9.1] - 2026-11-15

### Módosítva
- 10.1 A kötet térképe: két új kapcsolat (2–3: egészes összegek, 6–7: Fibonacci-számok és generátorfüggvény), tizenöt kapcsolat összesen; az eszköztár táblázat a 9.6-ra is hivatkozik; a 4. gyakorlat a 9.6 korlátaira utal.

## [1.9.0] - 2026-11-15

### Hozzáadva
- 9.4 Két aszimptotikával kapcsolatos fogás: csizmahúzás az a<sub>n+1</sub>=a<sub>n</sub>+1/a<sub>n</sub> rekurzióra, implicit egyenlet (x ln x = n) iterációja, farok-trükk a Σ1/C(n,k) összegre; interaktív kísérletekkel és gyakorlatokkal.
- 9.6 Véges összegzés: konvergens sorok farokbecslése (ζ(2), Σk·2^−k), divergens összegek (Σ√k, Σ1/√k) főtagja, hibatagja és állandója; kísérletekkel és gyakorlatokkal.

### Módosítva
- A 9. fejezet teljes: minden szakasz tartalommal rendelkezik.

## [1.8.0] - 2026-11-15

### Hozzáadva
- 8.4 Pénzfeldobás: minták várható várakozási ideje (autokorrelációs képlet generátorfüggvénnyel bizonyítva), Penney-játék (Conway-képlet ellenőrizve, nem bizonyítva).
- 8.5 Hasítási technikák: láncolás, ütközések, lineáris próbálás (Knuth-képletek szimulációval, bizonyítás nélkül).

## [1.7.0] - 2026-11-15

### Hozzáadva
- 7.1 Dominók és pénzváltás: 2×n és 3×n lefedések rekurzióval és generátorfüggvénnyel, pénzváltás, oszlopprofil-számolás ellenőrzésre.
- 7.4 Speciális generátorfüggvények: harmonikus számok, Stirling-számok, Bernoulli-számok.
- 7.5 Konvolúciók: Vandermonde-azonosság és változata, a központi binomiális együtthatók és a Catalan-konvolúció, a Fibonacci-számok önkonvolúciója.
- 7.7 Dirichlet-féle generátorfüggvény: Dirichlet-konvolúció, multiplikativitás, Euler-szorzat.

## [1.6.2] - 2026-11-15

### Módosítva
- A 4. fejezet címei a tartalomjegyzékhez igazítva: 4.6 „MOD”: A kongruencia reláció, 4.9 Fí és Mű.

### Javítva
- A 4.8 szakasz azonosítója ütközött a 3.2-ével (mindkettő „alkalmazasok”, azonos hero-oldalazonosítóval); a 4.8 azonosítója „tovabbialk” lett.

## [1.6.1] - 2026-11-15

### Módosítva
- Az 1–3. fejezet szakaszcímei a magyar kiadás tartalomjegyzékéhez igazítva (pl. 2.2 Összeg és rekurzió, 2.6 Véges és végtelen kalkulus, 3.2 Alsó/felső egész alkalmazások, 3.4 „mod”: A binér művelet); a 3. fejezet címe: Egész függvények.

## [1.6.0] - 2026-11-15

### Hozzáadva
- 6.2 Euler-számok: rekurzió beszúrásos bizonyítással, zárt képlet (ellenőrzött), Worpitzky-azonosság indukcióval, két kísérlet.
- 6.4 Harmonikus számok összegzése: részleges összegzés, a Σ C(k,m)·H_k képlet, binomiális inverzió, két kísérlet.
- 6.7 Kontinuánsok: rekurzió, Euler-szabály, lánctörtek és Euklideszi-algoritmus, determináns-azonosság, három kísérlet.

## [1.5.0] - 2026-11-15

### Hozzáadva
- 5.5 Hipergeometrikus függvények: tagarány-szabály, a Gauss-féle F(a,b;c|z), Chu–Vandermonde és Gauss-képlet ellenőrzése pontos törtekkel.
- 5.6 Hipergeometrikus transzformációk: Pfaff (bizonyítással a Chu–Vandermonde-ból), Euler, a tagok megfordítása.
- 5.7 Parciális hipergeometrikus sorok: teleszkópos részletösszegek, a binomiális részletösszeg rekurziója.
- 5.8 Mechanikus összegzés: a Gosper-algoritmus teljes megvalósítása pontos törtekkel (11 előre megadott tag), Zeilberger-tanúsítványok ellenőrzése.

### Módosítva
- A négy szakasz helyőrzője kikerült; az 5. fejezet minden könyvszakasza elkészült.

## [1.4.0] - 2026-11-15

### Hozzáadva
- 4.3 Prím példák: Mersenne- és Fermat-számok, a 2kp+1 alakú osztók, Euklidész-számok, prímhézagok.
- 4.7 Független maradékok: Z_mn ≅ Z_m×Z_n, Garner módszere, gyökök száma, nem relatív prím modulusok.
- 4.8 További alkalmazások: gyors hatványozás, Fermat-teszt és Carmichael-számok, RSA játékpélda, ellenőrző számjegyek.
- 4.9 Fi és Mű: a φ szorzat-szabálya és osztóösszege, a Möbius-féle μ, Möbius-inverzió, aperiodikus füzérek, relatív prím párok.
- Mindegyikhez élő ✓-ellenőrzéssel ellátott kísérletek, gyakorlatok és összefoglaló.

### Módosítva
- A négy szakasz helyőrzője kikerült; a 4. fejezet minden könyvszakasza elkészült.

## [1.3.0] - 2026-11-15

### Módosítva
- A 4–9. fejezet szakaszai a magyar kiadás tartalomjegyzékének számozásához és címeihez igazítva (pl. 4.4 Faktoriálisok tényezői, 4.6 A kongruencia reláció, 6.5 Bernoulli-számok, 8.3 A valószínűségek generátorfüggvényei, 9.5 Euler-féle szummációs formula). A hash-azonosítók változatlanok.
- A „Feladatok” rész a fejezet utolsó szakasza lett (pl. 4.10, 5.9, 9.8); a könyvben nem szereplő saját szakaszaink „(kiegészítés)” jelzést kaptak.
- Szakaszhivatkozások és ragok javítva az átszámozás miatt.

### Hozzáadva
- 18 helyőrző a még hiányzó könyvszakaszoknak („hamarosan”): 4.3, 4.7, 4.8, 4.9; 5.5–5.8; 6.2, 6.4, 6.7; 7.1, 7.4, 7.5, 7.7; 8.4, 8.5; 9.4, 9.6.

## [1.2.1] - 2026-11-15

### Módosítva
- Címek a könyv szóhasználatához igazítva: 2.6 „Véges és végtelen analízis”, 3.1 „Alsó és felső egész”, 3.4 „A „mod” bináris művelet”. A hash-azonosítók változatlanok.

## [1.2.0] - 2026-11-15

### Hozzáadva
- PWA: `manifest.webmanifest`, ikonok (192, 512, maszkolható, Apple touch), `sw.js` service worker; telepíthető, offline is megnyílik. A külső erőforrásokat (MathJax, betűtípusok) futás közben gyorsítótárazza.
- „Telepítés” gomb a főoldalon, ha a böngésző felajánlja a telepítést.

### Módosítva
- A főoldali háttér: a szimbólum-oszlopok helyett lassan (5–12 px/s) lehulló, egész képletek; kisebb forgalom, jobb olvashatóság.

## [1.1.0] - 2026-11-15

### Hozzáadva
- Főoldali hero: forgatható 3D összefüggés-gráf (10 fejezeti hub, 50 téma, a 10.1 térkép 13 kapcsolata); húzásra forog, kattintásra az adott fejezetre vagy témára ugrik.
- Verziószám az oldalsáv alján (`VERSION` fájl, `APP_VERSION`).

### Módosítva
- A főoldali hero a Pascal-háromszög helyett a 3D gráfot mutatja.

## [1.0.0] - 2026-11-15

### Hozzáadva
- 9 fejezet a *Concrete Mathematics* nyomán, saját szöveggel: rekurziók, összegek, egészrész-függvények, számelmélet, binomiális együtthatók, speciális számok, generátorfüggvények, diszkrét valószínűség, aszimptotika.
- 10.1 „A kötet térképe”: összegző rész saját szerkesztésben (13 fejezetközi kapcsolat, H_n öt helyen, eszköztár-táblázat).
- Fejezetenként 10 eredeti feladat teljes megoldással és „Ellenőrzés” sorral; összesen 247 megoldott feladat.
- Interaktív ábrák és kísérletek minden témához, BigInt/racionális pontos számolással.
- Tervezési rendszer: fejezetenkénti színek, világos és sötét téma, mobil elrendezés.
- Oldalsáv fejezetchipekkel, fa-vonallal és számozással.
- Főoldal: 3D forgó logó, Pascal-háromszög (mod 2/3/4/5/7), futó képletsáv, élő fejezetkártyák, „Véletlen oldal” gomb.
- Matematikai eső a főoldal hátterén (csökkentett mozgásnál álló kép, rejtett lapon leáll).
- Hash-alapú útválasztás: `#téma-oldal` és `#fejezet-N`.
