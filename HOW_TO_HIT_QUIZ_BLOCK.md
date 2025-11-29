# 🎮 How to Hit a Quiz Block in Mario Maker

## Understanding Quiz Blocks

**Quiz Blocks** are special `?` blocks that trigger quiz questions instead of giving coins or power-ups.

- **Appearance:** `?` block (same sprite as coin box)
- **Type:** Type 11 in the level data
- **How to trigger:** Jump up and hit the block from below

---

## Method 1: In Level Editor (Create Your Own Quiz Level)

### Step 1: Open Level Editor
1. Start the game at `http://localhost:8000`
2. Click **"Level Editor"** button
3. Choose a grid size and set the level size

### Step 2: Place Quiz Blocks
1. Find **"quiz-box"** in the elements palette on the left
2. Click the quiz-box element
3. Click on the level grid where you want to place it
4. You can place multiple quiz blocks

**Example Level:**
```
Make a simple platform level:
- Row 1: Empty
- Row 2: Place quiz blocks here
- Row 3: Platform blocks (solid ground)
```

### Step 3: Save and Play
1. Click **"Save Map"** button
2. Click **"Play Level"**
3. Jump up under the quiz blocks to trigger them

---

## Method 2: Using Default Level with Quiz Blocks

If you want to quickly test without creating a level:

### Step 1: Modify the Game Level
Edit `js/mainGame/MarioGame.js` and find the `levelMaps` array:

Look for a level map like:
```javascript
var levelMaps = [
  // Level 1
  '[[0,0,0,0,0,0,0,0,0,0],...
```

### Step 2: Add Quiz Blocks
Replace some blocks with type 11 (quiz block):

**Before:**
```javascript
[0, 0, 3, 0, 3, 0, 0, 0, 0, 0],  // Row with coin boxes
```

**After:**
```javascript
[0, 0, 11, 0, 11, 0, 0, 0, 0, 0],  // Row with quiz boxes
```

---

## How to Trigger a Quiz Block

Once you're in the game with quiz blocks placed:

### Step 1: Position Mario
- Move left/right with **Arrow Keys** (or **A/D**)
- Get directly under a quiz block

### Step 2: Jump
- Press **Spacebar** to jump
- Jump up so Mario's head hits the block from below

### Step 3: Quiz Appears!
When Mario hits the block from below:
1. ✓ Dark overlay appears
2. ✓ Quiz popup shows with a question
3. ✓ 4 answer options displayed
4. ✓ Game pauses (entities freeze)

---

## Answering Questions

### Visual Indicators
- **Green boxes** = Answer options
- **Gold boxes** = Hovered option (mouse over)
- **White text** = Options text
- **White question text** = Question at top

### How to Answer
1. **Move mouse** over an answer option
   - It turns **gold** when you hover
2. **Click** the option you want
   - Correct answer → Next question
   - Wrong answer → Mario loses a life

### All 5 Questions
```
Q1: Which of the following is a scalar quantity?
    A: Force  B: Velocity  C: Work ✓  D: Acceleration

Q2: What is the SI unit of force?
    A: Newton ✓  B: Watt  C: Joule  D: Pascal

Q3: Which gas is most abundant in the Earth's atmosphere?
    A: Oxygen  B: Nitrogen ✓  C: Carbon dioxide  D: Hydrogen

Q4: The speed of light is approximately?
    A: 3×10^8 m/s ✓  B: 3×10^6 m/s  C: 3×10^5 m/s  D: 3×10^9 m/s

Q5: Which of the following is Newton's 3rd law?
    A: F=ma  B: For every action, there is an equal and opposite reaction ✓
    C: Energy cannot be created or destroyed  D: V=IR
```

---

## Complete Example - Quick Test

### Quick 5-Step Tutorial

**Step 1:** Open `http://localhost:8000`

**Step 2:** Click "Level Editor"

**Step 3:** Create this simple level:
```
Row 0: [0,0,0,0,0,0,0,0,0,0]
Row 1: [0,0,11,0,11,0,0,0,0,0]
Row 2: [1,1,1,1,1,1,1,1,1,1]
```
(Type 11 = quiz box, Type 1 = platform)

**Step 4:** Save and click "Play Level"

**Step 5:** 
- Press Right Arrow to move right
- Press Spacebar to jump
- Hit the quiz blocks!

---

## Controls Summary

| Action | Key |
|--------|-----|
| Move Left | ← Arrow |
| Move Right | → Arrow |
| Jump | Spacebar |
| Run (faster jump) | Shift (while moving) |
| Shoot Bullets | Ctrl |
| Select Answer | Mouse Click |
| Hover Answer | Move Mouse |

---

## What Happens When You Hit Quiz Block

```
BEFORE:
- Mario running left/right
- Enemies moving
- Coins showing

AFTER:
- ✓ Game pauses (dark overlay)
- ✓ Question appears in center
- ✓ 4 colored answer boxes
- ✓ Entities freeze
- ✓ Mario can't move

SUBMIT ANSWER:
- ✓ Click an option
- ✓ Feedback immediate

CORRECT ANSWER:
- ✓ Next question appears
- ✓ OR congratulations (if last question)
- ✓ Game resumes

WRONG ANSWER:
- ✓ Mario dies
- ✓ Lose 1 life
- ✓ Level restarts
```

---

## Debugging - Check Console

If quiz doesn't appear when you hit a block:

1. **Open DevTools:** Press `F12`
2. **Go to Console tab**
3. **Look for these messages:**

```
[Quiz] Hit quiz block at row: X column: Y
[Quiz] Triggering quiz! Questions available: 5
[MarioGame] Drawing question: ...
[QuizUI] Quiz overlay drawn successfully
```

If you see all these → Quiz is working! ✓

If you DON'T see "Hit quiz block" → The block might not be type 11

---

## Still Not Working?

### Check 1: Quiz Block Type
The block must be type **11** in the level data

### Check 2: Clear Cache
```
Ctrl+Shift+Delete → Clear All
Ctrl+Shift+R → Hard Refresh
```

### Check 3: Browser Console
Press `F12` and look for red errors

### Check 4: Server Running
Terminal should show:
```
Serving HTTP on :: port 8000 (http://[::]:8000/)
```

---

## 🎯 Summary

**To Hit a Quiz Block:**
1. Create a level with quiz blocks (type 11)
2. Play the level
3. Move Mario under a quiz block
4. Jump up to hit it
5. Answer the questions!

**That's it!** 🎮✨
