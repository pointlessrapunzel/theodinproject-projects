const OPERATIONS = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return OPERATIONS.add(a, b)
    case '-':
      return OPERATIONS.subtract(a, b)
    case '*':
      return OPERATIONS.multiply(a, b)
    case '/':
      if (b == 0) throw new Error('cannot divide by zero')
      return OPERATIONS.divide(a, b)
    default:
      throw new Error('invalid operation')
  }
}

const calculator = document.querySelector('#calculator')
const displayNumber = calculator.querySelector('#current-num')
const displayOperation = calculator.querySelector('#display-operation')
displayNumber.textContent = 0
displayOperation.textContent = ''

const operands = [0, 0] // tuple of length 2
let operandBeingSet = 0
let lastChosenOperator = null
let prevKeypress = null
let isError = false

calculator.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') registerKeypress(e.target.dataset.key)
})

window.addEventListener('keydown', (e) => {
  let key = e.key

  // Enter equivalent to = for numpad users
  if (key == 'Enter') {
    key = '='
    // disallow focused button press on Enter key
    e.preventDefault()
  }
  // Escape equivalent to clear (or 'c') button
  if (key == 'Escape') key = 'c'

  // e.key[0] to not pick up f-keys
  // regex: any digits, +, -, *, /, =, ^ and . symbols
  if (
    key != 'Backspace' &&
    key != 'c' &&
    !key[0].match(/(\d|\+|\-|\*|\/|\=|\.|\^)/)
  )
    return

  registerKeypress(key)

  // add pressed animation to the corresponding button
  const btnEl = calculator.querySelector(`[data-key="${key}"]`)
  btnEl.classList.toggle('pressed')
  setTimeout(() => {
    btnEl.classList.toggle('pressed')
  }, 50)

  // prevent browser from starting quick search
  if (key.match('/')) e.preventDefault()
})

function registerKeypress(key) {
  if (key.match(/\d/)) registerNumberKeypress(key)
  else if (key == 'c') registerClean()
  else if (key == 'Backspace') removeLastInput()
  else if (key == '=') registerEquals()
  else if (key == '.') return // TODO: decimals
  else registerOperatorKeypress(key)
  prevKeypress = key
}

function registerNumberKeypress(number) {
  if (isError) {
    isError = false
    registerClean()
  }
  // disallow ultra large numbers
  if (displayNumber.textContent.length > String(Number.MAX_SAFE_INTEGER).length)
    return

  // disallow leading nulls
  // if last input was an operator, replace previous number input
  if (
    displayNumber.textContent == '0' ||
    isKeyAnOperator(prevKeypress) ||
    prevKeypress == '='
  )
    displayNumber.textContent = ''

  displayNumber.textContent += String(number)
  operands[operandBeingSet] = +displayNumber.textContent
}

function registerOperatorKeypress(operator) {
  if (isError) return

  operands[0] = +displayNumber.textContent
  lastChosenOperator = operator
  operandBeingSet = 1

  displayOperation.textContent = `${operands[0]} ${operator}`
}

function registerEquals() {
  if (isError) {
    isError = false
    return registerClean()
  }

  if (!operands[1]) operands[1] = +displayNumber.textContent

  if (!lastChosenOperator) return

  let result = 0
  try {
    result = operate(lastChosenOperator, operands[0], operands[1])
  } catch (e) {
    isError = true
    registerClean()
    displayNumber.textContent = e.message
    return
  }

  displayOperation.textContent = `${operands[0]} ${lastChosenOperator} ${operands[1]} =`
  displayNumber.textContent = result
  operandBeingSet = 0
  operands[0] = result
}

function registerClean() {
  displayNumber.textContent = '0'
  displayOperation.textContent = ''
  lastChosenOperator = null
  operands.fill(0)
}

function removeLastInput() {
  displayNumber.textContent = displayNumber.textContent.slice(
    0,
    displayNumber.textContent.length - 1
  )

  if (
    displayNumber.textContent.length == 0 ||
    Number.isNaN(+displayNumber.textContent)
  )
    displayNumber.textContent = 0
}

function isKeyAnOperator(key) {
  if (!key) return false
  // test for math +, -, *, /, =, and ^ symbols
  return key.match(/(\+|\-|\*|\/|\^)/)
}
