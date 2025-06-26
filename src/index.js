const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleSearch);

// Function to hande the search form submission
function handleSearch(event) {
    event.preventDefault();

    const userInput = document.getElementById("search-input").value.trim();
    console.log(userInput);
    if (userInput === "") {
        alert("Please enter a search term.");
        return;
    }
    displaySearchResults(userInput);

    searchForm.reset();
}
// Function to display search results
function displaySearchResults(userInput) {
    const searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(userInput)}`;

    fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById("results-container");
        console.log(data);
        console.log(resultsContainer);
        resultsContainer.innerHTML = ""; // Clear previous results
        // Limit to 10 results
        const books = data.docs.slice(0, 10); //docs is the name of the books array with the above endpoint

        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book");

        const title = book.title || "No title available";
        const author = book.author_name ? book.author_name.join(", ") : "Unknown Author";
        const coverId = book.cover_i;
        const imgSrc = coverId 
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : "https://placehold.co/150x220?text=No+Cover&font=roboto";

        bookCard.innerHTML = `
          <img src="${imgSrc}" alt="${title}" />
          <h3>${title}</h3>
          <p><em>${author}</em></p>
          <button id="addFavorite">Want to Read</button>
          `;
            resultsContainer.appendChild(bookCard);
        });
    })
    .catch(error => {
      console.error("Search failed:", error);
    });
}
displaySearchResults("Harry Potter"); //default search result

// display popular books from the API
function displayPopularBooks() {
    const popularUrl = "https://openlibrary.org/search.json?q=ud+theory";


    fetch(popularUrl)
    .then(response => response.json())
    .then(data => {
        //limit to 6 books and only those with cover image
        const books = data.docs.filter(doc => doc.cover_i).slice(0, 6)
        const popularContainer = document.getElementById("popular-container");
        // console.log(popularContainer);
        // console.log(books);
        popularContainer.innerHTML = "";

        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book");

        const title = book.title || "No title available";
        const author = book.author_name ? book.author_name.join(", ") : "Unknown Author";
        const coverId = book.cover_i;
        const imgSrc = coverId 
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : "https://placehold.co/150x220?text=No+Cover&font=roboto";

        bookCard.innerHTML = `
          <img src="${imgSrc}" alt="${title}" />
          <h3>${title}</h3>
          <p><em>${author}</em></p>
          `;
            popularContainer.appendChild(bookCard);
        })

    })
    .catch(err => {
      console.error("Failed to load popular books:", err);
    });
}
displayPopularBooks();