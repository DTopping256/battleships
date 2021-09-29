import { expect } from 'chai';
import { GameSettings } from '../src/game-settings.js';

describe('Game Settings', function() {
    const gameSettingsTestObj = {
        _ShipDefinitionSettings: {},
        _BoardSize: 10
    };
    
    describe('Instance properties', function() {
        let gameSettings;

        beforeEach(function() {
            gameSettings = GameSettings.Cast(gameSettingsTestObj);
        });
        
        describe('ShipDefinitionSettings', function(){ 
            it('should get an instance of the ShipDefinitionSettings class', function() {
                expect(gameSettings.ShipDefinitionSettings).to.be.a('ShipDefinitionSettings');
            });
        });

        describe('BoardSize', function(){
            it('should get a number representing the size of the sides of the board', function() {
                expect(gameSettings.BoardSize).to.be.a('number');
            });
        });

    });


    describe('static methods', function() {

        // TODO: Nice to have, so that the UI can be more dynamic to changes with the settings available in the future.
        describe('GetPropertyMetadata', function() {
            it('should describe the properties that the Game expects to be returned from the UI in order to create a GameSettings instance');
        });

        describe('Cast', function() {
            it('should create a GameSettings instance from a given valid JS object', function() {
                const gameSettings = GameSettings.Cast(gameSettingsTestObj);
                expect(gameSettings).to.be.a('GameSettings');
            });
        });

    });

});