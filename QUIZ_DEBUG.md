# Quiz System Debug Guide

## How to Check if Quiz System is Working

1. **Open the game in browser**
2. **Press F12 to open Developer Console**
3. **Run these commands to debug:**

```javascript
// Check if QuizSystem is loaded
console.log('QuizSystem exists:', typeof QuizSystem);

// Create an instance and test
var testQuiz = new QuizSystem();
testQuiz.init(function(loaded) {
  console.log('Questions loaded:', loaded);
  console.log('Total questions:', testQuiz.getTotalQuestions());
  if (testQuiz.getTotalQuestions() > 0) {
    console.log('First question:', testQuiz.getCurrentQuestion());
  }
});

// Check if QuizPopup is loaded
console.log('QuizPopup exists:', typeof QuizPopup);

// Check q.json file
fetch('./q.json').then(r => r.json()).then(d => console.log('q.json loaded:', d.length, 'questions')).catch(e => console.error('Error loading q.json:', e));
```

## Expected Console Output

You should see messages like:
```
[QuizSystem] Attempting to load from: ./q.json
[QuizSystem] ✓ Successfully loaded 5 questions from ./q.json
[QuizSystem] First question: Which of the following is a scalar quantity?
[QuizPopup] Initializing quiz popup...
[QuizPopup] Created quiz-container div
[QuizPopup] Popup structure created and event listeners attached
```

## What to Do When You Hit a Quiz Block

1. Jump under a **type 11** block (quiz block)
2. You should see:
   - A popup appears (dark overlay with purple gradient box)
   - Question text and 4 answer buttons
   - Progress indicator (1/5)
3. Click an answer
4. You should see:
   - Result message (✓ Correct! or ❌ Wrong)
   - Either next question or game over screen

## Common Issues

### Issue: "No questions available"
- **Cause:** q.json failed to load
- **Solution:** 
  - Check browser console for fetch errors
  - Make sure q.json exists in root directory
  - Check Network tab to see if fetch is succeeding
  - Try refreshing the page (Ctrl+Shift+R)

### Issue: Quiz block doesn't trigger
- **Cause:** Block type not set to 11
- **Solution:**
  - In Level Editor, select a block
  - Make sure the type is set to 11
  - Check console: should see "[MarioGame] Hit quiz block!"

### Issue: Question shows but answers don't work
- **Cause:** CSS not loaded or click handler broken
- **Solution:**
  - Check if buttons are visible
  - Check if buttons are clickable
  - Open console and look for errors

## Files to Check

- `q.json` - Must exist in root directory
- `js/mainGame/QuizSystem.js` - Question management
- `js/mainGame/QuizPopup.js` - Question display
- `js/mainGame/MarioGame.js` - Integration
- `css/style.css` - Quiz styling

## How to Get More Debugging Info

In browser console, set logging level:
```javascript
// In QuizSystem.js init function, it already logs:
// - Each path it tries
// - Success/failure of loading
// - Total questions loaded

// In MarioGame.js when hitting quiz block, it logs:
// - "Hit quiz block!"
// - Questions available count
// - Quiz block interaction start
// - Quiz answer submitted with index
// - Whether answer was correct/wrong
```

Check browser console (F12 → Console tab) for all [QuizSystem], [QuizPopup], and [MarioGame] prefixed messages.
