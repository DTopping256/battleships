import { expect } from 'chai';
import { MISS, SHIP, EMPTY, HIT, MAX_SHIP_TILES, BOARD_SIDE_LENGTH } from "../src/board.js";
import { isShipAtLocation, getEmptyBoard, guessAtLocation, placeShipAtLocation, getRandomStartingBoard, obfuscateBoard } from '../src/board.js';

describe('Board Constants', function(){
    
    describe('HIT, MISS, EMPTY and SHIP', function() {

        it('should have different values', function() {
            expect(HIT).to.not.equal(MISS,      'HIT should not equal MISS');
            expect(HIT).to.not.equal(EMPTY,     'HIT should not equal EMPTY');
            expect(HIT).to.not.equal(SHIP,      'HIT should not equal SHIP');
            expect(MISS).to.not.equal(EMPTY,    'MISS should not equal EMPTY');
            expect(MISS).to.not.equal(SHIP,     'MISS should not equal SHIP');
            expect(EMPTY).to.not.equal(SHIP,    'EMPTY should not equal SHIP');
        });

    });

})

describe('Board Methods', function() {
    let emptyBoard, boardWithOneShip, guessZeroBoard;
    let locationOfShip, locationOfEmpty;
    let x_ship, y_ship, x_empty, y_empty;

    before(function() {
        locationOfShip = [3, 5];
        locationOfEmpty = [4, 4];
        [x_ship, y_ship] = locationOfShip;
        [x_empty, y_empty] = locationOfEmpty;
    });

    beforeEach(function() {
        emptyBoard = getEmptyBoard();
        boardWithOneShip = getEmptyBoard();

        // Puts a ship at the "correct" location. The "incorrect" location, has no ship.
        boardWithOneShip[x_ship][y_ship] = SHIP;
    });

    const TEST_NAME__BOARD_STATE_OUTSIDE_OF_LOCATION_IS_UNCHANGED_FOR_METHOD = 'should not affect tile state on the board other than the given location';
    const testBoardStateOutsideOfLocationIsSameForMethod = function(board, location, methodToTest) {
        const flattenedBoardBefore = board.flat(1);

        methodToTest(board, location);

        const flattenedBoardAfter = board.flat(1);
        const expectedMutatedFlattenedBoardIndex = (x_ship * board.length) + y_ship;

        let diffCount = 0, mutatedIndex;
        for (let i = 0; i < flattenedBoardBefore.length; i++) {
            if (flattenedBoardBefore[i] != flattenedBoardAfter[i]) {
                diffCount++;
                mutatedIndex = i;
            }
        }

        expect(diffCount).to.be.equal(1, 'should only mutate one tile on the board');
        expect(mutatedIndex).to.be.equal(expectedMutatedFlattenedBoardIndex, 'should only the mutate tile for the given location');
    }

    const TEST_NAME__BOARD_HEIGHT_AND_WIDTH = `should be a 2D array which represents a board and has a width and height of ${BOARD_SIDE_LENGTH}`;
    const testBoardHeightAndWidth = function(board) {
        expect(Array.isArray(board)).to.be.true;
        expect(board).to.have.lengthOf(BOARD_SIDE_LENGTH, `expected the outer array of board, to be length ${BOARD_SIDE_LENGTH}`);
        for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
            expect(Array.isArray(board[i])).to.be.true;
            expect(board[i]).to.have.lengthOf(BOARD_SIDE_LENGTH, `expected the inner array at element (${i}), to be length ${BOARD_SIDE_LENGTH}`);
        }
    }

    const TEST_NAME__BOARD_CONTAINS_VALID_TILES = 'should be a 2D array where every element is either a EMPTY, MISS, SHIP or HIT value';
    const testBoardContainsValidTiles = function(board) {
        for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
            for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
                const elementValue = board[i][j];
                expect(elementValue).to.be.oneOf([EMPTY, MISS, SHIP, HIT], `board[${i}][${j}] is ${elementValue} but is expected to be either ${EMPTY}, ${MISS}, ${SHIP} or ${HIT}`); 
            }
        }
    }

    describe('isShipAtLocation', function() {

        it('should correctly report no ship at a given location on an empty board', function() {
            expect(isShipAtLocation(emptyBoard, locationOfShip)).to.be.false;
        });
        
        it('should correctly report a ship at a given location of a ship on a board', function() {
            expect(isShipAtLocation(boardWithOneShip, locationOfShip)).to.be.true;
        });

    });

    describe('guessAtLocation', function() {

        it('should change the tile state for an empty board, at the given location from EMPTY to MISS and method should return false', function() {
            
            expect(emptyBoard[x_ship][y_ship]).to.be.equal(EMPTY, 'initial tile state before guess, to be EMPTY');

            expect(guessAtLocation(emptyBoard, locationOfShip)).to.be.false;

            expect(emptyBoard[x_ship][y_ship]).to.be.equal(MISS, 'tile state after guess, to be MISS');
        });

        it('should change the tile state for a board, at the given incorrect location from EMPTY to MISS and method should return false', function() {

            expect(boardWithOneShip[x_empty][y_empty]).to.be.equal(EMPTY, 'initial tile state before guess, to be EMPTY');

            expect(guessAtLocation(boardWithOneShip, locationOfEmpty)).to.be.false;

            expect(boardWithOneShip[x_empty][y_empty]).to.be.equal(MISS, 'tile state after guess, to be MISS');
        });

        it('should change the tile state for a board, at the given correct location from SHIP to HIT and method should return true', function() {

            expect(boardWithOneShip[x_ship][y_ship]).to.be.equal(SHIP, 'initial tile state before guess, to be SHIP');

            expect(guessAtLocation(boardWithOneShip, locationOfShip)).to.be.true;

            expect(boardWithOneShip[x_ship][y_ship]).to.be.equal(HIT, 'tile state after guess, to be HIT');
        });

        it(TEST_NAME__BOARD_STATE_OUTSIDE_OF_LOCATION_IS_UNCHANGED_FOR_METHOD, function() {
            testBoardStateOutsideOfLocationIsSameForMethod(boardWithOneShip, locationOfShip, guessAtLocation);
        });

    });

    describe('placeShipAtLocation', function() {

        it('should change the tile state for an empty board, at the given valid location from EMPTY to SHIP and method should return true', function() {
            expect(placeShipAtLocation(emptyBoard, locationOfShip)).to.be.true;
            expect(emptyBoard[x_ship][y_ship]).to.be.equal(SHIP, 'should mutate the tile for the given location to SHIP');
        });

        it('should not change the tile state on a board when the tile is SHIP', function () {
            const tileStateBefore = boardWithOneShip[x_ship][y_ship];
            expect(placeShipAtLocation(boardWithOneShip, locationOfShip)).to.be.false;
            const tileStateAfter = boardWithOneShip[x_ship][y_ship];
            expect(tileStateAfter).to.be.equal(tileStateBefore, 'should NOT mutate the tile for the given location');
        });

        it(TEST_NAME__BOARD_STATE_OUTSIDE_OF_LOCATION_IS_UNCHANGED_FOR_METHOD, function() {
            testBoardStateOutsideOfLocationIsSameForMethod(emptyBoard, locationOfShip, placeShipAtLocation);
        });

    });

    describe('getEmptyBoard', function() {
        describe('[methods which return a board]', function() {
            it(TEST_NAME__BOARD_HEIGHT_AND_WIDTH, function() {
                testBoardHeightAndWidth(emptyBoard);
            });

            it(TEST_NAME__BOARD_CONTAINS_VALID_TILES, function() {
                testBoardContainsValidTiles(emptyBoard);
            });     
        });

        it('should only contain EMPTY tiles', function() {            
            for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
                for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
                    let tileState = emptyBoard[i][j];
                    expect(tileState).to.be.equal(EMPTY, `expected tile state (${i}, ${j}) to be EMPTY but was ${tileState}`);
                }
            }
        });
    });

    describe('getRandomStartingBoard', function() {
        describe('[methods which return a board]', function() {
            it(TEST_NAME__BOARD_HEIGHT_AND_WIDTH, function() {
                const randomBoard = getRandomStartingBoard();
                testBoardHeightAndWidth(randomBoard);
            });

            it(TEST_NAME__BOARD_CONTAINS_VALID_TILES, function() {
                const randomBoard = getRandomStartingBoard();
                testBoardHeightAndWidth(randomBoard);
            });     
        });

        it(`should contain exactly ${MAX_SHIP_TILES} SHIP tiles`, function() {
            const randomBoard = getRandomStartingBoard();

            let shipAmount = 0;
            for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
                for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
                    const tileState = randomBoard[i][j];
                    if (tileState === SHIP)
                        shipAmount++;
                }
            }

            expect(shipAmount).to.be.equal(MAX_SHIP_TILES, `expected the amount of SHIP tiles to be ${MAX_SHIP_TILES}, but it was actually ${shipAmount}.`);
        });

        it('should only contain EMPTY or SHIP tiles', function() {
            const randomBoard = getRandomStartingBoard();

            let doesContainInvalidTile = false;
            for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
                for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
                    const tileState = randomBoard[i][j];
                    if (![EMPTY, SHIP].includes(tileState))
                        doesContainInvalidTile = true;
                }
            }

            expect(doesContainInvalidTile).to.be.false;
        });
    });

    describe('obfuscateBoard', function() {        
        describe('[methods which return a board]', function() {
            it(TEST_NAME__BOARD_HEIGHT_AND_WIDTH, function() {
                const obfuscatedBoard = obfuscateBoard(boardWithOneShip);
                testBoardHeightAndWidth(obfuscatedBoard);
            });

            it(TEST_NAME__BOARD_CONTAINS_VALID_TILES, function() {
                const obfuscatedBoard = obfuscateBoard(boardWithOneShip);
                testBoardContainsValidTiles(obfuscatedBoard);
            });
        });

        it('should NOT contain SHIP tiles', function() {
            const obfuscatedBoard = obfuscateBoard(boardWithOneShip);
            
            for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
                for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
                    let tileState = obfuscatedBoard[i][j];
                    expect(tileState).to.not.be.equal(SHIP, `expected tile state (${i}, ${j}) to NOT be equal to a SHIP`);
                }
            }
        });
    });
});