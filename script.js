const questions = [
    {
      question: "What does CPU stand for?",
      answers: [
        { text: "Central Processing Unit", correct: true },
        { text: "Central Performance Unit", correct: false },
        { text: "Control Panel Unit", correct: false },
        { text: "Central Program Utility", correct: false }
      ]
    },
    {
      question: "What is the brain of the computer?",
      answers: [
        { text: "RAM", correct: false },
        { text: "Motherboard", correct: false },
        { text: "CPU", correct: true },
        { text: "Hard Drive", correct: false }
      ]
    },
    {
      question: "HTML stands for?",
      answers: [
        { text: "HyperText Markup Language", correct: true },
        { text: "HighText Machine Language", correct: false },
        { text: "Hyper Transfer Machine Language", correct: false },
        { text: "None of the above", correct: false }
      ]
    },
    {
      question: "What is the full form of HTTP?",
      answers: [
        { text: "Hypertext Transfer Protocol", correct: true },
        { text: "Hyper Transfer Text Protocol", correct: false },
        { text: "High Transfer Text Protocol", correct: false },
        { text: "None", correct: false }
      ]
    },
    {
      question: "Which language is used for web apps?",
      answers: [
        { text: "PHP", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true },
        { text: "All of the above", correct: false }
      ]
    },
    {
      question: "Which company developed Windows OS?",
      answers: [
        { text: "Google", correct: false },
        { text: "Apple", correct: false },
        { text: "Microsoft", correct: true },
        { text: "IBM", correct: false }
      ]
    },
    {
      question: "Which is not a programming language?",
      answers: [
        { text: "HTML", correct: true },
        { text: "Python", correct: false },
        { text: "C++", correct: false },
        { text: "Java", correct: false }
      ]
    },
    {
      question: "What does RAM stand for?",
      answers: [
        { text: "Random Access Memory", correct: true },
        { text: "Read Access Memory", correct: false },
        { text: "Rapid Action Memory", correct: false },
        { text: "None of these", correct: false }
      ]
    },
    {
      question: "Google Chrome is a?",
      answers: [
        { text: "Operating System", correct: false },
        { text: "Web Browser", correct: true },
        { text: "Search Engine", correct: false },
        { text: "Programming Language", correct: false }
      ]
    },
    {
      question: "What does AI stand for?",
      answers: [
        { text: "Artificial Intelligence", correct: true },
        { text: "Artificial Integration", correct: false },
        { text: "Advanced Intelligence", correct: false },
        { text: "Automatic Interaction", correct: false }
      ]
    }
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const timerElement = document.getElementById("timer");
  const timesUpElement = document.getElementById("times-up");
  
  const correctSound = new Audio("correct.mp3.mp3");
  const wrongSound = new Audio("wrong.mp3.mp3");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  
    startTimer();
  }
  
  function resetState() {
    clearInterval(timer);
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
    timesUpElement.style.display = "none";
  }
  
  function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.innerHTML = timeLeft;
    timesUpElement.style.display = "none";
  
    timer = setInterval(() => {
      timeLeft--;
      timerElement.innerHTML = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        handleTimeOut();
      }
    }, 1000);
  }
  
  function handleTimeOut() {
    timesUpElement.style.display = "block";
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
    wrongSound.play();
  }
  
  function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
  
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
      correctSound.play();
    } else {
      selectedBtn.classList.add("incorrect");
      wrongSound.play();
    }
  
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
  
    nextButton.style.display = "block";
  }
  
  function showScore() {
    clearInterval(timer);
    resetState();
    questionElement.innerHTML = `🎉 You scored ${score} out of ${questions.length}! 🎉`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    timerElement.style.display = "none";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      timerElement.style.display = "block";
      startQuiz();
    }
  });
  
  startQuiz();
  