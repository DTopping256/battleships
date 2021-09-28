import { expect, should } from 'chai';
import { Game } from "../src/game.js"

describe('Game methods', function() {
    
    describe('Initialise', function() {
        it('should be provided game settings to store');
        it('should start the game loop');
    });

    describe('SubmitShipPlacement', function () {
        it('should take an array of ShipPlacements as well as the player ID and if both players submit their ships then progress the game state')
        it('should throw an exception if the same player submits their ships twice')
        it('should throw an exception if the ship placements are invalid because there aren\'t as the same quantities of ships as in the game settings')
        it('should throw an exception if the ship placements are invalid because the coordinates of the ships are invalid')
    });

    describe('SubmitGuess', function() {
        it('should take a coordinate as well as a player ID and if both players submit their guesses then progress the game')
        it('should throw an exception if the same player submits their guess twice in one turn')
        it('should throw an exception if the guess is invalid because the coordinate is outside of the grid')
        it('should throw an exception if the guess is invalid because the coordinates of the tile is not empty')
    });

    describe('Register', function() {
        it('should register the observing instance with this game')
        it('should notify other registered players that the player has joined')
    });

    describe('Unregister', function() {
        it('should unregister the observing instance with this game')
        it('should notify the other registered player that the player disconnected')
    });
    
    describe('Quit', function() {
        it('should disconnect both players and destroy the game instance')
    });

    describe('GetBoardState', function() {
        it('should take a playerID and whether the player wants their own board or the oponent board')
        it('should throw if the game hasn\'t started or both players haven\'t placed their ships')
    });

});