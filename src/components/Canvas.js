import React, { useEffect, useState } from 'react';

function Canvas({ texts, updateText, canvasRef, setSelectedTextId, moveText }) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedTextId, setDraggedTextId] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    texts.forEach(text => {
      ctx.font = `${text.size}px ${text.font}`;
      ctx.fillStyle = text.color;
      ctx.fillText(text.content, text.x, text.y);
    });
  }, [texts, canvasRef]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const clickedText = texts.find(text => 
      x >= text.x && x <= text.x + (text.content.length * text.size * 0.6) && 
      y >= text.y - text.size && y <= text.y
    );
    
    if (clickedText) {
      setIsDragging(true);
      setDraggedTextId(clickedText.id);
      setStartX(x - clickedText.x);
      setStartY(y - clickedText.y);
      setSelectedTextId(clickedText.id);
    } else {
      setSelectedTextId(null);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      moveText(draggedTextId, x - startX, y - startY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedTextId(null);
  };

  return (
    <canvas 
      ref={canvasRef}
      className="border border-gray-300 w-[70%] h-[65%] "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}

export default Canvas;