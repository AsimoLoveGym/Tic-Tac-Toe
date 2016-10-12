var activeTurn = "cross";
var buttonClick1 = new Audio("http://soundbible.com/mp3/Blop-Mark_DiAngelo-79054334.mp3");
var youWin = new Audio("http://soundbible.com/mp3/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3");

$(document).ready(function(){
  $(".btn").click(function(event){
    // console.log(event.currentTarget);
    if (activeTurn === "cross") {
      event.currentTarget.innerHTML = "X";
      buttonClick1.play();
    } else {
      event.currentTarget.innerHTML = "O";
      buttonClick1.play();
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
