let SOUNDS = {
  red: "./sounds/red.mp3",
  blue: "./sounds/blue.mp3",
  green: "./sounds/green.mp3",
  yellow: "./sounds/yellow.mp3",
  wrong: "./sounds/wrong.mp3",
};

let BUTTON_COLOURS = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let playSound = (sound) => {
  new Audio(SOUNDS[sound]).play();
};

let nextSequence = () => {
  let button = BUTTON_COLOURS[Math.round(Math.random() * 3)];
  gamePattern.push(button);
  $("#" + button)
    .fadeOut(100)
    .fadeIn(100);
  playSound(button);
  level++;
  $("h1").text("Level " + level);
};

$(document).on("keypress", function (e) {
  if (gamePattern.length === 0) nextSequence();
});

$(".btn").click(function (e) {
  userClickedPattern.push(e.target.id);
  playSound(e.target.id);
  animatePress(e.target.id);
  checkAnswer();
});

let animatePress = (currentColour) => {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};

let checkAnswer = () => {
  if (gamePattern.join("") === userClickedPattern.join("")) {
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 500);
  } else if (
    userClickedPattern.join("") !==
    gamePattern.join("").substring(0, userClickedPattern.join("").length)
  ) {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
  }
};
