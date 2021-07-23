var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var score = 0;



  GameStart();
  

function GameStart(){
  $(document).keypress(function(){
    if(!started){
      $("#Score").text("Score " + score);
    getSequence();
    playCurrentButton(gamePattern[0]);
    started = true;
    }
  })
}



$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});




function getSequence(){  
  userClickedPattern = [];
  
  $("#Score").text("Score " + score);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  score++;
}
 function playCurrentButton(buttonColour){
  $("#" + buttonColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(buttonColour);
 }


 function currentPattern(pattern,len){
   setInterval(function(){
     for(var i=0;i<len;i++){
     playCurrentButton(pattern[i]);
   }
  },500);
 }

 function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      console.log(currentPattern(gamePattern,gamePattern.len));
   //   setTimeout(function () {
        getSequence();
        console.log(currentPattern(gamePattern,gamePattern.len));
        
     // }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#Score").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  score = 0;
  gamePattern = [];
  started = false;
}