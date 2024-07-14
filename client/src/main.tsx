import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { XorO } from './types'
import Cell from './components/Cell'
import useCalculateWinner from './hooks/useCalculateWinner'
import useCreateBoard from './hooks/useCreateBoard'
import useRegisterResult from './hooks/useRegisterResult'
import useInvertPlayer from './hooks/useInvertPlayer'
import Players from './components/Players'
import { PlayerProps } from './components/Player'

export const Main = () => {
  const [player, setPlayer] = useState<XorO>('X');
  const [winner, setWinner] = useState<XorO | 'DRAW' | null>(null);
  const [turns, setTurn] = useState<number>(0);
  const [players, setPlayers] = useState<PlayerProps[]>([]);
  
  const createBoard = useCreateBoard();
  const registerResult = useRegisterResult();
  const invertPlayer = useInvertPlayer();
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

  const getData = async () => {
    const res = await fetch(`http://localhost:3002/data`);
    const data = await res.json();

    setPlayers(data);
  }

  useEffect(() => {
   getData();
  }, []);

  useEffect(() => {
    const processGame = async () => {
      const winner = calculateWinner();
      
      if(winner) {
        await Promise.allSettled([
          registerResult(winner, 'WIN'),
          registerResult(invertPlayer(winner), 'LOSS')
        ]);

        setWinner(winner);
      }
      
      if(!winner) {
        if(turns >= 9) {
          await Promise.allSettled([
            registerResult('X', 'DRAW'),
            registerResult('O', 'DRAW')
          ]);

          setWinner('DRAW');
        }
      }
    }

    processGame();
  }, [board]);

  useEffect(() => {
    getData()
  }, [winner]);

  const resetBoard = () => {
    setBoard(createBoard());
    setTurn(0);
  }

  const isDraw = useMemo(() => {
    return winner === 'DRAW';
  }, [winner]);

  return <div className="bg-thd-color-violet-90 grid md:grid-cols-2 gap-4xl max-w-screen-3xl md:mx-auto lg:thd-rounded-ext md:items-center px-fluid-base py-fluid-md lg:p-fluid-lg">
    <div className="flex flex-col mt-10 items-center gap-10">
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
    </div>

    <Players players={players} />
  </div>;
}
