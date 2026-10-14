# Tetrapadats

A lightweight, custom-built HTML5 Canvas game engine powering a guideline-compliant block-stacking game. Built from scratch with a stack-based state machine, direct input routing, and millisecond-accurate timing.

---

## The Engine

At the core of the project is a custom, zero-dependency 2D Canvas engine (`Engine`) that handles game states, input, and screen scaling:

- **Stack-Based State Machine:** Screen states (`Menu`, `Play`, `Ready`, `Pause`, `Finish`, `Settings`) are pushed and popped on a central stack, allowing easy overlays and state transitions.
- **Unified Central Screen Metrics:** The engine calculates viewport numbers (`w`, `h`, `mid_x`, `mid_y`, `tile_size`) centrally. On window resize, grid tiles snap to integer values, so board cells render sharp and seamless *(note: Integer snapping applies to grid tiles and layout math, not vector text. Additionally, integer snapping only applies to displays with 1.00 DPR.)*
- **Direct Input Handling:** Tracks key states, mouse motion, and clicks, passing raw timestamps to active screen state handlers.
- **DES rAF Game Loop:** Uses Discrete Event Simulation, reacting to action inputs and dynamic frame rendering (`requestAnimationFrame`).

---

## Game Features & Modes

Built on top of the engine is a full block-stacking core with standard guideline mechanics and multiple game modes:

### Game Modes
- **Marathon:** Endless play under increasing speeds.
- **Sprint:** Clear 40 lines as fast as possible.
- **Blitz:** Score as many points as possible in 2 minutes.
- **Classic:** Old-school ruleset with no kicks, hold pieces, or queue previews.
- **Cheese:** Downstacking practice against randomized garbage.
- **Finesse:** Finesse practice for keypress optimization.
- **4-Wide:** Center-well 4-wide combo practice.

### Guideline Features
- **Super Rotation System (SRS):** Full standard rotation and kicks for all pieces.
- **180° Flips:** Dedicated 180-degree rotation support, with minimal kicks.
- **T-Spin Detection:** Accurately awards T-Spin Mini, T-Spin Single, Double, and Triple clears.
- **Scoring System:** Includes Back-to-Back clear multipliers, combo scaling, and Perfect Clear bonuses.

---

## Controls & Handling

### Default Keybindings

| Action | Default Key |
| :--- | :--- |
| **Move Left** | `Left` |
| **Move Right** | `Right` |
| **Soft Drop** | `Down` |
| **Hard Drop** | `Up` |
| **Rotate CW** | `C` |
| **Rotate CCW** | `X` |
| **Rotate 180°** | `Z` |
| **Hold Piece** | `V` |
| **Reset / Try Again** | `R` |
| **Quit / Pause** | `Escape` |

### Default Handling Parameters

| Parameter | Default Value | Unit | Description |
| :--- | :--- | :--- | :--- |
| **DAS** (Delayed Auto Shift) | `150` | ms | Delay before auto-repeat kicks in when holding a direction key |
| **ARR** (Auto Repeat Rate) | `30` | ms / tile | Interval between subsequent tile moves (`0` = instant shift) |
| **SDF** (Soft Drop Factor) | `20` | multiplier | Gravity multiplier during soft drop (`0` = instant drop) |

---

## Getting Started

No build tools or package managers required.

- **Live Web Client:** Visit [https://akijt.github.io/tetrapadatsJS/](https://akijt.github.io/tetrapadatsJS/) to play in you browser, no installation required.
- **Local Setup:**
1. Clone the repository:
   ```bash
   git clone https://github.com/akijt/tetrapadatsJS.git
   ```
2. Open `index.html` directly in any modern web browser.

---

## Architecture Overview

```
├── index.html        # Canvas container and script loading order
├── engine.js         # Core Engine and Screen base classes
├── tetra.js          # Tetrapadats core holding game state and update logic
├── main.js           # Engine setup and startup code
├── menu.js           # Mode selection
├── play.js           # Gameplay
├── ready.js          # Countdown overlay
├── pause.js          # Pause overlay
├── finish.js         # End-game summary
└── settings.js       # Controls and handling customization
```

---

## Roadmap & To-Do

- [x] **In-Game Customization UI:** Add menu screen for keybinding remapping and live adjustment of handling settings (DAS, ARR, SDF).
- [x] **Discrete Event Simulation:** Implement DES architecture to ensure the game acts deterministically, enabling game replays.
- [x] **Engine Text Input System:** Finish the built-in `text_buffer` listener to support text input fields for player profiles and high score entries.
- [ ] **Cheese Mode Win Condition:** Implement a target cleared-garbage counter so Cheese mode functions as a winnable time attack.
- [ ] **Finesse Mode Win Condition:** Implement a timer so Finesse mode functions as a sprint competing for most pieces.
- [x] **Classic Mode Gravity:** Validate Classic mode gravity to better reflect traditional speeds.
- [x] **Pixel Snapping:** Scale canvas resolution by DPR and adjust stroke offsets to eliminate anti-aliasing blur on all displays. *Validated for 1.00 DPR, but abandoned other ratios.*
- [ ] **Inputs on Mobile:** Make gameplay possible when accessed from a touchscreen device.
- [ ] **Server Autoritative Model:** Host and communicate with a server that validates gameplay.
- [ ] **Database:** Enable record keeping with a database, storing game config and scores.
- [x] **Screen Class Update:** Overhaul Screen class to work as a singly linked list with each managing it's own static layers.