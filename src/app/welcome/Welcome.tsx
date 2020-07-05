import React, { FunctionComponent, ReactNode } from 'react';

export type WelcomeProps = {
  header?: ReactNode;
  onPlayClick?: () => void;
};

export const Welcome: FunctionComponent<WelcomeProps> = (props) => {
  const {
    header,
    onPlayClick,
  } = props;

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
