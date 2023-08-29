const gamesUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

//creating each card to display the games
const createGamesDisplay = (thumbnail, title) => {
    const ul = document.querySelector("#catagList");
    const li = document.createElement("li");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    
    li.className = "gameCard";
    img.className = "img"
    h3.className = "cardH3"
    img.src = thumbnail;
    h3.textContent = title;
    li.append(img, h3)
    ul.append(li)
}

const displayGame = async () => {
    try {
        const gameRes = await fetch(gamesUrl, options);
        const games = await gameRes.json();
        for(let i = 0; i < games.length; i ++){
            createGamesDisplay(games[i].thumbnail, games[i].title)
            console.log(games)
        }
    } catch (error) {
        console.error(error);
    }
}

displayGame()  

//event when clicking on a card(not working yet)
document.querySelector(".gameCard").addEventListener("click", (e) => {
    console.log("you clicked me")
})