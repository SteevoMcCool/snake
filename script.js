const DOM = {
  board: document.getElementById("board"),
  mommy: document.getElementById("mommy"),
  tiles: [[], [], [], [], [], [], [], [], [], []],
  SnFold: document.getElementById("snake"),
  snake: [],
  apple: document.getElementById("apple"),
  text: document.getElementById("text"),
  score: document.getElementById("score"),
  hscore: document.getElementById("hscore"),
  hscoreU: document.getElementById("hscoreU"),
  newGame: document.getElementById("newGame"),
  redP1: document.getElementById("redP1"),
  greenP1: document.getElementById("greenP1"),
  blueP1: document.getElementById("blueP1"),

  easyBut: document.getElementById("easy"),
  medBut: document.getElementById("medium"),
  hardBut: document.getElementById("hard"),
  ObFold:document.getElementById("obstacles"),
  obstacles:[],
  newGameP2: document.getElementById("newGameP2"),
  SnFoldP2: document.getElementById("snakeP2"),
  snakeP2: [],
  redP2: document.getElementById("redP2"),
  greenP2: document.getElementById("greenP2"),
  blueP2: document.getElementById("blueP2"), 
};
let difficulty = "medium"
let started = false;
let MAIN;
let score = 0;
let highscore = 0;
let hardhighscore = 0;
let loose = true;
function loadBoard() {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let newBox = document.createElement("div");
      newBox.style.gridRow = y + 1;
      newBox.style.gridColumn = x + 1;
      if (Math.floor((x + y) / 2) != (x + y) / 2) {
        newBox.style.backgroundColor = "#3338";
      }
      DOM.board.appendChild(newBox);
      DOM.tiles[x][y] = newBox;
    }
  }
  return true
}

DOM.redP1.addEventListener("click", function(){
  DOM.SnFold.style.filter = "hue-rotate(0deg)"
  DOM.redP1.style.border = "2px solid gold"
  DOM.greenP1.style.border = ""
  DOM.blueP1.style.border = ""
})
DOM.redP1.style.border = "2px solid gold"
DOM.greenP1.addEventListener("click", function(){
  DOM.SnFold.style.filter = "hue-rotate(120deg)"
  DOM.redP1.style.border = ""
  DOM.greenP1.style.border = "2px solid gold"
  DOM.blueP1.style.border = ""
})
DOM.blueP1.addEventListener("click", function(){
  DOM.SnFold.style.filter = "hue-rotate(240deg)"
  DOM.redP1.style.border = ""
  DOM.greenP1.style.border = ""
  DOM.blueP1.style.border = "2px solid gold"
})
DOM.redP2.addEventListener("click", function(){
  DOM.SnFoldP2.style.filter = "hue-rotate(0deg)"
  DOM.redP2.style.border = "2px solid gold"
  DOM.greenP2.style.border = ""
  DOM.blueP2.style.border = ""
})
DOM.greenP2.addEventListener("click", function(){
  DOM.SnFoldP2.style.filter = "hue-rotate(120deg)"
  DOM.redP2.style.border = ""
  DOM.greenP2.style.border = "2px solid gold"
  DOM.blueP2.style.border = ""
})
DOM.blueP2.style.border = "2px solid gold"
DOM.blueP2.addEventListener("click", function(){
  DOM.SnFoldP2.style.filter = "hue-rotate(240deg)"
  DOM.redP2.style.border = ""
  DOM.greenP2.style.border = ""
  DOM.blueP2.style.border = "2px solid gold"
})
DOM.easyBut.addEventListener("click", function(){
  if (!started) {
    difficulty = "easy"
    DOM.easyBut.style.border = "2px solid gold"
    DOM.medBut.style.border = ""
    DOM.hardBut.style.border = ""
  }
})
DOM.medBut.addEventListener("click", function(){
  if (!started) {
    difficulty = "medium"
    DOM.easyBut.style.border = ""
    DOM.medBut.style.border = "2px solid gold"
    DOM.hardBut.style.border = ""
  }
})
DOM.medBut.style.border = "2px solid gold"
DOM.hardBut.addEventListener("click", function(){
  if (!started) {
    difficulty = "hard"
    DOM.easyBut.style.border = ""
    DOM.medBut.style.border = ""
    DOM.hardBut.style.border = "2px solid gold"
  }
})
const snakeBackgroundImage = {
  head: "url('snakeHead.png')",
  b1: "url('SnakeUpDown.png')",
};
loadBoard();
let appleCoords = [];
function genApple(x, y) {
  snakePeiceMoveTo(DOM.apple, x, y);
  appleCoords[0] = x;
  appleCoords[1] = y;
  return true
}
function newGame() {
  DOM.snake.forEach((thing) => {
    thing.remove();
  });
  DOM.snake.length = 0;
  DOM.obstacles.forEach((thing) => {
    thing.remove();
  });
  DOM.obstacles.length = 0;
  DOM.snakeP2.forEach((thing) => {
    thing.remove();
  });
  DOM.snakeP2.length = 0;
  genApple(7, 4);
  DOM.snake[0] = document.createElement("div");
  DOM.snake[0].style.position = "absolute";
  DOM.snake[0].style.backgroundImage = snakeBackgroundImage.head;
  DOM.SnFold.appendChild(DOM.snake[0]);
  DOM.snake[0].style.transform = "rotate(-90deg)";
  DOM.snake[0].style.transition = "left 0.2s, top 0.2s";
  DOM.snake[0].style.zIndex = "2";
  newSnakePiece();
  snakePeiceMoveTo(DOM.snake[1], 1, 4);
  snakePeiceMoveTo(DOM.snake[0], 2, 4);
  return true
}
function newGameP2() {
  DOM.snake.forEach((thing) => {
    thing.remove();
  });
  DOM.snake.length = 0;
  DOM.obstacles.forEach((thing) => {
    thing.remove();
  });
  DOM.obstacles.length = 0;
  DOM.snakeP2.forEach((thing) => {
    thing.remove();
  });
  DOM.snakeP2.length = 0;
  genApple(7, 4);
  DOM.snake[0] = document.createElement("div");
  DOM.snake[0].style.position = "absolute";
  DOM.snake[0].style.backgroundImage = snakeBackgroundImage.head;
  DOM.SnFold.appendChild(DOM.snake[0]);
  DOM.snake[0].style.transform = "rotate(-90deg)";
  DOM.snake[0].style.transition = "left 0.2s, top 0.2s";
  DOM.snake[0].style.zIndex = "2";
  newSnakePiece();
  snakePeiceMoveTo(DOM.snake[1], 1, 4);
  snakePeiceMoveTo(DOM.snake[0], 2, 4);
  return true
}
function snakePeiceMoveTo(p, x, y) {
  if (!DOM.tiles[x]) {
    return check(true);
  } else if (!DOM.tiles[x][y]) {
    return check(true);
  }
  let data = DOM.tiles[x][y].getBoundingClientRect();
  p.style.top = `${data.top}px`;
  p.style.left = `${data.left}px`;
  p.style.height = `${data.bottom - data.top}px`;
  p.style.width = `${data.right - data.left}px`;
  p.style.setProperty("--x", x);
  p.style.setProperty("--y", y);
  return true

}
function snakePeiceShift(p, x, y) {
  snakePeiceMoveTo(
    p,
    Number(p.style.getPropertyValue("--x")) + x,
    Number(p.style.getPropertyValue("--y")) + y )
    return true
    
}
let direction;
function interval() {
  moveSnake();
  if (direction == "r") {
    snakePeiceShift(DOM.snake[0], 1, 0);
    check();
    DOM.snake[0].style.transform = "rotate(-90deg)";
  } else if (direction == "l") {
    snakePeiceShift(DOM.snake[0], -1, 0);
    check();
    DOM.snake[0].style.transform = "rotate(90deg)";
  } else if (direction == "u") {
    snakePeiceShift(DOM.snake[0], 0, -1);
    check();
    DOM.snake[0].style.transform = "rotate(180deg)";
  } else if (direction == "d") {
    snakePeiceShift(DOM.snake[0], 0, 1);
    check();
    DOM.snake[0].style.transform = "rotate(0deg)";
  }
  return true
}
function direct(d) {
  if (!started && !loose) {
    MAIN = setInterval(interval, 200);
  }
  if (!loose){
    started = true;
    direction = d;
  }
  return true
}
document.addEventListener("keydown", (event) => {
  let key = event.key;
  if (key.toLowerCase() == "arrowright" && direction != "l") {
    direct("r");
  } else if (key.toLowerCase() == "arrowleft" && direction != "r") {
    direct("l");
  } else if (key.toLowerCase() == "arrowup" && direction != "d") {
    direct("u");
  } else if (key.toLowerCase() == "arrowdown" && direction != "u") {
    direct("d");
  }
  return true
});
function moveSnake() {
  if (DOM.snake.length > 1) {
    for (let i = DOM.snake.length - 1; i > 0; i--) {
      let SP = DOM.snake[i];
      let PIF = DOM.snake[i - 1];
      snakePeiceMoveTo(
        SP,
        PIF.style.getPropertyValue("--x"),
        PIF.style.getPropertyValue("--y")
      );
      SP.style.transform = PIF.style.transform;
    }
  }
  return true
}

function newSnakePiece() {
  let p = DOM.snake.length;
  console.log(p);
  DOM.snake[p] = document.createElement("div");
  DOM.snake[p].style.position = "absolute";
  DOM.snake[p].style.backgroundImage = snakeBackgroundImage.b1;
  DOM.SnFold.appendChild(DOM.snake[p]);
  DOM.snake[p].style.transform = "rotate(-90deg)";
  DOM.snake[p].style.transition = "left 0.2s, top 0.2s";
  let SP = DOM.snake[p];
  let PIF = DOM.snake[p - 1];
  snakePeiceMoveTo(
    SP,
    PIF.style.getPropertyValue("--x"),
    PIF.style.getPropertyValue("--y")
  );
  return true
}
function findViableSquare() {
  do {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let ar = DOM.snake.filter(
      (part) =>
        part.style.getPropertyValue("--x") == x &&
        part.style.getPropertyValue("--y") == y
    );
    let ar2 = DOM.obstacles.filter(
      (part) =>
        part.style.getPropertyValue("--x") == x &&
        part.style.getPropertyValue("--y") == y
    );
    if (ar.length == 0 && ar2.length == 0) {
      return [x, y];
    }
  } while (true);
  return true
}
function findOPSquare(){
  do {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (Math.abs(x - DOM.snake[0].style.getPropertyValue("--x"))>2 || Math.abs(y - DOM.snake[0].style.getPropertyValue("--y"))>2 ) {
      console.log(x, y);
      return [x, y];
    }
  } while (true);
}
function genObstacle(){
  let p = DOM.obstacles.length 
  DOM.obstacles[p] = document.createElement("div")
  DOM.obstacles[p].style.backgroundColor = "purple"
  DOM.ObFold.appendChild(DOM.obstacles[p])
  let pos = findOPSquare()
  snakePeiceMoveTo(DOM.obstacles[p],pos[0],pos[1])
}
function check(lose) {
  if (!started) {
    return true;
  }
  let head = DOM.snake[0];
  let hx = Number(head.style.getPropertyValue("--x"));
  let hy = Number(head.style.getPropertyValue("--y"));
  if (hx == appleCoords[0] && hy == appleCoords[1]) {
    score = score + 1;
    newSnakePiece();
    let pos = findViableSquare();
    genApple(pos[0], pos[1]);
    if (difficulty=="medium"){
      highscore = Math.max(score, highscore);
    }else if (difficulty =="hard") {
      hardhighscore = Math.max(score,hardhighscore)
      genObstacle()
    }
    DOM.score.innerHTML = `Score: ${score}`;
    DOM.hscore.innerHTML = `High Score: ${highscore}`;
    DOM.hscoreU.innerHTML = `Hard High Score: ${hardhighscore}`;
  }
  if (difficulty=="easy"){
    return true
  }
  if (
    DOM.snake.filter(
      (val) =>
        val.style.getPropertyValue("--x") == hx &&
        val.style.getPropertyValue("--y") == hy
    ).length > 1 ||
    lose
  ) {
      started = false;
      loose = true;
      direction = "";
      clearInterval(MAIN || setInterval(function () {}, 1000));
  }
  if (difficulty=="hard" && DOM.obstacles.filter(
    (val) =>
      val.style.getPropertyValue("--x") == hx &&
      val.style.getPropertyValue("--y") == hy
  ).length > 0) {
    started = false;
    loose = true;
    direction = "";
    clearInterval(MAIN || setInterval(function () {}, 1000));  
  }
  return true
}

function setMommySize() {
  let h = window.innerHeight - 80;
  DOM.mommy.style.gridTemplateRows = `${h * (3.5 / 10)}px ${h * (6.5 / 10)}px`;
  let w = window.innerWidth * 0.99 - (window.innerHeight - 80);
  DOM.mommy.style.gridTemplateColumns = `${w}px ${h}px`;
  if (!direction && DOM.snake[0]) {
    snakePeiceMoveTo(DOM.snake[0], 2, 4);
    snakePeiceMoveTo(DOM.snake[1], 1, 4);
  }
  DOM.obstacles.forEach((obstacle) => snakePeiceMoveTo(obstacle,obstacle.style.getPropertyValue("--x"),obstacle.style.getPropertyValue("--y")))
  snakePeiceMoveTo(DOM.apple, appleCoords[0], appleCoords[1]);
  return true
}
DOM.newGame.addEventListener("click", function () {
  console.log("preparing new game...")
  if (!started) {
    console.log("new gamee...")
    score = 0;
    DOM.score.innerHTML = `Score: ${score}`;
    loose = false;
    newGame();
  }else {
    console.log("Failed because started = true")
    started = false
    loose = true;
    direction = "";
    clearInterval(MAIN || setInterval(function () {}, 1000));
  }
  return true
});
DOM.newGameP2.addEventListener("click", function () {
  console.log("preparing new game...")
  if (!started) {
    console.log("new gamee...")
    score = 0;
    DOM.score.innerHTML = `Score: ${score}`;
    loose = false;
    newGameP2();
  }else {
    console.log("Failed because started = true")
    started = false
    loose = true;
    direction = "";
    clearInterval(MAIN || setInterval(function () {}, 1000));
  }
  return true
});
setMommySize();
window.onresize = setMommySize;
