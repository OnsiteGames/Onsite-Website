const gamesUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const display = document.querySelector("#cardList");
let selectedCategory
// let searchTerm;

// const genresUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${selectedCategory}`

// let categories = ['mmorpg', ' shooter', ' strategy', ' moba', ' racing', ' sports', ' social', ' sandbox', ' open-world', ' survival', ' pvp', ' pve', ' pixel', ' voxel', ' zombie', ' turn-based', ' first-person', ' third-Person', ' top-down', ' tank', ' space', ' sailing', ' side-scroller', ' superhero', ' permadeath', ' card', ' battle-royale', ' mmo', ' mmofps', ' mmotps', ' 3d', ' 2d', ' anime', ' fantasy', ' sci-fi', ' fighting', ' action-rpg', ' action', ' military', ' martial-arts', ' flight', ' low-spec', ' tower-defense', ' horror', ' mmorts']
// let categories = ['mmorpg', ' shooter', ' strategy']

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'cb7c281af5mshed3ac801f114632p183454jsn726a4e5c6429',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

let selectedGame = 0

/*-----------------creating each card to display the games------------------*/
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
    const title = document.createElement("h4");
    const description = document.createElement("p")

    const plat = document.createElement("p")
    const pub = document.createElement("p")
    const release = document.createElement("p")

    image.src = selection.thumbnail
    title.textContent = selection.title
    description.textContent = `Description: ${selection.short_description}`
    plat.textContent = `Platform: ${selection.platform}`
    pub.textContent = `Publisher: ${selection.publisher}`
    release.textContent = `Release date: ${selection.release_date}`


    info.append(image, title, description, plat, pub, release)

    card.showModal()

}


/* --------------------------- Clicking on Genres --------------------------- */
// const createGenreDisplay = async (cat) => {
//     const genreBar = document.getElementById("getGenres")

//     const genreOption = document.createElement("div")

//     genreOption.id = "getGenresBtn"
//     genreOption.textContent = cat

//     genreBar.append(genreOption)
//     // console.log(genreOption)
// }


const selectGenre = () => {
    let cats = Array.from(document.querySelectorAll("#getGenresBtn"))
    cats.forEach(genre => {
        genre.addEventListener("click", () => {
            selectedCategory = genre.textContent
            // console.log(selectedCategory)
            genreInfo(selectedCategory)
        })
        // console.log(genre)
    })
    // console.log(cats)
}

const genreInfo = async (choice) => {
    try {
        const genresRes = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${choice}`, options);
        const genres = await genresRes.json();
        display.innerHTML = ""
        console.log(genres)
        genres.forEach(game => {
            // console.log(game)
            createGamesDisplay(game.thumbnail, game.title, game.id)
        })
    } catch (error) {
        console.error(error);
    }
}

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

document.getElementById("spencers").addEventListener("submit", async (e) => {
    e.preventDefault()
    searchTerm = e.target[0].value
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
        games.forEach(game => { createGamesDisplay(game.thumbnail, game.title, game.id) })
        // categories.forEach(category => { createGenreDisplay(category) })
        selectGenre()
        selectGame()
        selectGenre()
    } catch (error) {
        console.error(error);
    }
}

displayGame()

