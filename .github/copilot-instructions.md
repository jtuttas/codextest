# Copilot Instructions – Simple Vanilla Web App

> **Ziel:** Dieses Repository enthält eine *einfache, rein clientseitige Webanwendung* (Vanilla HTML/CSS/JS), die **ohne Build‑Schritt** direkt im Browser läuft, indem man `index.html` öffnet. Diese Datei steuert, wie GitHub Copilot (Chat/Agent/Workspace/Inline) Code generiert und ändert.

---

## 1) Projektüberblick
- **Produkt:** Kleine Web-App als Single Page (optional modulare Unterseiten per Hash‑Routing), z. B. eine Mini‑To‑do‑Liste, Notiz-App oder kleine Datenansicht mit lokalem Storage.
- **Laufzeit:** Reines Frontend, keine Server- oder Backend‑Abhängigkeit.
- **Start:** Öffnen von `index.html` im Browser soll *sofort* funktionieren (auch via Doppelklick/Datei‑URL).
- **Kompatibilität:** Moderne Browser (letzte 2 Versionen von Chrome, Edge, Firefox, Safari). Kein IE‑Support.

## 2) Nicht-Ziele
- Keine Bundler/Build-Tools (kein Vite/Webpack/Parcel, kein Transpile‑Schritt).
- Keine Frameworks (kein React/Vue/Angular/Svelte), keine UI-Bibliotheken, außer minimalistischem, lokal eingebundenem CSS.
- Keine externen Netzwerkanfragen, außer ausdrücklich angefordert (z. B. Fetch zu einer öffentlichen, CORS‑fähigen API) und dann optional abgeschaltet per Flag.

## 3) Verzeichnis- & Dateistruktur
Copilot soll die folgende Struktur anlegen/erhalten und respektieren:
```
/ (Projektwurzel)
├─ index.html          # Einstiegspunkt – enthält minimale App‑Shell
├─ /assets/            # Bilder/Fonts/Icons (lokal, relative Pfade)
│  ├─ icons/
│  └─ img/
├─ /css/
│  └─ styles.css       # globales, modulares CSS (BEM‑Stil bevorzugt)
└─ /js/
   ├─ main.js          # App‑Bootstrap, Event‑Wiring
   ├─ router.js        # (Optional) Hash‑Router für einfache Views
   ├─ storage.js       # Wrapper um localStorage
   └─ ui/
      ├─ dom.js        # DOM‑Hilfsfunktionen (qs, qsa, el, etc.)
      └─ components/   # kleine, wiederverwendbare View‑Funktionen
```
> **Wichtig:** Alle Pfade müssen **relativ** sein, damit `file://`‑Starts funktionieren.

## 4) HTML‑Richtlinien
- Semantisches HTML5 (header/main/footer/section/nav/article etc.).
- Responsives `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Eine klare Root‑Container‑Struktur mit `id="app"`.
- Meta‑Tags: `charset="utf-8"`, `viewport`, verständlicher `title`.
- Barrierefreiheit: sinnvolle ARIA‑Attribute, Labels für Inputs, Fokus-Reihenfolge beachten.
- Keine Inline‑Skripte; `<script type="module" src="./js/main.js">` **am Ende** von `body`.

## 5) CSS‑Richtlinien
- Eine Datei `css/styles.css`. Struktur nach BEM (Block__Element--Modifier) oder Utility‑First light (nur eigene Utilities).
- Responsives Layout (Mobile‑First), nutze Flexbox/Grid.
- Klare Farb- und Spacing‑Skala als CSS‑Variablen (`:root { --space-1: 4px; ... }`).
- Fokus‑Styles sichtbar, ausreichend Kontrast (WCAG AA anstreben).

## 6) JavaScript‑Richtlinien (ES2023+ ohne Build)
- Modul‑Syntax (`type="module"`).
- Keine globalen Variablen; export/import konsequent nutzen.
- Strikte Trennung:
  - **State/Logik:** in `storage.js` (Persistenz) und dedizierten Modulen.
  - **UI/DOM:** in `ui/*` und klaren, reinen Render‑Funktionen (geben Elemente zurück oder patchen Container).
- Fehlerbehandlung: try/catch bei Storage/Parsing, defensive DOM‑Zugriffe.
- Keine eval/Function‑Konstruktoren, kein Zugriff auf gefährliche APIs.
- **Performance:** Event‑Delegation, Reflows minimieren, kleine DOM‑Updates batchen.

## 7) Routing (optional)
- Wenn mehrere Views: Hash‑Routing (z. B. `#/home`, `#/about`).
- `router.js` exportiert `initRouter({ routes })` und aktualisiert `#app` bei `hashchange`.

## 8) Persistenz
- `storage.js` kapselt `localStorage` mit Namespacing (z. B. `app:`‑Prefix), JSON‑Parsing/‑Stringify mit Fallbacks.

## 9) Internationalisierung (leichtgewichtig, optional)
- Einfache Wörterbuch‑Map in JS (`lang/en.js`, `lang/de.js`) und eine `t(key)`‑Funktion; Sprache per `navigator.language` oder UI‑Umschalter.

## 10) Sicherheit & Datenschutz
- Keine sensiblen Daten speichern.
- Bei externer API: CORS prüfen, Zeitouts/Fehler behandeln, keine Secrets im Client.
- Content Security Policy ist optional (nicht notwendig für `file://`), aber Inline‑Skripte bleiben untersagt.

## 11) Tests (leicht)
- Smoke‑Tests manuell: App lädt fehlerfrei (Konsole leer), grundlegende Interaktionen funktionieren.
- Optional: Kleine, eingebettete Testseite `tests/manual.html` mit UI‑Checkliste.

## 12) Definition of Done (DoD)
- Öffnen von `index.html` startet die App ohne Fehler/Warnings in der Konsole.
- Keine 404 auf relative Assets.
- Keyboard‑Bedienung möglich; Fokus sichtbar.
- Core‑Use‑Case funktioniert und bleibt nach Reload erhalten (falls Persistenz vorgesehen).
- Code ist modular, gut benannt, kommentiert (JSDoc light).

## 13) Code‑Stil & Qualität
- Klare Benennung: Verben für Funktionen, Substantive für Komponenten/DOM‑IDs.
- Kurze, reine Funktionen; Single Responsibility.
- Kommentare knapp, aber erklärend *warum*, nicht *was*.
- PR‑Beschreibungen: Problem → Lösung → Tests → Screenshots/GIFs.

## 14) Commits & Branching
- Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`, `chore:`).
- Kleine, thematisch geschlossene Commits.

## 15) Aufgaben für Copilot (Beispiele)
Copilot soll diese Aufgaben in der Reihenfolge erledigen können:
1. **Scaffold erstellen**: Ordnerstruktur, leere Dateien anlegen.
2. **`index.html`**: Semantische Grundstruktur, `#app`‑Container, Verlinkung auf `css/styles.css` und `js/main.js` (type="module").
3. **`css/styles.css`**: Reset (nur das Nötigste), Variablen, Basis‑Typographie, Layout‑Hilfen, Fokus‑Styles.
4. **`js/ui/dom.js`**: Hilfsfunktionen (`qs`, `qsa`, `el`, `on`, `off`, `render`), sicher und dokumentiert.
5. **`js/storage.js`**: `get(key)`, `set(key, value)`, `remove(key)`, `clear(ns?)` mit Fehlerbehandlung.
6. **Minimal‑Feature** (z. B. To‑do):
   - Eingabefeld + Button
   - Liste mit Items (Add/Delete/Toggle)
   - Persistenz über `localStorage`
7. **(Optional) `router.js`**: Hash‑Routing mit Routen‑Map `{ path: '#/home', view: renderHome }`.
8. **Barrierefreiheit**: Beschriftungen, Rollen, Tastatur‑Navigation, Kontrast prüfen.
9. **Feinschliff**: Leichte Transitions, responsive Breakpoints, leere Zustände.

## 16) Beispiel‑Snippets (von Copilot zu erzeugen)

### 16.1 `index.html` (Mindestanforderung)
```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Einfache Web-App</title>
  <link rel="stylesheet" href="./css/styles.css" />
</head>
<body>
  <header class="site-header" role="banner">
    <h1 class="site-title">Einfache Web-App</h1>
  </header>
  <main id="app" class="app" role="main" tabindex="-1">
    <!-- App-Inhalt wird von JS gerendert -->
  </main>
  <footer class="site-footer" role="contentinfo">
    <small>&copy; <span id="year"></span></small>
  </footer>
  <script type="module" src="./js/main.js"></script>
</body>
</html>
```

### 16.2 `js/main.js`
```js
import { qs } from './ui/dom.js';

function init() {
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  // TODO: App-Startlogik (Render der Start-View)
}

document.addEventListener('DOMContentLoaded', init);
```

### 16.3 `js/ui/dom.js`
```js
/** Query single element */
export const qs = (sel, ctx = document) => ctx.querySelector(sel);
/** Create element with optional props/children */
export const el = (tag, props = {}, ...children) => {
  const node = Object.assign(document.createElement(tag), props);
  for (const c of children.flat()) node.append(c.nodeType ? c : document.createTextNode(c));
  return node;
};
/** Event helper */
export const on = (target, type, handler, opts) => target.addEventListener(type, handler, opts);
export const off = (target, type, handler, opts) => target.removeEventListener(type, handler, opts);
```

### 16.4 `js/storage.js`
```js
const NS = 'app:';
export const get = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
};
export const set = (key, value) => {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
    return true;
  } catch (_) {
    return false;
  }
};
export const remove = (key) => localStorage.removeItem(NS + key);
export const clear = () => Object.keys(localStorage)
  .filter(k => k.startsWith(NS))
  .forEach(k => localStorage.removeItem(k));
```

## 17) Qualitäts-Checkliste für Copilot
- [ ] `index.html` lädt ohne Fehler per Datei‑URL.
- [ ] Alle Imports sind **relative** und korrekt.
- [ ] Keine externen CDN‑Abhängigkeiten notwendig.
- [ ] Keyboard‑Navigation möglich; `tabindex="-1"` am Main‑Container.
- [ ] Lesbarer, konsistenter Code; sinnvolle Kommentare (JSDoc light).
- [ ] Core‑Feature funktioniert; Zustand bleibt (falls Persistenz).

## 18) Wie Copilot Änderungen vornehmen soll
- Bei Änderungen an einer Datei ggf. betroffene Module/Imports in PR-Beschreibung nennen.
- Bei neuen Funktionen Tests/Manualliste ergänzen.
- Breaking Changes vermeiden; wenn unvermeidbar, klar dokumentieren.

---

**Kurzfassung für Copilot:**
> Erzeuge/erhalte eine minimalistische Vanilla‑Web‑App ohne Build‑Schritt. Nutze semantisches HTML, modulare ES‑Module, responsives CSS, und lokale Persistenz via `localStorage`. Alle Pfade relativ, damit `index.html` direkt per Doppelklick funktioniert. Achte auf Barrierefreiheit, kleine, klare Module und saubere Fehlerbehandlung.

