const questions = [
  {
    question: "HOW MANY TYPES OF HEART ATTACKS R THERE?(10TH LEVEL)",
    options: ["3", "1", "2", "4"],
    answer: "3",
  },
  {
    question: "LAST CHAPTER PERU ENTI?",
    options: ["REPRODUCTION", "RESPIRATORY", "KIDNEY", "ENVIRIONMENTAL CHANGES"],
    answer: "KIDNEY",
  },
  {
    question: "STARCH TEST LO UISE CHESE COMPOUND WEIGHT ENTHA?",
    options: ["127", "123", "150", "143"],
    answer: "150",
  },
  {
    question: "PLANT TISUES PERU ENTI(WATER CARRYING)?",
    options: ["PLATELETS", "ALUVILAI", "PHOLEM", "XYLEM"],
    answer: "XYLEM",
  },
  {
    question: "WHICH SCEIENTIST IS NAMED TO INVENT DNA PAIRING",
    options: ["telidu", "SRK", "AVASARAM LEDU ", "JAMES COOK"],
    answer: "telidu",
  },
  {
    question: "WHAT IS THE OTHER ANEM OF MITOCHONDRIA?",
    options: ["WATER  SUPPLIER", "COOLIE", "KHALEJA", "OXYGEN SUPLIER"],
    answer: "COOLIE",
  },
  {
    question: "WHY DID U CHOOSE BIOLOGY",
    options: ["MATHS RAADHU SAAR", "NAKU BIO LO EKKUVA MARKS VACHEYII", "EMO TELIDU JUST ALA TESSKUNNA", "ALL THE ABOVE"],
    answer: "ALL  THE ABOVE",
  },
  {
    question: "ASALU MANAKU BIO AVASARAMA?",
    options: ["NONE OF THE above", "PAKKA RAVALI", "EMO TELIDU", "LIGHT GA VASTE CHALU"],
    answer: "PAKKA RAVALI",
  },
  {
    question: "DEOXYGENATED BLOOD FIRST EKKADA STORE VASTUNDHI??",
    options: ["RIGHT AURICLE", "LUNGS", "LEFT AURICLE", "EKKADIYANA AVVACHU"],
    answer: "RIGHT AURICLE",
  },
  {
    question: "EELANTI QUIZZ ENKOTI KAVALA?",
    options: ["YESSS ATHI TWARALO", "!=NO", "PREFER NOT SAY", "YES"],
    answer: "YES",
  },
  {
    question: "CHLOROPHYLL NI ACTIVATE CHESE ELEMENT ATOMIC MASS ENTHA?(LUCKY NUMBDER CHUSI PETTADHU)",
    options: ["NAK ASALU AA ELEMENT EE TELIDU", "21", "24", "23"],
    answer: "23",
  },
  {question:"WHAT IS THE NORMAL LIMIT OF SYSTOLE IN A HEALTHY BODY?",
    options:["90","120","150","80"],
    answer:"120",
  },
  {question:"TOTAL O OF VITAMINS IN BODY WHICH ARE FAT SOLUBLE?",
    options:["6","8","5","4"],
    answer:"4",
  },
  {question:"NORMAL NO OF SMOKES PER DAY??",
    options:["3","5","LIMIT IS VARIED","NO LIMIT"],
    answer:"NO LIMIT",

  },
  {question:"WHAT IS THE SCIENTIFIC NAME OF DOGS?",
    options:["SEMIFORMES","FELUIS CATUS","CANIS LUPUS FAMILIARIS","HOMO SAPIENS"],
    answer:"CANIS LUPUS FAMILIARIS",
  },
  {question:"HOW MANY STAGES ARE THERE IN CELL DIVISION OF HAMO SAPIENS?",
    options:["5","4","3","1"],
    answer:"4",
  },
  {question:"WHO IS KNOW AS THE Father OF ORNITHOLOGY",
    options:["ALAXANDER WILSON","PAKSHI RAJ (ROBO 2)","ALLAN HUME","EEGENE BRAUNWALD"],
    answer:"ALAXANDER WILSON",
  },
  {
    question: "which lesson is the below diagram related to :",
    image: "img.jpg", // put your image file (img.jpg) in the same folder as your HTML
    options: ["photosynthesis", "kidney", "transpiration", "cell divison"],
    answer: "photosynthesis",
  }
];

let currentQuestion = 0;
let score = 0;
let userName = "";
let phoneNumber = "";
let timer = null;
let timeLeft = 69;

function startQuiz() {
  userName = document.getElementById("username").value.trim();
  phoneNumber = document.getElementById("phone").value.trim();

  // basic validation (phone length check kept as original)
  if (userName === "" || phoneNumber.length < 10) {
    alert("Please enter valid name and phone number.");
    return;
  }

  // reset state in case of restart
  currentQuestion = 0;
  score = 0;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  document.getElementById("welcome").textContent = `Welcome, ${userName}!`;

  showQuestion();
}

function showQuestion() {
  resetTimer();
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = `Q${currentQuestion + 1}: ${q.question}`;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  // Show image if available (displayed above options)
  if (q.image) {
    const img = document.createElement("img");
    img.src = q.image;
    img.alt = "Question Image";
    img.style.maxWidth = "80%";
    img.style.display = "block";
    img.style.margin = "10px auto";
    img.style.borderRadius = "8px";
    optionsDiv.appendChild(img);
  }

  // create option buttons
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    // styling reset so previously used colors don't persist
    btn.style.background = "";
    btn.style.color = "";
    btn.disabled = false;
    optionsDiv.appendChild(btn);
  });

  // Hide next button until user answers / timeout
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.style.display = "none";

  // Show timer
  const timerBox = document.createElement("p");
  timerBox.id = "timer";
  timerBox.style.color = "#fff";
  timerBox.style.marginTop = "15px";
  timerBox.style.textAlign = "center";
  optionsDiv.appendChild(timerBox);

  startTimer();
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.background = "#4caf50"; // green
      btn.style.color = "#fff";
    } else if (btn.textContent === selected) {
      btn.style.background = "#e53935"; // red
      btn.style.color = "#fff";
    } else {
      btn.style.opacity = "0.9";
    }
  });

  if (selected === correct) score++;

  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.style.display = "none";

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  clearInterval(timer);
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("summary").textContent = `${userName}, you scored ${score} out of ${questions.length}. 📞 ${phoneNumber}`;
}

// TIMER FUNCTIONALITY
function startTimer() {
  // reset any existing timer
  clearInterval(timer);
  timeLeft = 69;
  const timerEl = document.getElementById("timer");
  if (timerEl) timerEl.textContent = `⏱ Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    const tEl = document.getElementById("timer");
    if (tEl) tEl.textContent = `⏱ Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showCorrectOnTimeout();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 69;
}

// When time runs out
function showCorrectOnTimeout() {
  const correct = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.background = "#4caf50"; // green
      btn.style.color = "#fff";
    } else {
      btn.style.background = "#f44336"; // red
      btn.style.color = "#fff";
    }
  });

  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.style.display = "block";
}
