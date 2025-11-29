# 📐 How to Create a Simple Level in Mario Maker

## Quick Start (2 Minutes)

### Step 1: Start the Game
1. Open browser to `http://localhost:8000`
2. Click **"Level Editor"** button on the main screen

### Step 2: Set Up Level Size
When editor opens, you'll see sliders:

- **Width:** Drag slider to set how wide (recommend: **10 tiles**)
- **Height:** Usually stays at **10 tiles**
- Click **"Generate Level"** button

You should see a grid appear!

---

## Step 3: Add Blocks (The Fun Part!)

### Find the Element Palette
On the **LEFT side** of the screen, you'll see colorful block icons:

```
[1] Platform Block (brown)
[3] Coin Box (yellow ?)
[11] Quiz Box (? block with quiz questions) ← This is new!
[2] Spike Block (red)
[5] Flag Pole (at the end)
... and more
```

### How to Place Blocks

**Basic Steps:**
1. **Click** on a block type in the palette (left side)
2. **Click** on the grid where you want to place it
3. The block appears on the grid
4. **Repeat** for more blocks

---

## Step 4: Build a Simple Level

### Example Level Layout

Here's a working beginner level:

```
Row 0:  [empty] [empty] [empty] [empty] [empty] [empty] [empty] [empty] [empty] [empty]
Row 1:  [empty] [empty] [quiz]  [empty] [quiz]  [empty] [empty] [empty] [empty] [empty]
Row 2:  [empty] [empty] [empty] [empty] [empty] [empty] [empty] [empty] [empty] [empty]
Row 3:  [empty] [empty] [empty] [empty] [empty] [empty] [empty] [empty] [empty] [empty]
Row 4:  [platform] [platform] [platform] [platform] [platform] [platform] [platform] [empty] [empty] [flag]
Row 5:  [platform] [platform] [platform] [platform] [platform] [platform] [platform] [empty] [empty] [empty]
Row 6:  [platform] [platform] [platform] [platform] [platform] [platform] [platform] [platform] [platform] [platform]

Legend:
[empty]     = Nothing (air)
[platform]  = Brown block (solid ground)
[quiz]      = Quiz block (type 11)
[flag]      = Flag pole (level finish)
```

### How to Build This Step-by-Step

**Step 1: Build the Ground**
1. Select **Platform Block** (brown) from palette
2. Click on Row 6 (bottom), all columns → Creates solid base
3. Fill most of Row 5 with platforms too

**Step 2: Create a Platform**
1. Select **Platform Block**
2. Click on Row 4 to create a platform that Mario can stand on

**Step 3: Add Quiz Blocks**
1. Select **Quiz Box** (type 11) from palette
2. Click Row 1, Column 2 → Quiz block placed!
3. Click Row 1, Column 4 → Another quiz block!

**Step 4: Add Flag Pole**
1. Select **Flag Pole** from palette
2. Click Row 4, Column 9 (top-right area)
3. This marks the level finish

---

## Visual Guide - What Each Block Does

| Block | Icon | What It Does | Use For |
|-------|------|-------------|---------|
| **Platform** | Brown block | Solid ground Mario stands on | Create walkable surfaces |
| **Coin Box** | Yellow ? | Gives coins when hit | Regular gameplay |
| **Quiz Box** | ? (new) | Triggers quiz questions | Educational challenge |
| **Spike Block** | Red spikes | Hurts Mario | Obstacles |
| **Goomba** | Enemy | Walks and hurts Mario | Difficulty |
| **Flag Pole** | Flag | Finishes the level | Level exit |
| **Power-Up Box** | ? (mushroom) | Gives power-ups | Help Mario |

---

## Step 5: Save Your Level

### Save Button
1. Click **"Save Map"** button (usually bottom-right)
2. Your level is now saved to browser storage
3. You'll see "✓ Saved" message

### Level Name
- Levels are automatically numbered: Level 1, Level 2, etc.
- First saved level = Level 1
- Second saved level = Level 2

---

## Step 6: Play Your Level

### Play Level
1. Click **"Play Level"** button
2. Game starts with your custom level!
3. Arrow keys to move, Spacebar to jump

### Test It!
- Can Mario reach the flag pole?
- Are quiz blocks hittable?
- Is it fun?

---

## Example: Super Simple 5-Minute Level

### Minimal Layout

```
START SCREEN:
- Set Width: 8
- Set Height: 10
- Click "Generate Level"

PLACEMENT:
Row 0:  [ ][ ][ ][ ][ ][ ][ ][ ]
Row 1:  [ ][Q][ ][Q][ ][ ][ ][ ]
Row 2:  [ ][ ][ ][ ][ ][ ][ ][ ]
Row 3:  [P][P][P][P][P][P][ ][F]
Row 4:  [P][P][P][P][P][P][ ][ ]
Row 5:  [P][P][P][P][P][P][P][P]
...
```

Legend:
- `[ ]` = Empty
- `[P]` = Platform
- `[Q]` = Quiz Box
- `[F]` = Flag Pole

### Build It:
1. **Select Platform** → Click Row 3-5 columns 0-6
2. **Select Quiz Box** → Click Row 1 columns 1 and 3
3. **Select Flag Pole** → Click Row 3 column 7
4. **Save & Play**

**Time: 5 minutes!** ⏱️

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Floating Platforms
```
[Q] <- Quiz block floating in air!
     <- No platform below!
```
**Fix:** Add platform blocks below quiz blocks so Mario can reach them

### ❌ Mistake 2: No Way to Win
```
All blocks, no flag pole!
```
**Fix:** Always add a flag pole to finish the level

### ❌ Mistake 3: Level Too Hard
```
Spikes everywhere!
```
**Fix:** Leave some safe areas for learning

### ❌ Mistake 4: Quiz Blocks in Wrong Places
```
[Q] <- At the top, unreachable!
```
**Fix:** Place quiz blocks at heights Mario can jump to

---

## Editor Controls

| Action | How |
|--------|-----|
| **Select Block Type** | Click icon on left palette |
| **Place Block** | Click on grid square |
| **Remove Block** | Click "Clear" button, then click block |
| **Change Level Size** | Move sliders, click "Generate Level" |
| **Save Level** | Click "Save Map" button |
| **Play Level** | Click "Play Level" button |
| **Go Back** | Click "Back" button |

---

## Step-by-Step Video Script (If You Were Recording)

```
1. "Open the game and click Level Editor"
2. "Set width to 10, height to 10"
3. "Click Generate Level"
4. "Select Platform block (brown)"
5. "Click entire bottom 3 rows to build ground"
6. "Select Quiz Box from palette"
7. "Place 2-3 quiz boxes in the middle"
8. "Select Flag Pole"
9. "Place at the end of the level"
10. "Click Save Map"
11. "Click Play Level"
12. "Jump to hit quiz blocks!"
13. "Reach the flag to finish!"
```

---

## Quiz Blocks in Your Level

### Why Place Quiz Blocks?
- ✓ Test player knowledge
- ✓ Make level educational
- ✓ Add challenge
- ✓ Reward players for exploration

### Best Practices
- Place them at **medium heights** (so Mario can jump to them)
- Spread them **across the level** (not all in one spot)
- Have **solid ground below** (so Mario doesn't fall)
- Limit to **2-5 quiz blocks** per level

### What Happens When Hit
1. Dark overlay appears
2. Question displays
3. 4 answer options shown
4. Player clicks answer
5. **Correct** → Next question or victory
6. **Wrong** → Mario loses a life

---

## Full Beginner Level Template

Copy this if you want a guaranteed working level:

```
Width: 10
Height: 10

Layout:
Row 0:  [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
Row 1:  [ ][ ][Q][ ][Q][ ][ ][ ][ ][ ]
Row 2:  [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
Row 3:  [ ][ ][ ][ ][ ][ ][ ][ ][ ][F]
Row 4:  [P][P][P][P][P][P][P][P][P][P]
Row 5:  [P][P][P][P][P][P][P][P][P][P]
Row 6:  [P][P][P][P][P][P][P][P][P][P]
Row 7:  [P][P][P][P][P][P][P][P][P][P]
Row 8:  [P][P][P][P][P][P][P][P][P][P]
Row 9:  [P][P][P][P][P][P][P][P][P][P]
```

This guarantees:
- ✓ Solid ground to walk on
- ✓ Quiz blocks reachable by jumping
- ✓ Flag pole to finish
- ✓ Player can beat it

---

## That's It! 🎮

You now know how to:
1. ✓ Open level editor
2. ✓ Place blocks
3. ✓ Add quiz blocks
4. ✓ Create a complete level
5. ✓ Save and play it

**Go create your first level!** 🚀
