var activeTurn = "cross";
var buttonClick1 = new Audio("http://soundbible.com/mp3/Blop-Mark_DiAngelo-79054334.mp3");
var youWin = new Audio("http://soundbible.com/mp3/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3");
var youLose = new Audio("http://soundbible.com/mp3/Kick-SoundBible.com-1331196005.mp3");
var valiableSpace = [1,1,1,1,1,1,1,1,1];
var crosses = [0,0,0,0,0,0,0,0,0];
var noughts = [0,0,0,0,0,0,0,0,0];

var gameMode = "";
var gameDifficulty = "";
var player = "";

var gameResult = "";

var pattern1 = /^1{3}/;
var pattern2 = /^\d{3}1{3}\d{3}$/;
var pattern3 = /^\d{6}1{3}$/;
var pattern4 = /^1\d{2}1\d{2}1\d{2}$/;
var pattern5 = /^\d1\d{2}1\d{2}1\d$/;
var pattern6 = /^\d{2}1\d{2}1\d{2}1$/;
var pattern7 = /^1\d{3}1\d{3}1$/;
var pattern8 = /^\d{2}1\d1\d1\d{2}$/;

$(document).ready(function(){
  $("#one-player").click(function(){
    gameMode = "one-player";
    // Hide game mode choose screen and show difficulty choose
    $("#game-mode-choose").toggle();
    $("#game-difficulties-choose").toggle();
  });

  $("#two-players").click(function(){
    gameMode = "two-players";
    // Hide mode choose page and start game
    $("#game-mode-choose").toggle();
  });

  $(".difficulty-button").click(function(event){
    // console.log(event.currentTarget.innerHTML);
    gameDifficulty = event.currentTarget.innerHTML;
    console.log(gameDifficulty);
    $("#game-difficulties-choose").toggle();
    $("#player-choose").toggle();
  });

  $(".player-button").click(function(event){
    // console.log(event.currentTarget.innerHTML);
    console.log(event.currentTarget.innerHTML);
    if(event.currentTarget.innerHTML === "X") {
      player = "cross";
    } else {
      player = "nought";
    }
    // console.log(player);
    $("#player-choose").toggle();
  });

  $(".normal-button").click(function(event){
    // console.log(event.currentTarget.value);
    var clickedButton = -1;
    var testString = "";
    clickedButton = event.currentTarget.value;
    if (activeTurn === "cross") {
      buttonClick1.play();
      event.currentTarget.innerHTML = "X";
      valiableSpace[clickedButton] = 0;
      crosses[clickedButton] = 1;
      testString = crosses.join("");
      // console.log("crosses string:",testString);
      console.log("In cross: ");
      gameOver(testString);
      noMoreValidSpace(valiableSpace);

      // Computer takes action
      if (gameMode === "one-player") {
        console.log(valiableSpace);
        var move = minimax(valiableSpace, noughts, crosses);
        buttonClick1.play();
        $("button[value='"+ move +"']").html("O");
        // event.currentTarget.innerHTML = "O";
        valiableSpace[move] = 0;
        noughts[move] = 1;
        testString = noughts.join("");
        // console.log("noughts string:",testString);
        console.log("In gameMode: ");
        console.log(testString);
        gameOver(testString);
        noMoreValidSpace(valiableSpace);
      }

    } else {
      // Two players game mode
      buttonClick1.play();
      event.currentTarget.innerHTML = "O";
      valiableSpace[clickedButton] = 0;
      noughts[clickedButton] = 1;
      testString = noughts.join("");
      // console.log("noughts string:",testString);
      gameOver(testString);
      noMoreValidSpace(valiableSpace);
    }

    // for test

    if (gameMode === "two-players") {
      if (activeTurn === "cross") {
        activeTurn = "nought";
      } else {
        activeTurn = "cross";
      }
    }

    // console.log(event.currentTarget.innerHTML);
    // event.currentTarget.innerHTML()="Hi";
  });

  $("#start-over").click(function(event){
    reset();
    $("#game-mode-choose").show();
    $("#game-over").hide();
    $("#game-difficulties-choose").hide();
    $("#player-choose").hide();
    gameMode = "";
    gameDifficulty = "";
    player = "";
  });

  $("#restart").click(function(event){
    reset();
  });
});

var winPattern = function(evalString) {
  // var pattern1 = /^1{3}/;
  // var pattern2 = /^\d{3}1{3}\d{3}$/;
  // var pattern3 = /^\d{6}1{3}$/;
  // var pattern4 = /^1\d{2}1\d{2}1\d{2}$/;
  // var pattern5 = /^\d1\d{2}1\d{2}1\d$/;
  // var pattern6 = /^\d{2}1\d{2}1\d{2}1$/;
  // var pattern7 = /^1\d{3}1\d{3}1$/;
  // var pattern8 = /^\d{2}1\d1\d1\d{2}$/;

  if (pattern1.test(evalString) || pattern2.test(evalString) ||pattern3.test(evalString) ||pattern4.test(evalString) ||pattern5.test(evalString) ||pattern6.test(evalString) ||pattern7.test(evalString) ||pattern8.test(evalString) ) {
    return true;
  } else {
    return false;
  }
}

var gameOver = function(evalString) {
  if (winPattern(evalString)) {
    console.log("You Win!!");
    $("#game-over").toggle();
    // if X wins
    if (activeTurn === "cross" && gameMode === "two-players") {
      $("#game-over-X-win").show();
    }
    //
    // if O wins
    if (activeTurn === "nought" && gameMode === "two-players") {
      $("#game-over-O-win").show();
    }

    if (activeTurn === "nought" && gameMode === "one-player") {
      // $("#game-over-O-win").show();
    }

    if (activeTurn === "nought" && gameMode === "one-player") {
      // $("#game-over-O-win").show();
    }
  }
  // if (pattern1.test(evalString) ) {
  //   console.log("You Win!! Pattern 1");
  // } else if
  // (pattern2.test(evalString) ) {
  //   console.log("You Win!! Pattern 2");
  // } else if
  // (pattern3.test(evalString) ) {
  //   console.log("You Win!! Pattern 3");
  // } else if
  // (pattern4.test(evalString) ) {
  //   console.log("You Win!! Pattern 4");
  // } else if
  // (pattern5.test(evalString) ) {
  //   console.log("You Win!! Pattern 5");
  // } else if
  // (pattern6.test(evalString) ) {
  //   console.log("You Win!! Pattern 6");
  // } else if
  // (pattern7.test(evalString) ) {
  //   console.log("You Win!! Pattern 7");
  // } else if
  // (pattern8.test(evalString) ) {
  //   console.log("You Win!! Pattern 8");
  // }
};

var noMoreValidSpace = function(validSpaceArr) {
  if (validSpaceArr.indexOf(1) === -1) {
    reset();
    gameResult = "It's a draw!"
  }
}

var reset = function () {
  activeTurn = "cross";
  valiableSpace= [1,1,1,1,1,1,1,1,1];
  crosses= [0,0,0,0,0,0,0,0,0];
  noughts= [0,0,0,0,0,0,0,0,0];
  $(".normal-button").each(function(index,item){
    item.innerHTML = "";
  });
  $("#game-over").toggle();
  $("#game-over-X-win").hide();
  $("#game-over-O-win").hide();
  $("#game-over-draw").hide();
  $("#game-over-you-win").hide();
  $("#game-over-you-lose").hide();
}

// var evalString;
//  evalString = "111010100";
// evalString = "000111000";
// evalString = "000000111";
// evalString = "100100100";
// evalString = "010010010";
// evalString = "001001001";
// evalString = "100010001";
// evalString = "001010100";

// gameOver(evalString);

var minimax = function(validSpace, playerArray, oppArray) {
  var validIndex = [];
  // extract the index of valid space for next move
  for(var i = 0; i < validSpace.length; i ++) {
    if(validSpace[i] === 1){
      validIndex.push(i);
    }
  }

  // Case d: 1 in a line with 2 valid space
  var evalValidString = validSpace.join("");
  console.log(evalValidString);
  var pointInSpace0 = 0;
  var pointInSpace1 = 0;
  var pointInSpace2 = 0;
  var pointInSpace3 = 0;
  var pointInSpace4 = 0;
  var pointInSpace5 = 0;
  var pointInSpace6 = 0;
  var pointInSpace7 = 0;
  var pointInSpace8 = 0;

  if (winPattern(evalValidString)) {
    // how to get the winPattern's matching index?
    // validSpace[validIndex]

    if (pattern1.test(evalValidString) ) {
      console.log("IN Pattern 1");
      // index 0 1 and 2 is the index of pattern1
        // score += 1;
        pointInSpace0 ++;
        pointInSpace1 ++;
        pointInSpace2 ++;
    }
    if (pattern2.test(evalValidString) ) {
      console.log("IN Pattern 2");
        // score += 1;
        pointInSpace3 ++;
        pointInSpace4 ++;
        pointInSpace5 ++;
    }
    if (pattern3.test(evalValidString) ) {
      console.log("IN Pattern 3");
        // score += 1;
        pointInSpace6 ++;
        pointInSpace7 ++;
        pointInSpace8 ++;
    }
    if (pattern4.test(evalValidString) ) {
      console.log("IN Pattern 4");
        // score += 1;
        pointInSpace0 ++;
        pointInSpace3 ++;
        pointInSpace6 ++;
    }
    if (pattern5.test(evalValidString) ) {
      console.log("IN Pattern 5");
        // score += 1;
        pointInSpace1 ++;
        pointInSpace4 ++;
        pointInSpace7 ++;
    }
    if (pattern6.test(evalValidString) ) {
      console.log("IN Pattern 6");
        // score += 1;
        pointInSpace2 ++;
        pointInSpace5 ++;
        pointInSpace8 ++;
    }
    if (pattern7.test(evalValidString) ) {
      console.log("IN Pattern 7");
        // score += 1;
        pointInSpace0 ++;
        pointInSpace4 ++;
        pointInSpace8 ++;
    }
    if (pattern8.test(evalValidString) ) {
      console.log("IN Pattern 8");
        // score += 1;
        pointInSpace2 ++;
        pointInSpace4 ++;
        pointInSpace6 ++;
    }
  }
//*************************** End of case d ***************************


  var scores = [];
  console.log(validIndex);
  var move = 0;
  var maxScore = 0;
  for(var i = 0; i < validIndex.length; i ++) {
    // possible move + playerArray = playerArray_test.
    var score = 0;
    var playerArray_test = playerArray.slice();
    playerArray_test[validIndex[i]] = 1;
    var oppArray_test = oppArray.slice();
    oppArray_test[validIndex[i]] = 1;
    // console.log(i,playerArray_test);
    // console.log(oppArray_test);
    // console.log(playerArray);

    // Case a: immediately winning
    if (winPattern(playerArray_test.join(""))) {
      console.log("IN Case a");
      score += 1000;
    }
    // Case b: block oppnent immediately winning
    if (winPattern(oppArray_test.join(""))) {
      console.log("IN Case b");
      score += 100;
    }

    // In game logic, case c and d need to be analysis when case b and case a didn't happened
    // Case a and case b are far more important.
    if(score < 1000) {
      // Case c: 2 in a line with a valid space
      for(var j = 0; j < validIndex.length; j ++) {
        if(validIndex[j] !== validIndex[i]) {
          var playerArray_test2 = playerArray_test.slice();
          playerArray_test2[validIndex[j]] = 1;
          // console.log(playerArray_test2.join(""));
          if(winPattern(playerArray_test2.join(""))) {
            // console.log(playerArray_test2.join(""));
            // console.log("IN Case c");
            score += 10;
            // break;
          }
        }
      }

      // Case d: 1 in a line with 2 valid space

      switch (validIndex[i]) {
        case 0:
          score += pointInSpace0;
          break;
        case 1:
          score += pointInSpace1;
          break;
        case 2:
          score += pointInSpace2;
          break;
        case 3:
          score += pointInSpace3;
          break;
        case 4:
          score += pointInSpace4;
          break;
        case 5:
          score += pointInSpace5;
          break;
        case 6:
          score += pointInSpace6;
          break;
        case 7:
          score += pointInSpace7;
          break;
        case 8:
          score += pointInSpace8;
          break;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      move = validIndex[i];
    }
    if (maxScore === 0) {
      move = validIndex[i];
    }
    console.log(score);
    scores.push(score);
  } // end of for loop
  console.log(maxScore, move);
  return move;
}; // end of minimax function


// Test Case 1: works, more on the case d analysis
// minimax([1,0,1,0,1,0,1,0,1],[0,1,0,1,0,0,0,0,0],[0,0,0,0,0,1,0,1,0]);
// Test Case 2: works, more on the blocking and winning score. Case c not that precesis, but works
// Case a and case b works fine.
// minimax([1,0,0,0,1,1,0,1,1],[0,1,1,0,0,0,0,0,0],[0,0,0,1,0,0,1,0,0]);
