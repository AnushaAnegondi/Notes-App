import React from 'react';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {notes.map((note) => (
        <div key={note.id} className="col">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.content}</p>
            </div>
            <div className="card-footer text-end">
              <button onClick={() => onEdit(note)} className="btn btn-warning btn-sm me-2">
                Edit
              </button>
              <button onClick={() => onDelete(note.id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
