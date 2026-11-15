# Változásnapló

Minden jelentős változás ebben a fájlban szerepel.
A formátum a [Keep a Changelog](https://keepachangelog.com/hu/1.1.0/) szerinti,
a verziózás a [Szemantikus verziózás 2.0.0](https://semver.org/lang/hu/) szerinti.
A publikus interfész az oldalak hash-útvonala (`#téma-oldal`, `#fejezet-N`).

## [Unreleased]

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
