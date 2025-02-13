import React, { useState, useEffect } from 'react';
import Header from './Header';
import NoteList from './NoteList';

const CreateNote = () => {
  // States for handling the popup and notes
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Load notes from localStorage when the app starts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Handle Add Note button click
  const openAddNotePopup = () => {
    setShowPopup(true);
    setTitle(''); // Reset title and content for new note
    setContent('');
    setEditingNoteId(null); // No editing in the case of adding a new note
  };

  // Handle Edit button click
  const openEditNotePopup = (note) => {
    setShowPopup(true);
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note.id); // Save the ID of the note being edited
  };

  // Handle Save button click
  const handleSaveNote = () => {
    if (!title || !content) {
      // If title or content is empty, show an alert and do not save
      alert('Title and content are required!');
      return;
    }

    const newNote = { title, content, id: editingNoteId || Date.now() }; // Use timestamp for new notes
    let updatedNotes = [...notes];

    if (editingNoteId) {
      // Edit existing note
      updatedNotes = updatedNotes.map((note) =>
        note.id === editingNoteId ? newNote : note
      );
    } else {
      // Add new note
      updatedNotes.push(newNote);
    }

    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Save to localStorage
    setShowPopup(false); // Close the popup
  };

  // Handle Cancel button click
  const handleCancel = () => {
    setShowPopup(false); // Close the popup without saving
  };

  // Handle Delete button click
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Update localStorage
  };

  return (
    <div>
      <Header onAddNote={openAddNotePopup} />

      {/* Popup for adding or editing a note */}
      {showPopup && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingNoteId ? 'Edit Note' : 'Add Note'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Note</label>
                  <textarea
                    id="content"
                    className="form-control"
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleSaveNote} className="btn btn-success">
                  Save
                </button>
                <button onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Container for Note List with padding */}
      <div className="container">
        <NoteList notes={notes} onEdit={openEditNotePopup} onDelete={handleDeleteNote} />
      </div>
    </div>
  );
};

export default CreateNote;
