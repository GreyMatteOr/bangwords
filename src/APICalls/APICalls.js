const endpoint = `https://bangwords-api.herokuapp.com/`;

const apiCalls = {

    joinGame(isGenerator) {
        let init = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                act: "join",
                isGenerator
            })
        }
        return fetch(endpoint, init)
            .then(res => res.json())
            .then(promise => promise)
            // Later, lets remove .catch() here, and put it into a try{} block where this method gets called in App
            .catch(err => console.log(err))
    },

    createWord(word, userID) {
        let init = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                act: "word",
                word: word,
                id: userID
            })
        }
        return fetch(endpoint, init)
            .then(res => res.json())
            .then(res => console.log(res))
            // same with .catch() as above
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