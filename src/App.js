import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';

function App() {
  const [texts, setTexts] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);


  const addText = () => {
    const newText = { id: Date.now(), content: 'New Text', font: 'Arial', size: 16, color: '#000000', x: 50, y: 50 };
    setTexts([...texts, newText]);
    setSelectedTextId(newText.id);
    addToHistory([...texts, newText]);
  };

  const updateText = (id, updates) => {
    const updatedTexts = texts.map(text => text.id === id ? { ...text, ...updates } : text);
    setTexts(updatedTexts);
    addToHistory(updatedTexts);
  };

  const addToHistory = (newState) => {
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTexts(history[currentStep - 1]);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      setTexts(history[currentStep + 1]);
    }
  };

  // fixing in MOVE EFFECT 

const moveText = (id, newX, newY) => {
  const updatedTexts = texts.map(text => 
    text.id === id ? { ...text, x: newX, y: newY } : text
  );
  setTexts(updatedTexts);
};


return (
  <div className="flex flex-col h-screen">
    <Header undo={undo} redo={redo} />
    <div className="flex flex-1 overflow-hidden">
      <Canvas 
        texts={texts} 
        updateText={updateText} 
        setSelectedTextId={setSelectedTextId}
        moveText={moveText}
      />
      <Sidebar 
        addText={addText} 
        updateText={updateText} 
        selectedText={texts.find(t => t.id === selectedTextId)}
      />
    </div>
  </div>
  );
}

export default App;