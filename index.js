const myLibrary = [];
const bookCollection = document.getElementById("book-collection");
const openButton = document.getElementById("open");
const cancelButton = document.getElementById("cancel");
const addButton = document.querySelector("form");
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

addButton.addEventListener("submit", (e) => {
  const title = String(inputTitle.value);
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const read = inputRead.checked;
  addBookToLibrary(title, author, pages, read);
  clearForm();
  dialog.close();
  e.preventDefault();
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
  this.index = myLibrary.length;
  this.toggleRead = function () {
    this.isRead = !this.isRead;
    const read = this.element.querySelector('div.read');
    read.textContent = `Read?: ${this.isRead ? "🤓" : "📖"}`;        
  }
  this.createCard = function () {

    const book = document.createElement('div');
    book.classList.add('book')
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = `Title: ${this.title}`;
    const author= document.createElement('div');
    author.classList.add('author');
    author.textContent = `Author: ${this.author}`;
    const numPages = document.createElement('div');
    numPages.classList.add('num-pages');
    numPages.textContent = `Page Count: ${this.numPages}`;
    const read = document.createElement('div');
    read.classList.add('read');
    read.textContent = `Read?: ${this.isRead ? "🤓" : "📖"}`;        
    const cardButtons = document.createElement('div');
    cardButtons.classList.add('card-buttons');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("remove");
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", () => {
      const book = myLibrary[this.index];
      book.element.style.animation = "fade-out 0.2s ease-in";
      book.element.style.opacity = "0";
      book.element.addEventListener('animationend', () => {
        bookCollection.removeChild(book.element);
        myLibrary.splice(this.index, 1);
        for (const book of myLibrary) {
          book.index = myLibrary.indexOf(book);
        }
      });
    })
    const readButton = document.createElement('button');
    readButton.classList.add("read");
    readButton.textContent = "Read";
    readButton.addEventListener("click", () => {
      this.toggleRead();
    })
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(numPages);
    book.appendChild(read);
    cardButtons.appendChild(deleteButton);
    cardButtons.appendChild(readButton);
    book.appendChild(cardButtons)
    this.element = book;
    bookCollection.appendChild(book);
  }
}

function addBookToLibrary(title, author, numPages, isRead) {
  const book = new Book(title, author, numPages, isRead); 
   myLibrary.push(book);
   book.createCard();
}

