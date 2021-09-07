// All button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to hold the pattern of steps in the game
var gamePattern = [];

// Array to hold the pattern of the user's clicks
var userClickedPattern = [];

var gameStarted = false;
var level = 0;


/*******************/
/* Event Listeners */
/*******************/

// Event Listener for when one of the buttons are clicked
$(".btn").on("click", function() {
  // Get button clicked and add it to the userClickedPattern array
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Play sound based on button pressed
  playSound($(this).attr("id"));

  // Add animation to button pressed
  animatePress($(this).attr("id"));

  // Check if this is correct
  checkAnswer(userClickedPattern.length-1);
});

// Event Listener for when a key is pressed
$(document).on("keypress", function() {
  if(!gameStarted) {
    startOver()
    $("h1").text("Level " + level);
    nextSequence()
    gameStarted = true;
  }
});


/*************/
/* Functions */
/*************/

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = true;
}

function nextSequence() {
  userClickedPattern = [];

  console.log("calling next sequence...");

  // If this function is called, the user levels up
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor((Math.random()*(3+1)));
  var randomChosenColour = buttonColours[randomNumber];

  // Select a random colour from buttonColours array
  gamePattern.push(randomChosenColour);

  // Flash button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sound
  playSound(randomChosenColour)
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  // Add the class "pressed" to do the animation
  $("." + currentColour).addClass("pressed");

  // Remove added class 0.1 seconds (1000ms)
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    gameStarted = false;

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
  }
}
