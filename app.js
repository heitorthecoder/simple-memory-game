document.addEventListener('DOMContentLoaded', () => {
  const cardsArray = [{
      name: 'fries',
      img: './assets/fries.png'
    },
    {
      name: 'fries',
      img: './assets/fries.png'
    },
    {
      name: 'cheeseburger',
      img: './assets/cheeseburger.png'
    },
    {
      name: 'cheeseburger',
      img: './assets/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: './assets/ice-cream.png'
    },
    {
      name: 'ice-cream',
      img: './assets/ice-cream.png'
    },
    {
      name: 'pizza',
      img: './assets/pizza.png'
    },
    {
      name: 'pizza',
      img: './assets/pizza.png'
    },
    {
      name: 'milkshake',
      img: './assets/milkshake.png'
    },
    {
      name: 'milkshake',
      img: './assets/milkshake.png'
    },
    {
      name: 'hotdog',
      img: './assets/hotdog.png'
    },
    {
      name: 'hotdog',
      img: './assets/hotdog.png'
    }
  ]

  // SHUFFLING CARDS INDEXES 
  cardsArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []

  function handleCreateBoard() {
    for (let i = 0; i < cardsArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', './assets/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', handleFlipCard)
      grid.appendChild(card)
    }
  }

  function handleFlipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardsArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardsArray[cardId].img)
    if (cardsChosen.length == 2) {
      setTimeout(handleCheckForMatch, 500)
    }
  }

  function handleCheckForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', './assets/blank.png')
      cards[optionTwoId].setAttribute('src', './assets/blank.png')
      alert('You clicked the same card')
    } else if (cardsChosen[0] == cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', './assets/white.png')
      cards[optionTwoId].setAttribute('src', './assets/white.png')
      cards[optionOneId].removeEventListener('click', handleFlipCard)
      cards[optionTwoId].removeEventListener('click', handleFlipCard)
      cardsWon.push(cardsChosen)
      alert('You found a match!')
    } else {
      cards[optionOneId].setAttribute('src', './assets/blank.png')
      cards[optionTwoId].setAttribute('src', './assets/blank.png')
      alert('Sorry, try again')
    }

    // CLEANING VARIABLE TO NEXT PAIR OF CARDS
    cardsChosen = []
    cardsChosenId = []

    resultDisplay.textContent = cardsWon.length

    // WHEN PLAYER COMPLETES THE GAME
    if (cardsWon.length == (cardsArray.length / 2)) {
      resultDisplay.textContent = 'Well done, you completed the game!'
    }
  }

  handleCreateBoard()
})