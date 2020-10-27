// To test this run --> ./node_modules/.bin/mocha --require babel-register ./src/Game/Game.Test.js


const chai = require("chai");
const expect = chai.expect;

let Game = require("./Game");

describe('Game', () => {

    describe('Basic Functionality', () => {
        it('1. should be a function', function() {
            // const a = new Game('game', 3);
            expect(Game).to.be.a('function');
        });

        it('2. should be an instance of Game', function() {
            const a = new Game('game', 3);
            expect(a).to.be.an.instanceof(Game);
        });
    })
    
    describe('Properties', () => {
        it("3. should have a word to guess", () => {
    
            const a = new Game('game', 3);
    
            expect(a.wordToGuess).to.equal('game');
        })
    
        it("6. should have a `maxWrongAttempts` property", () => {
    
            const a = new Game('game', 3);
    
            expect(a.maxWrongAttempts).to.equal(3);
        })
    
        it("5. attemptedGuesses should start as an empty array", () => {
    
            const a = new Game('game', 3);
    
            expect(a.attemptedGuesses).to.deep.equal([]);
        })
    
        // /**/it("should have an email", () => {
    
        //     const a = new Game('game', 3);
    
        //     expect(a.email).to.equal(userData.email);
        // })
    
        // /**/it("should have a strideLength", () => {
    
        //     const a = new Game('game', 3);
    
        //     expect(a.strideLength).to.equal(userData.strideLength);
        // })
    
        // /**/it("should have a dailyStepGoal", () => {
    
        //     const a = new Game('game', 3);
    
        //     expect(a.dailyStepGoal).to.equal(userData.dailyStepGoal);
        // })
    
        // /**/it("should have friends", () => {
    
        //     const a = new Game('game', 3);
    
        //     expect(a.friends).to.equal(userData.friends);
        // })
    })

    // describe('Methods', () => {
    //     it("should return the user's first name only", () => {

    //         const a = new Game('game', 3);
    
    //         expect(a.returnFirstName()).to.equal("Luisa");
    //     })
    // })
})