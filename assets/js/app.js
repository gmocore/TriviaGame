//  VARIABLES
const seconds = document.querySelector("#seconds");
let wins = 0;
let losses = 0;
let unanswered = 0;
let timeOver;
let countDown;
let currentQuestion = 0;
let secondsRemaining;

// QUESTION OBJECT CONSTRUCTOR

function Trivia(
  name,
  question,
  correctAnswer,
  incorrectAnswerOne,
  incorrectAnswerTwo,
  incorrectAnswerThree,
  img,
  correctText,
  incorrectText
) {
  this.name = name;
  this.question = question;
  this.correctAnswer = correctAnswer;
  this.incorrectAnswerOne = incorrectAnswerOne;
  this.incorrectAnswerTwo = incorrectAnswerTwo;
  this.incorrectAnswerThree = incorrectAnswerThree;
  this.img = img;
  this.correctText = correctText;
  this.incorrectText = incorrectText;
  // displays the current question
  this.displayQuestion = function() {
    $(".intro").addClass("hide");
    $(".question-box").removeClass("hide");
    $(".question").removeClass("hide");
    $(".question").text(question);
    $(".answers").removeClass("hide");
    $(".answers").css({ color: "#fdfffc" });
    $("#correct").text(correctAnswer);
    $("#incorrect-one").text(incorrectAnswerOne);
    $("#incorrect-two").text(incorrectAnswerTwo);
    $("#incorrect-three").text(incorrectAnswerThree);
    $("img").addClass("hide");
    $(".incorrect-text").addClass("hide");
    $(".correct-text").addClass("hide");
    $("#incorrect-answer").addClass("hide");
    $("#correct-answer").addClass("hide");
    $("#correct").css({ "text-decoration": "none" });
  };
  // updates page if answer is incorrect
  this.updatePageCorrect = function() {
    $(".question").text(question);
    $(".answers").removeClass("hide");
    $("#correct").text(correctAnswer);
    $("img").removeClass("hide");
    $("img").attr("src", img);
    $(".correct-text").text(correctText);
    $(".correct-text").removeClass("hide");
    $(".incorrect-text").addClass("hide");
    $("#incorrect-answer").addClass("hide");
    $("#correct-answer").removeClass("hide");
  };
  // updates page if incorrect
  this.updatePageIncorrect = function() {
    $("#correct").css({ "text-decoration": "underline" });
    $(".answers").css("color", "#FF9770");
    $("img").removeClass("hide");
    $("img").attr("src", img);
    $(".incorrect-text").text(incorrectText + this.correctAnswer);
    $(".incorrect-text").removeClass("hide");
    $(".correct-text").addClass("hide");
    $("#incorrect-answer").removeClass("hide");
    $("#correct-answer").addClass("hide");
  };
  // update spage if time runs out
  this.timesUp = function() {
    $("#correct").css({ "text-decoration": "underline", color: "green" });
    $(".answers").css("color", "#FF9770");
    $("img").removeClass("hide");
    $("img").attr("src", img);
    $(".incorrect-text").text(
      "time is up, the correct answer is " + this.correctAnswer
    );
    $(".incorrect-text").removeClass("hide");
    $(".correct-text").addClass("hide");
    $("#incorrect-answer").removeClass("hide");
    $("#correct-answer").addClass("hide");
  };
}

//CONSTRUCTED QUESTION OBJECTS

const theTown = new Trivia(
  "The Town",
  "which of these films was not directed by Martin Scorsese?",
  "The Town",
  "The Last Temptation of Christ",
  "Taxi Driver",
  "Shutter Island",
  "./assets/images/download.jpg",
  "Correct!, The Town was Directed by Ben Afleck",
  `Incorrect, the answer is `
);

const goodfellas = new Trivia(
  "Goodfellas",
  "what film robbed goodfellas of the oscar in 1990?",
  "Dances With Wolves",
  "Awakenings",
  "Ghost",
  "The Hunt for Red October",
  "./assets/images/dances-with-wolves.jpg",
  "Correct! Dances With Wolves went all manifest destiny on Goodfellas",
  "Incorrect, the answer is "
);

const americanPsycho = new Trivia(
  "American Psycho",
  "who was originally cast to the the role of Patrick Bateman in American Psycho?",
  "Leonardo DiCaprio",
  "Mark Wahlberg",
  "Jason Bateman",
  "Meryl Streep",
  "./assets/images/patrick.png",
  "Correct! babyface Leo almost got to bathe in the bloodshed",
  "Incorrect. the correct answer is "
);

const superHero = new Trivia(
  "",
  "Why are superhero movies so popular?",
  "there is literally no logical reason",
  "they are good",
  "special effects are neat",
  "the writing is groundbreaking",
  "./assets/images/superhero.jpg",
  "Correct! we should probably blame the audience as well as lazy hollywood writers",
  "incorrect, the answer is "
);

// ARRAY TO STORE OBJECTS

const questionsArray = [theTown, goodfellas, americanPsycho, superHero];

// FUNCTIONS

// updates the countdown
function updateSeconds() {
  secondsRemaining = 5;
  if (!timeOver) {
    countDown = setInterval(() => {
      secondsRemaining--;
      seconds.textContent = secondsRemaining;
      console.log(secondsRemaining);
      if (secondsRemaining < 1) {
        secondsRemaining = 5;
        timeOver = true;
        timeRanOut();
      }
    }, 1000);
  }
}

//reset the timer
function resetTimer() {
  secondsRemaining = 5;
  countDown = setInterval(() => {
    secondsRemaining--;
    seconds.textContent = secondsRemaining;
    console.log(secondsRemaining);
    if (secondsRemaining < 1) {
      timeOver = true;
      timeRanOut();
    }
  }, 1000);
}

//handles unanswered/no click event
function timeRanOut() {
  if (timeOver) {
    unanswered++;
    console.log("unanswered: ", unanswered);
    timeOver = false;
    questionsArray[currentQuestion].timesUp();
    clearInterval(countDown);
    setTimeout(() => {
      questionGenerator();
    }, 2000);
    currentQuestion++;
    gameOver();
  }
}

// displays current question
function questionGenerator(index) {
  // TODO: Pick one at random.
  index = currentQuestion;
  if (currentQuestion < 4) {
    questionsArray[index].displayQuestion();
    clearInterval(countDown);
    resetTimer();
  }
}

//check if the game is over
function gameOver() {
  if (currentQuestion > 3) {
    clearInterval(countDown);
    // currentQuestion = 0;
    $(".game-over").removeClass("hide");
    $(".game-container").addClass("hide");
    $("#correct-points").text(wins);
    $("#incorrect-points").text(losses);
    $("#unanswered-points").text(unanswered);
  }
}

//resets game to default values
function resetGame() {
  currentQuestion = 0;
  wins = 0;
  losses = 0;
  unanswered = 0;
  questionGenerator(currentQuestion);
}

// EVENT LISTENERS

$(".answers").on("click", event => {
  let clicked = event.target.id;
  if (clicked === "correct") {
    console.log("you guessed correct");
    wins++;
    questionsArray[currentQuestion].updatePageCorrect();
    clearInterval(countDown);
    setTimeout(() => {
      // updateSeconds();
      currentQuestion++;
      gameOver();
      questionGenerator();
    }, 3000);
  } else if (clicked.includes("incorrect")) {
    console.log("wrong again idiot");
    questionsArray[currentQuestion].updatePageIncorrect();
    losses++;
    gameOver();
    clearInterval(countDown);
    setTimeout(() => {
      currentQuestion++;
      gameOver();
      questionGenerator();
    }, 3000);
  }
});

$("#start").on("click", function() {
  updateSeconds();
  questionsArray[currentQuestion].displayQuestion();
  $("#start").addClass("hide");
});

$("#reset").on("click", function() {
  $(".game-container").removeClass("hide");
  $(".game-over").addClass("hide");
  resetGame();
});
