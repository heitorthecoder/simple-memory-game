document.addEventListener('DOMContentLoaded', () => {
  const cardsArray = [{
      name: 'fries',
      img: 'fries.png'
    },
    {
      name: 'fries',
      img: 'fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'cheeseburger.png'
    },
    {
      name: 'cheeseburger',
      img: 'cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'ice-cream.png'
    },
    {
      name: 'ice-cream',
      img: 'ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'pizza.png'
    },
    {
      name: 'pizza',
      img: 'pizza.png'
    },
    {
      name: 'milkshake',
      img: 'milkshake.png'
    },
    {
      name: 'milkshake',
      img: 'milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'hotdog.png'
    },
    {
      name: 'hotdog',
      img: 'hotdog.png'
    }
  ]

  // shuffle the cards indexes
  cardsArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const displayResult = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  function handleBoardCreation() {
    for (let i = 0; i < cardsArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', `./assets/blank.png`)
      card.setAttribute('data-id', i)
      card.addEventListener('click', handleCardFlipping)
      grid.appendChild(card)
    }
  }

  function handleCardFlipping() {
    const cardId = this.getAttribute('data-id')
    this.setAttribute('src', `./assets/${cardsArray[cardId].img}`)
    cardsChosen.push(cardsArray[cardId].name)
    cardsChosenId.push(cardId)

    if (cardsChosen.length == 2) {
      setTimeout(handleCardsMatching, 500)
    }
  }

  function handleCardsMatching() {
    const cards = document.querySelectorAll('img')
    const op1 = cardsChosenId[0]
    const op2 = cardsChosenId[1]

    if (op1 == op2) {
      alert('You\'ve have clicked on the same image')
      cards[op1].setAttribute('src', './assets/blank.png')
      cards[op2].setAttribute('src', './assets/blank.png')
    } else if (cardsChosen[0] == cardsChosen[1]) {
      cards[op1].setAttribute('src', './assets/white.png')
      cards[op2].setAttribute('src', './assets/white.png')
      cards[op1].removeEventListener('click', handleCardFlipping)
      cards[op2].removeEventListener('click', handleCardFlipping)
      cardsWon.push(cards)
      alert('You\'ve found a match!')
    } else {
      alert('Sorry, try again')
      cards[op1].setAttribute('src', './assets/blank.png')
      cards[op2].setAttribute('src', './assets/blank.png')
    }

    // clear arrays
    cardsChosen = []
    cardsChosenId = []

    displayResult.innerHTML = cardsWon.length

    if (cardsWon.length == (cardsArray.length / 2)) {
      displayResult.innerHTML = 'Congrats! you completed the game!'
    }
  }

  handleBoardCreation()
})
