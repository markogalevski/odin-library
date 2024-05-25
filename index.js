class Library {
	#library = [];
	addBook(book) {
		book.index = this.nextIndex;
		this.#library.push(book);
		book.createCard();
	}
	get nextIndex() {
		return this.#library.length;
	}

	requestBook(index) {
		return this.#library[index];
	}

	removeBook(index) {
		this.#library.splice(index, 1);
		for (const book of this.#library) {
			book.index = this.#library.indexOf(book);
		}
	}
}

const library = new Library();

const bookCollection = document.getElementById("book-collection");
const openFormButton = document.getElementById("open-form");
const cancelButton = document.getElementById("cancel");
const addButton = document.querySelector("form");
const dialog = document.querySelector("dialog");

const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputRead = document.getElementById("read");

openFormButton.addEventListener("click", () => {
	dialog.showModal();
});

cancelButton.addEventListener("click", () => {
	clearForm();
	dialog.close();
});

addButton.addEventListener("submit", (e) => {
	const title = String(inputTitle.value);
	const author = inputAuthor.value;
	const pages = inputPages.value;
	const read = inputRead.checked;
	library.addBook(new Book(title, author, pages, read));
	inputTitle.value = "";
	inputAuthor.value = "";
	inputPages.value = "";
	inputRead.checked = false;
	dialog.close();
	e.preventDefault();
});

class Book {
	title;
	author;
	numPages;
	isRead;
	index;
	constructor(title, author, numPages, isRead) {
		this.title = title;
		this.title = author;
		this.numPages = numPages;
		this.isRead = isRead;
	}

	toggleRead() {
		this.isRead = !this.isRead;
		const read = this.element.querySelector("div.read");
		read.textContent = `Read?: ${this.isRead ? "🤓" : "📖"}`;
	}
	createCard() {
		const card = document.createElement("div");
		card.classList.add("book");
		const title = document.createElement("div");
		title.classList.add("title");
		title.textContent = `Title: ${this.title}`;
		const author = document.createElement("div");
		author.classList.add("author");
		author.textContent = `Author: ${this.author}`;
		const numPages = document.createElement("div");
		numPages.classList.add("num-pages");
		numPages.textContent = `Page Count: ${this.numPages}`;
		const read = document.createElement("div");
		read.classList.add("read");
		read.textContent = `Read?: ${this.isRead ? "🤓" : "📖"}`;
		const cardButtons = document.createElement("div");
		cardButtons.classList.add("card-buttons");
		const deleteButton = document.createElement("button");
		deleteButton.classList.add("remove");
		deleteButton.textContent = "Remove";
		deleteButton.addEventListener("click", () => {
			const book = library.requestBook(this.index);
			book.element.style.animation = "fade-out 0.2s ease-in";
			book.element.style.opacity = "0";
			book.element.addEventListener("animationend", () => {
				bookCollection.removeChild(book.element);
				library.removeBook(this.index);
			});
		});
		const readButton = document.createElement("button");
		readButton.classList.add("read");
		readButton.textContent = "Read";
		readButton.addEventListener("click", () => {
			this.toggleRead();
		});
		card.appendChild(title);
		card.appendChild(author);
		card.appendChild(numPages);
		card.appendChild(read);
		cardButtons.appendChild(deleteButton);
		cardButtons.appendChild(readButton);
		card.appendChild(cardButtons);
		this.element = card;
		bookCollection.appendChild(card);
	}
}
