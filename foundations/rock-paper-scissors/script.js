const WEAPONS = ['rock', 'paper', 'scissors']
const winMap = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
}

function computerPlay() {
  return WEAPONS[Math.floor(Math.random() * WEAPONS.length)]
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase()
  if (winMap[playerSelection] === computerSelection) return 'player'
  if (playerSelection === computerSelection) return 'draw'
  return 'computer'
}

function game() {
  ;[playerScore, pcScore] = [0, 0]
  for (let round = 1; round <= 5; round++) {
    console.log('===== SCORE TABLE =====')
    console.log(`Player:`, playerScore)
    console.log(`PC:`, pcScore)
    let playerSelection
    while (
      !playerSelection ||
      !WEAPONS.includes(playerSelection.toLowerCase())
    ) {
      playerSelection = prompt('What weapon will you choose?')

      if (playerSelection === null) {
        console.log('You aborted the game!')
        return
      }
    }
    let compSelection = computerPlay()
    let result = playRound(playerSelection, compSelection)

    if (result === 'player') {
      console.log(`You won! ${playerSelection} beats ${compSelection}`)
      playerScore++
    } else if (result === 'computer') {
      console.log(`You lose! ${compSelection} beats ${playerSelection}`)
      pcScore++
    } else
      console.log(
        'It was a draw! Both you and the computer chose',
        playerSelection
      )
  }

  if (playerScore > pcScore) console.log('You won the game!')
  else if (playerScore < pcScore) console.log('You lost the game! :(')
  else console.log('The game was a draw!')
  console.log('Scores:', `${playerScore}:${pcScore}`)
}

const startBtn = document.querySelector('#start-btn')
startBtn.addEventListener('click', game)
