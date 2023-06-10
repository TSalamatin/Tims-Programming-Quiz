
// Functions Needed:
// 1 Timer to Count down once the game has started
// 1 Counter to keep track of the score
// 1 Span update to confirm correct or wrong
// 4 Spans for Text Changes for questions
// Arrays for questions and answers

var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var questionEl = document.getElementById('question')
var option1El = document.getElementById('option1')
var option2El = document.getElementById('option2')
var option3El = document.getElementById('option3')
var option4El = document.getElementById('option4')
var feedbackEL = document.getElementById('feedback')
var choiceEl = document.getElementById('choiceSelected')
var btns = choiceEl.querySelectorAll('button');
var resetbtnEl = document.getElementById('resetbtn')
var startbtnEL = document.getElementById('startbtn')
var scoreDisp = document.getElementById('currentScore')
var saveEl = document.getElementById('savebtn')
var quizEl = document.getElementById('quiz-container')
var scoreEl = document.getElementById('score-container')
var highEl = document.getElementById('highscore-container')
var newHighscore = document.getElementById('topScore')
var highScores = JSON.parse(localStorage.getItem('highScores')) || []



var noQuestions = false
let currentScore = 0
let topScore = 0

function getTopScore() {
  if (JSON.parse(localStorage.getItem('topScore')) === null) {
    localStorage.setItem('topScore', topScore)
  } else {
    topScore = JSON.parse(localStorage.getItem('topScore'))
  }
}
getTopScore()

function resetQuiz() {
  feedbackEL.textContent = ''
  quizEl.style.display = 'flex'
  scoreEl.style.display = 'none'
  highEl.style.display = 'none'
  questionNum = 0
  newHighscore.textContent = ''
  moveQuestions()
  runGame()
}

function showResults() {
  updateScore()
  console.log('Current Score' + currentScore)
  console.log('Top Score' + topScore)
  if (currentScore > topScore) {
    newHighscore.textContent = 'Congrats! New High Score!'
    topScore = currentScore
    localStorage.setItem('topScore', topScore)

  }

  quizEl.style.display = 'none'
  scoreEl.style.display = 'flex'
  highEl.style.display = 'none'









}


function showScores() {
  document.getElementById('scorelist').innerHTML = ''

  var scoreList = JSON.parse(localStorage.getItem('highScores'))
  scoreList.sort(function (a, b) {
    return parseInt(b.score) - parseInt(a.score)
  })
  for (let index = 0; index < scoreList.length; index++) {
    console.log(scoreList[index].name)
    const node = document.createElement("li")

    node.innerHTML = scoreList[index].name + " - " + scoreList[index].score
    document.getElementById('scorelist').appendChild(node)
  }

  quizEl.style.display = 'none'
  scoreEl.style.display = 'none'
  highEl.style.display = 'flex'

}



// Create Questions and Answers Arrays
var QnAs = [
  {
    question: 'Commonly used Data types are not _____.',
    options: ['Boolean', 'Alerts', 'String', 'Integer'],
    answer: '2'
  },

  {
    question: 'Arrays in Javascript can store ____.',
    options: ['Numbers', 'Symbols', 'Other Arrays', 'All of the above'],
    answer: '4'
  },

  {
    question: 'A very useful tool in debugging is _____.',
    options: ['Javascript', 'Gitbash / Terminal', 'ConsoleLog', 'All of the Above'],
    answer: '3'
  },

  {
    question: 'You can not the style of elemtents in the document by using ____.',
    options: ['Javascript', 'Paint', 'CSS', 'HTML'],
    answer: '2'
  },

];


function moveQuestions() {

  questionEl.textContent = QnAs[questionNum].question
  option1El.textContent = QnAs[questionNum].options[0]
  option2El.textContent = QnAs[questionNum].options[1]
  option3El.textContent = QnAs[questionNum].options[2]
  option4El.textContent = QnAs[questionNum].options[3]
}


function nextQuestion() {
  if (QnAs[questionNum + 1] !== undefined) {
    questionNum++
    moveQuestions()
    console.log("Question # " + questionNum)
  } else {
    noQuestions = true
  }
}

function updateScore() {
  scoreDisp.textContent = "Current Score: " + currentScore
}



//Make the buttons let you select the answer and incremeant the question # to load the next one.
btns.forEach(function (i) {
  i.addEventListener('click', function () {
    console.log("Selected " + i.value);
    console.log("Correct Answer " + QnAs[questionNum].answer)

    if (i.value === QnAs[questionNum].answer) {
      feedbackEL.textContent = "Correct!"
      currentScore++
    } else {
      feedbackEL.textContent = "Wrong!"
    }


    updateScore()
    nextQuestion()

  })
});



function runGame() {
  //Display the option buttons and hide the start button
  noQuestions = false
  updateScore()

  startbtnEL.style.display = 'none';
  quizEl.style.display = 'flex'
  currentScore = 0
  console.log("Game Start")
  //Reset the question Number, start from 0
  questionNum = 0
  //Declare how much time they have
  var timeLeft = 60;
  //Set the Time function
  var timeInterval = setInterval(function () {
    moveQuestions()

    timeLeft--
    timerEl.textContent = "Time Left: " + timeLeft


    //When the timer hits 0 or all the questions are finished, 
    //end the game and display the end page
    if (timeLeft === 0 || noQuestions == true) {

      console.log('Game Over')
      showResults()
      clearInterval(timeInterval)



    }

  }, 1000);

}


saveEl.addEventListener('click', function () {
  var scoreRecord = {
    name: document.getElementById('userName').value,
    score: currentScore
  }

  highScores.push(scoreRecord)
  localStorage.setItem('highScores', JSON.stringify(highScores))

  showScores()
})



startbtnEL.addEventListener('click', runGame)
resetbtnEl.addEventListener('click', resetQuiz)
