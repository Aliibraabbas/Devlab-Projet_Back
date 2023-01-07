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


// Affiche les films au chargement
// window.onload = function() {

//     // Affiche tout les films
//     fetch(currentFilm)
//     .then((response) => 
//         response.json())

//     .then(function(data) {
    
//         container.innerHTML += `
//                     <img src="${"https://image.tmdb.org/t/p/original" + data.backdrop_path}" alt="" class="poster">
//                     <div class="info">
//                         <div class="title">
//                             ${data.title}
//                         </div>
//                         <div class="description">
//                             ${data.overview}
//                         </div>
//                         <div class="actors">
//                         `
//                             fetch(currentFilmCredit)
//                             .then((response) => 
//                                 response.json())
                            
//                             .then(function(data) {
//                                 `
//                                     <div class="actor">
//                                         <img src="${"https://image.tmdb.org/t/p/original" + data.cast[0].profile_path}" alt="${data.cast[0].name}">
//                                         <div class="name">
//                                             ${data.cast[0].name}
//                                         </div>
//                                     </div>
//                                     <div class="actor">
//                                         <img src="${"https://image.tmdb.org/t/p/original" + data.cast[0].profile_path}" alt="${data.cast[0].name}">
//                                         <div class="name">
//                                             ${data.cast[0].name}
//                                         </div>
//                                     </div>
//                                 `
//                             })
//                             `
//                         </div>
//                     </div>
//             `
//         })

// };

window.onload = function() {

    fetch(currentFilm)
    .then((response) => 
        response.json())

    .then(function(data) {

        img.src = ` ${"https://image.tmdb.org/t/p/original" + data.backdrop_path} `
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
        console.log(data.cast[1])
        acteurName2.innerHTML += `${data.cast[1].name}`
    })
}