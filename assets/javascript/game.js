var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 

var seconds; 
var time; 

var answered; 
var userSelect;

var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

var triviaQuestions = [
  {
	question: "A cat has how many whiskers, on average?",
	answerList: ["8", "12", "16", "24"],
	answer: 3
  },
  {
	question: "Do cats have fewer teeth than dogs have or more?",
	answerList: ["Fewer", "double", "Triple", "Same"],
	answer: 0
  },
  {
	question: "All of the following are the names of cat breeds, except:",
	answerList: ["Balinese", "Beauceron", "Birman", "Burmilla"],
	answer: 1
  },
  {
	question: "The thick hair around the face of some cats (such as Persians) is called:",
	answerList: ["Shock", "Pelt", "Ruff", "Mane"],
	answer: 2
  },
  {
	question: "Cats can’t taste this:",
	answerList: ["Sour", "Sweet", "Salty", "Bitter"],
	answer: 1
  },
  {
	question: "What’s the total number of claws that most house cats have?",
	answerList: ["A twitching tail means I’m getting irritated.", "A tail tucked underneath the body means I’m hungry.", "A cat’s tail held high means I’m happy.", "A thumping tail means I’m totally frustrated!"],
	answer: 1
  },
  {
	question: "What’s it called when a cat rubs the side of her head on you or on furniture?",
	answerList: ["Beaning", "Tagging", "Bunting", "Brocking"],
	answer: 2
  }];


$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});


function newGame(){
  
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
  
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
  
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
  
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	
  for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click', function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText =         triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered === true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered === true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
 	}
  
