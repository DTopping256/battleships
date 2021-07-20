import { expect } from 'chai';
import { isShipAtLocation, getEmptyBoard, guessAtLocation, MISS, SHIP, EMPTY, HIT } from '../src/board.js';

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
    let emptyBoard, boardWithOneShip;
    let correctLocation, incorrectLocation;
    let x_c, y_c, x_i, y_i;

    before(function() {
        correctLocation = [3, 5];
        incorrectLocation = [4, 4];
        [x_c, y_c] = correctLocation;
        [x_i, y_i] = incorrectLocation;
    });

    beforeEach(function() {
        emptyBoard = getEmptyBoard();
        boardWithOneShip = getEmptyBoard();

        // Puts a ship at the "correct" location. The "incorrect" location, has no ship.
        boardWithOneShip[x_c][y_c] = SHIP;
    });

    describe('isShipAtLocation', function() {

        it('should correctly report no ship at a given location on an empty board', function() {
            expect(isShipAtLocation(emptyBoard, correctLocation)).to.be.false;
        });
        
        it('should correctly report a ship at a given location of a ship on a board', function() {
            expect(isShipAtLocation(boardWithOneShip, correctLocation)).to.be.true;
        });

    });

    describe('guessAtLocation', function() {

        it('should change the tile state for an empty board, at the given location from EMPTY to MISS and method should return false', function() {
            
            expect(emptyBoard[x_c][y_c]).to.be.equal(EMPTY, 'initial tile state before guess, to be EMPTY');

            expect(guessAtLocation(emptyBoard, correctLocation)).to.be.false;

            expect(emptyBoard[x_c][y_c]).to.be.equal(MISS, 'tile state after guess, to be MISS');
        });

        it('should change the tile state for a board, at the given incorrect location from EMPTY to MISS and method should return false', function() {

            expect(boardWithOneShip[x_i][y_i]).to.be.equal(EMPTY, 'initial tile state before guess, to be EMPTY');

            expect(guessAtLocation(boardWithOneShip, incorrectLocation)).to.be.false;

            expect(boardWithOneShip[x_i][y_i]).to.be.equal(MISS, 'tile state after guess, to be MISS');
        });

        it('should change the tile state for a board, at the given correct location from SHIP to HIT and method should return true', function() {

            expect(boardWithOneShip[x_c][y_c]).to.be.equal(SHIP, 'initial tile state before guess, to be SHIP');

            expect(guessAtLocation(boardWithOneShip, correctLocation)).to.be.true;

            expect(boardWithOneShip[x_c][y_c]).to.be.equal(HIT, 'tile state after guess, to be HIT');
        });

        it('should not affect tile state on the board other than the given location', function() {
            const flattenedBoardBefore = boardWithOneShip.flat(1);

            guessAtLocation(boardWithOneShip, correctLocation);

            const flattenedBoardAfter = boardWithOneShip.flat(1);
            const expectedMutatedIndex = (x_c * boardWithOneShip.length) + y_c;

            let diffCount = 0, mutatedIndex;
            for (let i = 0; i < flattenedBoardBefore.length; i++) {
                if (flattenedBoardBefore[i] != flattenedBoardAfter[i]) {
                    diffCount++;
                    mutatedIndex = i;
                }
            }

            expect(diffCount).to.be.equal(1, 'should only mutate one tile on the board');
            expect(mutatedIndex).to.be.equal(expectedMutatedIndex, 'should only the mutate tile for the given location');
        });

    });
});