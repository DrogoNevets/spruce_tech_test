import React, { useEffect, useState } from 'react';
import Player, { PlayerProps } from './Player';

type PlayersProps = {
  players: PlayerProps[];
}

const Players: React.FC<PlayersProps> = ({ players }) => {
  return <div className="flex flex-col gap-10">
    {players?.map((player) => {
      return <Player {...player} key={player.id} />;
    })}
  </div>;
};

export default Players;