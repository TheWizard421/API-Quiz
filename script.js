$(document).ready(function() {
    var timeLeft = 120;
    $('#questionBox').hide()
var timeInterval;
var scoreList = [];

var questions = [
    {
        question: "What's the name of Boba Fett's ship?",
        answers: ['1. Slave I' , '2. Master I' , '3. Millennium Falcon', '4. Stardust'],
        correctAnswer: '1. Slave I'
    },
    {
        question: "What is Mando's real name from The Mandalorian?",
        answers: ['1. Dagobah', '2. Anakin Skywalker', '3. Poe Dameron', '4. Din Djarin'],
        correctAnswer: '4. Din Djarin'
    },
    {
        question: "According to Yoda, there are always how many Sith Lords… no more, no less?",
        answers: ['1 Sith', '2 Sith', '8 Sith', '100 Sith'],
        correctAnswer: '2 Sith'
    },
    {
        question: "The Lion King's Mufasa and which Star Wars character were voiced by the same actor (James Earl Jones)?",
        answers: ['1. R2-D2', '2. Darth Sidious', '3. Darth Vader', '4. Jango Fett'],
        correctAnswer: '3. Darth Vader'
    },
    {
        question: "According to Luke, confronting what is the destiny of a Jedi?",
        answers: ['1. Fear', '2. Sith', '3. Evil', "4. Destiny it's self"],
        correctAnswer: '1. Fear'
    },
    {
        question: "What episode is Attack of the Clones?",
        answers: ['I', 'II', 'III', 'IV'],
        correctAnswer: 'II'
    },
    {
        question: "Palpatine gave the command to execute what Order in Revenge of the Sith?",
        answers: ['1. A Cheese Burger and Fries', 'Order 66', 'Order 65', 'Order: Kill the Jedi'],
        correctAnswer: 'Order 66'
    },
    {
        question: "What episode is The Phantom Menace?",
        answers: ['I', 'III', 'IV', 'VI'],
        correctAnswer: 'I'
    },
    {
        question: "Question: What episode is Return of the Jedi?",
        answers: ['III', 'VI', 'IV', 'V'],
        correctAnswer: 'VI'
    }
]
// questions[1].correct = 5
var currentQ = 0
var endgame = () => {
    console.log('game over!')
    $("#quiz-container").hide()
    $("#initial-box").show()
    clearInterval(timeInterval)
}
var Highscore = () => {
    $('#initial-box').hide()
    $("#quiz-container").hide()
    $('#highscore-container').show()
    scoreList =  JSON.parse(localStorage.getItem('scores'))
    console.log(scoreList)
    for (var i = 0; i < scoreList.length; i++) {
    $('#score-list').append(`<ul>${scoreList[i].initials}  ${scoreList[i].timeLeft}</ul>`)
    }
}

const countdown = () => {
    timeInterval = setInterval(function() {
      if (timeLeft > 1) {
        $('#Timer').text( timeLeft + ' seconds remaining');
        timeLeft--;
      } else if (timeLeft === 1) {
        $('#Timer').text( timeLeft + ' second remaining');
        timeLeft--;
      } else {
        $('#Timer').text('');
        clearInterval(timeInterval);
        endgame();
      }
    }, 1000);
  }

//a function made to render the data for each question to the screen (use jquery methods to create a heading and list items)
    //call this when the quiz starts, and after each question is answered
function startQuiz(){
    countdown();
    $("#startButton").hide();
    $('#questionBox').show();
    generateQuiz();
}

    function generateQuiz() {
        $("#question").text(questions[currentQ].question)
        $("#answerOne").text(questions[currentQ].answers[0])
        $("#answerTwo").text(questions[currentQ].answers[1])
        $("#answerThree").text(questions[currentQ].answers[2])
        $("#answerFour").text(questions[currentQ].answers[3])
        // and so on
    }

    // hide the start button and show the question box
    

    // populate the question block with the first question and possible answers
    // the answers should have a class that has a listener attached
    // when the user clicks that element with that class, get the value and compare it to questions[currentQ].correct
    // do things related to whether or not the answer was correct
    // for questions do a for loop that populates each answer and attaches a class that is listenable


//function that runs when answer is selected

    function answer() {
        console.log($(this).text());
        if ($(this).text() != questions[currentQ].correctAnswer) {
            
            timeLeft += -10;
        }
        currentQ += 1;
        if (currentQ === questions.length) {
          endgame()
        } else {
            generateQuiz()
        }}
    

    //check the answer and penalize if wrong (10 Seconds)
    //raise currentQ by 1 (currentQ += 1)
    //render next question










$('#startButton').click(startQuiz)
$('#answerOne').click(answer)
$('#answerTwo').click(answer)
$('#answerThree').click(answer)
$('#answerFour').click(answer)
$('#initial-submit').click(function() { 
    var initials = $('#initial-text').val().trim()
    var currentScore = {initials, timeLeft}
    scoreList =  JSON.parse(localStorage.getItem('scores')) || []
    scoreList.push(currentScore)
    localStorage.setItem('scores', JSON.stringify(scoreList))
    Highscore()
})
$('#HighscoreButton').click(Highscore)
$('#exit-list').click(function() {
    window.location.reload()
})
// startQuizButton.addEventListener('click', startQuiz);
//SubmitAnswersButton.addEventListener('click', results);

});