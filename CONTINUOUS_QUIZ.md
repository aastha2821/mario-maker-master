# 🎮 Continuous Quiz System - One Question Every 5 Seconds!

## How It Works Now

### Game Flow:
```
1. Click "Start Game"
   ↓
2. See instructions (~15 seconds)
   ↓
3. Timer starts counting
   ↓
4. After 5 seconds → ✨ QUESTION 1 APPEARS
   ↓
5. Mario freezes, you answer
   ↓
6. See "✓ Right!" or "❌ Wrong! Better luck next time!"
   ↓
7. Wait 5 seconds
   ↓
8. → ✨ QUESTION 2 APPEARS (whether you got it right or wrong!)
   ↓
9. Repeat until all 5 questions answered
   ↓
10. Victory screen or continue playing
```

## Features

✨ **Continuous Questioning** - One question every 5 seconds  
✨ **No Stopping** - Questions keep coming whether right or wrong  
✨ **Simple Feedback** - "✓ Right!" or "❌ Wrong! Better luck next time!"  
✨ **Auto-Progression** - Next question auto-shows after 5 seconds  
✨ **Still Kills Enemies** - Correct answers still defeat Goombas  
✨ **5-Question Sequence** - 5 questions total, then repeat or game ends  
✨ **Time-Based** - Each question appears ~5 seconds apart  

---

## Timeline Example

```
T=0s      → Click "Start Game"
T=0-15s   → See instructions, can play
T=15s     → Instructions end, counting starts
T=20s     → QUESTION 1: "Which is a scalar quantity?"
           You answer
T=20-25s  → See result "✓ Right!" or "❌ Wrong! Better luck next time!"
           Mario still frozen
T=25s     → QUESTION 2: "What is SI unit of force?"
           Popup disappears, new question appears
           You answer
T=25-30s  → See result
T=30s     → QUESTION 3: "Which gas is most abundant?"
           And so on...
T=30-50s  → Questions 3, 4, 5
T=50s+    → After question 5, game ends/resets
```

---

## Question Sequence (5 Total)

1. **"Which of the following is a scalar quantity?"**
   - Options: Force, Velocity, Work, Acceleration
   - Correct: **Work** ✓

2. **"What is the SI unit of force?"**
   - Options: Newton, Watt, Joule, Pascal
   - Correct: **Newton** ✓

3. **"Which gas is most abundant in Earth's atmosphere?"**
   - Options: Oxygen, Nitrogen, Carbon dioxide, Hydrogen
   - Correct: **Nitrogen** ✓

4. **"The speed of light is approximately?"**
   - Options: 3×10^8 m/s, 3×10^6 m/s, 3×10^5 m/s, 3×10^9 m/s
   - Correct: **3×10^8 m/s** ✓

5. **"Which is Newton's 3rd law?"**
   - Options: F=ma, For every action..., Energy..., V=IR
   - Correct: **For every action, there is an equal and opposite reaction** ✓

---

## What You'll See on Screen

### When Question Appears:
```
┌─────────────────────────────────────┐
│     Quiz Question          [1/5]    │  ← Shows which question
├─────────────────────────────────────┤
│  Which of the following is a        │
│  scalar quantity?                   │
│                                     │
│  [ Force    ] [ Velocity ]          │  ← Click an option
│  [ Work     ] [ Acceleration ]      │
│                                     │
└─────────────────────────────────────┘
```

### After You Answer:
```
┌─────────────────────────────────────┐
│                                     │
│  ✓ Right!                           │  ← Or ❌ Wrong!
│                                     │
│              OR                     │
│                                     │
│  ❌ Wrong! Better luck next time!   │
│                                     │
│  (Waiting 5 seconds...)             │
│                                     │
└─────────────────────────────────────┘
```

### Then:
```
Dark screen for ~5 seconds
    ↓
Next question appears automatically!
```

---

## Code Changes Made

### File: `js/mainGame/MarioGame.js`

#### Addition 1: New Timer Variables (Lines 26-29)
```javascript
var quizTimerStarted = false;
var quizTimerCount = 0;
var quizWaitingForNext = false;      // ← NEW
var quizAnswerShowTime = 0;          // ← NEW
```

#### Addition 2: Enhanced Timer Logic (Lines 253-275)
```javascript
// First question after 5 seconds
if (quizTimerStarted && !quizActive && !quizWaitingForNext) {
  quizTimerCount++;
  if (quizTimerCount >= 300) {
    that.startQuizBlock();
    quizTimerCount = 0;
  }
}

// Show next question after 5 seconds (if waiting)
if (quizWaitingForNext && !quizActive) {
  quizAnswerShowTime++;
  if (quizAnswerShowTime >= 300) {
    that.startQuizBlock();
    quizAnswerShowTime = 0;
    quizWaitingForNext = false;
  }
}
```

#### Modification 3: Updated handleQuizAnswer (Lines 1006-1049)
- Simple feedback: "✓ Right!" or "❌ Wrong! Better luck next time!"
- 5-second wait before next question
- Auto-advance (both right and wrong) to next question

### File: `js/mainGame/QuizSystem.js`

#### Modification: Updated answerQuestion() (Lines 117-152)
- Now moves to next question on BOTH correct and wrong answers
- Continues quiz regardless of answer correctness
- Proper next question tracking

---

## Testing Steps

1. **Refresh browser** (Ctrl+Shift+R)
2. **Open index.html**
3. **Click "Start Game"**
4. **See instructions** (~15 seconds)
5. **Wait 5 more seconds**
6. **First question appears!** ✨
7. **Click an answer**
8. **See "✓ Right!" or "❌ Wrong! Better luck next time!"**
9. **Wait 5 seconds**
10. **Next question appears automatically!**
11. **Repeat for all 5 questions**

---

## What Happens After All Questions

After the 5th question is answered:
- If all correct: Victory screen (congrats message)
- If any wrong: Still continues for all 5, then game ends
- Game resets to let you play again

---

## Console Messages

Open browser console (F12 → Console) to see:
```
[MarioGame] 5 seconds elapsed - showing first quiz question!
[QuizPopup] Displaying question 1 of 5
[MarioGame] Quiz answer submitted: 2
[MarioGame] ✓ CORRECT!
[QuizSystem] Wrong answer - moving to next question anyway
[MarioGame] 5 seconds elapsed - showing next quiz question!
[QuizPopup] Displaying question 2 of 5
... (repeats for all questions)
[QuizSystem] All questions completed! Quiz finished!
```

---

## Key Points

✅ **Continuous** - Questions keep coming  
✅ **Automatic** - Auto-advance after 5 seconds  
✅ **Consistent** - Always 5-second intervals  
✅ **Simple** - Clear right/wrong feedback  
✅ **Fair** - Questions shown regardless of answer  
✅ **Engaging** - Keeps the gameplay flowing  

---

## How to Customize

### Change Question Timing (from 5 seconds)
Find this in `js/mainGame/MarioGame.js`:
```javascript
if (quizTimerCount >= 300) {  // ← 300 frames = 5 seconds
```

Change to:
- 60 = 1 second
- 180 = 3 seconds
- 300 = 5 seconds (default)
- 600 = 10 seconds

### Change Feedback Messages
Find in `js/mainGame/MarioGame.js` around line 1020:
```javascript
quizPopup.showResult(true, '✓ Right!');
quizPopup.showResult(false, '❌ Wrong! Better luck next time!');
```

Change the text to whatever you want!

### Change Questions
Edit `js/mainGame/QuizSystem.js` lines 11-34 or place custom `q.json` in root

---

## Summary

Your Mario game now has:
- ✨ Questions appearing every 5 seconds
- ✨ Simple "Right!" / "Wrong! Better luck next time!" feedback
- ✨ Automatic progression through all questions
- ✨ Continuous gameplay flow
- ✨ Enemies still die on correct answers

**Total game flow:** Start → Instructions (15s) → Play (30s with 5 questions) → Done!

---

## Enjoy! 🎮

Your continuous quiz system is ready! Each question appears every 5 seconds, keeps the game flowing, and provides instant feedback!

**Let's play!** 🎉
