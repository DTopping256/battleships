export const [ SHIP, HIT, EMPTY, MISS ] = [ 'S', 'X', '-', 'O' ];
export const MAX_SHIP_TILES = 17; 
export const BOARD_SIDE_LENGTH = 10;

export function getEmptyBoard() {
    const board = [];

    for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
        const column = [];

        for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
            column.push(EMPTY);
        }

        board.push(column);
    }

    return board;
};

export function getRandomStartingBoard() {
    const randomFlattenedIndices = new Set();
    while (randomFlattenedIndices.size < MAX_SHIP_TILES) {
        randomFlattenedIndices.add(Math.round(Math.random() * ((BOARD_SIDE_LENGTH**2) - 1)));
    }

    const board = getEmptyBoard();
    for (let flattenedIndex of randomFlattenedIndices.values()) {
        let x = flattenedIndex % BOARD_SIDE_LENGTH;
        let y = Math.floor(flattenedIndex / BOARD_SIDE_LENGTH);
        board[x][y] = SHIP;
    }
    
    return board;
}

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

export function obfuscateBoard(board) {
    return board.map((column) => {
        return column.map((tileState) => {
            if (tileState == SHIP)
                return EMPTY;

            return tileState;
        });
    });
}