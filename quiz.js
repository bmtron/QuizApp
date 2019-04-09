const dataStore = [
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
      question: 'Which phrase from ‘The Life of Brian’ has often been attributed the title of “the funniest line in movies”?',
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

let questionN = 0;
let userScore = 0;

  function handleStart() {
    $('.question-container').on('click', '.start-quiz', event => {
      event.preventDefault();
      $('.ready-start').remove();
      renderQuestions(questionN);
      questionCount(questionN + 1);
    });
}

function renderQuestions(num) {
  $('.question-container').append(`<form class="question-box">
      <fieldset for="questions">
        <p class="question-content">${dataStore[num].question}</p>
        <input type="radio" name="choice" id="questions" value="${dataStore[num].choice1}"/><span id="js-choice-one">${dataStore[num].choice1}</span><br>
        <input type="radio" name="choice" id="questions" value="${dataStore[num].choice2}"/><span id="js-choice-two">${dataStore[num].choice2}</span><br>
        <input type="radio" name="choice" id="questions" value="${dataStore[num].choice3}"/><span id="js-choice-three">${dataStore[num].choice3}</span><br>
        <input type="radio" name="choice" id="questions" value="${dataStore[num].choice4}"/><span id="js-choice-four">${dataStore[num].choice4}</span><br>
      </fieldset>
      <button type="submit" class="submit-answer">Submit</button>
    </form>`);
}

function renderCorrectResults() {
$('.question-container').append(`<section class="results-box"><p>Correct!</p>
<p>Your current score is ${userScore}</p>
<button type="submit" class="next-question">Next Question</button></section>`);
$('.score-count').text(`Score: ${userScore}`);
}

function renderWrongResults() {
  $('.question-container').append(`<section class="results-box"><p>Wrong!</p>
  <p>Your score is ${userScore}</p>
  <button type="submit" class="next-question">Next Question</button></section>`);
}

function handleSubmitClick() {
  $('.question-container').on('click', '.submit-answer', event =>{
    event.preventDefault();
    
    userSelection(questionN);
  });
}

function handleNextClick() {
  $('.question-container').on('click', '.next-question', event => {
    event.preventDefault();
    $('.results-box').remove();
    questionN++;
    renderQuestions(questionN);
    questionCount(questionN + 1);
  });
}

function questionCount(num) {
 $('.question-count').text(`Question: ${num}/10`);
 
}

function userSelection(num) {
  let correctAnswer = dataStore[num].correct;
  let userChoice = $('input:radio[name="choice"]:checked').val();
  if (userChoice){
  if (userChoice === correctAnswer) {
    console.log('correct');
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
else if(!userChoice){
  alert('You must make a selection!');
}
}
$(userSelection);
$(handleSubmitClick);
$(handleStart);
$(handleNextClick);
