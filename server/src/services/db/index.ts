export interface TicTacToeDB {
  init: () => Promise<boolean>;
  getAll: () => Promise<TicTacToeRow[]>;
  getPlayer: (player: string) => Promise<TicTacToeRow[] | undefined>;
}

export type TicTacToeRow = {
  id: number;
  player: string;
  wins: number;
  losses: number;
  draws: number;
}

export { default } from './SQLLite';