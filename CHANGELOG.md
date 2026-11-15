# Változásnapló

Minden jelentős változás ebben a fájlban szerepel.
A formátum a [Keep a Changelog](https://keepachangelog.com/hu/1.1.0/) szerinti,
a verziózás a [Szemantikus verziózás 2.0.0](https://semver.org/lang/hu/) szerinti.
A publikus interfész az oldalak hash-útvonala (`#téma-oldal`, `#fejezet-N`).

## [Unreleased]

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
