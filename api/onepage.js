let filmId = document.querySelector('.filmId')
let currentFilm = "https://api.themoviedb.org/3/movie/" + filmId.value + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
let currentFilmCredit = "https://api.themoviedb.org/3/movie/"+ filmId.value +"/credits?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"

let container = document.querySelector(".container")
let title = document.querySelector(".title")
let description = document.querySelector(".description")
let img = document.getElementById("poster")

let acteur1 = document.getElementById("acteur-1")
let acteurName1 = document.querySelector(".acteur-name-1")

let acteur2 = document.getElementById("acteur-2")
let acteurName2 = document.querySelector(".acteur-name-2")

let acteur3 = document.getElementById("acteur-3")
let acteurName3 = document.querySelector(".acteur-name-3")

let acteur4 = document.getElementById("acteur-4")
let acteurName4 = document.querySelector(".acteur-name-4")


// Affiche les films au chargement

window.onload = function() {

    fetch(currentFilm)
    .then((response) => 
        response.json())

    .then(function(data) {

        console.log(data)
        img.src = ` ${"https://image.tmdb.org/t/p/original" + data.poster_path} `
        title.innerHTML += `${data.title}`
        description.innerHTML += `${data.overview}`
    })

    fetch(currentFilmCredit)
    .then((response) => 
        response.json())

    .then(function(data) {

        acteur1.src = ` ${"https://image.tmdb.org/t/p/original" + data.cast[0].profile_path} `
        acteurName1.innerHTML += `${data.cast[0].name}`

        acteur2.src = ` ${"https://image.tmdb.org/t/p/original" + data.cast[1].profile_path} `
        acteurName2.innerHTML += `${data.cast[1].name}`

        acteur3.src = ` ${"https://image.tmdb.org/t/p/original" + data.cast[2].profile_path} `
        acteurName3.innerHTML += `${data.cast[2].name}`

        acteur4.src = ` ${"https://image.tmdb.org/t/p/original" + data.cast[3].profile_path} `
        acteurName4.innerHTML += `${data.cast[3].name}`
    })
}