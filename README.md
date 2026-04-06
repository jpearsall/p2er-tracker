# PF2e Combat Tracker

A mobile-optimised **Pathfinder 2e Remastered** combat tracker built as React artifacts for Claude.ai. Tracks actions, HP, conditions, spells, and class-specific features for Champion and Rogue characters.

---

## Features

- **3-action economy** — tap to toggle action dots, auto-tracks MAP on Strikes
- **HP tracking** — quick damage/heal adjust, temp HP, colour-coded health bar
- **Dying & Wounded** — full PF2e dying/wounded rules with recovery DC display
- **Conditions** — toggle any condition; severity tracking for Frightened, Enfeebled, Slowed, etc.
- **Champion class**
  - All 7 Causes (Justice, Liberation, Redemption, Obedience, Desecration, Iniquity, Grandeur)
  - Champion's Reaction with trigger/effect detail panel
  - Aura toggle (suppress/resume)
  - Shield management (hardness, HP, broken threshold, Shield Block)
  - Focus points + Lay on Hands
- **Rogue class**
  - 4 Rackets (Thief, Ruffian, Scoundrel, Mastermind)
  - 6 Goblin Heritages
  - Sneak Attack dice tracker
  - Off-Guard target tracking
  - Debilitating Strike (level 9+)
  - Surprise Attack round-1 reminder
  - Goblin Scuttle reaction reminder
- **Multiclass spell slots** — optional slot tracking (levels 1–4)
- **Backgrounds** — Emissary, Tinker, Herbalist
- **Activity log** — last 14 actions with round markers
- **Notes field** — for active spells, enemy info, reminders

---

## File History

The project evolved iteratively across six files:

| File | Description |
|---|---|
| `pf2e-actions.jsx` | Original prototype — action tracker only, no HP |
| `pf2e-champion.jsx` | First full Champion tracker with cause/reaction/focus |
| `pf2e-champion-v2.jsx` | Added HP, shield, conditions, setup screen |
| `pf2e-champion-final.jsx` | Introduced `useReducer`, clean panel components |
| `pf2e-tracker.jsx` | Added full Rogue class alongside Champion |
| `pf2e-tracker-refactored.jsx` | Architecture cleanup — `CombatShell`, style factory, shared fields |

**The recommended starting point for further development is `pf2e-tracker-refactored.jsx`.**

---

## Usage

These files are designed to run as **React artifacts in Claude.ai**. Paste any `.jsx` file into a Claude artifact to run it directly — no build step required.

### Running locally

If you want to run outside Claude.ai:

```bash
npm install
npm run dev
```

Requires Node 18+ and the dependencies listed in `package.json`.

---

## Tech Stack

- **React 18** (hooks: `useState`, `useReducer`, `useEffect`)
- **Tailwind** — not used; all styles are inline for artifact portability
- **Cinzel / Cinzel Decorative** — Google Fonts (loaded via `@import` in component)
- No external UI libraries

---

## Architecture (refactored version)

```
App
└── SetupScreen           ← character config (class, level, cause/racket, HP, shield, slots)
    └── SharedSetupFields
    └── ChampionSetupFields | RogueSetupFields

└── ChampionCombat | RogueCombat
    └── CombatShell       ← header, info drawer, shared panels, end turn bar
        ├── HPPanel
        ├── ShieldPanel
        ├── ActionsPanel
        ├── MapPanel
        ├── [ChampionPanels | RoguePanels]  ← class-specific
        ├── ResourcesPanel
        ├── SpellSlotsPanel
        ├── ConditionsPanel
        ├── NotesPanel
        └── LogPanel
```

State is managed with a single `useReducer` / `reducer` function shared across both classes.

---

## Roadmap / Ideas

- [ ] Persistent storage across sessions (localStorage or Claude artifact storage API)
- [ ] Additional classes (Wizard, Barbarian, Ranger, etc.)
- [ ] Enemy HP tracker / initiative order
- [ ] Encounter timer
- [ ] Export/import character config as JSON
- [ ] Dark/light theme toggle

---

## License

MIT — free to use, modify, and distribute.
