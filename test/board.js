import { expect } from 'chai';
import { isShipAtLocation, getEmptyBoard, guessAtLocation, placeShipAtLocation, MISS, SHIP, EMPTY, HIT } from '../src/board.js';

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

        it('should not affect tile state on the board other than the given location', function() {
            const flattenedBoardBefore = boardWithOneShip.flat(1);

            guessAtLocation(boardWithOneShip, locationOfShip);

            const flattenedBoardAfter = boardWithOneShip.flat(1);
            const expectedMutatedIndex = (x_ship * boardWithOneShip.length) + y_ship;

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

        it('should not mutate any other tiles apart from perhaps at the given location')
    })
});