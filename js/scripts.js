//*****BACK-END*****

function Player(name, score, totalScore) {
  this.name = name;
  this.score = 0;
  this.totalScore = 0;
}

Player.prototype.addToScore = function() {
  this.score += rollDie();
}

function turnMaker() {
  return Math.floor(Math.random() * 2) + 1;
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
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

    if (!playerOneName || !playerTwoName) { // Checks to see whether users entered something into the name fields
      alert("Please make sure to enter your name!");
      codeBreak;
    }

    var getStart = turnMaker();

    if (getStart === 2) { // Rolls a 1 or 2 to determine which player goes first
      turn = !turn;
    }

    $("#user_entry").hide();
    $("#roll_place").show();
    $("#gameboard").show();

    $("#player_1_info").empty().append("<h3>" + playerOne.name + " | Total Wins: " + playerOne.totalScore + "</h3><br><h3>" + playerOne.score + "</h3>");
    $("#player_2_info").empty().append("<h3>" + playerTwo.name + " | Total Wins: " + playerTwo.totalScore + "</h3><br><h3>" + playerTwo.score + "</h3>");
    $("#buttons").append("<br><button type=\"button\" id=\"roll\" class=\"btn\">Roll!</button> <button type=\"button\" id=\"end_turn\" class=\"btn\">End Turn</button>");
    $("#temp_score").text(tempScore);
    $("#roll_score").text("0");

    if (turn) {
      $("#player_1_info").addClass("turn_color");
    } else {
      $("#player_2_info").addClass("turn_color");
    }

    $("#roll").click(function() {
      var roll = rollDie();
      $("#roll_score").text(roll);

      if (turn) {
        if (roll === 1) {
          alert("You got a one, and thus, you lose!");
          switchTurn();
          tempScore = 0;
          $("#roll_score").text(0);
          $("#temp_score").text(tempScore);
        } else {
          tempScore += roll;
          $("#temp_score").text(tempScore);
        }
      } else if (!turn) {
        if (roll === 1) {
          alert("You got a one, and thus, you lose!");
          switchTurn();
          tempScore = 0;
          $("#roll_score").text(0);
          $("#temp_score").text(tempScore);
        } else {
          tempScore += roll;
          $("#temp_score").text(tempScore);
        }
      }
    });

    $("#end_turn").click(function() {
      if (turn) {
        $("#player_1_info").removeClass("turn_color");
        $("#player_2_info").addClass("turn_color");
        playerOne.score += tempScore;

        if (playerOne.score >= 100) {
          alert(playerOne.name + " wins!");
          tempScore = 0;
          playerOne.score = 0;
          playerTwo.score = 0;
          playerOne.totalScore += 1;
          $("#player_1_info").empty().append("<h3>" + playerOne.name + " | Total Wins: " + playerOne.totalScore + "</h3><br><h3>" + 0 + "</h3>");
          $("#player_2_info").empty().append("<h3>" + playerTwo.name + " | Total Wins: " + playerTwo.totalScore + "</h3><br><h3>" + 0 + "</h3>");
        }

        switchTurn();
        $("#player_1_info").empty().append("<h3>" + playerOne.name + " | Total Wins: " + playerOne.totalScore + "</h3><br><h3>" + playerOne.score + "</h3>");
        tempScore = 0;
        $("#roll_score").text(0);
        $("#temp_score").text(tempScore);
      } else if (!turn) {
        $("#player_2_info").removeClass("turn_color");
        $("#player_1_info").addClass("turn_color");
        playerTwo.score += tempScore;

        if (playerTwo.score >= 100) {
          alert(playerTwo.name + " wins!");
          tempScore = 0;
          playerOne.score = 0;
          playerTwo.score = 0;
          playerTwo.totalScore += 1;
          $("#player_2_info").empty().append("<h3>" + playerTwo.name + " | Total Wins: " + playerTwo.totalScore + "</h3><br><h3>" + 0 + "</h3>");
          $("#player_1_info").empty().append("<h3>" + playerOne.name + " | Total Wins: " + playerOne.totalScore + "</h3><br><h3>" + 0 + "</h3>");
        }

        switchTurn();
        $("#player_2_info").empty().append("<h3>" + playerTwo.name + " | Total Wins: " + playerTwo.totalScore + "</h3><br><h3>" + playerTwo.score + "</h3>");
        tempScore = 0;
        $("#roll_score").text(0);
        $("#temp_score").text(tempScore);
      }
    });
  });
});
