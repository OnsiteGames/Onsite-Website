const gamesUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
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
            selectedGame = Number(card[i].id)
            gameInfo() 
        })
    }
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

const showGame = (selection) => {
    console.log(selection)
    const card = document.getElementById("modal");
    const info = document.getElementById("gameInfo")
    info.innerHTML = ""
    const image = document.createElement("img");
    const title = document.createElement("h1");
    const description = document.createElement("p")
    const plat = document.createElement("p")
    const pub = document.createElement("p")
    const release = document.createElement("p")
    
    title.textContent = selection.title
    image.src = selection.thumbnail
    description.textContent = selection.short_description
    plat.textContent = selection.platform
    pub.textContent = selection.publisher
    release.textContent = selection.release_date
    
    info.append(title, image, description, plat, pub, release)
    
    card.showModal()
    console.log(card)

}

// const closeCard = () => {

// }
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


// module.exports = { selectedGame }