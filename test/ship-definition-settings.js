import { expect } from 'chai';
import { ShipDefinition, ShipDefinitionSettings } from '../src/ship-definition-settings.js';

describe('Ship Settings', function() {
    describe('ShipDefinitionSettings', function() {

        describe('Add', function() {
            let shipDefinitionSettings = null;

            beforeEach(function() {
                shipDefinitionSettings = new ShipDefinitionSettings();
            });

            it('should add valid ShipDefinition into the shipDefinitions', function() {
                let shipDefinitions = shipDefinitionSettings.GetAll();
                expect(Object.keys(shipDefinitions).length).to.be.equal(0);

                shipDefinitionSettings.Add(new ShipDefinition("Carrier", 0, 0));
                
                shipDefinitions = shipDefinitionSettings.GetAll();
                expect(shipDefinitions).to.be.an("object").that.has.a.property("Carrier");
            });

            it('should throw when passed something which isn\'t a shipDefinition', function() {
                expect(() => { shipDefinitionSettings.Add(null); }).to.throw();
                expect(() => { shipDefinitionSettings.Add({Name: "Fred", Occupation: "Banker"}); }).to.throw();
            });

            it('shouldn\'t allow subsequent shipDefinitions to be added with the same "name"', function() {
                const shipDefinitionToAdd = new ShipDefinition('Carrier', 0, 0);
                shipDefinitionSettings.Add(shipDefinitionToAdd)
                expect(
                    () => { shipDefinitionSettings.Add(shipDefinitionToAdd); }
                ).to.throw();
            });

        });

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

            it('should be immutable', function() {
                const shipDefinitionsBefore = shipDefinitionSettings.GetAll();
                delete shipDefinitionsBefore.Carrier;

                const shipDefinitionsAfter = shipDefinitionSettings.GetAll();
                expect(shipDefinitionsAfter).to.not.be.deep.equal(shipDefinitionsBefore);
            });

            it('should update when a shipDefinition (with a unique name) is Added', function () {
                const shipDefinitionsBefore = shipDefinitionSettings.GetAll();
                shipDefinitionSettings.Add(new ShipDefinition("Test", 0, 0));

                const shipDefinitionsAfter = shipDefinitionSettings.GetAll();
                expect(shipDefinitionsBefore).to.not.be.deep.equal(shipDefinitionsAfter);
            });

            it('should update when a shipDefinition is Removed', function () {
                shipDefinitionSettings.Remove("Carrier");

                const shipDefinitions = shipDefinitionSettings.GetAll();
                expect(shipDefinitions).to.be.an("object").that.does.not.have.a.property("Carrier");
            });
        });
    });
});

