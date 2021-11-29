const screen = document.querySelector('.screen')
const resetBtn = document.querySelector('#btn-reset')
const colourPicker = document.querySelector('[type="color"]')

const MAX_GRID_SIZE = 150
const EMPTY_CELL_COLOUR = '#ddd'
let gridSize = 15
let currentDrawColour = '#222'

const matrix = Array.from({ length: gridSize }, () =>
  Array.from({ length: gridSize }).fill(EMPTY_CELL_COLOUR)
)

function renderMatrix(matrix) {
  matrix.forEach((row, rowIdx) => {
    const rowDiv = document.createElement('div')
    row.forEach((cellClr, cellIdx) => {
      const cellEl = document.createElement('div')
      cellEl.classList.add('cell')
      setCellColour(cellEl, cellClr)
      rowDiv.append(cellEl)
      matrix[rowIdx][cellIdx] = cellEl
    })
    screen.append(rowDiv)
  })
}

screen.addEventListener('mouseover', etchHover)
resetBtn.addEventListener('click', resetScreen)
colourPicker.value = currentDrawColour
colourPicker.addEventListener('change', changeCurrentDrawColour)

function etchHover(e) {
  e.stopPropagation()
  if (e.target.classList[0] !== 'cell') return
  setCellColour(e.target, currentDrawColour)
}

function resetScreen() {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      setCellColour(cell, EMPTY_CELL_COLOUR)
    })
  })
}

function changeCurrentDrawColour(e) {
  currentDrawColour = e.target.value
}

function setCellColour(cell, colour) {
  cell.style.setProperty('--cell-colour', colour)
}

renderMatrix(matrix)

console.log(matrix)
