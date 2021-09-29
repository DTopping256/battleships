"use strict";
import { getEmptyBoard } from "./board.js"

export const GAME_STATUS = Object.freeze({
    SETUP: 'SETUP',
    SHIP_PLACEMENT: 'SHIP_PLACEMENT',
    GUESSING: 'GUESSING'
});

export class Game {
    Initialise(gameSettings) {
        this._GameSettings = gameSettings; // Contains settings specific to this game instance.
        
        this._State = GAME_STATUS.SETUP;
        this._PlayerIDs = new Set();
        this._Boards = {};
        this._Ships = {};

        this.StartGame();
    }

    AddPlayer(id) {
        if (this._PlayerIDs.has(id))
            throw new Error('Player ID not unique.')
        
        this._PlayerIDs.add(id);
        this._Boards[id] = getEmptyBoard();
        this._Ships[id] = [];
    }

    SubmitShipPlacement(jsonStr) {

    }
}