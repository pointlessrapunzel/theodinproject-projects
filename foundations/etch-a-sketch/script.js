const screen = document.querySelector('.screen')
const resetBtn = document.querySelector('#btn-reset')
const colourPicker = document.querySelector('[type="color"]')
const gridSizeInput = document.querySelector('#gridSize')
const controlsForm = document.querySelector('.controls')

const MAX_GRID_SIZE = 150
const MIN_GRID_SIZE = 5
const EMPTY_CELL_COLOUR = '#ddd'
const etchingModes = {
  solid: 'solid',
  rainbow: 'rainbow',
}
let etchingMode = etchingModes.solid
let currentGridSize = gridSizeInput.value
let currentDrawColour = '#222'

let matrix = createMatrix(currentGridSize)

function createMatrix(gridSize) {
  return Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }).fill(EMPTY_CELL_COLOUR)
  )
}

function renderMatrix(matrix) {
  screen.innerHTML = ''
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
gridSizeInput.addEventListener('change', changeCurrentGridSize)
controlsForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(e)
})

function etchHover(e) {
  e.stopPropagation()
  if (e.target.classList[0] !== 'cell') return
  setCellColour(e.target, currentDrawColour)
}

function resetScreen() {
  if (currentGridSize !== matrix.length) {
    matrix = createMatrix(currentGridSize)
    renderMatrix(matrix)
    return
  }

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

function changeCurrentGridSize(e) {
  currentGridSize =
    e.target.value < MIN_GRID_SIZE
      ? 5
      : e.target.value > MAX_GRID_SIZE
      ? 150
      : e.target.value

  e.target.value = currentGridSize
}

renderMatrix(matrix)

console.log(matrix)
