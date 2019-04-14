import React from 'react';

interface GameStopButtonProps {
  content: any;
  onStopClick: () => void;
}

export const GameStopButton = function GameStopButton({ onStopClick, content }: GameStopButtonProps) {
  return (
    <button onClick={onStopClick}>
      {content}
    </button>
  );
}
