// QuizSystem.js - Complete Quiz Management System
// Handles loading questions, tracking progress, validating answers

function QuizSystem() {
  // Fallback questions in case q.json fails to load
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
    },
    {
      "question": "Sound cannot travel through:",
      "options": ["Water", "Air", "Metal", "Vacuum"],
      "answer": 3
    },
    {
      "question": "The energy possessed by a body due to its motion is called:",
      "options": ["Potential energy", "Mechanical energy", "Kinetic energy", "Heat energy"],
      "answer": 2
    },
    {
      "question": "The phenomenon of bending of light as it passes from one medium to another is called:",
      "options": ["Reflection", "Diffraction", "Refraction", "Interference"],
      "answer": 2
    },
    {
      "question": "Which of the following is NOT an electromagnetic wave?",
      "options": ["X-rays", "Infrared rays", "Sound waves", "Radio waves"],
      "answer": 2
    },
    {
      "question": "The resistance of a conductor depends on:",
      "options": ["Length of conductor", "Material of conductor", "Area of cross-section", "All of the above"],
      "answer": 3
    },
    {
      "question": "The device used to measure atmospheric pressure is:",
      "options": ["Thermometer", "Hygrometer", "Barometer", "Ammeter"],
      "answer": 2
    }
  ];
  var currentQuestionIndex = 0;
  var quizActive = false;
  var onQuestionAnswered = null; // Callback function
  var that = this;

  // Initialize - Load questions from q.json
  this.init = function(callback) {
    // Try multiple paths to load q.json
    var paths = ['./q.json', '/q.json', '../q.json'];
    var attemptPath = function(pathIndex) {
      if (pathIndex >= paths.length) {
        console.error('[QuizSystem] Failed to load q.json from all paths');
        if (callback) callback(false);
        return;
      }
      
      var path = paths[pathIndex];
      console.log('[QuizSystem] Attempting to load from:', path);
      
      fetch(path)
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            questions = data;
            console.log('[QuizSystem] ✓ Successfully loaded', questions.length, 'questions from', path);
            console.log('[QuizSystem] First question:', questions[0].question);
            if (callback) callback(true);
          } else {
            console.warn('[QuizSystem] q.json is empty or invalid format');
            questions = [];
            if (callback) callback(false);
          }
        })
        .catch(error => {
          console.warn('[QuizSystem] Failed to load from', path, ':', error.message);
          attemptPath(pathIndex + 1);
        });
    };
    
    attemptPath(0);
  };

  // Get current question object
  this.getCurrentQuestion = function() {
    if (currentQuestionIndex < questions.length) {
      var q = questions[currentQuestionIndex];
      console.log('[QuizSystem] Current question index:', currentQuestionIndex, '/', questions.length);
      return q;
    }
    return null;
  };

  // Get current question index
  this.getCurrentQuestionIndex = function() {
    return currentQuestionIndex;
  };

  // Get total questions count
  this.getTotalQuestions = function() {
    return questions.length;
  };

  // Check if quiz is active
  this.isQuizActive = function() {
    return quizActive;
  };

  // Start quiz
  this.startQuiz = function() {
    if (questions.length === 0) {
      console.warn('[QuizSystem] Cannot start quiz - no questions loaded');
      return false;
    }
    quizActive = true;
    currentQuestionIndex = 0;
    console.log('[QuizSystem] Quiz started. First question:', this.getCurrentQuestion().question);
    return true;
  };

  // Process answer
  this.answerQuestion = function(selectedOptionIndex) {
    if (currentQuestionIndex >= questions.length) {
      console.warn('[QuizSystem] No current question to answer');
      return { correct: false, nextQuestion: null };
    }

    var currentQuestion = questions[currentQuestionIndex];
    var isCorrect = selectedOptionIndex === currentQuestion.answer;

    console.log('[QuizSystem] Answer submitted:', selectedOptionIndex, 'Correct answer:', currentQuestion.answer, '| Result:', isCorrect ? 'CORRECT' : 'WRONG');

    if (isCorrect) {
      // CORRECT ANSWER - move to next question
      currentQuestionIndex++;
      
      var hasNextQuestion = currentQuestionIndex < questions.length;
      if (hasNextQuestion) {
        console.log('[QuizSystem] Moving to next question:', currentQuestionIndex + 1, '/', questions.length);
      } else {
        console.log('[QuizSystem] All questions completed! Quiz finished!');
        quizActive = false;
      }

      return {
        correct: true,
        nextQuestion: hasNextQuestion ? questions[currentQuestionIndex] : null,
        quizComplete: !hasNextQuestion
      };
    } else {
      // WRONG ANSWER - DO NOT advance, stay on same question
      console.log('[QuizSystem] Wrong answer - staying on same question:', currentQuestionIndex + 1, '/', questions.length);
      
      // Don't increment currentQuestionIndex - same question will be asked again
      var hasNextQuestion = currentQuestionIndex < questions.length;
      
      return {
        correct: false,
        nextQuestion: hasNextQuestion ? questions[currentQuestionIndex] : null,
        quizComplete: false,
        retryingSameQuestion: true
      };
    }
  };

  // Reset quiz
  this.reset = function() {
    currentQuestionIndex = 0;
    quizActive = false;
    console.log('[QuizSystem] Quiz reset');
  };

  // Set answer callback
  this.setOnQuestionAnswered = function(callback) {
    onQuestionAnswered = callback;
  };
}
