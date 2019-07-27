const seconds = document.querySelector('#seconds');
const correctAnswer = document.querySelector('.correct')
const incorrectAnswer = document.querySelector('.incorrect')
let wins = 0;
let losses = 0;
let unanswered = 0;
let click;
let timeOver;



function updateSeconds()  {
    let secondsRemaining = 5;
    if(!timeOver) {
        let countDown = setInterval(() => {
            secondsRemaining--;
            seconds.textContent = secondsRemaining;
            console.log(secondsRemaining)
            if (secondsRemaining < 1) {
                // clearInterval(countDown)
                secondsRemaining = 5
                timeOver = true;
                timeRanOut()
                
            }
        }, 1000);
    }
}


updateSeconds()

document.addEventListener('click', (event) => {
    let clicked = event.target.id;
    if (clicked === 'correct') {
        click = true
        console.log('you guessed correct')
    } else if (clicked === 'incorrect') {
        click = true
        console.log('wrong again idiot')
    } 
    

})

function timeRanOut() {
    if (timeOver && !click) {
        unanswered++;
        console.log('unanswered: ', unanswered)
    }
}

