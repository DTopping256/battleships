import { expect, should } from 'chai';
import { Game, PLAYER1, PLAYER2, GAME_STATUS } from "../src/game.js"
import { GameSettings } from "../src/game-settings.js"
import { ShipDefinition } from "../src/ship-definition-settings.js"

describe('Game methods', function() {
    
    describe('Initialise', function() {
        let game;
        beforeEach(function() {
            game = new Game();
        });

        it('should be provided game settings to store', function() {
            game.Initialise(
                GameSettings.Cast(
                    {
                        _BoardSize: 10,
                        _ShipDefinitionSettings: {
                            Carrier: new ShipDefinition('Carrier', 3, 1)
                        }
                    }
                )
            );
        });
    });

    describe('SubmitShipPlacement', function() {
        let game;
        let validPlayer1PlacementTurnInfo;
        let invalidPlacement;
        
        beforeEach(function() {
            game = new Game();
            validPlayer1PlacementTurnInfo = {
                _ShipPlacements:
                {
                    Carrier: {
                        _Start: [0,0],
                        _End: [2,3]
                    }
                },
                _Player: PLAYER1
            };
        });

        it('should throw before Initialisation', function() {
            expect(
                () => { game.SubmitShipPlacement(validPlayer1PlacementTurnInfo); }
            )
            .to.throw();
        })

        describe('after initialisation', function() {
            
            beforeEach(function() {
                game.Initialise(
                    GameSettings.Cast(
                        {
                            _BoardSize: 10,
                            _ShipDefinitionSettings: {
                                Carrier: new ShipDefinition('Carrier', 3, 1)
                            }
                        }
                    )
                );
            });

            it('should take an object containing ShipPlacements as well as the player ID, if this is the first player to submit their placement then the state should stay on SHIP_PLACEMENT but the ReadyPlayers would contain the ID of the player which submitted the placement', function() {
                let player1PlacementGameState = game.SubmitShipPlacement(validPlayer1PlacementTurnInfo);
                
                expect(player1PlacementGameState).to.be.an('object').with.a.property('Status');
                expect(player1PlacementGameState['Status']).to.equal(GAME_STATUS.SHIP_PLACEMENT);
                expect(player1PlacementGameState).to.be.an('object').with.a.property('ReadyPlayers');
                expect(player1PlacementGameState['ReadyPlayers']).to.be.an('array').to.include.members([PLAYER1]);
            });
    
            it('should throw an exception if the same player submits their ships twice');
            it('should throw an exception if the ship placements are invalid because there aren\'t as the same quantities of ships as in the game settings')
            it('should throw an exception if the ship placements are invalid because the coordinates of the ships are invalid')
            
            describe('after player 1 has submitted', function() {
                //TODO: beforeEach where the player1PlacementGameState is already applied. 

                it('should progress the game state to GUESSING and ReadyPlayers should be an empty array');
                it('should throw an exception if called after the game state has progressed to players making guesses')
            });
        });

    });

    describe('SubmitGuess', function() {
        it('should take a coordinate as well as a player ID and if both players submit their guesses then progress the game')
        it('should throw an exception if the same player submits their guess twice in one turn')
        it('should throw an exception if called when the game state is still waiting for players to place ships')
        it('should throw an exception if the guess is invalid because the coordinate is outside of the grid')
        it('should throw an exception if the guess is invalid because the coordinates of the tile is not empty')
    });


    // Unnecessary as every call from the API will respult in an instant response.

    // describe('Register', function() {
    //     it('should register the observing instance with this game')
    //     it('should notify other registered players that the player has joined')
    // });

    // describe('Unregister', function() {
    //     it('should unregister the observing instance with this game')
    //     it('should notify the other registered player that the player disconnected')
    // });
    

    // API will just deal with this and destroy the Game instance as a result.

    // describe('Quit', function() {
    //     it('should disconnect both players and destroy the game instance')
    // });

    // Unnecessary as every call from the API will respult in an instant response which will contain the coordinates of a change and the new tile state.

    // describe('GetBoardState', function() {
    //     it('should take a playerID and whether the player wants their own board or the oponent board')
    //     it('should throw if the game hasn\'t started or both players haven\'t placed their ships')
    // });

});