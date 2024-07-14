export enum Result {
  WIN = 'win',
  LOSS = 'loss',
  DRAW = 'draw'
}

export interface TicTacToeDB {
  init: () => Promise<boolean>;
  getAll: () => Promise<TicTacToeRow[]>;
  getPlayer: (player: string) => Promise<TicTacToeRow[] | undefined>;
  registerResult: (player: string, result: Result) => Promise<boolean>;
}

export type TicTacToeRow = {
  id: number;
  player: string;
  wins: number;
  losses: number;
  draws: number;
}

export { default } from './SQLLite';