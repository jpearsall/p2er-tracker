# TODO

Items are roughly ordered by priority within each section.
✅ = done · 🔧 = in progress · ⬜ = not started

---

## 🐛 Bug Fixes

- ⬜ **Shield Block damage calc** — hardness should reduce damage taken by the *character*, not just absorb overflow from the shield's HP pool. Current logic in `TAKE_DMG` sets `d = action.hard` after absorbing, but the character should take `max(0, damage - hardness)` regardless of shield HP remaining.
- ⬜ **`prompt()` for Temp HP** — `pf2e-champion-v2.jsx` uses a browser `prompt()` call for temp HP input. Replace with an inline stepper consistent with the rest of the UI.
- ⬜ **Focus point max hardcoded** — max focus is fixed at 1–3 pips but should reflect the number of focus spells the character actually knows. Expose as a config field in setup.
- ⬜ **MAP resets on End Turn but not on New Encounter** — verify MAP index clears correctly across both reset paths in all file versions.

---

## ✨ Quality of Life

- ⬜ **Persist config between sessions** — save character config to the Claude artifact storage API (`window.storage`) so setup survives a page refresh. Key: `pf2e:config`.
- ⬜ **Persist combat state** — optionally save mid-combat state (HP, conditions, round) so accidental refreshes don't wipe a session.
- ⬜ **Export / import character JSON** — let users copy a JSON blob to share characters between devices or back them up.
- ⬜ **Undo last action** — single-step undo for the most recent state change (store previous state snapshot alongside current).
- ⬜ **Round counter always visible** — currently only shown in the header. Pin it more prominently, especially on long pages where the header scrolls out of view.
- ⬜ **Haptic feedback on mobile** — call `navigator.vibrate(30)` on action dot tap and End Turn for tactile confirmation.

---

## ⚔️ Gameplay Features

- ⬜ **Spell duration tracking** — notes field is currently free text; add structured spell slots with a name + round countdown that auto-decrements on End Turn.
- ⬜ **Persistent damage reminders** — end-of-turn prompt when the Persistent Damage condition is active, with a "attempt flat check DC 15" reminder and one-tap resolve/continue.
- ⬜ **Custom reactions** — allow players to add a named reaction with a trigger description (covers feats and class abilities not in the hardcoded list).
- ⬜ **Enemy HP scratch pad** — simple panel to track 1–4 enemy HP pools during an encounter without leaving the screen.
- ⬜ **Initiative / turn order** — ordered list of combatants; tap to advance to next turn, which triggers End Turn on the current character automatically.
- ⬜ **Encounter XP tracker** — tally creature levels defeated, show XP toward next level per PF2e rules.
- ⬜ **Bulk conditions clear** — one-tap "clear all conditions" for end-of-encounter cleanup.

---

## 🧙 New Classes

Priority order based on mechanical distance from existing code:

- ⬜ **Cleric** — similar to Champion (divine spells, focus spells); add font charges (heal/harm), Channel Smite, deity info
- ⬜ **Wizard / Witch** — spell slot heavy, no shield, arcane/occult spell lists, familiar tracker
- ⬜ **Barbarian** — rage tracker (rounds remaining, temp HP from rage), instinct abilities, no armour restriction reminder
- ⬜ **Ranger** — Hunt Prey target tracking, flurry vs precision edge toggle, animal companion HP (optional)
- ⬜ **Monk** — ki point tracker (same mechanic as focus), stances, Flurry of Blows 2-action strike
- ⬜ **Fighter** — simplest mechanically; useful as a reference "base" class with just actions + reactions + weapon specialisation note

---

## 🏗️ Architecture

- ⬜ **Split reducer into domain slices** — the main `reducer`/`combatReducer` is long; split into `hpReducer`, `actionsReducer`, `conditionsReducer` and combine with a root dispatcher.
- ⬜ **TypeScript** — add a `tsconfig.json` and migrate config objects and reducer actions to typed interfaces. Start with the `cfg` prop shape.
- ⬜ **Prop types** — interim option if not migrating to TS; add `PropTypes` validation to all panel components.
- ⬜ **Reducer unit tests** — the reducer is pure; add Jest or Vitest tests for `TAKE_DMG`, `HEAL`, `END_TURN`, `TOGGLE_COND`, and the dying/wounded interaction.
- ⬜ **Extract data to separate files** — move `CAUSES`, `RACKETS`, `CONDITIONS`, `SHARED_COMBAT`, etc. to `src/data/` so component files aren't 800+ lines.
- ⬜ **Component file split** — move shared panels (HPPanel, ShieldPanel, etc.) to `src/components/` and class panels to `src/classes/`.

---

## 🎨 Design / Accessibility

- ⬜ **Larger tap targets on mobile** — some buttons (condition severity ±, spell slot pips) are 14–18px; increase to minimum 44px touch target per Apple/Google HIG.
- ⬜ **Colour-blind safe palette** — red/green HP colours are not distinguishable for deuteranopia; add a secondary indicator (icon or pattern).
- ⬜ **Reduced motion** — respect `prefers-reduced-motion` for the HP bar transition and action dot scale animations.
- ⬜ **Screen reader labels** — action dot buttons and pip buttons have no `aria-label`; add descriptive labels for assistive tech.

---

## 💡 Ideas / Backlog

These need more thought before committing to them:

- 💭 Party view — multiple characters on one screen (GM mode)
- 💭 QR code share — encode character config as a QR for quick handoff at the table
- 💭 Light theme — the dark parchment aesthetic is intentional, but a high-contrast light mode could help in bright environments
- 💭 Sound effects — optional audio cues (dice roll, shield block clank) via Web Audio API
- 💭 Offline PWA — service worker + manifest so the tracker installs to the home screen and works without a connection
