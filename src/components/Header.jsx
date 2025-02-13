import React from 'react';

const Header = ({ onAddNote }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Notes App</h1>
      <button style={styles.addButton} onClick={onAddNote}>
        Add Note
      </button>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  title: {
    textAlign: 'center',
    flex: 1,
    margin: 0,
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Header;
