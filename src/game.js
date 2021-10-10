"use strict";
import { getEmptyBoard } from "./board.js"

export const GAME_STATUS = Object.freeze({
    SETUP: 'SETUP',
    SHIP_PLACEMENT: 'SHIP_PLACEMENT',
    GUESSING: 'GUESSING'
});

export const PLAYER1 = "PLAYER1"
export const PLAYER2 = "PLAYER2"

export class Game {
    Initialise(gameSettings) {
        this._GameSettings = gameSettings; // Contains settings specific to this game instance.
        
        this._State = GAME_STATUS.SETUP;
        this._PlayerIDs = new Set();
        this._Boards = {};
        this._Ships = {};

        return ({ Status: GAME_STATUS.SHIP_PLACEMENT, ReadyPlayers: [] });
    }

    SubmitShipPlacement(placementTurnInfo) {
        if (!this._GameSettings)
            throw Error('Cannot SubmitShipPlacements before the Game has been initialised.');
            
        let { _Player, _ShipPlacements } = placementTurnInfo;
        return {Status: GAME_STATUS.SHIP_PLACEMENT, ReadyPlayers: [_Player]};
    }
}