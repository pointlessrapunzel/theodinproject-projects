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

function testOperate() {
  if (operate('+', 1, 1) != 2) return false
  console.log('+ works correctly')

  if (operate('-', 1, 1) != 0) return false
  console.log('- works correctly')

  if (operate('*', 2, 2) != 4) return false
  console.log('* works correctly')

  if (operate('/', 2, 2) != 1) return false
  console.log('/ works correctly')

  return true
}

function runTests() {
  console.log('operate:', testOperate())
}

runTests()
