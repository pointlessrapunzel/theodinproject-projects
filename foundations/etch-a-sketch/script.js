const screen = document.querySelector('.screen')
const resetBtn = document.querySelector('#btn-reset')
const randomBtn = document.querySelector('#btn-random')
const eraserBtn = document.querySelector('#btn-eraser')
const colourPicker = document.querySelector('[type="color"]')
const gridSizeInput = document.querySelector('#gridSize')
const controlsForm = document.querySelector('.controls')

const MAX_GRID_SIZE = 150
const MIN_GRID_SIZE = 5
const EMPTY_CELL_COLOUR = '#DDDDDD'
const etchingModes = {
  solid: 'solid',
  random: 'random',
}
let etchingMode = etchingModes.solid
let currentGridSize = gridSizeInput.value
let currentDrawColour = '#222222'

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
colourPicker.addEventListener('click', () => (etchingMode = etchingModes.solid))
colourPicker.addEventListener('input', handleColourPicker)
gridSizeInput.addEventListener('change', changeCurrentGridSize)
controlsForm.addEventListener('submit', (e) => e.preventDefault())
eraserBtn.addEventListener('click', toggleEraser)
randomBtn.addEventListener('click', toggleRandomMode)

function etchHover(e) {
  e.stopPropagation()
  if (e.target.classList[0] !== 'cell') return
  setCellColour(e.target, currentDrawColour)

  if (etchingMode === etchingModes.random) {
    currentDrawColour = getRandomColour()
    colourPicker.value = currentDrawColour
  }
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

function toggleEraser(e) {
  currentDrawColour = EMPTY_CELL_COLOUR
  colourPicker.value = EMPTY_CELL_COLOUR
  etchingMode = etchingModes.solid
}

function setCurrentColour(colour) {
  currentDrawColour = colour
}

function handleColourPicker(e) {
  setCurrentColour(e.target.value)
  etchingMode = etchingModes.solid
}

function getRandomColour() {
  return '#' + [...Array(6)].map(getRandomHex).join('')
}

function getRandomHex() {
  let result = ''
  do {
    result = Math.floor(Math.random() * 17).toString(16)
  } while (result === '10')

  return result
}

function toggleRandomMode(e) {
  etchingMode =
    etchingMode === etchingModes.random
      ? etchingModes.solid
      : etchingModes.random

  if (etchingMode !== etchingModes.random) setCurrentColour(colourPicker.value)
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
      : Number(e.target.value)

  e.target.value = currentGridSize
}

renderMatrix(matrix)
