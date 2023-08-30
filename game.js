// const gamesUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

// const selectedGame = require("./test");

// import selectedGame from "./test";
// console.log(selectedGame)
const showGame = (thumbnail, title, short_description, genre, developer) => {
    const card = document.querySelector("#gameCard");

    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const info = document.createElement("p")
    const category = document.createElement("p")
    const dev = document.createElement("p")
    
    // card.className = "gameCard";
    img.className = "img";
    h3.className = "cardH3";

    img.src = thumbnail;

    info.textContent = short_description;
    category.textContent = genre;
    dev.textContent = developer;
    h3.textContent = title;

    card.append(img, h3, info, category, dev)
}


const gameInfo = async () => {
    try {
        const gameRes = await fetch(gamesUrl, options);
        const game = await gameRes.json();
            showGame(game[selectedGame].thumbnail, game[selectedGame].title, game[selectedGame].short_description, game[selectedGame].genre, game[1].developer)
    } catch (error) {
        console.error(error);
    }
}

gameInfo() 