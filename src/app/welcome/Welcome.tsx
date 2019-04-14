import React from 'react';

interface WelcomeProps {
  header: string;
  onPlayClick: () => void;
}

export const Welcome = function Welcome({ header, onPlayClick }: WelcomeProps) {
  return (
    <div>
      <h1>
        {header}
      </h1>
      <button onClick={onPlayClick}>
        Play
      </button>
    </div>
  );
}
