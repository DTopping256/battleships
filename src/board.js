export const [ SHIP, HIT, EMPTY, MISS ] = [ 'S', 'X', '-', 'O' ];

export function getEmptyBoard() {
    const board = [];

    for (let i = 0; i < 9; i++) {
        const column = [];

        for (let j = 0; j < 9; j++) {
            column.push(EMPTY);
        }

        board.push(column);
    }

    return board;
};


export function isShipAtLocation(board, coordinates) {
    const [x, y] = coordinates; 
    const tileState = board[x][y];

    return (tileState === SHIP);
}

export function guessAtLocation(board, coordinates) {
    const [x, y] = coordinates;
    const didHit = isShipAtLocation(board, coordinates);
    
    // Change the board state, based upon the guess coordinates.
    board[x][y] = (didHit) ? HIT : MISS;
    
    return didHit;
}

export function placeShipAtLocation(board, coordinates) {    
    const [x, y] = coordinates;

    if (board[x][y] != EMPTY)
        return false;

    board[x][y] = SHIP;
    return true;
}