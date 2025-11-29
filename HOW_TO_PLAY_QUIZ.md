# 🎮 How to Play - Quiz Appears After 5 Seconds

## Quick Start Guide

### Step 1: Start the Game
1. Open `index.html` in your browser
2. Click **"Start Game"** button
3. Game loads

### Step 2: Watch Instructions
1. You'll see **control instructions** at the top
2. Instructions last about **15 seconds**
3. You can start moving Mario while instructions are showing

### Step 3: Play for 5 Seconds
1. Run around as Mario
2. Jump, collect power-ups, avoid enemies
3. Just play normally for about **5 more seconds**

### Step 4: Quiz Appears! ✨
1. After **~5 seconds** of playing, a **quiz popup appears**
2. A **dark overlay** covers the screen
3. A **purple gradient box** shows in the center
4. The **question** and **4 answer options** are displayed

### Step 5: Answer the Question
1. **Read the question** carefully
2. **Click one of the 4 options**
3. You'll see the **result immediately**:
   - ✅ **Green checkmark** = Correct!
   - ❌ **Red X** = Wrong answer

### Step 6: What Happens Next
**If you got it right:**
- Enemy (Goomba) dies
- Wait 1.5 seconds
- Next question appears (or victory screen if it was the last one)

**If you got it wrong:**
- "Wrong Answer" message appears
- Wait 3 seconds
- Game over! Level resets

---

## Complete Timeline

```
T=0       → Click "Start Game"
T=0-15s   → Instructions show, you can play
T=15s     → Instructions end, timer starts counting
T=20s     → Quiz popup appears! (5 seconds after timer started)
T=20-30s  → Answer question
T=30s+    → Continue playing or see game over
```

---

## Quiz Questions

The game has **5 built-in questions**:

1. **"Which of the following is a scalar quantity?"**
   - Correct: **Work** (Option 3)

2. **"What is the SI unit of force?"**
   - Correct: **Newton** (Option 1)

3. **"Which gas is most abundant in the Earth's atmosphere?"**
   - Correct: **Nitrogen** (Option 2)

4. **"The speed of light is approximately?"**
   - Correct: **3×10^8 m/s** (Option 1)

5. **"Which of the following is Newton's 3rd law?"**
   - Correct: **For every action, there is an equal and opposite reaction** (Option 2)

---

## What You'll See

### Quiz Popup Design:
```
┌─────────────────────────────────────┐
│     Quiz Question          [1/5]    │  ← Progress indicator
├─────────────────────────────────────┤
│  Which of the following is a        │
│  scalar quantity?                   │
│                                     │
│  [ Force    ] [ Velocity ]          │  ← Click to answer
│  [ Work     ] [ Acceleration ]      │
│                                     │
│                                     │
│  ✓ Correct!                         │  ← Result message
└─────────────────────────────────────┘
```

### Features:
- ✅ Beautiful purple gradient background
- ✅ White text for readability
- ✅ 4 green buttons for answers
- ✅ Progress counter (1/5, 2/5, etc.)
- ✅ Result feedback (Correct/Wrong)
- ✅ Mario stays frozen while answering

---

## Important Notes

### Mario Freezes During Quiz
- ✅ You **cannot move** Mario while quiz is showing
- ✅ You **can only click answers**
- ✅ Mario resumes moving after quiz is done or on game over

### Quiz Always Has Questions
- ✅ If `q.json` loads, uses those questions
- ✅ If `q.json` fails, uses **built-in fallback questions**
- ✅ You **never get a "no questions" error**

### After All Questions
- ✅ If all correct: Victory screen appears
- ✅ If any wrong: Game over, level resets
- ✅ **No infinite quiz**: Just 5 questions per game

---

## Troubleshooting

### Quiz doesn't appear after 5 seconds?
1. Check browser console (F12)
2. Look for `[MarioGame] 5 seconds elapsed` message
3. If not there, refresh page (Ctrl+Shift+R)
4. Try again

### Quiz appears but can't click answers?
1. Make sure you're clicking on the button text
2. Refresh page (Ctrl+Shift+R)
3. Check console for JavaScript errors

### Game doesn't start?
1. Make sure you have all files:
   - `index.html`
   - `js/mainGame/QuizSystem.js`
   - `js/mainGame/QuizPopup.js`
   - `q.json` (optional, fallback questions used if missing)
2. Check browser console for errors
3. Try hard refresh (Ctrl+Shift+R)

---

## Console Messages to Expect

Open browser console (F12 → Console tab) and you should see:

```
[QuizSystem] ✓ Successfully loaded 5 questions
[QuizPopup] Initializing quiz popup...
[QuizPopup] Popup structure created
[MarioGame] 5 seconds elapsed - showing quiz!
[MarioGame] Displaying question 1 of 5
[QuizPopup] Displaying question 1 of 5
```

If you see these, everything is working! ✅

---

## Summary

**How to play:**
1. Click "Start Game"
2. See instructions (~15 sec)
3. Play for ~5 more seconds
4. Quiz appears automatically
5. Answer the question
6. See result and continue

**That's it!** Simple and automatic! 🎮
