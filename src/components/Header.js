import React from 'react';

function Header({ undo, redo }) {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <button onClick={undo} className="mr-2 px-3 py-1 bg-blue-500 rounded">Undo</button>
        <button onClick={redo} className="px-3 py-1 bg-blue-500 rounded">Redo</button>
      </div>
      <div>
        <a href="/" className="mr-4">Home</a>
        <a href="/login">Login</a>
      </div>
    </header>
  );
}

export default Header;