console.log("🎮 Welcome to the CLI Trivia Quiz!");

const readline = require("readline");

/* CLI SETUP*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*  QUESTIONS ARRAY */
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

/* GAME STATE */

let currentIndex = 0;
let score = 0;
const TIME_LIMIT = 15; // seconds per question

/* ASK QUESTION FUNCTION */
function askQuestion() {
  const current = questions[currentIndex];
  console.clear();
  console.log(`🧠 Question ${currentIndex + 1} of ${questions.length}`);
  console.log(current.question);

  /* Show options */
  current.answers.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });

  let timeLeft = TIME_LIMIT;
  let answered = false;

  /* Show initial time */
  process.stdout.write(`\n⏱️ Time left: ${timeLeft}s`);

  /* Timer countdown */
  const timer = setInterval(() => {
    timeLeft--;
    if (!answered) {
      process.stdout.write(`\r⏱️ Time left: ${timeLeft}s `);
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (!answered) {
        console.log("\n⏰ Time's up!");
        nextQuestion();
      }
    }
  }, 1000);

  /* Ask for user input */
  rl.question("\nYour answer (1-4): ", (input) => {
    answered = true;
    clearInterval(timer);

    const choiceIndex = Number(input) - 1;

    if (choiceIndex === current.correct) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log(`❌ Wrong! Correct answer: ${current.answers[current.correct]}`);
    }

    setTimeout(nextQuestion, 1500);
  });
}

/* NEXT QUESTION FUNCTION */
 
function nextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    askQuestion();
  } else {
    endGame();
  }
}

/* END GAME FUNCTION */
function endGame() {
  console.clear();
  console.log("🎉 Quiz Finished!");
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  console.log(`✔️ Correct Answers: ${score}`);
  console.log(`❌ Incorrect Answers: ${totalQuestions - score}`);
  console.log(`📊 Score Percentage: ${percentage}%`);

  rl.close();
}

/* START GAME */
setTimeout(askQuestion, 1500);

