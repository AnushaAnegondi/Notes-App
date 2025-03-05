//updated code with radix ui drop down
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import FontAwesome
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const NotesComponent = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Load notes from localStorage on initial load
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
    if (savedNotes.length > 0) {
      setSelectedNote(savedNotes[0]);
      setTitle(savedNotes[0].title);
      setContent(savedNotes[0].content);
    }
  }, []);

  useEffect(() => {
    if (notes.length) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: new Date().toLocaleString("en-GB", {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      content: ' '
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    setSelectedNote(newNote);
    setTitle(newNote.title);
    setContent(newNote.content);
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value;
    setTitle(updatedTitle);
    if (selectedNote) {
      selectedNote.title = updatedTitle;
      updateNotes(selectedNote);
    }
  };

  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    setContent(updatedContent);
    if (selectedNote) {
      selectedNote.content = updatedContent;
      updateNotes(selectedNote);
    }
  };

  const updateNotes = (updatedNote) => {
    setNotes(prevNotes => prevNotes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    if (selectedNote && selectedNote.id === noteId) {
      if (updatedNotes.length > 0) {
        const newSelectedNote = updatedNotes[0];
        setSelectedNote(newSelectedNote);
        setTitle(newSelectedNote.title);
        setContent(newSelectedNote.content);
      } else {
        setSelectedNote(null);
        setTitle('');
        setContent('');
      }
    }
  };

  const getTruncatedContent = (content) => {
    return content.length > 25 ? content.slice(0, 35) + '...' : content;
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="card" style={{ border: '1px solid #ccc' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Notes</h5>
              <button
                className="btn btn-primary rounded-circle"
                onClick={handleAddNote}
                style={{ width: '40px', height: '40px', fontSize: '24px', padding: '0' }}
              >
                +
              </button>
            </div>
            <div className="list-group list-group-flush">
              {notes.map((note) => (
                <div key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-link text-left"
                    onClick={() => handleSelectNote(note)}
                    style={{ width: '90%' }}
                  >
                    <strong><span>{getTruncatedContent(note.title)}</span></strong><br />
                    <span>{getTruncatedContent(note.content)}</span>
                  </button>

                  {/* Radix UI Dropdown Menu for actions */}
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="btn btn-link" style={{ background: 'none', border: 'none' }}>
                        <i className="fas fa-ellipsis-v" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                      side="right"
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '10px',
                        minWidth: '150px',
                      }}
                    >
                      <DropdownMenu.Item onClick={() => handleSelectNote(note)}>
                        View/Edit
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => handleDeleteNote(note.id)}>
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card" style={{ border: '1px solid #ccc' }}>
            <div className="card-body">
              {selectedNote ? (
                <>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      rows="8"
                      value={content}
                      onChange={handleContentChange}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <h5>Select or add a note to edit</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesComponent;
