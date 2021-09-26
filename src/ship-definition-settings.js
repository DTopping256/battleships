/**
 *   {
 *       'Carrier': new ShipDefinition('Carrier', 3, 2),
 *       'Cruiser': new ShipDefinition('Cruiser', 2, 1),
 *       'Destroyer': ...,
 *       'Battleship': ...,
 *       'Submarine': ...,
 *   }
 */

export class ShipDefinitionSettings {
    constructor() {
        this._ShipDefinitions = {};
    }

    Add(shipDefinition) {
        this._ShipDefinitions[shipDefinition.Name] = shipDefinition;
    }

    GetAll() {
        return this._ShipDefinitions;
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
}