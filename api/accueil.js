let moovie = document.querySelector(".accueil")
let trending = "https://api.themoviedb.org/3/movie/popular?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"

// Ajoute tout les id des films dans un tableau
let allFilm = []

fetch(trending)
    .then((response) => 
        response.json())

    .then(function(data) {
        data.results.forEach(film => {
            allFilm.push(film.id)
            console.log("ajout")
        })
    })

// recupere la category actuelle
let category = document.querySelector(".filter")
console.log("catego " + category.value)
let currentValue = category.value
category.addEventListener("click", function(){
    if(currentValue != category.value){
        console.log(category.value)
        currentValue = category.value
    }
    // Affiche tout les films
    fetch(trending)
    .then((response) => 
        response.json())

    .then(function(data) {
        // console.log("data result" + data.results)

        if(currentValue == ""){
            data.results.forEach(film => {
                // console.log(e)

                moovie.innerHTML += `
                    <a href="../page/onepage_moovie.php?id=${film.id}"><div class="rounded-3xl relative">
                        <img src="${"https://image.tmdb.org/t/p/original" + film.backdrop_path}" alt="" class="rounded-3xl w-full">
                        <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${film.title}</h2>
                    </div></a>
                    `
            })
        }else {
            data.results.forEach(film => {
                // console.log(e)

                moovie.innerHTML = ``
            })

            allFilm.forEach(film_id => {
                let film = "https://api.themoviedb.org/3/movie/" + film_id + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=en-FR"
                
                fetch(film)
                    .then((response) => 
                        response.json())

                    .then(function(data) {
                        data.genres.forEach(result => {
                            console.log("legenre " + result.name + "currentValue " + currentValue)
                            if(result.name == currentValue) {
                                moovie.innerHTML += `
                                    <a href="../page/onepage_moovie.php?id=${data.id}"><div class="rounded-3xl relative">
                                        <img src="${"https://image.tmdb.org/t/p/original" + data.backdrop_path}" alt="" class="rounded-3xl w-full">
                                        <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${data.title}</h2>
                                    </div></a>
                                    `
                            }
                        })
                })
            })
        }
    })
})



let film = "https://api.themoviedb.org/3/movie/76600?api_key=4d96b3b4809a91b441704c4ff361ba94&language=en-FR"
// fetch(film)
//     .then((response) => 
//         response.json())

//     .then(function(data) {
//         console.log("data result film " + data.genres[0].name)

//         data.results.forEach(e => {
//             // console.log(e)

//             // moovie.innerHTML += `
//             //     <a href="../page/onepage_moovie.php?id=${e.id}"><div class="rounded-3xl relative">
//             //         <img src="${"https://image.tmdb.org/t/p/original" + e.backdrop_path}" alt="" class="rounded-3xl w-full">
//             //         <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${e.title}</h2>
//             //     </div></a>
//             //     `
//     })

// })


