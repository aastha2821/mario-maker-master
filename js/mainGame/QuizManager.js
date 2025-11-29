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
    // Try to load questions from q.json, but use defaults if it fails
    fetch('q.json')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          questions = data;
          console.log('Questions loaded from q.json:', questions.length, 'questions');
        }
        if (callback) callback();
      })
      .catch(error => {
        console.warn('Could not load q.json, using default questions:', error);
        // Keep using default questions loaded above
        if (callback) callback();
      });
  };

  this.getCurrentQuestion = function() {
    if (currentQuestionIndex < questions.length) {
      return questions[currentQuestionIndex];
    }
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
