# Contributing

Thanks for your interest in contributing! This is a personal project but PRs and issues are welcome.

---

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/pf2e-tracker.git
cd pf2e-tracker
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Project Structure

```
src/
├── main.jsx                      # Entry point
├── pf2e-tracker-refactored.jsx   # Current main source (start here)
├── pf2e-actions.jsx              # v1 — archived
├── pf2e-champion.jsx             # v2 — archived
├── pf2e-champion-v2.jsx          # v3 — archived
├── pf2e-champion-final.jsx       # v4 — archived
└── pf2e-tracker.jsx              # v5 — archived
```

All active development happens in `pf2e-tracker-refactored.jsx`.
The archived files are kept for reference and historical context.

---

## Adding a New Class

The cleanest way to add a class is to follow the pattern established by `ChampionPanels` and `RoguePanels` in the refactored file.

### 1. Add data constants

At the top of the file (or in `src/data/` if you've split it out), define:

```js
export const YOUR_CLASS_ACTIONS = [
  { name: "Action Name", cost: 1, icon: "⚔️" },
  // cost: 0 = free action, 1/2/3 = action cost
  // isStrike: true  → auto-advances MAP
  // isFocus: true   → consumes a focus point
  // isRaise: true   → sets shieldUp = true
];

export const YOUR_CLASS_REACTIONS = [
  { name: "Reaction Name", icon: "⚡", note: "Optional note" },
];
```

### 2. Add a config default

```js
export function mkDefaultCfg(charClass) {
  // add your class to the switch
  if (charClass === "yourclass") {
    return {
      ...base,
      uniqueProp: defaultValue,
    };
  }
}
```

### 3. Create a panels component

```jsx
function YourClassPanels({ state, dispatch, cfg }) {
  const [tab, setTab] = useState("combat");
  const left = 3 - state.acts;

  return (
    <>
      {/* Class-specific UI — unique resource trackers, etc. */}

      {/* Action tabs */}
      <div>
        <TabBar
          tabs={[["combat","COMBAT"],["class","CLASS"],["reactions","REACTIONS"]]}
          active={tab}
          onChange={setTab}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          {tab === "combat"    && SHARED_COMBAT.map(a => <ActionChip ... />)}
          {tab === "class"     && YOUR_CLASS_ACTIONS.map(a => <ActionChip ... />)}
          {tab === "reactions" && YOUR_CLASS_REACTIONS.map(r => <ReactionChip ... />)}
        </div>
      </div>
    </>
  );
}
```

### 4. Create a combat component

```jsx
function YourClassCombat({ cfg, onSettings }) {
  const [state, dispatch] = useReducer(reducer, null, () => mkState(cfg));

  return (
    <CombatShell
      cfg={cfg}
      accentColor="#yourcolor"
      subtitle="YOUR CLASS · ANCESTRY"
      infoContent={<>...</>}
      state={state}
      dispatch={dispatch}
    >
      <YourClassPanels state={state} dispatch={dispatch} cfg={cfg} />
    </CombatShell>
  );
}
```

### 5. Wire up setup and root

Add your class to `SetupScreen`'s class picker, create a `YourClassSetupFields` component, and add a branch in the root `App` component:

```jsx
if (cfg.charClass === "yourclass") return <YourClassCombat cfg={cfg} onSettings={() => setCfg(null)} />;
```

### 6. Add reducer cases if needed

If your class needs unique state (e.g. rage rounds, ki points, hunt prey target), add new action types to the reducer. Keep them alongside existing patterns — `SET_X`, `TOGGLE_X`, `USE_X`.

---

## Reducer Conventions

| Action type prefix | Meaning |
|---|---|
| `SET_X` | Set a value directly (usually from a stepper) |
| `TOGGLE_X` | Flip a boolean |
| `USE_X` | Consume a resource (focus, slot, reaction) |
| `ADJ_X` | Adjust a numeric value by a delta |

All reducer cases should return a new state object — never mutate `state` directly.

---

## Code Style

- Inline styles only (keeps components portable as Claude artifacts)
- No external UI libraries
- Keep component files self-contained — data, reducer, and components in one file until the codebase grows enough to split
- Prefer `useReducer` over scattered `useState` for combat state

---

## Running Tests

```bash
npm test
```

Tests live in `src/__tests__/`. See `reducer.test.js` for examples of how the reducer is tested.

---

## Submitting a PR

1. Fork the repo and create a branch: `git checkout -b feat/ranger-class`
2. Make your changes
3. Run `npm test` and `npm run build` — both must pass
4. Open a PR with a short description of what changed and why
