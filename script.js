var rn;
var timer = 60;
var score = 0;
var gameIsOver = false;

function makeBubble() {
    // Clear the existing bubbles
    document.querySelector(".bubble_body").innerHTML = "";

    // Generate new bubbles
    for (var i = 1; i <= 96; i++) { // Updated the loop limit to 96
        var v = Math.floor(Math.random() * 10);
        document.querySelector(".bubble_body").innerHTML += `<div class="bubble">${v}</div>`;
    }
}

function runtimer() {
    var timerint = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timerint);
            gameIsOver = true;
            showGameOverModal(); // Display the game over modal
        }
    }, 1000);
}

function getNewhit() {
    rn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = rn;
    makeBubble();
}

function increaseScore() {
    if (!gameIsOver) {
        score += 10;
        document.querySelector("#scoreval").textContent = score;
    }
}

function playBurstSound() {
    var burstSound = document.getElementById("burstSound");
    burstSound.play();
}

function showGameOverModal() {
    // Get the modal and final score elements
    var modal = document.getElementById("myModal");
    var finalScoreElement = document.getElementById("finalScore");

    // Set the final score in the modal
    finalScoreElement.textContent = score;

    // Display the modal
    modal.style.display = "block";

    // Add an event listener to close the modal when the close button is clicked
    var closeButton = document.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

document.querySelector(".bubble_body").addEventListener("click", function (details) {
    if (!gameIsOver) {
        var clickednum = Number(details.target.textContent);
        if (rn == clickednum) {
            increaseScore();
            playBurstSound();
        }
        getNewhit();
    }
});

getNewhit();
runtimer();
