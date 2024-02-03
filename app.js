const gameboard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'pink'
playerDisplay.textContent = 'pink'

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard(){
    startPieces.forEach((startPieces,i)=>{
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML= startPieces
        square.firstChild?.setAttribute('draggable',true)
        square.setAttribute('square-id',i)

        const row = Math.floor((63-i)/8)+1;

        if (row%2===0) {
            square.classList.add(i%2===0?'beige':'brown')
        }else{
            square.classList.add(i%2===0?'brown':'beige')
        }

        if (i<=15) {
            square.firstChild.firstChild.classList.add('pink')
        }
        if(i>=48){
            square.firstChild.firstChild.classList.add('black')
        }

        gameboard.append(square)
    })
}

createBoard()



const allsquare = document.querySelectorAll(".square")
allsquare.forEach(square =>{
    square.addEventListener('dragstart',dragStart)
    square.addEventListener('dragover',dragOver)
    square.addEventListener('drop',dragDrop)
})

let startpositionId;
let draggedElement

function dragStart (e){
    startpositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver (e){
    e.preventDefault()
}

function dragDrop (e){
    e.stopPropagation()
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    console.log(draggedElement)
    const taken = e.target.classList.contains('piece')
    const validd = checkIfValid(e.target)
    const OPPONENTgO = playerGo==='black'?'pink':'black'
    const takenByOpponent = e.target.firstChild?.classList.contains(OPPONENTgO)

    if(correctGo){
        if (takenByOpponent && validd){
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            changePlayer()
            return
        }

        if(taken && !takenByOpponent){
            infoDisplay.textContent = "You cannot go here!"
            setTimeout(()=> infoDisplay.textContent="",2000)
            return
        }
        if(3*3==9){
            e.target.append(draggedElement)
            changePlayer()
            return
        }
    }

}


function checkIfValid(target){
    const targetId = Number(target.getAttribute('square-id'))|| Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startpositionId)
    const piece = draggedElement.id

    switch (piece) {
        case 'pawn':
            const starterRow =[8,9,10,11,12,13,14,15]
            if (starterRow.includes(startId) && (startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild) || (startId + width === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild) ||
          (startId + width - 1 === targetId &&
            document.querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild) ||
          (startId + width + 1 === targetId &&
            document.querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild)){
                return true
            }
            break;

         case 'knight':
            if(
                startId+width*2+1===targetId ||
                startId+width*2-1===targetId ||
                startId+width-2===targetId ||
                startId+width+2===targetId ||
                startId-width*2+1===targetId ||
                startId-width*2-1===targetId||
                startId-width-2===targetId ||
                startId-width+2===targetId
                ){
                return true
            }   break;

            case 'bishop':
                if(startId+width+1===targetId ||
                   startId+width*2+2 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                   startId+width*3+3 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+2}"]`).firstChild ||
                   startId+width*4+4 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+3}"]`).firstChild||
                   startId+width*5+5 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4+4}"]`).firstChild||
                   startId+width*6+6 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5+5}"]`).firstChild||
                   startId+width*7+7 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*6+6}"]`).firstChild ||

                   startId-width-1==targetId ||
                   startId-width*2-2 === targetId &&  !document.querySelector(`[square-id="${startId -width - 1}"]`).firstChild ||
                   startId-width*3-3 === targetId &&  !document.querySelector(`[square-id="${startId -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2-2}"]`).firstChild ||
                   startId+width*4-4 === targetId &&  !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3-3}"]`).firstChild||
                   startId+width*5-5 === targetId &&  !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4-4}"]`).firstChild||
                   startId+width*6-6 === targetId &&  !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5-5}"]`).firstChild||
                   startId+width*7-7 === targetId &&  !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6-6}"]`).firstChild ||

                   startId-width+1==targetId ||
                   startId-width*2+2 === targetId &&  !document.querySelector(`[square-id="${startId -width + 1}"]`).firstChild ||
                   startId-width*3+3 === targetId &&  !document.querySelector(`[square-id="${startId -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+2}"]`).firstChild ||
                   startId+width*4+4 === targetId &&  !document.querySelector(`[square-id="${startId - width +1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*+-3}"]`).firstChild||
                   startId+width*5+5 === targetId &&  !document.querySelector(`[square-id="${startId - width +1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4+4}"]`).firstChild||
                   startId+width*6+6 === targetId &&  !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5+5}"]`).firstChild||
                   startId+width*7+7 === targetId &&  !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6+6}"]`).firstChild
                    ){
                        return true
                    } break;

                    case 'rook':
                        if(
                            startId+width==targetId ||
                   startId+width*2 === targetId &&  !document.querySelector(`[square-id="${startId +width}"]`).firstChild||
                   startId+width*3 === targetId &&  !document.querySelector(`[square-id="${startId +width*2}"]`).firstChild||
                   startId+width*4 === targetId &&  !document.querySelector(`[square-id="${startId +width*3}"]`).firstChild||
                   startId+width*5 === targetId &&  !document.querySelector(`[square-id="${startId +width*4}"]`).firstChild||
                   startId+width*6 === targetId &&  !document.querySelector(`[square-id="${startId +width*5}"]`).firstChild||
                   startId+width*7 === targetId &&  !document.querySelector(`[square-id="${startId +width*6}"]`).firstChild||
                   
                   startId-width==targetId ||
                   startId-width*2 === targetId &&  !document.querySelector(`[square-id="${startId -width}"]`).firstChild||
                   startId-width*3 === targetId &&  !document.querySelector(`[square-id="${startId -width*2}"]`).firstChild||
                   startId-width*4 === targetId &&  !document.querySelector(`[square-id="${startId -width*3}"]`).firstChild||
                   startId-width*5 === targetId &&  !document.querySelector(`[square-id="${startId -width*4}"]`).firstChild||
                   startId-width*6 === targetId &&  !document.querySelector(`[square-id="${startId -width*5}"]`).firstChild||
                   startId-width*7 === targetId &&  !document.querySelector(`[square-id="${startId-width*6}"]`).firstChild
                        ){
                            return true;
                        }break;

                        case 'queen':
                            if(
                                startId+width==targetId ||
                       startId+width*2 === targetId &&  !document.querySelector(`[square-id="${startId +width}"]`).firstChild||
                       startId+width*3 === targetId &&  !document.querySelector(`[square-id="${startId +width*2}"]`).firstChild||
                       startId+width*4 === targetId &&  !document.querySelector(`[square-id="${startId +width*3}"]`).firstChild||
                       startId+width*5 === targetId &&  !document.querySelector(`[square-id="${startId +width*4}"]`).firstChild||
                       startId+width*6 === targetId &&  !document.querySelector(`[square-id="${startId +width*5}"]`).firstChild||
                       startId+width*7 === targetId &&  !document.querySelector(`[square-id="${startId +width*6}"]`).firstChild||
                       
                       startId-width==targetId ||
                       startId-width*2 === targetId &&  !document.querySelector(`[square-id="${startId -width}"]`).firstChild||
                       startId-width*3 === targetId &&  !document.querySelector(`[square-id="${startId -width*2}"]`).firstChild||
                       startId-width*4 === targetId &&  !document.querySelector(`[square-id="${startId -width*3}"]`).firstChild||
                       startId-width*5 === targetId &&  !document.querySelector(`[square-id="${startId -width*4}"]`).firstChild||
                       startId-width*6 === targetId &&  !document.querySelector(`[square-id="${startId -width*5}"]`).firstChild||
                       startId-width*7 === targetId &&  !document.querySelector(`[square-id="${startId-width*6}"]`).firstChild||
                       startId+width+1==targetId ||
                   startId+width*2+2 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                   startId+width*3+3 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2+2}"]`).firstChild ||
                   startId+width*4+4 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*3+3}"]`).firstChild||
                   startId+width*5+5 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4+4}"]`).firstChild||
                   startId+width*6+6 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5+5}"]`).firstChild||
                   startId+width*7+7 === targetId &&  !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*6+6}"]`).firstChild ||

                   startId-width-1==targetId ||
                   startId-width*2-2  === targetId&&  !document.querySelector(`[square-id="${startId -width - 1}"]`).firstChild ||
                   startId-width*3-3 === targetId &&  !document.querySelector(`[square-id="${startId -width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2-2}"]`).firstChild ||
                   startId+width*4-4 === targetId &&  !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*3-3}"]`).firstChild||
                   startId+width*5-5 === targetId &&  !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4-4}"]`).firstChild||
                   startId+width*6-6 === targetId &&  !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5-5}"]`).firstChild||
                   startId+width*7-7 === targetId &&  !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6-6}"]`).firstChild ||

                   startId-width+1==targetId ||
                   startId-width*2+2 === targetId &&  !document.querySelector(`[square-id="${startId -width + 1}"]`).firstChild ||
                   startId-width*3+3 === targetId &&  !document.querySelector(`[square-id="${startId -width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2+2}"]`).firstChild ||
                   startId+width*4+4 === targetId &&  !document.querySelector(`[square-id="${startId - width +1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*+-3}"]`).firstChild||
                   startId+width*5+5 === targetId &&  !document.querySelector(`[square-id="${startId - width +1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4+4}"]`).firstChild||
                   startId+width*6+6 === targetId &&  !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5+5}"]`).firstChild||
                   startId+width*7+7 === targetId &&  !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*6+6}"]`).firstChild

                            ){
                                return true
                            }break;

                            case 'king':
                                if(
                                    startId + width === targetId||

                                    startId - width === targetId||
                                    startId + 1 === targetId||
                                    startId -1 === targetId||
                                    startId + width-1 === targetId||
                                    startId - width-1 === targetId||
                                    startId + width+1 === targetId||
                                    startId - width+1 === targetId
                                    ){
                                    return true;
                                }break;
                
    }
}

function changePlayer(){
    if (playerGo === 'pink') {
        reveseIds()
        playerGo = 'black'
        playerDisplay.textContent = 'black'
    } else {
        revertIds()
        playerGo = 'pink'
        playerDisplay.textContent = 'pink'
    }
        
}

function reveseIds(){
    const allsquare = document.querySelectorAll(".square")
    allsquare.forEach((square,i) => square.setAttribute('square-id',(width*width)-1-i))
}

function revertIds(){
    const allsquare = document.querySelectorAll(".square")
    allsquare.forEach((square,i) => square.setAttribute('square-id',i))
}
