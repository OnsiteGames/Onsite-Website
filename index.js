const gamesUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
let selectedCategory
// let searchTerm;

// const genresUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${selectedCategory}`

// let genres = "mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, survival, pvp, pve, pixel, voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, mmorts"

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
            selectedGame = Number(card[i].id)
            gameInfo()
        })
    }
}

const gameInfo = async () => {
    try {
        const gameRes = await fetch(gamesUrl, options);
        const game = await gameRes.json();
        const selected = game.filter(game => game.id === selectedGame)
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

}


/* --------------------------- Clicking on Genres --------------------------- */
// const selectGenre = () => {
//     let genres = document.getElementById("getGenresBtn")
//     genres.addEventListener("click", (e) => {
//         selectedCategory = "mmorpg"
//         console.log(selectedCategory)
//         genreInfo()
//     })
// }

// const genreInfo = async () => {
//     try {
//         const genresRes = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${selectedCategory}`, options);
//         const genres = await genresRes.json();
//         for(let i = 0; i < genres.length; i ++){
//             // console.log(genresUrl)
//             console.log(genres)
//         }
//         // const selected =  genres.filter(game => game.id === selectedGame)
//         // showGame(selected[0])
//         // console.log("a genre")
//     } catch (error) {
//         console.error(error);
//     }
// }

/* ------------------------------- Search Bar ------------------------------- */
let searchUl

const createSearchStories = (title, articleURL) => {
    searchUl = document.querySelector("#search-results");
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = articleURL;
    a.textContent = title;
    li.append(a);
    searchUl.append(li);
}

let searchTerm;
const display = document.querySelector("#cardList");

document.getElementById("spencers").addEventListener("submit", async (e) => {
    e.preventDefault()
    searchTerm = e.target[0].value
    // console.log(`The Search Stories form has been submitted with search term: "${searchTerm}"`)
    searchStories(`${searchTerm}`)
    display.innerHTML = ""
})

const searchStories = async (search) => {
    const res = await fetch(gamesUrl, options)
    const searchRes = await res.json()
    console.log(search)
    searchRes.filter(game => {
        if (game.title.toLowerCase().includes(search.toLowerCase())) {
            console.log(game)
            createGamesDisplay(game.thumbnail, game.title, game.id)
        }
    })
    selectGame()
}


/* -------------------------------------------------------------------------- */

const displayGame = async () => {
    try {
        const gameRes = await fetch(gamesUrl, options);
        const games = await gameRes.json();
        for (let i = 0; i < games.length; i++) {
            createGamesDisplay(games[i].thumbnail, games[i].title, games[i].id)
        }
        selectGame()
        // selectGenre()
    } catch (error) {
        console.error(error);
    }
}

displayGame()

