const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 100;
const paddleWidth = 10;
const ballRadius = 10;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 5;
let ballDY = 5;
let leftScore = 0;
let rightScore = 0;

function drawPaddle(x, y) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(0, leftPaddleY);
  drawPaddle(canvas.width - paddleWidth, rightPaddleY);
  drawBall(ballX, ballY);
}

function updateScore() {
  document.getElementById("score-left").textContent = leftScore;
  document.getElementById("score-right").textContent = rightScore;
}

function gameLoop() {
  draw();

  // Ball movement
  ballX += ballDX;
  ballY += ballDY;

  // Top and bottom collisions
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballDY = -ballDY;
  }

  // Left paddle collision
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballDX = -ballDX;
  }

  // Right paddle collision
  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballDX = -ballDX;
  }

  // Left goal
  if (ballX - ballRadius < 0) {
    rightScore++;
    updateScore();
    resetBall();
  }

  // Right goal
  if (ballX + ballRadius > canvas.width) {
    leftScore++;
    updateScore();
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballDX = -ballDX;
  ballDY = 5 * (Math.random() > 0.5 ? 1 : -1);
}

document.addEventListener("keydown", (e) => {
  const step = 40;
  // W/S for left paddle, Up/Down for right paddle
  if (e.key === "w" && leftPaddleY > 0) leftPaddleY -= step;
  if (e.key === "s" && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += step;
  if (e.key === "ArrowUp" && rightPaddleY > 0) rightPaddleY -= step;
  if (e.key === "ArrowDown" && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += step;
});

setInterval(gameLoop, 1000 / 60);