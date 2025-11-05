class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
    this.toggleReadStatus = function () {
      if (this.read === 'Not Read Yet') {
        return (this.read = 'Read');
      }
      return (this.read = 'Not Read Yet');
    };
  }
}

class Library extends Book {
  myLibrary = [];
  table = document.querySelector('#book-table');
  addBookBtn = document.querySelector('#new-book-btn');
  closeModalBtn = document.querySelector('#close-modal-btn');
  submitModalBtn = document.querySelector('#submit-modal-btn');
  dialog = document.querySelector('dialog');

  constructor() {
    super();
    this.initializeListeners();
  }
  openModal() {
    this.dialog.showModal();
  }

  closeModal() {
    this.dialog.close();
  }

  submitModal(e) {
    e.preventDefault();
    const bookTitle = document.querySelector('#title');
    const bookAuthor = document.querySelector('#author');
    const bookPages = document.querySelector('#pages');
    const bookRead = document.querySelector(
      'input[name="read-status"]:checked'
    );
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const read = bookRead.value;
    const id = crypto.randomUUID();
    const newBook = new Book(title, author, pages, read, id);
    this.myLibrary.push(newBook);
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    // bookRead.value = '';
    this.addBookToTable();
    this.dialog.close();
  }

  addBookToTable() {
    this.clearBookTable();
    for (const book of this.myLibrary) {
      const newRow = document.createElement('tr');
      const title = document.createElement('td');
      title.textContent = book.title;
      newRow.appendChild(title);
      const author = document.createElement('td');
      author.textContent = book.author;
      newRow.appendChild(author);
      const pages = document.createElement('td');
      pages.textContent = book.pages;
      newRow.appendChild(pages);
      const read = document.createElement('td');
      read.textContent = book.read;
      newRow.appendChild(read);
      const update = document.createElement('td');
      const updateBtn = document.createElement('button');
      updateBtn.textContent = 'Update Read Status';
      updateBtn.setAttribute('id', book.id);
      updateBtn.classList.add('updateBtn');
      updateBtn.addEventListener('click', () => {
        const book = this.myLibrary.find(
          (book) => book.id === updateBtn.attributes.id.value
        );
        book.toggleReadStatus();
        this.addBookToTable();
      });
      update.appendChild(updateBtn);
      newRow.appendChild(update);
      const remove = document.createElement('td');
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove Book';
      removeBtn.setAttribute('id', book.id);
      removeBtn.classList.add('removeBtn');
      removeBtn.addEventListener('click', () => {
        const newLibrary = this.myLibrary.filter(
          (book) => book.id !== removeBtn.attributes.id.value
        );
        this.myLibrary = newLibrary;
        this.addBookToTable();
      });
      remove.appendChild(removeBtn);
      newRow.appendChild(remove);
      this.table.appendChild(newRow);
    }
  }

  clearBookTable() {
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }
  }

  initializeListeners() {
    this.closeModalBtn.addEventListener('click', this.closeModal.bind(this));
    this.addBookBtn.addEventListener('click', this.openModal.bind(this));
    this.submitModalBtn.addEventListener('click', this.submitModal.bind(this));
  }

  addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const newBook = new Book(title, author, pages, read, id);
    return this.myLibrary.push(newBook);
  }
}

const library = new Library();
