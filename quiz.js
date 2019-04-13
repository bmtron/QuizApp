const dataStore = [ //collection of all the necessary data for the quiz, including questions, possible answers, and the correct answer
    {
      question: 'Finish this phrase: \'No one expects the ___!\'',
      choice1: 'FBI',
      choice2: 'Spanish Inquisition',
      choice3: 'Unexpected',
      choice4: 'Dead Parrot',
      correct: 'Spanish Inquisition'
    },
    {
      question: 'Which member of the Monty Python troupe was responsible for the bizarre animation sequences?',
      choice1: 'Terry Jones',
      choice2: 'Erice Idle',
      choice3: 'John Cleese',
      choice4: 'Terry Gilliam',
      correct: 'Terry Gilliam'
    },
    {
      question: 'Which phrase from ‘The Life of Brian’ has often been considered the one of the funniest movie quotes of all time?',
      choice1: '“Always look on the bright side of life.”',
      choice2: '“He’s not the messiah! He’s a very naughty boy! Now go away!”',
      choice3: '“I’m not the messiah!”',
      choice4: 'None. The movie isn’t very funny at all.',
      correct: '“He’s not the messiah! He’s a very naughty boy! Now go away!”'
    },
    {
      question: 'What Monty Python feature film was a satirical take on the adventures of King Arthur?',
      choice1: 'The Meaning of Life',
      choice2: 'The Life of Brian',
      choice3: 'Monty Python and the Holy Grail',
      choice4: 'And Now for Something Completely Different',
      correct: 'Monty Python and the Holy Grail'
    },
    {
      question: 'What is the airspeed of an unladen swallow?',
      choice1: '2 m/s',
      choice2: '4 m/s',
      choice3: '10 km/s',
      choice4: 'African or European?',
      correct: 'African or European?'
    },
    {
      question: 'For how many seasons did Monty Python’s Flying Circus air?',
      choice1: '4',
      choice2: '5',
      choice3: '7',
      choice4: '10',
      correct: '4'
    },
    {
      question: 'What was the name of the Broadway musical based off of the film Monty Python and the Holy Grail?',
      choice1: 'Ham-a-lot',
      choice2: 'Holy Grail: The Musical',
      choice3: 'Spamalot',
      choice4: 'Spam n Ham',
      correct: 'Spamalot'
    },
    {
      question: 'In Monty Python and the Holy Grail, why did King Arthur decide not to go to Camelot?',
      choice1: 'It was rather dirty.',
      choice2: 'Tis a silly place',
      choice3: 'It was too far away',
      choice4: 'It was too small',
      correct: 'Tis a silly place'
    },
    {
      question: 'Which two members of Monty Python starred in the Dead Parrot sketch?',
      choice1: 'John Cleese and Eric Idle',
      choice2: 'Eric Idle and Terry Jones',
      choice3: 'Michael Palin and Graham Chapman',
      choice4: 'John Cleese and Michael Palin',
      correct: 'John Cleese and Michael Palin'
    },
    {
      question: 'Finish the phrase: And now, for something completely ____.',
      choice1: 'different',
      choice2: 'the same',
      choice3: 'dull',
      choice4: 'similar',
      correct: 'different'
    }
  ];

let questionN = 0;//the counter for the question number
let userScore = 0;//the counter for the users correct responses

  function handleStart() {//starts the quiz, updates the score to 0, starts the question counter, and renders the main questions to the page
    $('.question-container').on('click', '.start-quiz', event => {
      event.preventDefault();
      
      $('.ready-start').remove();
      updateUserScore();
      renderQuestions(questionN);
      $('.selection').addClass('not-selected');
      questionCount(questionN + 1);
    });
}
function changeSelectionColor() {
  $('.question-container').on('click', '.selection', event => {
    $('.selection').removeClass('not-selected');
    let currentSelection = $(event.currentTarget);
    let notSelected = $('.selection').not(currentSelection);
    notSelected.removeClass('user-selection-color');
    notSelected.addClass('not-selected');
    currentSelection.addClass('user-selection-color');
    console.log('this clicked');
  });
}
function renderQuestions(num) {//renders the main screen that contains a question and a list of possible responses
  $('.question-container').append(`<form class="question-box">
    <fieldset class="main-field" for="questions">
        <legend class="question-header"><p class="question-display-number">Question ${num + 1}.</p> <p class="question-content">${dataStore[num].question}</p></legend>
        <label class="selection"><input type="radio" name="choice" id="questions" tabindex="0" value="${dataStore[num].choice1}"/><p id="js-choice-one">${dataStore[num].choice1}</p></label><br>
        <label class="selection"><input type="radio" name="choice" id="questions" tabindex="0" value="${dataStore[num].choice2}"/><p id="js-choice-two">${dataStore[num].choice2}</p></label><br>
        <label class="selection"><input type="radio" name="choice" id="questions" tabindex="0" value="${dataStore[num].choice3}"/><p id="js-choice-three">${dataStore[num].choice3}</p></label><br>
        <label class="selection"><input type="radio" name="choice" id="questions" tabindex="0" value="${dataStore[num].choice4}"/><p id="js-choice-four">${dataStore[num].choice4}</p></label><br>
      </fieldset>
      <button type="submit" class="submit-answer">Submit</button>
    </form>`);
}

function renderCorrectResults() {//renders the results screen for when the user was correct
  if(questionN === 9) {
    renderCorrectFinish();
    updateUserScore();
  }
  else {
    $('.question-container').append(`<section class="results-box correct">
    <p>Correct!</p>
    <p>Your current score: ${userScore}/10</p>
    </section>
    <section class="submit-buttons"><button type="submit" class="next-question">Next Question</button></section>`);
    updateUserScore();
  }
}

function renderWrongResults() {//renders the results screen for when the user was wrong
  if (questionN === 9){
    renderWrongFinish();
  }
  else {
  $('.question-container').append(`<section class="results-box wrong">
  <p>Wrong!</p>
  <p>The correct answer is ${dataStore[questionN].correct}!</p>
  <p>Your score: ${userScore}/10</p>
  </section>
  <section class="submit-buttons"><button type="submit" class="next-question">Next Question</button></section>`);
  }
}

function handleSubmitClick() {//runs user selection to see if the correct answer was selected 
  $('.question-container').on('click', '.submit-answer', event =>{
    event.preventDefault();
    userSelection(questionN);
  });
}

function handleNextClick() {//updates the question count and rerenders the question when the next question button is clicked
  $('.question-container').on('click', '.next-question', event => {
    event.preventDefault();
    $('.results-box').remove();
    $('.submit-buttons').remove();
    questionCheck();
  });
}

function questionCount(num) {//updates the question counter at the top of the page
 $('.question-count').text(`Question: ${num}/10`);
}

function userSelection(num) {//checks to see if the users response matches the correct response, then renders the correct results page
 
  let userChoice = $('input:radio[name="choice"]:checked').val();

  if (userChoice){
    answerCheck(userChoice, dataStore[num].correct);
  }
  else if(!userChoice) {
    alert('You must make a selection!');
  }
}

function updateUserScore() {//updates the score at the top of the page
  $('.score-count').text(`Score: ${userScore}/10`);
}

function answerCheck(inputVal, correctVal) {
  if (inputVal === correctVal) {
    userScore = userScore + 1;
    $('.question-box').remove();
    renderCorrectResults();
    }
  else {
  console.log('wrong');
  $('.question-box').remove();
  renderWrongResults();
    }
}

function questionCheck() {//checks to see if the user is on the last question. if they are, once they answer the question, they are prompted to restart the quiz
  if (questionN < 9){
    questionN++;
    console.log(questionN);
    renderQuestions(questionN);
    $('.selection').addClass('not-selected');
    questionCount(questionN + 1);
  }
  else if (questionN === 9){
    $('.final-button').remove();
    renderRestart();
  }
}

function renderRestart() {//renders screen asking user to restart 
  $('.question-container').append(`<section class="ready-start"><p>You finished the quiz! Your final score is ${userScore}/10.</p><p>Start quiz over?</p><button class="start-quiz" type="submit">Start over</button></section>`);
  questionN = 0;
  userScore = 0;
}

function renderWrongFinish() {//changes the button text on the final question 
  $('.question-container').append(`<section class="results-box wrongf">
  <p>Wrong!</p>
  <p>The correct answer was ${dataStore[questionN].correct}!</p>
  <p>Your score is ${userScore}/${questionN + 1}.</p>
  </section>
  <button type="submit" class="next-question final-button">Finish Quiz</button>`);
}

function renderCorrectFinish() {
  $('.question-container').append(`<section class="results-box correct"><p>Correct!</p>
  <p>Your score is ${userScore}/${questionN + 1}</p>
  </section>
  <button type="submit" class="next-question final-button">Finish Quiz</button>`);
}

function handleEverything() {//main callback containing all other relevant callbacks
$(handleSubmitClick);
$(handleStart);
$(handleNextClick);
$(changeSelectionColor);
}

$(handleEverything);//the callback that starts the quiz
