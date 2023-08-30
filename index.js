const gamesUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cb7c281af5mshed3ac801f114632p183454jsn726a4e5c6429',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

let selectedGame = 0

//creating each card to display the games
const createGamesDisplay = (thumbnail, title, id) => {
    const ul = document.querySelector("#cardList");
    const li = document.createElement("li");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    
    li.className = "gameCard";
    li.id = `${id}`
    img.className = "img"
    h3.className = "cardH3"
    img.src = thumbnail;
    h3.textContent = title;
    li.append(img, h3)
    ul.append(li)

}

/* ---------------------------- Clicking on Games --------------------------- */
const selectGame = () => {
    let card = document.querySelectorAll(".gameCard")
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener("click", (e) => {
            // location.href = 'game.html';
            selectedGame = Number(card[i].id)
            gameInfo() 
        })
    }
}

const showGame = (selection) => {
    console.log(selection)
//     const card = document.querySelector("#gameCard");

//     const img = document.createElement("img");
//     const h3 = document.createElement("h3");
//     const info = document.createElement("p")
//     const category = document.createElement("p")
//     const dev = document.createElement("p")
    
//     // card.className = "gameCard";
//     img.className = "img";
//     h3.className = "cardH3";

//     img.src = thumbnail;

//     info.textContent = short_description;
//     category.textContent = genre;
//     dev.textContent = developer;
//     h3.textContent = title;

//     card.append(img, h3, info, category, dev)
}

const gameInfo = async () => {
    try {
        const gameRes = await fetch(gamesUrl, options);
        const game = await gameRes.json();
        const selected =  game.filter(game => game.id === selectedGame)
        showGame(selected[0])
    } catch (error) {
        console.error(error);
    }
}
/* -------------------------------------------------------------------------- */

const displayGame = async () => {
    try {
        const gameRes = await fetch(gamesUrl, options);
        const games = await gameRes.json();
        for(let i = 0; i < games.length; i ++){
            createGamesDisplay(games[i].thumbnail, games[i].title, games[i].id)
        }
        selectGame()
    } catch (error) {
        console.error(error);
    }
}

displayGame()  

//catagories list
// const shooters = document.querySelector('#shot');
// const mmo = document.querySelector('#mmo')
// const strat = document.querySelector('#strat')
// const moba = document.querySelector('#moba')
// const race = document.querySelector('#race')
// const sport = document.querySelector('#sport')
// const sandbox = document.querySelector('#sand')
// const survival = document.querySelector('#survive')
// const openW= document.querySelector('#open')
// const card = document.querySelector('#card')

// const getShooters = async () => {
//     const
// }

// const getMmo = async () => {

// }

// const getStrat = async () => {
    
// }

// const getMoba = async () => {
    
// }

// const getRace = async () => {
    
// }

// const getSport = async () => {
    
// }

// const getSand = async () => {
    
// }

// const getSurvival = async () => {
    
// }

// const getOpen = async () => {
    
// }

// const getCard = async () => {
    
// }