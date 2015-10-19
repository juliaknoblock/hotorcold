$(document).ready(function() {
	
var randomNumber; 
var guessAlert;
var guessCount;
var userChoice;
var win = false;

/*--- Display information modal box ---*/

  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

 /*--- Creates Game ---*/
  	newGame();

/*--- Creates new game on click ---*/
  	$(".new").click(function(event) {
  		event.preventDefault();
  		newGame();
  	});

/*--- Resets Game ---*/
function newGame() {
	guessAlert = true;
	guessCount = 0;
	win = false;
	$("ul#guessList li").remove();
	setCount(guessCount);
	randomNumber = createNumber();
	setFocus();
	clearText();
}

/*--- Takes input from submit ---*/
$("form").submit(function(event) {
	event.preventDefault();

	if (!win) {

	userChoice = $("#userGuess").val();
	clearText();
	setFocus();
	guessAlert = validateCheck(userChoice);
		if (!guessAlert) {
		guessCount++;
		setCount(guessCount);
		$("ul#guessList").append("<li>" + userChoice + "</li>");
		guessAlert = checkTemp(Math.abs(randomNumber - userChoice));
		};
	} 
	else {
		setFeedback("You already won. Click New Game to play again!");
		};

});

/*--- Random Number ---*/ 
function createNumber() {
	var createNumber = Math.floor((Math.random() * 100) + 1);
	console.log(createNumber);
	return createNumber;

}

/*--- Validates Input ---*/

function validateCheck(userChoice) {
	if (isNaN(userChoice)) {
		setFeedback("Please only enter numbers!");
		return true;
	}
	if (userChoice === "") {
		setFeedback("Please enter a number!");
		return true;
	}
	if (userChoice < 1 || userChoice > 100) {
		setFeedback("Please only enter a number between 1 and 100.");
		return true;
	}
	else {
		return false;
	};
	
}

/*--- Checks and returns temperature ---*/
function checkTemp(difference) {
	if (difference === 0) {
		setFeedback("You guessed it! You win!");
		win = true;
		return false;
	}
	else if (difference <= 5) {
		setFeedback("Soooo hot!");
		return true;
	}
	else if (difference <= 10) {
		setFeedback("Hotter!!");
		return true;
	}
	else if (difference > 10 && difference <=20) {
		setFeedback("Hot!");
		return true;
	}
	else if (difference > 20 && difference <=30) {
		setFeedback("Getting warmer...");
		return true;
	}
	else if (difference > 30 && difference <=40) {
		setFeedback("Getting cold...");
		return true;
	}
	else if (difference > 40 && difference <= 50) {
		setFeedback("Shivering.");
		return true;
	}
	else {
		setFeedback("Couldn't be colder.");
		return true;
	}

}

/*--- Focus on input ---*/
function setFocus() {
	document.getElementById("userGuess").focus();
}

/*--- Clears box after Guess ---*/
function clearText() {
	$("#userGuess").val("");
}

/*--- Sets Feedback ---*/
function setFeedback(feedback) {
	$("#feedback").text(feedback);
}

/*--- Sets Guess Count ---*/
function setCount(count) {
	$("#count").text(guessCount);
}



});