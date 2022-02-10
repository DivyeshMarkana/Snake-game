const canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let snake = [{ x: 150, y: 150 },
{ x: 140, y: 150 },
{ x: 130, y: 150 },
{ x: 120, y: 150 },
{ x: 110, y: 150 }];

let dx = 10;
let dy = 0;

// let foodX;
// let foodY;

let foodX = randomTen(0, canvas.width - 10);
let foodY = randomTen(0, canvas.height - 10);

let score = 0;

document.addEventListener("keydown", changeDirection)

function main() {
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        drawScore();
        advanceSnake();
        drawSnake();
        main();
    }, 100)
}
main();

function drawSnakePart(snakePart) {
    ctx.fillStyle = "lightblue";
    ctx.strokeStyle = "blue";

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;

    if (didEatFood) {
        createFood();
        score += 10;
    }
    else {
        snake.pop();
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 8, 20);
}

function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
    foodX = randomTen(0, canvas.width - 10);
    foodY = randomTen(0, canvas.height - 10);

    snake.forEach(function isFoodOnSnake(part) {

        const foodIsOnSnake = part.x == foodX && part.y == foodY;
        if (foodIsOnSnake) {
            createFood();
        }
    })
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    const goingUP = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === DOWN_KEY && !goingUP) {
        dx = 0;
        dy = 10;
    }
}



