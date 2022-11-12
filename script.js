const DOM = {
    board: document.getElementById("board"),
    mommy: document.getElementById("mommy"),
    tiles:[[],[],[],[],[],[],[],[],[],[]],
    SnFold:document.getElementById("snake"),
    snake:[],
    apple: document.getElementById("apple")
}

let score = 0
function loadBoard(){
    for (let x=0; x<10; x++) {
        for (let y=0; y<10; y++) {
            let newBox = document.createElement("div")
            newBox.style.gridRow = y + 1
            newBox.style.gridColumn = x + 1
            if (Math.floor((x+y)/2) != (x+y)/2) {
                newBox.style.backgroundColor = "#3338"
            }
            DOM.board.appendChild(newBox)
            DOM.tiles[x][y] = newBox
        }
    }
}


const snakeBackgroundImage= {
    b1: "linear-gradient(#AA2222, #AA1010)"
}
loadBoard()
let appleCoords = []
function genApple(x,y) {
    snakePeiceMoveTo(DOM.apple,x,y)
    appleCoords[0] = x
    appleCoords[1] = y
}
genApple(7,4)

DOM.snake[0] = document.createElement("div")
DOM.snake[0].style.position= "absolute"
DOM.snake[0].style.backgroundImage = snakeBackgroundImage.b1
DOM.SnFold.appendChild(DOM.snake[0])
DOM.snake[0].style.transform = "rotate(-90deg)"
DOM.snake[0].style.transition = "left 0.2s, top 0.2s"

function snakePeiceMoveTo(p,x,y){
    console.log(x,y)
    let data = DOM.tiles[x][y].getBoundingClientRect()
    p.style.top =  `${data.top}px`
    p.style.left =  `${data.left}px`
    p.style.height = `${data.bottom -data.top}px`
    p.style.width = `${data.right -data.left}px`
    p.style.setProperty("--x",x)
    p.style.setProperty("--y",y)
}
function snakePeiceShift(p,x,y) {
    snakePeiceMoveTo(p,Number(p.style.getPropertyValue('--x')) +x, Number(p.style.getPropertyValue("--y"))+y)
}
snakePeiceMoveTo(DOM.snake[0],2,4)
let direction
setInterval(() => {
    moveSnake()
    if (direction=="r") {
        snakePeiceShift(DOM.snake[0],1,0)
        check()
        DOM.snake[0].style.transform="rotate(-90deg)"
    }else if (direction == "l") {
        snakePeiceShift(DOM.snake[0],-1,0)
        check()
        DOM.snake[0].style.transform= "rotate(90deg)"
    }else if (direction == "u") {
        snakePeiceShift(DOM.snake[0],0,-1)
        check()
        DOM.snake[0].style.transform="rotate(180deg)"
    }else if (direction == "d") {
        snakePeiceShift(DOM.snake[0],0,1)
        check()
        DOM.snake[0].style.transform="rotate(0deg)"
    }
}, 200);

document.addEventListener('keydown', (event) => {
    let key = event.key
    if ((key.toLowerCase() =="arrowright") && (direction !="l"))  {
        direction="r"
    }else if ((key.toLowerCase() =="arrowleft")&& (direction !="r")){
        direction="l"
    }else if ((key.toLowerCase() =="arrowup")&& (direction !="d")){
        direction="u"
    }else if ((key.toLowerCase() =="arrowdown")&& (direction !="u")){
        direction="d"
    }
})
function moveSnake() {
    if (DOM.snake.length > 1) {
        for (let i = DOM.snake.length - 1; i > 0; i--) {
            console.log(i)
            let SP = DOM.snake[i]
            let PIF = DOM.snake[i - 1]
            snakePeiceMoveTo(SP,PIF.style.getPropertyValue("--x"),PIF.style.getPropertyValue("--y"))
        }
    }
}

function newSnakePiece() {
    let p = DOM.snake.length
    DOM.snake[p] = document.createElement("div")
    DOM.snake[p].style.position= "absolute"
    DOM.snake[p].style.backgroundImage = snakeBackgroundImage.b1
    DOM.SnFold.appendChild(DOM.snake[p])
    DOM.snake[p].style.transform = "rotate(-90deg)"
    DOM.snake[p].style.transition = "left 0.2s, top 0.2s"
    let SP = DOM.snake[p]
    let PIF = DOM.snake[p-1]
    snakePeiceMoveTo(SP, PIF.style.getPropertyValue("--x"),PIF.style.getPropertyValue("--y"))
}
function check(){
    let head = DOM.snake[0]
    let hx = Number(head.style.getPropertyValue("--x"))
    let hy =Number(head.style.getPropertyValue("--y"))
    if (hx == appleCoords[0] && hy == appleCoords[1]) {
        score = score + 1
        newSnakePiece()
    }
}
newSnakePiece()
newSnakePiece()

function setMommySize() {
    let h = window.innerHeight - 80
    DOM.mommy.style.gridTemplateRows = `${h * (4/10)}px ${h * (6/10)}px`
    let w = window.innerWidth*0.99 - (window.innerHeight - 80)
    DOM.mommy.style.gridTemplateColumns = `${w}px ${h}px`
    if (!direction) {
        snakePeiceMoveTo(DOM.snake[0],2,4)
    }
    snakePeiceMoveTo(DOM.apple,appleCoords[0],appleCoords[1])
}

setMommySize()
window.onresize = setMommySize