//*****BACK-END*****

function Player(name, score) {
  this.name = name;
  this.score = 0;
  this.turn = true;
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

//*****FRONT-END*****

$(function() {
  $("#user_entry").submit(function(event) {
    event.preventDefault();

    var playerOneName = $("#player_1_name").val();
    var playerTwoName = $("#player_2_name").val();

    playerOne = new Player(playerOneName, 0);
    playerTwo = new Player(playerTwoName, 0);

    if (!playerOneName || !playerTwoName) {
      alert("Please make sure to enter your name!");
      codeBreak;
    }

    $("#user_entry").hide();
    $("#gameboard").show();

    $("#player_1_info").append("<h3>" + playerOne.name + "</h3><br><h3>" + playerOne.score + "</h3>");
    $("#player_2_info").append("<h3>" + playerTwo.name + "</h3><br><h3>" + playerOne.score + "</h3>");
    $("#buttons").append("<br><button type=\"button\" id=\"roll\" class=\"btn\">Roll!</button> <button type=\"button\" id=\"end_turn\" class=\"btn\">End Turn</button>");


  });
});
