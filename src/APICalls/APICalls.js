const endpoint = `https://bangwords-api.herokuapp.com/`;

const apiCalls = {
    joinGame(role) {
        let init = {
            act: "join",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(role)
        }
        return fetch(`${endpoint}`, init)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    },
    createWord(word, userID) {
        let init = {
            act: "word",
            word: `${word}`,
            id: `${userID}`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(word)
        }
        return fetch(`${endpoint}`, init)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    },
    makeGuess(guess, userID) {
        // {act: "guess", guess: "", id:}	{ display: '_ _ _ _', guesses: 6, isOver: "true/false"}
        let init = {
            act: "guess",
            guess: `${guess}`,
            id: `${userID}`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guess)
        }
        return fetch(`${endpoint}`, init)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
}

export default apiCalls;