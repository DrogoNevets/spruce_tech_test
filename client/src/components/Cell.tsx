import React, { PropsWithChildren, useCallback } from 'react';

type CellProps = {
  value?: string;
  onClick?: () => void;
  className?: string;
}

const Cell:React.FC<CellProps> = ({onClick, value, className}) => {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return <button onClick={handleClick} className={className}>
    {value}
  </button>;
};

export default Cell;