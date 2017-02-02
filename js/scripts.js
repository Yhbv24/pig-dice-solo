//*****BACK-END*****

function Player(name, score) {
  this.name = name;
  this.score = 0;
}

Player.prototype.addToScore = function() {
  this.score += rollDie();
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 2;
}

var turn = true;

function switchTurn() {
  turn = !turn;
}

var tempScore = 0;

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

    $("#roll").click(function() {
      if (turn) {
        rollDie();
        $("#temp_roll_score").empty().append("<h3>Current total: " + tempScore + "!</h3>");
        if (rollDie() === 1) {
          alert("You got a one, and thus, you lose!");
          switchTurn();
        } else {
          tempScore += rollDie();
        }
      } else if (!turn) {
        rollDie();
        $("#temp_roll_score").empty().append("<h3>Current total: " + tempScore + "!</h3>");
        if (rollDie() === 1) {
          alert("You got a one, and thus, you lose!");
          switchTurn();
        } else {
          tempScore += rollDie();
        }
      }
    });

    $("#end_turn").click(function() {
      if (turn) {
        playerOne.score += tempScore;
        $("#player_1_info").empty().append("<h3>" + playerOne.name + "</h3><br><h3>" + playerOne.score + "</h3>");
        tempScore = 0;
        switchTurn();
      } else if (!turn) {
        playerTwo.score += tempScore;
        $("#player_2_info").empty().append("<h3>" + playerTwo.name + "</h3><br><h3>" + playerTwo.score + "</h3>");
        tempScore = 0;
        switchTurn();
      }
    });
  });
});
