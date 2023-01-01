let filmId = document.querySelector('.filmId')
let currentFilm = "https://api.themoviedb.org/3/movie/" + filmId.value + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
let moovie = document.querySelector(".moovie")

// Affiche les films au chargement
window.onload = function() {

    // Affiche tout les films
    fetch(currentFilm)
    .then((response) => 
        response.json())

    .then(function(data) {
    
        moovie.innerHTML += `
                <div class="rounded-3xl relative w-9/12">
                    <img src="${"https://image.tmdb.org/t/p/original" + data.backdrop_path}" alt="" class="rounded-3xl w-full">
                    <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${data.title}</h2>
                </div>
            `
        })

};