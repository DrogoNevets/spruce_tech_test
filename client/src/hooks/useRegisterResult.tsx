export default () => {
  return (player: string, result: string) => {
    let data;

    switch(result) {
      case 'WIN':
        data = {
          win: true
        };
        break;
      case 'LOSS':
        data = {
          loss: true
        };
        break;
      case 'DRAW':
        data = {
          draw: true
        };
        break;
    }

    return fetch(`http://localhost:3002/player/${player}`, {
      method: 'POST',
      body: JSON.stringify({
        data
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  };
};