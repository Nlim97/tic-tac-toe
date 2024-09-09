const Player = function(playerName, symbol){
    const name = playerName
    let lines = []
   function addCombo(str){
        lines.push(str)
    }

    function resetLine(){
        lines.length = 0
    }
   return {name, symbol, lines, addCombo, resetLine}
}
const player1 = Player("player1", "X")
const player2 = Player("player2", "0")

const gameChecker = (function(){
    const winningCombos = [
        ["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], 
        ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], 
        ["1", "5", "9"], ["3", "5", "7"]                  
    ];

    function checkWin(playerLines){
        return winningCombos.some(combo => {
            return combo.every(cell => playerLines.includes(cell))
        })
    }
    return{ checkWin }
})()

const Game = (function(){

    const gameBoard = ["","","","","","","","",""]
    let turn = 0
    const players = [player1, player2]
    const header = document.querySelector("h1")
    const restart = document.querySelector(".restart")
    const cells = document.querySelectorAll(".box")
    cells.forEach(cell => {
        cell.addEventListener("click", clickedCell)
    })

    restart.addEventListener("click", resetGame)

    function clickedCell(event){
        const cell = event.target
        const cellIndex = cell.classList[0]
        if(gameBoard[cellIndex - 1] !== ""){
            alert("The box is already occupied")
            return
        }

        const currentPLayer = players[turn % 2]

        makeMove(cell, currentPLayer, cellIndex)

        if(gameChecker.checkWin(currentPLayer.lines)){
            header.innerHTML = `${currentPLayer.name} has won`
            restart.style.display = "block"
            return
        }
        if(!gameBoard.includes("")){
            header.innerHTML = "Draw"
            restart.style.display = "block"
            return
        }
        turn++
    }


    function makeMove(cell, currentPlayer, index){
        header.innerHTML = currentPlayer.name
        cell.innerHTML = currentPlayer.symbol
        gameBoard[index - 1] = currentPlayer.symbol; 
        currentPlayer.addCombo(index)
    }


    function resetGame(){
        gameBoard.fill("")
        restart.style.display = "none"
        header.innerHTML = "Tic-Tac-Toe"
        cells.forEach(cell => cell.innerHTML = "")
        players.forEach(player => player.resetLine())
        turn = 0
    }
    return {cells, turn}

})();


