import React from 'react';

export type PlayerProps = {
  id: number;
  player: string;
  wins: number;
  losses: number;
  draws: number;
}

const Player: React.FC<PlayerProps> = ({ player, wins, losses, draws }) => {
  return <div>
    <p>
      Player: {player}
    </p>

    <p>
      Wins: {wins}
    </p>

    <p>
      Losses: {losses}
    </p>

    <p>
      Draws: {draws}
    </p>
  </div>;
};

export default Player;