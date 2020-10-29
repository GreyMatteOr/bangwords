const endpoint = `https://bangwords-api.herokuapp.com/`;
// for local testing
// const endpoint = `http://localhost3000`;

const apiCalls = {

    joinGame(isGenerator) {
        let init = {
            // mode: "no-cors",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                act: "join",
                isGenerator: isGenerator
            })
        }
        return fetch(endpoint, init)
            .then(res => res.json())
            .then(promise => promise)
            // want .ok here
            // Later, lets remove .catch() here, and put it into a try{} block where this method gets called in App
            // .catch(err => console.log(err))
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
            .then(res => res)
            // same with .catch() as above
            // .catch(err => console.log(err))
    },

    makeGuess(guess, userID) {
        // {act: "guess", guess: "", id:}	{ display: '_ _ _ _', guesses: 6, isOver: "true/false"}
        let init = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                act: "guess",
                guess: guess,
                id: userID,
            })
        }
        return fetch(endpoint, init)
            .then(res => res.json())
            .then(res => res)
            // same here as well
            // .catch(err => console.log(err))
    },

    clearGame() {
        let init = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                act: "clear"
            })
        }
        return fetch(endpoint, init)
            .then(res => res.json())
            .then(res => res)
            // same here as well
            // .catch(err => console.log(err))
    },

    checkStatus() {
        return fetch(endpoint)
            .then(res => res.json())
            .then(res => res)
            // same here as well
            // .catch(err => console.log(err))
    }


}

export default apiCalls;