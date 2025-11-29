# Quiz Blocks - Working Implementation

## Quick Start

1. **Hit a quiz block (?)** while playing
2. **Answer 5 questions** correctly to complete the quiz
3. **Correct answer** = Move to next question
4. **Wrong answer** = Lose a life
5. **Complete all questions** = See congratulations screen

---

## Features Implemented

✅ Quiz popup with dark overlay  
✅ 4 multiple choice options with hover effects  
✅ Questions stored in `q.json`  
✅ Answer validation (correct/wrong)  
✅ Game pauses during quiz  
✅ Entities freeze (no enemy movement)  
✅ Level editor support (place quiz blocks)  
✅ Congratulations screen on completion  

---

## How to Create a Quiz Block

### In Level Editor
1. Select **"quiz-box"** from the elements palette
2. Click to place on the map
3. Save your level

### In Code (if creating levels manually)
```javascript
// In your level array, use type 11 for quiz blocks
var level = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,11,0,0,0,0,0],  // ← Quiz block here
  [2,2,2,2,2,2,2,2,2,2]
];
```

---

## Question Format (q.json)

```json
[
  {
    "question": "Which of the following is a scalar quantity?",
    "options": ["Force", "Velocity", "Work", "Acceleration"],
    "answer": 2
  },
  {
    "question": "What is the SI unit of force?",
    "options": ["Newton", "Watt", "Joule", "Pascal"],
    "answer": 0
  }
]
```

**Structure:**
- `question` - The question text
- `options` - Array of 4 answer choices
- `answer` - Index of correct answer (0-3)

**How to add more questions:**
1. Edit `q.json`
2. Add objects following the format above
3. Save and refresh game

---

## Game Flow

```
Mario hits ? block
         ↓
Quiz overlay appears (dark background, centered box)
         ↓
Question and 4 options displayed
         ↓
Player clicks an option
         ↓
         ├─ CORRECT → Next question (or congratulations if last)
         └─ WRONG → Mario takes damage (-1 life)
         ↓
Game resumes
```

---

## Files Involved

**Core Quiz Files:**
- `js/mainGame/QuizManager.js` - Quiz state management
- `js/mainGame/QuizUI.js` - Quiz popup rendering
- `q.json` - Question database

**Modified Game Files:**
- `js/mainGame/MarioGame.js` - Quiz integration & trigger
- `js/mainGame/Element.js` - Quiz block type
- `js/levelEditor/Editor.js` - Level editor support
- `css/style.css` - Quiz styling
- `index.html` - Script includes
- `README.md` - Feature documentation

---

## Troubleshooting

### Questions not appearing?
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Hard refresh: `Ctrl+Shift+R`
3. Check console for errors: `F12`
4. Verify `q.json` exists in root directory

### Quiz not triggering?
1. Make sure you're hitting a quiz block (type 11)
2. Check console for collision detection
3. Verify `quizManager` is initialized

### Answers not working?
1. Verify answer indices are 0-3
2. Check that correct answer index matches `q.json`
3. Look for errors in console

---

## Console Debugging

Open console (`F12`) to see:
```javascript
// On game start:
"Questions loaded from q.json: 5 questions"

// When hitting quiz block:
"Quiz triggered! Current question: 0"

// On answer:
"Answer submitted: option 2"
"Correct! Moving to next question"
// OR
"Wrong answer. You died!"
```

---

## Customization

### Change number of questions
Edit `q.json` - add or remove question objects

### Change question order
Edit `q.json` - rearrange question objects

### Change quiz styling
Edit `css/style.css` - modify `.quiz-overlay` and `.quiz-option` styles

### Change quiz behavior
Edit `js/mainGame/MarioGame.js` - modify `handleQuizAnswer()` function

---

## Testing Checklist

- [ ] Start game successfully
- [ ] Place/hit a quiz block
- [ ] Quiz overlay appears
- [ ] Question text displays
- [ ] 4 answer options visible
- [ ] Can hover over options (they highlight)
- [ ] Can click options
- [ ] Correct answer advances quiz
- [ ] Wrong answer kills Mario
- [ ] Final question shows congratulations
- [ ] Game resumes after quiz

---

## That's it! Your quiz blocks are ready to use. 🎮
