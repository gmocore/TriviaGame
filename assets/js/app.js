const seconds = document.querySelector("#seconds");
let wins = 0;
let losses = 0;
let unanswered = 0;
let timeOver;
let countDown;
let questionsRemaining = 4;

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
    $(".question").text(question);
    $("#incorrect-one").text(incorrectAnswerOne);
    $("#incorrect-two").text(incorrectAnswerTwo);
    $("#incorrect-three").text(incorrectAnswerThree);
    $("img").addClass("hide");
    $(".incorrect-text").addClass("hide");
    $(".correct-text").addClass("hide");
    $("#incorrect-answer").addClass("hide");
    $("#correct-answer").addClass("hide");
  };
  this.updatePageCorrect = function() {
    // $(".question").text(question);
    $("#correct").text(correctAnswer);
    $("#incorrect-one").fadeOut("slow");
    $("#incorrect-two").fadeOut("slow");
    $("#incorrect-three").fadeOut("slow");
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
    $(".answers").css("color", "red");
    $("img").removeClass("hide");
    $("img").attr("src", img);
    $(".incorrect-text").text(incorrectText + this.name);
    $(".incorrect-text").removeClass("hide");
    $(".correct-text").addClass("hide");
    $("#incorrect-answer").removeClass("hide");
    $("#correct-answer").addClass("hide");
  };
  this.timesUp = function() {
    $("#correct").css({ "text-decoration": "underline" });
    $(".answers").css("color", "red");
    $("img").removeClass("hide");
    $("img").attr("src", img);
    $(".incorrect-text").text("time is up, the correct answer is " + this.name);
    $(".incorrect-text").removeClass("hide");
    $(".correct-text").addClass("hide");
    $("#incorrect-answer").removeClass("hide");
    $("#correct-answer").addClass("hide");
  };
}

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

function updateSeconds() {
  let secondsRemaining = 5;
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

// updateSeconds();

document.addEventListener("click", event => {
  let clicked = event.target.id;
  if (clicked === "correct") {
    console.log("you guessed correct");
    theTown.updatePageCorrect();
    // updateSeconds();
    clearInterval(countDown);
    questionsRemaining--;
  } else if (clicked.includes("incorrect")) {
    console.log("wrong again idiot");
    theTown.updatePageIncorrect();
    // updateSeconds();
    clearInterval(countDown);
    questionsRemaining--;
  }
});

function timeRanOut() {
  if (timeOver) {
    unanswered++;
    questionsRemaining--;
    console.log("unanswered: ", unanswered);
    timeOver = false;
    theTown.timesUp();
  }
}

function questionGenerator() {
  if (questionsRemaining === 4) {
    theTown.displayQuestion();
  } else if (questionsRemaining === 3) {
    goodfellas.displayQuestion();
  }
}
