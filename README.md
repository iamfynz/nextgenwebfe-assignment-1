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

## Decision Log

### Warum diese Komponentenaufteilung

Die App ist entlang der Frage geschnitten, *wie viel eine Komponente wissen muss*.
`TodoApp.vue` ist die einzige Komponente, die den Zustand besitzt: Sie bindet
`useTodos()` ein und gibt die Todos nach unten weiter. `TodoList.vue` rendert nur —
sie bekommt die Liste als Prop und meldet Absichten als Events (`create:todo`,
`toggle:accomplished`, `delete:todo`) nach oben, ohne selbst etwas zu verändern.
`TodoListItem.vue` kennt lediglich sein eigenes Todo, und `CheckboxComponent.vue`
sowie `SelectComponent.vue` kennen die Domäne gar nicht mehr und wären in jedem
anderen Projekt einsetzbar. Dadurch gibt es genau eine Stelle, an der sich der
Zustand ändern kann, und die Bausteine darunter bleiben austauschbar.

Eine Ausnahme ist bewusst gesetzt: Der aktive Filter lebt in `TodoList.vue`, nicht
in `TodoApp.vue`. Er verändert keine Daten, sondern nur die Darstellung — und
Zustand gehört dorthin, wo er gebraucht wird.

### Persistenz im Composable

`useTodos()` kapselt Laden, Ändern und Speichern an einem Ort. `TodoApp.vue` ruft
`createTodoItem`, `removeTodo` und `checkTodoItem` auf und weiß nicht, dass dahinter
ein `localStorage` steht — der Speicher ließe sich gegen ein Backend tauschen, ohne
eine einzige Komponente anzufassen.

### CSS Custom Properties und responsives Layout

Farben, Schatten und Easing liegen als CSS Custom Properties in
`src/assets/main.css`, in zwei Ebenen: zuerst die rohe Palette (`--color-brand-*`,
`--color-ink-*`), darüber semantische Tokens wie `--color-surface`, `--color-fg-muted`
oder `--color-line`. Die Komponenten verwenden ausschließlich die semantische Ebene —
eine Komponente sagt `bg-surface`, nicht `bg-ink-50`. Eine Farbänderung ist dadurch ein
Eingriff an einer Variable statt an jeder Komponente, die die Farbe benutzt.
Wiederkehrende Muster liegen als Komponentenklassen im `@layer components`
(`.btn`, `.btn-primary`, `.btn-danger`), damit ein Button nicht an jeder Stelle aus
einem Dutzend Utilities neu zusammengesetzt wird.

Das Layout ist mobil zuerst gedacht und wächst am `sm`-Breakpoint: schmalere
Außenabstände am Telefon, das Anlege-Formular einspaltig statt zweispaltig, der Filter
über die volle Breite statt rechtsbündig begrenzt. In der Todo-Zeile darf der Textblock
schrumpfen (`min-w-0`), während Checkbox und Löschbutton ihre Größe behalten — sonst
würden lange Titel die Bedienelemente aus der Karte drängen.

### TypeScript

`TodoItem` ist als eigener Typ in `types.ts` definiert und wird von Composable und
Komponenten geteilt. Props und Emits sind durchgängig typbasiert deklariert
(`defineProps<Props>()`, `defineEmits<Emits>()`), sodass falsche Aufrufe schon beim
Typecheck auffallen. Der Filter nutzt einen Union-Typ `FilterValues = 'all' | 'open' |
'done'` statt eines freien Strings, damit ein Tippfehler kein still ignorierter Zustand
werden kann.
