# ✅ Quiz Appears Automatically After 5 Seconds!

## How It Works Now

### Game Flow:
1. **Click "Start Game"** ← Game begins
2. **Instructions appear** (1000 frames / ~16 seconds)
3. **You can run around** and play
4. **After 5 more seconds** → Quiz popup appears automatically
5. **Mario freezes** (can't move during quiz)
6. **Answer the question**
7. **See result** and continue

---

## What Was Changed

### File: `js/mainGame/MarioGame.js`

#### Addition #1: Timer Variables (Lines 25-26)
```javascript
var quizTimerStarted = false;
var quizTimerCount = 0;
```
- `quizTimerStarted`: Flag to know when to start counting
- `quizTimerCount`: Counter for frames (300 frames ≈ 5 seconds)

#### Addition #2: Timer Logic in startGame() (Lines 251-266)
```javascript
// Auto-trigger quiz after 5 seconds (300 frames at 60 FPS)
if (!quizTimerStarted && instructionTick >= 1000) {
  quizTimerStarted = true;
  quizTimerCount = 0;
}

if (quizTimerStarted && !quizActive) {
  quizTimerCount++;
  // 300 frames = ~5 seconds at 60 FPS
  if (quizTimerCount >= 300) {
    console.log('[MarioGame] 5 seconds elapsed - showing quiz!');
    that.startQuizBlock();
    quizTimerStarted = false;
    quizTimerCount = 0;
  }
}
```

**How it works:**
1. Wait for instructions to finish (instructionTick >= 1000)
2. Start counting frames (quizTimerStarted = true)
3. Each game loop, increment quizTimerCount
4. When count reaches 300 frames (~5 seconds), call `startQuizBlock()`
5. This shows the first quiz question automatically

---

## Timeline

```
T=0      → Game starts, instructions shown
T=16sec  → Instructions end, timer starts
T=21sec  → Quiz popup appears! ← Quiz appears here
```

At 60 FPS:
- 1000 frames = ~16.67 seconds (instructions)
- 300 frames = ~5 seconds (waiting)
- Total = ~21.67 seconds

---

## What Happens During Quiz

1. **Popup appears** with first question
2. **Mario can't move** (marioFrozen = true)
3. **Player clicks answer** (4 options)
4. **Result shown** (✓ Correct or ❌ Wrong)
5. **Next question appears** OR game over screen

---

## Features

✅ **Automatic Trigger** - No need to hit quiz blocks  
✅ **5 Second Wait** - Time to play before quiz starts  
✅ **Mario Freezes** - Can't move during quiz  
✅ **Question Display** - Clear popup with 4 options  
✅ **Answer Validation** - Correct/wrong feedback  
✅ **Enemy Defeat** - Goomba dies on correct answer  
✅ **Question Progression** - Advances or game over  
✅ **Fallback Questions** - Always has questions to show  

---

## Testing

### What to Do:
1. **Refresh browser** (Ctrl+Shift+R)
2. **Click "Start Game"**
3. **Wait for instructions to finish** (about 15 seconds)
4. **Wait 5 more seconds** while playing
5. **See quiz popup appear automatically!**
6. **Answer a question** and see what happens

### Expected Output in Console:
```
[MarioGame] 5 seconds elapsed - showing quiz!
[MarioGame] Quiz block interaction...
[QuizPopup] Displaying question 1 of 5
```

---

## Fallback & Safety

- ✅ Hardcoded questions built in (5 default questions)
- ✅ Even if q.json fails, quiz still works
- ✅ Mario stays frozen until answer submitted
- ✅ Game continues after quiz completes
- ✅ Console logging shows every step

---

## How to Customize

### Change the wait time from 5 seconds:
In `js/mainGame/MarioGame.js`, line 261:
```javascript
if (quizTimerCount >= 300) {  // Change 300 to different number
```
- 60 = 1 second
- 300 = 5 seconds
- 600 = 10 seconds

### Disable auto quiz:
Comment out lines 251-266 in the timer logic block

### Use quiz blocks instead:
Keep the timer but also allow hitting Type 11 blocks to trigger quiz

---

## Summary

**Before:** Quiz only appeared when hitting Type 11 blocks  
**After:** Quiz appears automatically after 5 seconds of gameplay + all other features

Your Mario game now has an automatic quiz challenge! 🎮
