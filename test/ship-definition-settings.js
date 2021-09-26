import { expect } from 'chai';
import { ShipDefinition, ShipDefinitionSettings } from '../src/ship-definition-settings.js';

describe('Ship Settings', function() {
    describe('ShipDefinitionSettings', function() {
        describe('GetAll', function() {
            let shipDefinitionSettings = null;

            beforeEach(function() {
                shipDefinitionSettings = new ShipDefinitionSettings();
                shipDefinitionSettings.Add(new ShipDefinition('Carrier', 5, 1));
                shipDefinitionSettings.Add(new ShipDefinition('Cruiser', 3, 1));
                shipDefinitionSettings.Add(new ShipDefinition('Destroyer', 2, 1));
                shipDefinitionSettings.Add(new ShipDefinition('Battleship', 4, 1));
                shipDefinitionSettings.Add(new ShipDefinition('Submarine', 3, 1));
            })

            it('should return a dictionary where the key is the name of the type of ship, and the value is an object with the quantities of that type and the length', function() {
                const shipDefinitions = shipDefinitionSettings.GetAll();

                expect(shipDefinitions).to.be.an('object').that.has.a.property('Carrier');
                expect(shipDefinitions).to.be.an('object').that.has.a.property('Cruiser');
                expect(shipDefinitions).to.be.an('object').that.has.a.property('Destroyer');
                expect(shipDefinitions).to.be.an('object').that.has.a.property('Battleship');
                expect(shipDefinitions).to.be.an('object').that.has.a.property('Submarine');

                expect(shipDefinitions['Carrier']).to.be.a('ShipDefinition');
                expect(shipDefinitions['Cruiser']).to.be.a('ShipDefinition');
                expect(shipDefinitions['Destroyer']).to.be.a('ShipDefinition');
                expect(shipDefinitions['Battleship']).to.be.a('ShipDefinition');
                expect(shipDefinitions['Submarine']).to.be.a('ShipDefinition');
            });

            //TODO: unhappy paths

            it('should be immutable');
            it('shouldn\'t allow subsequent shipDefinitions to be added with the same "name"');
            it('should update when a shipDefinition is Added');
            it('should update when a shipDefinition is Removed');
        });
    });
});

