import { expect } from "chai";
import { Ship } from "../src/ship.js"

describe('Ship', function() {
    describe('properties', function() {
        let ship;

        beforeEach(function() {
            ship = new Ship(
                "Carrier",
                [1,1],
                [1,4]
            );
        });

        describe('Name', function() {
            it('should return a string', function() {
                expect(ship.Name).to.be.a('string');
            });
        });

        describe('Start', function() {
            it('should return a number tuple of length 2', function() {
                expect(ship.Start).to.be.an('array').to.have.length(2);
                expect(ship.Start[0]).to.be.a('number');
                expect(ship.Start[1]).to.be.a('number');
            });
        });

        describe('End', function() {
            it('should return a number tuple of length 2', function() {
                expect(ship.End).to.be.an('array').to.have.length(2);
                expect(ship.End[0]).to.be.a('number');
                expect(ship.End[1]).to.be.a('number');
            });
        });

    });

    describe('static methods', function() {
        
        describe('Cast', function() {
            it('should return a Ship with the values of the object that was cast.', function() {
                const ship = Ship.Cast({ _Name: "Carrier", _Start: [1, 1], _End: [1, 4] });
                expect(ship)
                    .to.be.a('Ship')
                    .with.a.property('Name', 'Carrier');
                expect(ship.Start).to.deep.equal([1, 1]);
                expect(ship.End).to.deep.equal([1, 4]);
            });
        });

    });

});