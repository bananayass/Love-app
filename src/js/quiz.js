(function () {
  const questions = [
    {
      question: "Ngày sinh nhật của anh năm nay là...?",
      options: ["28/08", "30/09", "29/09", "19/09"],
      correct: 3,
    },
    {
      question: "Món ăn yêu thích của em là...?",
      options: ["Phở", "Bún chả", "Bánh mì", "Mỳ cay"],
      correct: 3,
    },
    {
      question: "Màu yêu thích của em là...?",
      options: ["Đỏ", "Tím", "Hồng", "Xanh"],
      correct: 2,
    },
    {
      question: "Thứ em thích làm nhất lúc rảnh là...?",
      options: ["Đọc sách", "Nghe nhạc", "Xem phim", "Ngủ"],
      correct: 2,
    },
    {
      question: "Thú cưng nào em thích...?",
      options: ["Mèo", "Chó", "Hamster", "Anh"],
      correct: 3,
    },
    {
      question: "Nếu đi du lịch, em muốn đi đâu...?",
      options: ["Biển", "Núi", "Thành phố", "Đâu cũng được"],
      correct: 3,
    },
    {
      question: "Tính cách em thế nào...?",
      options: ["Hướng nội", "Hướng ngoại", "Mixed", "Siêu năng động"],
      correct: 0,
    },
    {
      question: "Anh làm em vui nhất bằng cách...?",
      options: ["Mua quà", "Nấu ăn", "Thả thính", "Ôm紧紧的"],
      correct: 3,
    },
    {
      question: "Loại nhạc em nghe nhiều nhất...?",
      options: ["Pop", "Bolero", "Hàn quắc", "Hip-hop"],
      correct: 2,
    },
    {
      question: "Điều khiến em bực nhất là...?",
      options: ["Nói dối", "Thiếu quan tâm", "Ít nhắn tin", "Tất cả luôn"],
      correct: 3,
    },
  ];

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  const questionCard = document.getElementById("questionCard");
  const questionNumber = document.getElementById("questionNumber");
  const questionText = document.getElementById("questionText");
  const optionsContainer = document.getElementById("optionsContainer");
  const progressFill = document.getElementById("progressFill");
  const scoreNum = document.getElementById("scoreNum");
  const resultContainer = document.getElementById("resultContainer");
  const resultScore = document.getElementById("resultScore");
  const resultMessage = document.getElementById("resultMessage");
  const retryBtn = document.getElementById("retryBtn");
  const bgDeco = document.getElementById("bgDeco");

  /* ===== Background Decorations ===== */
  function initBackground() {
    // Floating hearts
    const hearts = ["❤️", "💕", "💖", "🌸", "🎀", "💗", "🤍", "💓"];
    for (let i = 0; i < 25; i++) {
      const el = document.createElement("div");
      el.className = "bg-heart";
      el.textContent = hearts[i % hearts.length];
      el.style.left = Math.random() * 100 + "%";
      el.style.fontSize = Math.random() * 18 + 12 + "px";
      el.style.animationDuration = Math.random() * 10 + 8 + "s";
      el.style.animationDelay = Math.random() * 15 + "s";
      bgDeco.appendChild(el);
    }

    // Kitty popup decorations
    const kittyPositions = [
      { top: "8%", left: "3%", size: 80, delay: "0s" },
      { top: "15%", right: "4%", size: 70, delay: "0.8s" },
      { top: "40%", left: "2%", size: 60, delay: "1.5s" },
      { top: "55%", right: "3%", size: 90, delay: "0.3s" },
      { top: "75%", left: "5%", size: 75, delay: "1.2s" },
      { top: "70%", right: "5%", size: 65, delay: "0.6s" },
    ];
    kittyPositions.forEach(function (pos) {
      var kitty = document.createElement("div");
      kitty.className = "kitty-popup";
      kitty.style.top = pos.top;
      if (pos.left) kitty.style.left = pos.left;
      if (pos.right) kitty.style.right = pos.right;
      kitty.style.width = pos.size + "px";
      kitty.style.height = pos.size + "px";
      kitty.style.animationDuration = Math.random() * 2 + 3 + "s";
      kitty.style.animationDelay = pos.delay;
      kitty.innerHTML = '<img src="../images/hellokittyyy.jpg" alt="Kitty" />';
      bgDeco.appendChild(kitty);
    });

    // Star sparkles
    var stars = ["⭐", "✨", "🌟", "💫"];
    var starPos = [
      { top: "5%", left: "20%" }, { top: "12%", left: "80%" },
      { top: "30%", left: "6%" }, { top: "25%", left: "88%" },
      { top: "50%", left: "10%" }, { top: "48%", left: "85%" },
      { top: "65%", left: "7%" }, { top: "70%", left: "88%" },
      { top: "85%", left: "15%" }, { top: "82%", left: "78%" },
    ];
    starPos.forEach(function (p, i) {
      var s = document.createElement("div");
      s.className = "bg-star";
      s.textContent = stars[i % stars.length];
      s.style.top = p.top;
      s.style.left = p.left;
      s.style.animationDelay = i * 0.4 + "s";
      bgDeco.appendChild(s);
    });
  }

  /* ===== Quiz Logic ===== */
  function loadQuestion() {
    answered = false;
    var q = questions[currentQuestion];

    questionCard.classList.remove("slide-in");
    questionCard.classList.add("slide-out");

    setTimeout(function () {
      questionNumber.textContent = "Câu " + (currentQuestion + 1) + " / " + questions.length;
      questionText.textContent = q.question;
      progressFill.style.width = (currentQuestion / questions.length) * 100 + "%";

      optionsContainer.innerHTML = "";
      var bows = ["🎀", "🌸", "💖", "🎀", "💕"];
      q.options.forEach(function (opt, idx) {
        var btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = "<span>" + bows[idx % bows.length] + " " + opt + "</span>";
        btn.addEventListener("click", function () { return selectAnswer(idx); });
        optionsContainer.appendChild(btn);
      });

      questionCard.classList.remove("slide-out");
      questionCard.classList.add("slide-in");
    }, 380);
  }

  function selectAnswer(idx) {
    if (answered) return;
    answered = true;

    var q = questions[currentQuestion];
    var buttons = optionsContainer.querySelectorAll(".option-btn");
    buttons.forEach(function (b) { b.disabled = true; });

    if (idx === q.correct) {
      buttons[idx].classList.add("correct");
      score++;
      scoreNum.textContent = score;
      for (var i = 0; i < 4; i++) {
        setTimeout(spawnHeart, i * 180);
      }
    } else {
      buttons[idx].classList.add("wrong");
      buttons[q.correct].classList.add("reveal-correct");
    }

    setTimeout(function () {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }, 1300);
  }

  function spawnHeart() {
    var heart = document.createElement("div");
    heart.className = "floating-heart";
    var hearts = ["❤️", "💕", "🎀", "💖", "🌸"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 75 + 8 + "%";
    heart.style.top = Math.random() * 45 + 25 + "%";
    document.body.appendChild(heart);
    setTimeout(function () { heart.remove(); }, 1800);
  }

  function showResult() {
    progressFill.style.width = "100%";
    questionCard.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    resultScore.textContent = score + " / " + questions.length;

    if (score === questions.length) {
      resultMessage.textContent = "Woww perfect!! Bé giỏiiiii quáaaa! 💖";
    } else if (score >= 7) {
      resultMessage.textContent = "Bé của anh giỏi quá trời! 💕";
    } else if (score >= 5) {
      resultMessage.textContent = "Tàm tạm nha bé ê hề 😅";
    } else {
      resultMessage.textContent = "Bé thật sự hiểu bé không vị lắm đấy... 🥺";
    }

    for (var i = 0; i < 10; i++) {
      setTimeout(spawnHeart, i * 200);
    }
  }

  function reset() {
    currentQuestion = 0;
    score = 0;
    scoreNum.textContent = 0;
    resultContainer.classList.add("hidden");
    questionCard.classList.remove("hidden");
    loadQuestion();
  }

  retryBtn.addEventListener("click", reset);

  initBackground();
  loadQuestion();
})();
