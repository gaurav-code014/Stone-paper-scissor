document.addEventListener("DOMContentLoaded", function () {
  try {
    var mainContainer = document.getElementById("mainContainer");
    var clickedContainer = document.getElementById("clickedContainer");

    localStorage.setItem("your-score-value", 0);
    localStorage.setItem("computer-score-value", 0);

  
    var yourScoreValue = document.getElementById("your-score-value");
    yourScoreValue.innerHTML = localStorage.getItem("your-score-value") || 0;
    var computerScoreValue = document.getElementById("computer-score-value");
    computerScoreValue.innerHTML =
      localStorage.getItem("computer-score-value") || 0;

    var gameResult; 

    
    var circles = document.querySelectorAll(".circle");
    circles.forEach(function (circle) {
      circle.addEventListener("click", function () {
        
        var clonedCircle = circle.cloneNode(true);

       
        var myArea = clickedContainer.querySelector(".myArea");
        myArea.innerHTML = "";

        
        clonedCircle.style.position = "relative";
        clonedCircle.style.top = "50%";
        clonedCircle.style.left = "50%";
        clonedCircle.style.transform = "translate(-50%, -50%)";

        
        myArea.appendChild(clonedCircle);

        
        clickedContainer.classList.remove("invisible");

        // Generate computer's choice
        var computerChoiceId = getRandomCircleId();
        var computerChoiceInfo = circleInfo[computerChoiceId];

        resultMessage.innerHTML = gameResult;

        incrementScoresAndCheckNextButton();
      });
    });

    
    function incrementScoresAndCheckNextButton() {
      console.log("calling from incrementScoresAndCheckNextButton");
      var yourScoreValue =
        parseInt(localStorage.getItem("your-score-value")) || 0;
      var computerScoreValue =
        parseInt(localStorage.getItem("computer-score-value")) || 0;

     

      
      document.getElementById("your-score-value").innerHTML = yourScoreValue;
      document.getElementById("computer-score-value").innerHTML =
        computerScoreValue;
      localStorage.setItem("your-score-value", yourScoreValue);
      localStorage.setItem("computer-score-value", computerScoreValue);

      
      var nextButton = document.querySelector(".next-rectangle");
      nextButton.style.visibility =
        yourScoreValue > computerScoreValue ? "visible" : "hidden";

      
      if (yourScoreValue > computerScoreValue) {
        nextButton.addEventListener("click", function () {
          
          window.location.href = "/index2.html";
        });
      }
    }

    // -----------------  this code is used to setup value in scoreboard.

    
    function incrementScore(scoreElement) {
     
      var currentScore = parseInt(localStorage.getItem(scoreElement.id)) || 0;
      currentScore++;
      scoreElement.innerHTML = currentScore;
      localStorage.setItem(scoreElement.id, currentScore);
      console.log("Current Score: " + currentScore);
      console.log("Updated Score: " + scoreElement.innerHTML);
    }

    //-------------This code is used to create cancel-rule and show-rule functionality.

    var gameRuleContainer = document.getElementById("gameRuleContainer");
    var cancelRoundButton = document.querySelector(".cancel-round");
    var ruleButton = document.querySelector(".rule-rectangle");
    cancelRoundButton.addEventListener("click", function () {
      toggleVisibility();
    });

   ruleButton.addEventListener("click", function () {
      toggleVisibility();
    });

    function toggleVisibility() {
      var gameRuleContainer = document.getElementById("gameRuleContainer");
      if (
        gameRuleContainer.style.display === "none" ||
        gameRuleContainer.style.display === ""
      ) {
        gameRuleContainer.style.display = "flex";
      } else {
        gameRuleContainer.style.display = "none";
      }
    }

    //----------Play again button functionality
    var playAgainButton = document.querySelector(".play-again-button");
    playAgainButton.addEventListener("click", function () {
     
      clickedContainer.classList.add("invisible");

      
      mainContainer.classList.remove("invisible");
    });

    //--------- This code will show computer-randomly generated option inside computerArea

    var clickedContainer = document.getElementById("clickedContainer");
    var resultArea = clickedContainer.querySelector(".resultArea");
    var resultMessage = resultArea.querySelector(".result-message");

    
    var circleInfo = {
      circle1: { choice: "scissor", border: "#BD00FF" },
      circle2: { choice: "rock", border: "#0074B6" },
      circle3: { choice: "paper", border: "#FFA943" },
    };

    
    var circles = document.querySelectorAll(".circle");
    circles.forEach(function (circle) {
      circle.addEventListener("click", function () {
        
        var userChoiceInfo = circleInfo[circle.id];
        var userChoice = userChoiceInfo.choice;

        
        var clonedCircleUser = circle.cloneNode(true);

        
        var myArea = clickedContainer.querySelector(".myArea");
        myArea.innerHTML = "";

        
        clonedCircleUser.style.position = "relative";
        clonedCircleUser.style.top = "50%";
        clonedCircleUser.style.left = "50%";
        clonedCircleUser.style.transform = "translate(-50%, -50%)";

        
        myArea.appendChild(clonedCircleUser);

        
        var computerChoiceId = getRandomCircleId();
        var computerChoiceInfo = circleInfo[computerChoiceId];

        
        var circleComputer = document.createElement("div");
        circleComputer.className = "circle";
        circleComputer.innerHTML =
          '<img id="gameImg" src="images/' +
          computerChoiceInfo.choice +
          '.png">';
        circleComputer.style.border = "10px solid " + computerChoiceInfo.border; 
        circleComputer.style.position = "relative"; 
        circleComputer.style.top = "50%";
        circleComputer.style.left = "50%";
        circleComputer.style.transform = "translate(-50%, -50%)";
        var computerArea = clickedContainer.querySelector(".computerArea");
        computerArea.innerHTML = ""; // Clear previous content
        computerArea.appendChild(circleComputer);

        var gameResult = determineGameResult(
          userChoice,
          computerChoiceInfo.choice
        );

        resultMessage.innerHTML = gameResult;
        clickedContainer.classList.remove("invisible");
        console.log("User's choice: " + userChoice);
        console.log("Computer's choice: " + computerChoiceInfo.choice);
        console.log("Game result: " + gameResult);
      });
    });

    function getRandomCircleId() {
      var circleIds = Object.keys(circleInfo);
      var randomIndex = Math.floor(Math.random() * circleIds.length);
      return circleIds[randomIndex];
    }

    // Function to determine the game result
    function determineGameResult(userChoice, computerChoice) {
      // var resultArea = clickedContainer.querySelector(".resultArea");
      var yourScoreValue = document.getElementById("your-score-value");
      var computerScoreValue = document.getElementById("computer-score-value");
      if (userChoice === computerChoice) {
        return "TIE UP";
      } else if (
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissor" && computerChoice === "paper")
      ) {
        incrementScore(yourScoreValue);
        if (yourScoreValue > computerScoreValue) {
          nextButton.addEventListener("click", function () {
            // Redirect to index2.html
            window.location.href = "index2.html";
          });
        }
        addGreenEclipsesToWinner(".myArea");
        return "YOU WON \n AGAINST PC";
      } else {
        incrementScore(computerScoreValue);
        addGreenEclipsesToWinner(".computerArea");
        return "YOU LOOSE \n AGAINST PC";
      }
    }

    function addGreenEclipsesToWinner(areaSelector) {
      if (areaSelector === ".myArea") {
        var winnerArea = clickedContainer.querySelector(areaSelector);
        addGreenEclipse(
          winnerArea,
          "250px",
          "250px",
          "#3B6720",
          "120px",
          "30px",
          "-1"
        );
        
        addGreenEclipse(
          winnerArea,
          "300px",
          "300px",
          "#1DA82BC9",
          "95px",
          "10px",
          "-2"
        );

        var thirdGreenEclipse = addGreenEclipse(
          winnerArea,
          "350px",
          "350px",
          "#2E9A2563",
          "70px",
          "-10px",
          "-3"
        );

        
        thirdGreenEclipse.style.boxShadow = "0px 1px 62px 0px #00000021";
      } else {
        var winnerArea = clickedContainer.querySelector(areaSelector);

        // Create and add the first green eclipse
        addGreenEclipse(
          winnerArea,
          "250px",
          "250px",
          "#3B6720",
          "130px",
          "665px",
          "-1"
        );

        addGreenEclipse(
          winnerArea,
          "300px",
          "300px",
          "#1DA82BC9",
          "110px",
          "640px",
          "-2"
        );

        var thirdGreenEclipse = addGreenEclipse(
          winnerArea,
          "350px",
          "350px",
          "#2E9A2563",
          "85px",
          "615px",
          "-3"
        );

        thirdGreenEclipse.style.boxShadow = "0px 1px 62px 0px #00000021";
      }
    }

    function addGreenEclipse(
      parentElement,
      width,
      height,
      backgroundColor,
      top,
      left,
      zIndex
    ) {
      var greenEclipse = document.createElement("div");
      greenEclipse.className = "green-eclipse";
      greenEclipse.style.width = width;
      greenEclipse.style.height = height;
      greenEclipse.style.backgroundColor = backgroundColor;
      greenEclipse.style.position = "absolute";
      greenEclipse.style.borderRadius = "50%";
      greenEclipse.style.top = top;
      greenEclipse.style.left = left;
      greenEclipse.style.zIndex = zIndex; 

    
      parentElement.appendChild(greenEclipse);

      return greenEclipse;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
