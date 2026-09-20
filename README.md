# Todo-App — Hausübung 1 (Stufe C)

Eine komponentenbasierte Todo-App mit Vite, Vue 3 (`<script setup>`) und TypeScript.
Todos lassen sich anlegen, abhaken, löschen und filtern; sie überleben einen Reload.

LV Next Generation Web Frontends

## Setup

Voraussetzung: Node `^22.18.0` oder `>=24.12.0`.

```sh
npm install
npm run dev
```

Der Dev-Server läuft danach auf <http://localhost:5173>.

Weitere Skripte:

```sh
npm run build        # Typecheck + Produktions-Build nach dist/
npm run type-check   # nur vue-tsc
npm run preview      # Produktions-Build lokal ausliefern
```

## Funktionsumfang

- Todo mit Titel und Beschreibung anlegen
- Todo per Checkbox als erledigt markieren
- Todo löschen
- Filter: Alle / Offen / Erledigt
- Persistenz im `localStorage` — Todos überleben einen Reload
- Responsives Layout

## Projektstruktur

```
src/
├── App.vue                     Seitengerüst: Header, Main, Footer
├── assets/main.css             Design Tokens, Base- und Component-Layer
├── components/
│   ├── layout/                 Header.vue, Footer.vue
│   ├── todo-list/
│   │   ├── TodoApp.vue         State und Logik (nutzt useTodos)
│   │   ├── TodoList.vue        rendert die Liste, Filter und Anlege-Formular
│   │   ├── TodoListItem.vue    ein einzelnes Todo
│   │   └── types.ts            TodoItem, FilterValues
│   └── component-lib/          wiederverwendbare Bausteine
│       ├── CheckboxComponent.vue / CheckboxTypes.ts
│       └── SelectComponent.vue  / SelectTypes.ts
└── composables/useTodos.ts     State und Persistenz
```

## Komponentenstruktur

`TodoApp.vue` ist die einzige Komponente, die Zustand besitzt — sie bindet `useTodos()`
ein und gibt die Todos nach unten weiter. `TodoList.vue` rendert nur: Sie bekommt die
Liste als Prop und meldet Änderungen als Events (`create:todo`, `toggle:accomplished`,
`delete:todo`) nach oben, `TodoListItem.vue` kennt lediglich sein eigenes Todo.
`CheckboxComponent.vue` und `SelectComponent.vue` kennen die Domäne gar nicht mehr und
sind dadurch überall wiederverwendbar. So gibt es genau eine Stelle, an der sich der
Zustand ändern kann. Einzige Ausnahme ist der aktive Filter: Er liegt in `TodoList.vue`,
weil er keine Daten verändert, sondern nur die Darstellung.

## Technische Notizen

- **Persistenz:** `useTodos()` kapselt Laden, Ändern und Speichern. Ein `watch` mit
  `{ deep: true }` schreibt jede Änderung in den `localStorage` — die Komponenten wissen
  nichts vom Speicher.
- **Styling:** Farben liegen als CSS Custom Properties in `src/assets/main.css`, in zwei
  Ebenen: rohe Palette (`--color-ink-*`) und semantische Tokens (`--color-surface`,
  `--color-fg`). Komponenten nutzen nur die semantische Ebene.
- **Responsive:** mobil zuerst, Anpassungen am `sm`-Breakpoint (Außenabstände, Formular
  ein- statt zweispaltig, Filter volle Breite).
- **TypeScript:** `TodoItem` als geteilter Typ, Props und Emits typbasiert deklariert,
  Filter als Union-Typ `'all' | 'open' | 'done'`.

## Hinweis zur Verwendung von KI

Das Tailwind-Theme in `src/assets/main.css` sowie diese Dokumentation sind mit
Unterstützung von Claude Code (Anthropic) entstanden.
