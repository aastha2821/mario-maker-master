# mario-maker
Classic Mario Game with Level-Editor made using **plain Javascript and HTML5 canvas**.
You can create your own levels and play or simply play the pre-built levels.
Download the files and run index.html to play the game, 
or simply visit the following link.

http://pratishshr.github.io/mario-maker/

## 🎮 Features

* Classic Mario platformer gameplay
* Custom level editor
* **NEW: Interactive Quiz Blocks** - Answer science questions to progress!
* Touch and keyboard support
* Responsive controls

## 🎯 Quiz Blocks (NEW!)

Test your knowledge with interactive quiz blocks!

**How to Play:**
1. Hit a **?** block (quiz block)
2. A popup appears with a question
3. Click the correct answer to continue
4. Wrong answer? Mario dies!
5. Complete the quiz challenge to win!

**Features:**
- 5 science/physics questions included
- Instant feedback on answers
- Congratulations screen on completion
- Can be placed in custom levels

**Quick Start:** See [INDEX.md](INDEX.md) or [QUIZ_QUICK_START.md](QUIZ_QUICK_START.md)

## 📚 Documentation

Comprehensive documentation for the quiz block system:

- **[INDEX.md](INDEX.md)** - Complete documentation index
- **[QUIZ_QUICK_START.md](QUIZ_QUICK_START.md)** - How to play and create levels
- **[QUIZ_IMPLEMENTATION.md](QUIZ_IMPLEMENTATION.md)** - Technical details
- **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - Architecture and diagrams
- **[VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)** - Complete feature list
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Overview of changes
- **[SAMPLE_QUIZ_LEVEL.json](SAMPLE_QUIZ_LEVEL.json)** - Example level with quiz blocks

## 🎮 Controls

### Gameplay
* **Right-Arrow / Left-Arrow** - Move right/left
* **Space / Up-Arrow** - Jump
* **Shift** - Sprint (faster jump)
* **Ctrl** - Fire bullets (when you have fire power)

### Quiz Popup
* **Mouse Move** - Highlight answer options
* **Mouse Click** - Select your answer

## 🎨 Level Editor

### Creating Custom Levels
1. Click **"Level Editor"** button
2. Select elements from the palette:
   - Regular blocks and platforms
   - Coin boxes, power-up boxes
   - Pipes and decorations
   - **NEW: Quiz boxes** - Place these to create quiz challenges!
3. Use grid options (Small/Medium/Large) for different editing scales
4. Click **"Save Map"** to save your level
5. Play in **"Created Levels"** to test your creations

### Available Elements
* Platform blocks
* Coin boxes (gives 100 points)
* Power-up boxes (mushrooms & fire flowers)
* **Quiz boxes** (NEW!) - Educational challenges
* Useless boxes (for decoration)
* Pipes
* Flags (level exit)
* Enemies (Goombas)

## 🏆 Quiz Block System

### Question Format
Questions are stored in `q.json` with this structure:
```json
{
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": 0
}
```

### Gameplay Mechanics
- **Correct Answer:** Continue to next question (or congratulations if last)
- **Wrong Answer:** Mario dies, lose a life
- **Quiz Complete:** Game ends with congratulations screen

### Adding Questions
1. Edit `q.json` file
2. Add questions following the format above
3. Reload the game
4. New questions appear in quiz blocks

## 🚀 Getting Started

1. **Download or clone** this repository
2. **Open `index.html`** in your web browser
3. **Click "Start Game"** to play
4. **Hit a quiz block** to try the new feature!

### Try the Sample
A sample level with quiz blocks is included. Create a custom level and place quiz blocks (quiz-box) from the element palette.

## 📦 Files Structure

```
mario-maker/
├── index.html                          # Main game file
├── q.json                              # Quiz questions (NEW!)
├── README.md                           # This file
├── INDEX.md                            # Documentation index (NEW!)
├── QUIZ_QUICK_START.md                 # User guide (NEW!)
├── QUIZ_IMPLEMENTATION.md              # Technical docs (NEW!)
├── VISUAL_GUIDE.md                     # Architecture diagrams (NEW!)
├── VERIFICATION_CHECKLIST.md           # Feature checklist (NEW!)
├── IMPLEMENTATION_SUMMARY.md           # Change summary (NEW!)
├── SAMPLE_QUIZ_LEVEL.json              # Example level (NEW!)
├── css/
│   ├── style.css                       # Main styles (updated)
│   └── reset.css
├── js/
│   ├── View.js
│   ├── GameUI.js
│   ├── MarioMaker.js
│   ├── Preloader.js
│   ├── mainGame/
│   │   ├── GameSound.js
│   │   ├── Element.js                  # (updated - added quiz block)
│   │   ├── PowerUp.js
│   │   ├── Enemy.js
│   │   ├── Bullet.js
│   │   ├── Mario.js
│   │   ├── Score.js
│   │   ├── MarioGame.js                # (updated - quiz integration)
│   │   ├── QuizManager.js              # (NEW!)
│   │   └── QuizUI.js                   # (NEW!)
│   └── levelEditor/
│       ├── Storage.js
│       ├── Editor.js                   # (updated - added quiz block)
│       └── CreatedLevels.js
├── images/
├── sounds/
└── fonts/
```

## ✨ What's New

### Quiz Block Feature (Latest Update)
- ✅ Interactive quiz blocks (type 11)
- ✅ 5 science questions included
- ✅ Beautiful popup UI with hover effects
- ✅ Correct answer = continue, Wrong answer = death
- ✅ Congratulations screen on completion
- ✅ Place quiz blocks in custom levels
- ✅ Complete documentation & guides
- ✅ No breaking changes to existing game

### Under the Hood
- New `QuizManager.js` - Handles quiz logic
- New `QuizUI.js` - Renders quiz popups
- Updated `MarioGame.js` - Integrated quiz system
- Updated `Element.js` - Added quiz block type
- Updated `Editor.js` - Quiz block in palette

## 🎓 Learning Resources

### For Players
- Read [QUIZ_QUICK_START.md](QUIZ_QUICK_START.md) for how to play
- Try placing quiz blocks in custom levels
- Check the FAQ section for common questions

### For Developers
- See [QUIZ_IMPLEMENTATION.md](QUIZ_IMPLEMENTATION.md) for code details
- Check [VISUAL_GUIDE.md](VISUAL_GUIDE.md) for architecture
- Review [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md) for features

### For Customization
- Edit `q.json` to change/add questions
- Modify `QuizUI.js` to customize appearance
- Adjust `QuizManager.js` to change behavior

## 🌟 Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Modern mobile browsers

Requires modern browser with:
- ES6 support
- Fetch API
- HTML5 Canvas 2D
- JavaScript enabled

## 📝 Credits

Original Mario Maker by [Pratish](https://github.com/pratishshr)

Quiz Block System Implementation:
- QuizManager module for state management
- QuizUI module for popup rendering
- Integration with existing game loop
- Level editor support

## 📄 License

See original repository for license information.

## 🎉 Have Fun!

Enjoy creating levels with quiz challenges and test your knowledge while playing Mario!

For detailed information, start with [INDEX.md](INDEX.md) or jump to [QUIZ_QUICK_START.md](QUIZ_QUICK_START.md).

---

**Latest Update:** Quiz Block System fully implemented with comprehensive documentation! ✨