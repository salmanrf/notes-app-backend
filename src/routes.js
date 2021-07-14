const handlers = require('./handler');

const routes = [
  {
    path: '/notes',
    method: 'GET',
    handler: handlers.getAllNotesHandler,
  },
  {
    path: '/notes',
    method: 'POST',
    handler: handlers.createNoteHandler,
  },
  {
    path: '/notes/{id}',
    method: 'GET',
    handler: handlers.getNoteByIdHandler,
  },
  {
    path: '/notes/{id}',
    method: 'PUT',
    handler: handlers.editNoteById,
  },
  {
    path: '/notes/{id}',
    method: 'DELETE',
    handler: handlers.deleteNoteById,
  },
];

module.exports = routes;
