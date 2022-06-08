let books

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books")

  booksWrapper.classList += ' books__loading'

  if (!books) {
    books = await getBooks()
  }

  booksWrapper.classList.remove('books__loading')

  if (filter === 'LOW_TO_HIGH') {
    const filteredBooks = books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice))
  } 
  else if (filter === 'HIGH_TO_LOW') {
    const filteredBooks = books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice))
  } 
  else if (filter === 'RATING_LOW_TO_HIGH') {
    const filteredBooks = books.sort((a, b) => (a.rating || a.rating) - (b.rating || b.rating))
  } 
  else if (filter === 'RATING_HIGH_TO_LOW') {
    const filteredBooks = books.sort((a, b) => (b.rating || b.rating) - (a.rating || a.rating))
  } 
  else if (filter === 'A_TO_Z') {
    const filterBooks = books.sort((a, b) => a.title.localeCompare(b.title)) 
  }

  const booksHTML = books.map((book) => {
    return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">${book.title}</div>
    <div class="book__ratings">
    ${ratingsHTML(book.rating)}
    </div>
    <div class="book__price">
      ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
  </div>`
  }).join('')
  
  booksWrapper.innerHTML = booksHTML
}

function priceHTML (originalPrice, salePrice) {
  if (salePrice === null) {
    return `${originalPrice}`
  } 
  return `<span class="book__price--normal">$${originalPrice}</span> $${salePrice}`
}

function ratingsHTML (rating) {
  let ratingHTML = ''

  for (let i = 0; i < Math.floor(rating); i++) {
    ratingHTML += `<i class="fas fa-star"></i>`
  }

  if (!Number.isInteger(rating)) {
    ratingHTML += `<i class="fas fa-star-half-alt"></i>`
  }
  return ratingHTML
}

function filterBooks(event) {
  renderBooks(event.target.value)
}


setTimeout(() => {
  renderBooks()
})

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 24.49,
          salePrice: 12.99,
          rating: 5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 11.96,
          salePrice: 5.99,
          rating: 4,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 15.99,
          salePrice: 7.99,
          rating: 4.5,
        },
        {
          id: 4,
          title: "Can't Hurt Me",
          url: "assets/david goggins.jpeg",
          originalPrice: 8.99,
          salePrice: 3.95,
          rating: 1,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 8.99,
          salePrice: null,
          rating: 3.5,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 6.82,
          salePrice: null,
          rating: 2.5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 13.89,
          salePrice: null,
          rating: 5,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 11.98,
          salePrice: null,
          rating: 3.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 9.95,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 12.49,
          salePrice: null,
          rating: 5,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 7.99,
          salePrice: null,
          rating: 4,
        },
        {
          id: 12,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 15.89,
          salePrice: null,
          rating: 3,
        },
      ])
    }, 1000)
  })
}
