# Changelog

All notable changes are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned
- Persistent storage via Claude artifact storage API
- Spell duration tracking with auto-decrement on End Turn
- Persistent damage end-of-turn reminders
- Unit tests for combat reducer
- TypeScript migration

---

## [0.6.0] — Refactored Tracker (`pf2e-tracker-refactored.jsx`)

### Changed
- Introduced `CombatShell` wrapper component — shared header, info drawer, panels, and end-turn bar used by both classes
- Extracted `ChampionPanels` and `RoguePanels` as standalone components
- Added `SharedSetupFields` to eliminate duplicated setup UI between classes
- Introduced `SF` style factory object — centralises repeated inline style patterns
- Replaced hardcoded background options with a `BACKGROUNDS` data object (Emissary, Tinker, Herbalist)
- Reducer renamed `pushLog` (was `addLog`) for clarity
- `mkDefaultCfg(charClass)` factory replaces separate `DEFAULT_CHAMP` / `DEFAULT_ROGUE` constants

### Fixed
- Spell slot levels coerced to numbers on `INIT_SLOTS` dispatch (was string keys from `Object.entries`)

---

## [0.5.0] — Combined Tracker (`pf2e-tracker.jsx`)

### Added
- **Rogue class** — full combat screen alongside Champion
- Goblin ancestry with 6 heritage options (Charhide, Irongut, Razortooth, Snow, Unbreakable, Treedweller)
- 4 Rackets: Thief, Ruffian, Scoundrel, Mastermind — each with key attribute and mechanical note
- Sneak Attack dice tracker (scales 1d6 → 4d6 by level)
- Off-Guard target toggle
- Debilitating Strike panel (unlocks at level 9)
- Surprise Attack round-1 banner
- Goblin Scuttle reaction reminder
- Shared `reducer` function handling both classes via same action types
- `SHARED_CONDITIONS`, `SHARED_COMBAT`, `MAP_OPTS` exported constants

### Changed
- Setup screen now includes class selector (Champion vs Rogue)
- Background selection moved to setup screen for both classes

---

## [0.4.0] — Champion Final (`pf2e-champion-final.jsx`)

### Added
- Dying and Wounded condition tracking with recovery DC display
- Wounded correctly increments on heal-from-dying
- Temp HP absorption in damage pipeline
- Shield hardness applied before temp HP in damage order
- Spell slot tracking (multiclass, levels 1–4) with pip UI
- Notes / spell durations free-text field
- Activity log expanded to 14 entries
- `combatReducer` — full reducer replacing scattered `useState` calls

### Changed
- Setup screen now persists config; returning to setup no longer resets character
- `mkCombatState(cfg)` factory initialises all combat state from config

---

## [0.3.0] — Champion v2 (`pf2e-champion-v2.jsx`)

### Added
- HP tracking with animated colour-coded bar (green → orange → red)
- Quick damage / heal adjust rows with GO button
- Shield management panel — hardness, HP bar, broken threshold indicator
- Dying / Wounded pip trackers
- Conditions panel — toggle any condition, severity ±1 for Frightened/Enfeebled/etc.
- Frightened auto-decrements by 1 on End Turn
- Focus points panel with Refocus button
- Hero Points pips in header
- MAP tracker (No Penalty / −5 / −10) with auto-advance on Strike
- Setup screen before combat begins

### Changed
- Cause selector moved to setup screen
- `prompt()` used for Temp HP input (known issue — see TODO)

---

## [0.2.0] — Champion (`pf2e-champion.jsx`)

### Added
- All 7 Causes with reaction name, trigger, and effect text
- Champion's Reaction button — one-use per turn, logs action
- Generic Reaction toggle
- Aura on/off toggle
- Focus Points with USE button and max-focus expander
- MAP tracker
- Action tabs: Actions / Reactions / Info
- Info tab with cause card, Emissary background, Versatile Human heritage
- Editable character name (tap header to edit)

### Changed
- Actions grouped by category (Combat / Divine / Emissary) with colour-coded left border

---

## [0.1.0] — Action Tracker (`pf2e-actions.jsx`)

### Added
- 3 action dots with tap-to-toggle
- Reaction dot and Free Action indicator
- Common Activities grid (18 actions with action cost chips)
- Reactions grid (6 reactions)
- End Turn resets actions and reaction, increments round counter
- New Encounter clears all state
- Activity log (last 8 entries)
- Cinzel / Cinzel Decorative Google Fonts
- Dark parchment background with subtle cross-hatch texture
