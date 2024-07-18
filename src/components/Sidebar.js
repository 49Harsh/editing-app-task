import React from 'react';

function Sidebar({ addText, updateText, selectedText }) {
  const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier'];
  const sizes = Array.from({ length: 17 }, (_, i) => i + 8);
  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  const handleContentChange = (e) => {
    if (selectedText) {
      updateText(selectedText.id, { content: e.target.value });
    }
  };

  const handleFontChange = (e) => {
    if (selectedText) {
      updateText(selectedText.id, { font: e.target.value });
    }
  };

  const handleSizeChange = (e) => {
    if (selectedText) {
      updateText(selectedText.id, { size: parseInt(e.target.value) });
    }
  };

  const handleColorChange = (e) => {
    if (selectedText) {
      updateText(selectedText.id, { color: e.target.value });
    }
  };

  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Text Properties</h2>
      {selectedText ? (
        <>
          <div className="mb-4">
            <label className="block mb-2">Content:</label>
            <input
              type="text"
              value={selectedText.content}
              onChange={handleContentChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Font:</label>
            <select 
              value={selectedText.font} 
              onChange={handleFontChange} 
              className="w-full p-2 border rounded"
            >
              {fonts.map(font => <option key={font} value={font}>{font}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Size:</label>
            <select 
              value={selectedText.size} 
              onChange={handleSizeChange} 
              className="w-full p-2 border rounded"
            >
              {sizes.map(size => <option key={size} value={size}>{size}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Color:</label>
            <select 
              value={selectedText.color} 
              onChange={handleColorChange} 
              className="w-full p-2 border rounded"
            >
              {colors.map(color => (
                <option key={color} value={color} style={{backgroundColor: color}}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <p className="mb-4">Select a text on the canvas to edit its properties.</p>
      )}
      <button onClick={addText} className="w-full bg-blue-500 text-white p-2 rounded">
        Add Text
      </button>
    </div>
  );
}

export default Sidebar;