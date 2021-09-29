"use strict";
import { castTo } from "./utils.js";

export class ShipDefinitionSettings {
    [Symbol.toStringTag] = 'ShipDefinitionSettings';
    
    constructor() {
        this._ShipDefinitions = {};
    }

    Add(shipDefinition) {
        if (!ShipDefinition.IsShipDefinition(shipDefinition))
            throw new TypeError('shipDefinition argument is not an instance of the ShipDefinition class.');

        if (this._ShipDefinitions[shipDefinition.Name] != null)
            throw new Error('Cannot add shipDefinition when there is already one with the same "name".')

        this._ShipDefinitions[shipDefinition.Name] = shipDefinition;
    }

    Remove(shipDefinitionName) {
        delete this._ShipDefinitions[shipDefinitionName];
    }

    GetAll() {
        return Object.values(this._ShipDefinitions)
            .map(sd => sd.Clone())
            .reduce((obj, sd) => {
                obj[sd.Name] = sd;
                return obj;
            }, Object());
    }

    static _Caster = castTo(ShipDefinitionSettings);
    static Cast(o) {
        const shipDefSettings = ShipDefinitionSettings._Caster(o);
        shipDefSettings._ShipDefinitions = Object.values(shipDefSettings._ShipDefinitions)
            .reduce((acc, shipDefinitionObj) => {
                const shipDefinition = ShipDefinition.Cast(shipDefinitionObj);
                acc[shipDefinition.Name] = shipDefinition;
                return acc;
            }, {});
        return shipDefSettings;
    }
}

export class ShipDefinition {
    [Symbol.toStringTag] = 'ShipDefinition';
    get Name() { return this._Name; };
    get Size() { return this._Size; };
    get Quantity() { return this._Quantity; };

    constructor(name, size, quantity) {
        this._Name = name;
        this._Size = size;
        this._Quantity = quantity;
    }

    static IsShipDefinition(o) {
        return (
            o
            && typeof(o) === 'object'
            && o["_Name"] != null 
            && o["_Size"] != null 
            && o["_Quantity"] != null 
        );
    }

    Clone() {
        return new ShipDefinition(this.Name, this.Size, this.Quantity);
    }

    static _Caster = castTo(ShipDefinition);
    static Cast(o) { return ShipDefinition._Caster(o); }
}