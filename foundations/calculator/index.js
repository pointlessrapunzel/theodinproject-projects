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

calculator.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') registerKeypress(e.target.dataset.key)
})

window.addEventListener('keydown', (e) => {
  // Enter equivalent to = for numpad users
  let key = e.key
  if (key == 'Enter') key = '='

  // e.key[0] to not pick up f-keys
  // regex: any digits, +, -, *, /, = and . signs
  if (!key[0].match(/(\d|\+|\-|\*|\/|\=|\.)/)) return

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
  console.log('key:', key)
}

function registerNumberKeypress(number) {
  console.log('You entered:', number)
}

function registerOperatorKeypress(operator) {
  console.log('operator:', operator)
}
