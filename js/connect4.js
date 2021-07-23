/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7
const HEIGHT = 6

let currPlayer = 1 // active player: 1 or 2
let board = [] // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    let row = []
    for (let k = 0; k < WIDTH; k++) {
      row.push(undefined)
    }
    board.push(row)
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board')

  /**
   * Dynamically creates the table rows with a
   * click listener, and sets an id of column-top.
   */
  const top = document.createElement('tr')
  top.setAttribute('id', 'column-top')
  top.addEventListener('click', handleClick)

  /**
   * Loops through the top row then creates and appends
   * the top row's cells which'll be used to select/highlight
   * which column to drop a game piece
   */
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td')
    headCell.setAttribute('id', x)
    top.append(headCell)
  }
  htmlBoard.append(top)

  /**
   * Dynamically creates y number of rows and creates x number of cells
   * to be created and appended to the htmlBoard each with an id that's a
   * combination of the y-x index values
   */
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr')
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td')
      cell.setAttribute('id', `${y}-${x}`)
      row.append(cell)
    }
    htmlBoard.append(row)
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0

  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][x] === undefined) {
      return i
    }
  }
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const gamePiece = document.createElement('div')
  gamePiece.classList.add(`p-${currPlayer}`)
  gamePiece.classList.add('piece')

  const td = document.getElementById(`${y}-${x}`)
  td.append(gamePiece)
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id
  console.log('x: ', x)
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x)
  console.log('y: ', y)
  if (y === null) {
    return
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = `Player${currPlayer}`
  placeInTable(y, x)

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`)
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  const tie = board.every((cell) => cell.every((val) => val !== undefined))
  if (tie) {
    return endGame(`It's a tie -_-`)
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1)
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer,
    )
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ]
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ]
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ]
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ]

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true
      }
    }
  }
}

makeBoard()
makeHtmlBoard()
