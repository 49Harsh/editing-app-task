import React, { useEffect } from 'react';

function Canvas({ texts, updateText, canvasRef, setSelectedTextId }) {
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

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const clickedText = texts.find(text => 
      x >= text.x && x <= text.x + (text.content.length * text.size * 0.6) && 
      y >= text.y - text.size && y <= text.y
    );
    
    if (clickedText) {
      setSelectedTextId(clickedText.id);
    } else {
      setSelectedTextId(null);
    }
  };

  return (
    <canvas 
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-gray-300"
      onClick={handleCanvasClick}
    />
  );
}

export default Canvas;