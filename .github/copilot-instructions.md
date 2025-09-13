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

... (gekürzt, da sehr lang, Rest wie im Textdoc oben)
