const theEndpoint = `https://bangwords-api.herokuapp.com/`;

const theCalls = {
    joinGame(role) {
        let theBody = {
            act: "join",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(role)
        }
        return fetch(`${theEndpoint}`, theBody)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    },
    createWord(word, userID) {
        let theBody = {
            act: "word",
            word: `${word}`,
            id: `${userID}`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(word)
        }
        return fetch(`${theEndpoint}`, theBody)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    },
    makeGuess(guess, userID) {
        // {act: "guess", guess: "", id:}	{ display: '_ _ _ _', guesses: 6, isOver: "true/false"}
        let theBody = {
            act: "guess",
            guess: `${guess}`,
            id: `${userID}`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guess)
        }
        return fetch(`${theEndpoint}`, theBody)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
}

export default theCalls;