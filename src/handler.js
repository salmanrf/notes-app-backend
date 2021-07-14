/* eslint-disable no-shadow */
const { nanoid } = require('nanoid');
const notes = require('./notes');

function getAllNotesHandler() {
  return {
    status: 'success',
    data: { notes },
  };
}

function getNoteByIdHandler(request, h) {
  const { id } = request.params;

  const note = notes.find((note) => note.id === id);

  if (note) {
    return {
      status: 'success',
      data: { note },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan.',
  });

  response.code(404);

  return response;
}

function editNoteById(request, h) {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  let response = null;

  if (index >= 0) {
    notes[index] = {
      ...notes[index], title, tags, body, updatedAt,
    };

    response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui.',
    });

    response.code(200);
    return response;
  }

  response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan, id tidak ditemukan.',
  });

  response.code(404);
  return response;
}

function deleteNoteById(request, h) {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  let response = null;

  if (index >= 0) {
    notes.splice(index, 1);

    response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus.',
    });
    response.code(200);

    return response;
  }

  response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus, id tidak ditemukan.',
  });
  response.code(404);

  return response;
}

function createNoteHandler(request, h) {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id, title, tags, body, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.find((note) => note.id === id);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
    data: {
      noteId: id,
    },
  });

  response.code(500);

  return response;
}

module.exports = {
  createNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteById, deleteNoteById,
};
