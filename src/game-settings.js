"use strict";
import { castTo } from "./utils.js";
import { ShipDefinitionSettings } from "./ship-definition-settings.js";

export class GameSettings {
    [Symbol.toStringTag] = 'GameSettings';
    get ShipDefinitionSettings() { return this._ShipDefinitionSettings; }
    get BoardSize() { return this._BoardSize; }
    
    static _Caster = castTo(GameSettings);
    static Cast(o) {
        const gameSettings = GameSettings._Caster(o);
        gameSettings._ShipDefinitionSettings = ShipDefinitionSettings.Cast(gameSettings._ShipDefinitionSettings);
        return gameSettings;
    }
}