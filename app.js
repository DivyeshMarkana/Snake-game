const canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let snake = [{ x: 150, y: 150 },
{ x: 140, y: 150 },
{ x: 130, y: 150 },
{ x: 120, y: 150 },
{ x: 110, y: 150 }];

let dx = 10;
let dy = 0;

function main() {
    setTimeout(function onTick() {
        clearCanvas();
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
    snake.pop();
}

function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
}



