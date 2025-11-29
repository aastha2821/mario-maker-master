// Quiz Manager - Handles quiz state and questions

function QuizManager() {
  var questions = [
    {
      "question": "Which of the following is a scalar quantity?",
      "options": ["Force", "Velocity", "Work", "Acceleration"],
      "answer": 2
    },
    {
      "question": "What is the SI unit of force?",
      "options": ["Newton", "Watt", "Joule", "Pascal"],
      "answer": 0
    },
    {
      "question": "Which gas is most abundant in the Earth's atmosphere?",
      "options": ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
      "answer": 1
    },
    {
      "question": "The speed of light is approximately?",
      "options": ["3×10^8 m/s", "3×10^6 m/s", "3×10^5 m/s", "3×10^9 m/s"],
      "answer": 0
    },
    {
      "question": "Which of the following is Newton's 3rd law?",
      "options": ["F=ma", "For every action, there is an equal and opposite reaction", "Energy cannot be created or destroyed", "V=IR"],
      "answer": 1
    }
  ]; // Default questions loaded upfront
  var currentQuestionIndex = 0;
  var quizBlocks = []; // Track quiz block positions that have been triggered
  var isQuizActive = false;
  var that = this;

  this.init = function(callback) {
    // Questions are pre-loaded in the array above
    console.log('[QuizManager] Questions initialized:', questions.length, 'questions available');
    if (callback) {
      // Call callback immediately since we're not loading from file
      setTimeout(function() {
        callback();
      }, 0);
    }
  };

  this.getCurrentQuestion = function() {
    console.log('[QuizManager] getCurrentQuestion - index:', currentQuestionIndex, 'total:', questions.length);
    if (currentQuestionIndex < questions.length) {
      var q = questions[currentQuestionIndex];
      console.log('[QuizManager] Returning question:', q.question);
      return q;
    }
    console.log('[QuizManager] No more questions - index past range');
    return null;
  };

  this.getCurrentQuestionIndex = function() {
    return currentQuestionIndex;
  };

  this.getTotalQuestions = function() {
    return questions.length;
  };

  this.answerQuestion = function(selectedOptionIndex) {
    if (currentQuestionIndex < questions.length) {
      var currentQuestion = questions[currentQuestionIndex];
      var isCorrect = selectedOptionIndex === currentQuestion.answer;
      
      if (isCorrect) {
        currentQuestionIndex++;
      }
      
      return isCorrect;
    }
    return false;
  };

  this.isQuizComplete = function() {
    return currentQuestionIndex >= questions.length;
  };

  this.setQuizActive = function(active) {
    isQuizActive = active;
  };

  this.getQuizActive = function() {
    return isQuizActive;
  };

  this.addQuizBlockTriggered = function(row, column) {
    var key = row + '-' + column;
    if (quizBlocks.indexOf(key) === -1) {
      quizBlocks.push(key);
      return true; // This is a new quiz block
    }
    return false; // This block was already triggered
  };

  this.reset = function() {
    currentQuestionIndex = 0;
    quizBlocks = [];
    isQuizActive = false;
  };
}
