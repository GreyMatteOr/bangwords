// ./node_modules/.bin/mocha --require babel-register ./src/Game/Game.Test.js


const chai = require("chai");
const expect = chai.expect;

let Game = require("./Game");

describe('Game', () => {

    describe('Properties', () => {
        it('should be a function', function() {
            // const a = new Game('game', 3);
            expect(Game).to.be.a('function');
        });
    })

    // describe('Methods', () => {
    //     it("should return the user's first name only", () => {

    //         const a = new Game('game', 3);
    
    //         expect(a.returnFirstName()).to.equal("Luisa");
    //     })
    // })
})