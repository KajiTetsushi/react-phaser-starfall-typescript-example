import React, { ReactNode, FunctionComponent } from 'react';

export type GameStopButtonProps = {
  content?: ReactNode;
  onStopClick: () => void;
};

export const GameStopButton: FunctionComponent<GameStopButtonProps> = (props) => {
  const {
    onStopClick,
    content,
  } = props;

  return (
    <button onClick={onStopClick}>
      {content}
    </button>
  );
}
