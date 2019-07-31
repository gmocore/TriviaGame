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
  this.displayQuestion = function() {
    $(".question").removeClass("hide");
    $(".question").text(question);
    $(".answers").removeClass("hide");
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
    // $(".answers").css("color", "black");
  };
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
  this.timesUp = function() {
    $("#correct").css({ "text-decoration": "underline" });
    $(".answers").css("color", "#FF9770");
    $("img").removeClass("hide");
    $("img").attr("src", img);
    $(".incorrect-text").text("time is up, the correct answer is " + this.name);
    $(".incorrect-text").removeClass("hide");
    $(".correct-text").addClass("hide");
    $("#incorrect-answer").removeClass("hide");
    $("#correct-answer").addClass("hide");
  };
}

//CONSTRUCTED QUESTION OBJECTS

const theTown = new Trivia(
  "The Town",
  "which of these films was not directed by Martin Scoresese?",
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
  "Correct! babyface Leo almost got to bathe in the bloodbath",
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

function resetTimer() {
  secondsRemaining = 5;
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

function timeRanOut() {
  if (timeOver) {
    unanswered++;
    console.log("unanswered: ", unanswered);
    timeOver = false;
    questionsArray[currentQuestion].timesUp();
    setTimeout(() => {
      questionsArray[currentQuestion].displayQuestion();
    }, 2000);
    currentQuestion++;
    gameOver();
  }
}

function questionGenerator(index) {
  // TODO: Pick one at random.
  index = currentQuestion;
  questionsArray[index].displayQuestion();
  clearInterval(countDown);
  resetTimer();
}

function gameOver() {
  if (currentQuestion > 3) {
    clearInterval(countDown);
    currentQuestion = 0;
  }
}

// EVENT LISTENERS

document.addEventListener("click", event => {
  let clicked = event.target.id;
  if (clicked === "correct") {
    console.log("you guessed correct");
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
    // updateSeconds();
    currentQuestion++;
    gameOver();
    clearInterval(countDown);
  }
});

$("#start").on("click", function() {
  console.log(this);
  updateSeconds();
  questionsArray[currentQuestion].displayQuestion();
  gameOver();
});
