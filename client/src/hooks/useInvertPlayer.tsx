import { XorO } from "../types"

export default() => {
  return (player: XorO) => {
    if(player === 'O') {
      return 'X';
    } else {
      return 'O';
    }
  }
}