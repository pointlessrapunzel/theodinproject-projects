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

calculator.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') registerKeypress(e.target.dataset.key)
})

window.addEventListener('keydown', (e) => {
  let key = e.key

  // Enter equivalent to = for numpad users
  if (key == 'Enter') key = '='

  // e.key[0] to not pick up f-keys
  // regex: any digits, +, -, *, /, = and . signs
  if (
    key != 'Backspace' &&
    key != 'c' &&
    !key[0].match(/(\d|\+|\-|\*|\/|\=|\.)/)
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
  else registerOperatorKeypress(key)
}

function registerNumberKeypress(number) {
  // disallow ultra large numbers
  if (displayNumber.textContent.length > String(Number.MAX_SAFE_INTEGER).length)
    return

  // initial zero shouldn't lead
  if (displayNumber.textContent == '0') displayNumber.textContent = ''

  displayNumber.textContent += String(number)
}

function registerOperatorKeypress(operator) {
  console.log('operator:', operator)
  if (operator == 'c') return (displayNumber.textContent = '0')
  if (operator == 'Backspace') {
    // remove last character
    displayNumber.textContent = displayNumber.textContent.slice(
      0,
      displayNumber.textContent.length - 1
    )
    if (displayNumber.textContent.length == 0) displayNumber.textContent = 0

    return
  }
}
