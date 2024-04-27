let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let currentClick = 0;
let check = true;

$("body").one("keypress", function () {
  nextSequence();
  $(".container").removeClass("unclickable");
});

$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
  currentClick++;
  if (gamePattern.length === userClickedPattern.length && check === true) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  level++;
  $("h1").text("LEVEL " + level);
  userClickedPattern = [];
  currentClick = 0;
}
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function checkAnswer() {
  if (gamePattern[currentClick] === userClickedPattern[currentClick]) {
    return true;
  } else {
    check = false;
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $(".container").addClass("unclickable");
    $("body").one("keypress", function () {
      gameOver();
      nextSequence();
      $(".container").removeClass("unclickable");
    });
    return false;
  }
}
function gameOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  currentClick = 0;
  check = true;
}
