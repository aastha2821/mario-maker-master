// QuizPopup.js - Interactive Quiz UI Component
// Displays questions and answer buttons with full interactivity

function QuizPopup() {
  var isVisible = false;
  var onAnswerSelected = null;
  var container = null;
  var that = this;

  // Initialize - Create DOM structure
  this.init = function() {
    console.log('[QuizPopup] Initializing quiz popup...');
    
    // Create container if it doesn't exist
    container = document.getElementById('quiz-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'quiz-container';
      document.body.appendChild(container);
      console.log('[QuizPopup] Created quiz-container div');
    }

    container.innerHTML = `
      <div id="quiz-overlay" class="quiz-overlay">
        <div id="quiz-popup" class="quiz-popup">
          <div class="quiz-header">
            <h2 id="quiz-title">Quiz Question</h2>
            <span id="quiz-progress" class="quiz-progress">1/5</span>
          </div>
          
          <div class="quiz-content">
            <p id="quiz-question" class="quiz-question">Loading question...</p>
            
            <div id="quiz-options" class="quiz-options">
              <!-- Options will be inserted here -->
            </div>
          </div>

          <div class="quiz-footer">
            <p id="quiz-message" class="quiz-message"></p>
          </div>
        </div>
      </div>
    `;

    // Add click event listener to container for option selection
    container.addEventListener('click', function(e) {
      var optionBtn = e.target.closest('.quiz-option-btn');
      if (optionBtn && isVisible) {
        var optionIndex = parseInt(optionBtn.getAttribute('data-index'));
        that.handleOptionClick(optionIndex);
      }
    });

    console.log('[QuizPopup] Popup structure created and event listeners attached');
  };

  // Display a question
  this.displayQuestion = function(question, currentIndex, totalQuestions) {
    if (!container) {
      console.warn('[QuizPopup] Container not initialized, calling init()');
      this.init();
    }

    console.log('[QuizPopup] Displaying question', currentIndex + 1, 'of', totalQuestions);

    // Update question text
    var questionElement = document.getElementById('quiz-question');
    if (questionElement) {
      questionElement.textContent = question.question;
    }

    // Update progress
    var progressElement = document.getElementById('quiz-progress');
    if (progressElement) {
      progressElement.textContent = (currentIndex + 1) + '/' + totalQuestions;
    }

    // Update options
    var optionsContainer = document.getElementById('quiz-options');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      
      question.options.forEach(function(option, index) {
        var btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.setAttribute('data-index', index);
        btn.textContent = option;
        btn.type = 'button';
        
        // Add hover effect
        btn.addEventListener('mouseenter', function() {
          this.classList.add('quiz-option-hover');
        });
        btn.addEventListener('mouseleave', function() {
          this.classList.remove('quiz-option-hover');
        });

        optionsContainer.appendChild(btn);
      });
    }

    // Clear any previous messages
    var messageElement = document.getElementById('quiz-message');
    if (messageElement) {
      messageElement.textContent = '';
      messageElement.className = 'quiz-message';
    }

    // Show popup
    this.show();
  };

  // Show the popup
  this.show = function() {
    if (!container) this.init();
    
    var overlay = document.getElementById('quiz-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      isVisible = true;
      console.log('[QuizPopup] Popup shown');
    }
  };

  // Hide the popup
  this.hide = function() {
    if (!container) return;
    
    var overlay = document.getElementById('quiz-overlay');
    if (overlay) {
      overlay.style.display = 'none';
      isVisible = false;
      console.log('[QuizPopup] Popup hidden');
    }
  };

  // Check if popup is visible
  this.isVisible = function() {
    return isVisible;
  };

  // Handle option click
  this.handleOptionClick = function(optionIndex) {
    console.log('[QuizPopup] Option clicked: index', optionIndex);
    
    // Disable all buttons to prevent multiple clicks
    var buttons = document.querySelectorAll('.quiz-option-btn');
    buttons.forEach(function(btn) {
      btn.disabled = true;
    });

    // Call callback
    if (onAnswerSelected) {
      onAnswerSelected(optionIndex);
    }
  };

  // Show result message
  this.showResult = function(isCorrect, message) {
    var messageElement = document.getElementById('quiz-message');
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.className = 'quiz-message ' + (isCorrect ? 'quiz-message-correct' : 'quiz-message-wrong');
      console.log('[QuizPopup] Showing', isCorrect ? 'correct' : 'wrong', 'message:', message);
    }
  };

  // Show congratulations screen
  this.showCongratulatios = function() {
    var popup = document.getElementById('quiz-popup');
    if (popup) {
      popup.innerHTML = `
        <div class="quiz-congratulations">
          <h1>🎉 Congratulations! 🎉</h1>
          <p>You completed the quiz challenge!</p>
          <p class="quiz-congrats-subtext">All questions answered correctly!</p>
        </div>
      `;
      console.log('[QuizPopup] Congratulations screen shown');
    }
  };

  // Show game over screen
  this.showGameOver = function() {
    var popup = document.getElementById('quiz-popup');
    if (popup) {
      popup.innerHTML = `
        <div class="quiz-gameover">
          <h1>❌ Wrong Answer ❌</h1>
          <p>Game Over!</p>
          <p class="quiz-congrats-subtext">Better luck next time!</p>
        </div>
      `;
      console.log('[QuizPopup] Game over screen shown');
    }
  };

  // Set answer callback
  this.setOnAnswerSelected = function(callback) {
    onAnswerSelected = callback;
  };
}
