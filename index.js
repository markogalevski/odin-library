const myLibrary = [];
const bookCollection = document.getElementById("book-collection");
const openButton = document.getElementById("open");
const cancelButton = document.getElementById("cancel");
const addButton = document.getElementById("add");
const dialog = document.querySelector("dialog");

const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputRead = document.getElementById("read");

openButton.addEventListener(("click"), () =>  {
  dialog.showModal();
})

cancelButton.addEventListener("click", () => {
  clearForm();
  dialog.close();
})

addButton.addEventListener("click", (e) => {
  /* actually add to list from the form data */
  //i.e. this should be the actual submit button 
  const title = String(inputTitle.value);
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const read = inputRead.checked;
  addBookToLibrary(title, author, pages, read);
  displayAllBooks();
  clearForm();
  dialog.close();
})

function clearForm() {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputRead.checked = false;
  
}


function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;  
  this.createCard = function () {
    /*
			<div class="book">
				<div class="title">The Hobbit</div>
				<div class="author">J.R.R. Tolkien</div>
				<div class="num-pages">295</div>
				<div class="read">yes</div>
			</div>
    */
    const book = document.createElement('div');
    book.classList.add('book')
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = this.title;
    const author= document.createElement('div');
    author.classList.add('author');
    author.textContent = this.author;
    const numPages = document.createElement('div');
    numPages.classList.add('num-pages');
    numPages.textContent = this.numPages;
    const read = document.createElement('div');
    read.classList.add('read');
    read.textContent = this.isRead ? "yes" : "no";
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(numPages);
    book.appendChild(read);
    bookCollection.appendChild(book);
  }
}

function addBookToLibrary(title, author, numPages, isRead) {
  myLibrary.push(new Book(title, author, numPages, isRead));
}


function displayAllBooks() {
  while (bookCollection.firstChild) {
    bookCollection.removeChild(bookCollection.lastChild);
  }
  myLibrary.forEach((book) =>  {
    // Create card component
    book.createCard();
    
  })
}

/* Dummy test stuff */
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("The Fellowship Of The Ring", "J.R.R. Tolkien", 405, true);
addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 295, true);
addBookToLibrary("The Return of the King", "J.R.R. Tolkien", 295, true);

displayAllBooks();

