import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { XorO } from './types'
import Cell from './components/Cell'
import useCalculateWinner from './hooks/useCalculateWinner'
import useCreateBoard from './hooks/useCreateBoard'

export const Main = () => {
  const [player, setPlayer] = useState<XorO>('X');
  const [winner, setWinner] = useState<XorO | 'DRAW' | null>(null);
  const [turns, setTurn] = useState<number>(0);
  
  const createBoard = useCreateBoard();
  const [board, setBoard] = useState<(XorO | undefined)[][]>(createBoard());

  const calculateWinner = useCalculateWinner(board.flatMap((cell) => cell));

  const takeTurn = (x: number, y: number) => {
    if(!winner) {
      const newBoard = [...board];
      newBoard[y][x] = player as XorO;

      setBoard(newBoard);
      setTurn(turns + 1);

      if(player === 'X') {
        setPlayer('O');
      } else {
        setPlayer('X');
      }
    }
  }

  useEffect(() => {
    const winner = calculateWinner();
    setWinner(winner);

    if(!winner) {
      if(turns >= 9) {
        setWinner('DRAW');
      }
    }
  }, [board]);

  const resetBoard = () => {
    setBoard(createBoard());
  }

  const isDraw = useMemo(() => {
    return winner === 'DRAW';
  }, [winner]);

  return <div className="flex flex-col mt-10 items-center gap-10">
    <div className="font-bold text-2xl">Tic Tac Toe</div>
    <div className="flex flex-row justify-between gap-20">
      <div className='flex flex-col gap-1'>
        {board.map((row, y) => {
          return <div className='flex gap-1' key={y}>
            {row.map((column, x) => {
              return <Cell 
                key={x} 
                className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'
                value={column} 
                onClick={() => takeTurn(x, y)} 
              />;
            })}
          </div>;
        })}
      </div>
    </div>

    {!winner && <div className="text-center">
      Next turn: {player}
    </div>}
      
    {winner && <div className="flex flex-col">
      {!isDraw && <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-center">{winner} WINS!</h1>}
      {isDraw && <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-center">IT'S A DRAW!</h1>}
      <button 
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded wodth-100"
        onClick={resetBoard}
      >
        Reset board
      </button>
    </div>}
  </div>;
}
