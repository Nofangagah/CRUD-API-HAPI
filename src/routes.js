const { addBookHandler, displayBooksHandler, displayBooksDetailHandler, editBooksHandler, deleteBooksHandler } = require('./handler');
const routes = [
  {
    method: 'POST',
    path: '/books',
    handler : addBookHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path : '/books',
    handler : displayBooksHandler,
    options : {
      cors : {
        origin : ['*']
      },
    },
  },
  {
    method : 'GET',
    path : '/books/{id}',
    handler : displayBooksDetailHandler,
    options : {
      cors : {
        origin : ['*']
      }
    }

  }, {
    method : 'PUT',
    path : '/books/{id}',
    handler : editBooksHandler,
    options : {
      cors : {
        origin : ['*']
      }
    }
  }, {
    method : 'DELETE',
    path : '/books/{id}',
    handler : deleteBooksHandler,
    options : {
      cors : {
        origin : ['*']
      }
    }
  }

];


module.exports = routes;