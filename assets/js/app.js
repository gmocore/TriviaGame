const seconds = document.querySelector('#seconds');
const correctAnswer = document.querySelector('.correct')
const incorrectAnswer = document.querySelector('.incorrect')
let wins = 0;
let losses = 0;
let unanswered = 0;
let timeOver;
let countDown
let questionsRemaining = 2;
let currentQuestion = 0;



function updateSeconds()  {
    let secondsRemaining = 5;
    if(!timeOver) {
         countDown = setInterval(() => {
            secondsRemaining--;
            seconds.textContent = secondsRemaining;
            console.log(secondsRemaining)
            if (secondsRemaining < 1) {
                secondsRemaining = 5
                timeOver = true;
                timeRanOut();
                
            }
        }, 1000);
    }
}


updateSeconds()

document.addEventListener('click', (event) => {
    let clicked = event.target.id;
    if (clicked === 'correct') {
        console.log('you guessed correct');
        $('.answer-box').removeClass('hide');
        $('.correct-text').removeClass('hide');
        $('img').removeClass('hide')
        $('#correct-answer').removeClass('hide')
        clearInterval(countDown)
        updateSeconds()
        questionsRemaining--;

    } else if (clicked === 'incorrect') {
        console.log('wrong again idiot')
        clearInterval(countDown)
        updateSeconds()
        questionsRemaining--;


    } 
    

})

function timeRanOut() {
    if (timeOver) {
        unanswered++;
        questionsRemaining--;
        console.log('unanswered: ', unanswered)
        timeOver = false;
        nextQuestion()
    }
}

function nextQuestion() {
    if(questionsRemaining === 1) {
        $('.question-two-box').removeClass('hide')
        $('.question-box').addClass('hide')
    
    }
}

