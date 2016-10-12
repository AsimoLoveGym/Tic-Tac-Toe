var activeTurn = "cross";
var buttonClick1 = new Audio("http://soundbible.com/mp3/Blop-Mark_DiAngelo-79054334.mp3");
var youWin = new Audio("http://soundbible.com/mp3/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3");
var youLose = new Audio("http://soundbible.com/mp3/Kick-SoundBible.com-1331196005.mp3");
var valiableSpace= [1,1,1,1,1,1,1,1,1];
var crosses= [0,0,0,0,0,0,0,0,0];
var noughts= [0,0,0,0,0,0,0,0,0];

$(document).ready(function(){
  $(".btn").click(function(event){
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.value);
    var clickedButton = -1;
    var testString = "";
    clickedButton = event.currentTarget.value;
    console.log(clickedButton);
    if (activeTurn === "cross") {
      buttonClick1.play();
      event.currentTarget.innerHTML = "X";
      valiableSpace[clickedButton] = 0;
      crosses[clickedButton] = 1;
      testString = crosses.join("");
      console.log("crosses string:",testString);
      gameOver(testString);

    } else {
      buttonClick1.play();
      event.currentTarget.innerHTML = "O";
      valiableSpace[clickedButton] = 0;
      noughts[clickedButton] = 1;
      testString = noughts.join("");
      console.log("noughts string:",testString);
      gameOver(testString);
    }

    if (activeTurn === "cross") {
      activeTurn = "nought";
    } else {
      activeTurn = "cross";
    }


    // console.log(event.currentTarget.innerHTML);
    // event.currentTarget.innerHTML()="Hi";
  });
});



var gameOver = function(evalString) {
  var pattern1 = /^1{3}/;
  var pattern2 = /^\d{3}1{3}\d{3}$/;
  var pattern3 = /^\d{6}1{3}$/;
  var pattern4 = /^1\d{2}1\d{2}1\d{2}$/;
  var pattern5 = /^\d1\d{2}1\d{2}1\d$/;
  var pattern6 = /^\d{2}1\d{2}1\d{2}1$/;
  var pattern7 = /^1\d{3}1\d{3}1$/;
  var pattern8 = /^\d{2}1\d1\d1\d{2}$/;

  if (pattern1.test(evalString) || pattern2.test(evalString) ||pattern3.test(evalString) ||pattern4.test(evalString) ||pattern5.test(evalString) ||pattern6.test(evalString) ||pattern7.test(evalString) ||pattern8.test(evalString) ) {
    console.log("You Win!!");
  }
  if (pattern1.test(evalString) ) {
    console.log("You Win!! Pattern 1");
  } else if
  (pattern2.test(evalString) ) {
    console.log("You Win!! Pattern 2");
  } else if
  (pattern3.test(evalString) ) {
    console.log("You Win!! Pattern 3");
  } else if
  (pattern4.test(evalString) ) {
    console.log("You Win!! Pattern 4");
  } else if
  (pattern5.test(evalString) ) {
    console.log("You Win!! Pattern 5");
  } else if
  (pattern6.test(evalString) ) {
    console.log("You Win!! Pattern 6");
  } else if
  (pattern7.test(evalString) ) {
    console.log("You Win!! Pattern 7");
  } else if
  (pattern8.test(evalString) ) {
    console.log("You Win!! Pattern 8");
  }
};

var evalString;
//  evalString = "111010100";
// evalString = "000111000";
// evalString = "000000111";
// evalString = "100100100";
// evalString = "010010010";
// evalString = "001001001";
// evalString = "100010001";
// evalString = "001010100";

gameOver(evalString);
