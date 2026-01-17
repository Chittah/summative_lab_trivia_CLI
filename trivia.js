// Questions Array
const questions = [
  {
    question: "Who is the current President of the United States?",
    answers: ["Joe Biden", "Donald Trump", "Barack Obama", "George Bush"],
    correct: 1
  },
  {
    question: "Which year did Kenya gain independence?",
    answers: ["1963", "1964", "1965", "1966"],
    correct: 0
  },
  {
    question: "Who is the cabinet secretary of the Ministry of Education in Kenya?",
    answers: ["Aden Duale", "Julius Migos Ogamba", "Ndindi Nyoro", "Wycliffe Oparanya"],
    correct: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correct: 2
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: ["Gold", "Oxygen", "Osmium", "Iron"],
    correct: 1
  },
  {
    question: "What is the smallest prime number?",
    answers: ["0", "1", "2", "3"],
    correct: 2
  },
  {
    question: "In which year did the Titanic sink?",
    answers: ["1905", "1912", "1920", "1898"],
    correct: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correct: 1
  },
  {
    question: "Which country is home to the kangaroo?",
    answers: ["Brazil", "South Africa", "India", "Australia"],
    correct: 3
  },
  {
    question: "What is the freezing point of water in Celsius?",
    answers: ["0°C", "32°C", "100°C", "-1°C"],
    correct: 0
  }
];

// Game state variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timePerQuestion = 15; // seconds
let timeRemaining = timePerQuestion;

// HTML element references
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const feedbackContainer = document.getElementById("feedback");
const timerContainer = document.getElementById("timer");
const scoreContainer = document.getElementById("score-container");


// Function: Start Game

function startGame() {
  startBtn.style.display = "none";
  score = 0;
  currentQuestionIndex = 0;
  scoreContainer.textContent = "";
  showQuestion();
}


// Function: Show Question

function showQuestion() {
  clearFeedback();
  if (currentQuestionIndex >= questions.length) {
    endGame();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionContainer.innerHTML = `<div style="font-size: 0.9em; margin-bottom: 10px; opacity: 0.8;">${questionNumber}</div><div>${currentQuestion.question}</div>`;
  answersContainer.innerHTML = "";

  // Display answer buttons
  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index);
    answersContainer.appendChild(btn);
  });

  // Start the timer
  timeRemaining = timePerQuestion;
  timerContainer.textContent = `Time: ${timeRemaining}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeRemaining--;
    timerContainer.textContent = `Time: ${timeRemaining}s`;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      showFeedback(false, "Time's up!");
      nextQuestion();
    }
  }, 1000);
}


// Function: Check Answer

function checkAnswer(selectedIndex) {
  clearInterval(timer);
  const correctIndex = questions[currentQuestionIndex].correct;
  if (selectedIndex === correctIndex) {
    score++;
    showFeedback(true, "Correct!");
  } else {
    showFeedback(false, `Incorrect! Correct answer: ${questions[currentQuestionIndex].answers[correctIndex]}`);
  }
  nextQuestion();
}


// Function: Show Feedback

function showFeedback(isCorrect, message) {
  feedbackContainer.textContent = message;
  feedbackContainer.style.color = isCorrect ? "lightgreen" : "red";
}


// Function: Clear Feedback

function clearFeedback() {
  feedbackContainer.textContent = "";
}


// Function: Next Question

function nextQuestion() {
  currentQuestionIndex++;
  setTimeout(showQuestion, 1500); // brief pause for feedback
}


// Function: End Game

function endGame() {
  questionContainer.textContent = "Game Over!";
  answersContainer.innerHTML = "";
  timerContainer.textContent = "";
  
  // Calculate performance and add congratulations message
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  let congratsMessage = "";
  
  if (percentage === 100) {
    congratsMessage = "🎉 Perfect Score! Outstanding! 🎉";
  } else if (percentage >= 80) {
    congratsMessage = "🌟 Excellent work! 🌟";
  } else if (percentage >= 60) {
    congratsMessage = "👏 Great job! 👏";
  } else if (percentage >= 40) {
    congratsMessage = "💪 Good effort! Keep practicing! 💪";
  } else {
    congratsMessage = "📚 Keep learning! You'll do better next time! 📚";
  }
  
  scoreContainer.innerHTML = `<div style="font-size: 1.2em; margin-bottom: 15px;">${congratsMessage}</div><div>Your Score: ${score} / ${totalQuestions} (${percentage}%)</div>`;
  startBtn.textContent = "Play Again";
  startBtn.style.display = "inline-block";
}

// Event Listener

startBtn.addEventListener("click", startGame);
