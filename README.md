# TriviaGame

## created using HTML, CSS, JavaScript, and jQuery

## Instructions

- the user is presented with a series of questions
- answer each question by clicking on the displayed answers
- answer the question before the time runs out!
  - if time runs out, the game will proceed to the next question
- when the game is over, click the reset button to play again.

## Code Overview

I used constructors to create each question object. The currentQuestion variable cycles through each object to display the question to the page. Each constructed object has a method for: displaying the question, displaying if the answer was correct, displaying if the answer was incorrect, displaying if the time was up. These constructors are mostly adding and removing classes to ensure the disred item is displayed to the page.
The downside to how I created these objects to dynamically update the content of the HTML is that the answers all show up in the same order, with the correct answer listed first.

Each question uses setInterval to set a time limit to answer the questions. When the question is answered, or time runs out, the correspanding display is presented to the user with a setTimeout for 4 seconds, before moving on to the next question.

[] todo: display answers in random order

## Deployed Project

try the game out here:
https://gmocore.github.io/TriviaGame/
