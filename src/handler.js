const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };
  books.push(newBook);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      books
    },
  });
  response.header('Access-Control-Allow-Origin', '*');
  response.code(201);
  return response;
};

const displayBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = books;
  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (reading !== undefined) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }
  if (finished !== undefined) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished ===isFinished);

  }
  const response = h.response({
    status : 'success',
    data : {
      books: filteredBooks.map(({ id, name, publisher }) => ({
        id,
        name,
        publisher
      }))
    }
  });
  response.code(200);
  return response;
};

const displayBooksDetailHandler = (request, h) => {
  const { id } = request.params;
  const book = books.find((book) => book.id === id);
  if (!book) {
    const response = h.response({
      status : 'fail',
      message : 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  const response = h.response({
    status : 'success',
    data : {
      book
    }
  });response.code(200);
  return response;
};


const editBooksHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const bookIndex = books.findIndex((book) => book.id === id);
  const updatedAt = new Date().toISOString();
  if (!name) {
    const response = h.response({
      status : 'fail',
      message : 'gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(404);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status : 'fail',
      message : 'gagal meperbarui buku, readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }
  if (bookIndex === -1) {
    const response = h.response({
      status : 'fail',
      message : 'gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  }
  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  const response = h.response({
    status : 'sucess',
    message : 'buku berhasil diperbaharui'
  });
  response.code(200);
  return response;

};

const deleteBooksHandler = (request, h) => {
  const { id } = request.params;
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex !==-1) {
    books.splice(bookIndex, 1);
    const response = h.response({
      status : 'sucess',
      message : 'buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status : 'fail',
    message : 'buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);
  return response;

};

module.exports = { addBookHandler, displayBooksHandler, displayBooksDetailHandler, editBooksHandler, deleteBooksHandler };