const DOM = {
    board: document.getElementById("board"),
    mommy: document.getElementById("mommy"),
    tiles:[[],[],[],[],[],[],[],[],[],[]]
}

function loadBoard(){
    for (let x=0; x<10; x++) {
        for (let y=0; y<10; y++) {
            let newBox = document.createElement("div")
            newBox.style.gridRow = y + 1
            newBox.style.gridColumn = x + 1
            DOM.board.appendChild(newBox)
            DOM.tiles[x][y] = newBox
        }
    }
}
function setMommySize() {
    let h = window.innerHeight - 80
    DOM.mommy.style.gridTemplateRows = `${h * (4/10)}px ${h * (6/10)}px`
    let w = window.innerWidth*0.99 - (window.innerHeight - 80)
    DOM.mommy.style.gridTemplateColumns = `${w}px ${h}px`
}
setMommySize()
window.onresize = setMommySize

loadBoard()