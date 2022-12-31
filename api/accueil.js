let moovie = document.querySelector(".accueil")
let trending = "https://api.themoviedb.org/3/movie/popular?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"

// Ajoute tout les id des films dans un tableau
let allFilmId = []
let allFilmName = []
let isNameSorted = 0

window.onload = function() {
    showAllFilm(trending)
};

fetch(trending)
    .then((response) => 
        response.json())

    .then(function(data) {
        data.results.forEach(film => {
            allFilmId.push(film.id)
            // allFilmName.push(film.title)
        })
    })

// recupere la category actuelle
let category = document.querySelector(".genre")
let currentGenre = category.value

// recupere le tri actuelle
let tri = document.querySelector(".tri_filter")
let currentTri = tri.value

tri.addEventListener("click", function() {
    // Check si le sort est ok
    if(isNameSorted == 0) {
        allFilmName.sort()
        isNameSorted = 1
    }

    // Check si la value a changé
    if(currentTri != tri.value){
        (tri.value)
        currentTri = tri.value
    }
})


// Permet de mettre a jour quand on change de genre
category.addEventListener("click", function(){
    if(currentGenre != category.value){
        currentGenre = category.value
    }
})

let searchButton = document.querySelector(".searchButton")
searchButton.addEventListener("click", function() {

    // Affiche tout les films si il n'y a pas de genre choisit
    if(currentGenre == ""){
        // Si il n'y a pas de try choisit
        if(currentTri == "") {
            resetInnerHTML(trending)
            showAllFilm(trending)
        }else {
            if(currentTri == "nom") {
                resetInnerHTML(trending)
                triFilmName(trending)
            }
        }

    // Sinon affiche en fonction du genre choisit
    }else {
        if(currentTri == "") {
            resetInnerHTML(trending)
            showFilmByGenre(trending)
        }else {
            if(currentTri != "") {
                resetInnerHTML(trending)
                triFilmNameGenre()
            }
        }
    }
})

function resetInnerHTML(url) {
    // Affiche tout les films
    fetch(url)
    .then((response) => 
        response.json())

    .then(function(data) {

        // On remet le innerHTML a blanc
        data.results.forEach(film => {
            // (e)
        
            moovie.innerHTML = ``
        })
    })
}

function showFilmByGenre(url) {

    fetch(url)
        .then((response) => 
        response.json())

        .then(function(data) {
            
            // On recupere la page detail de tout les films grace a leur id et on verifie si leur genre correspond au genre choisit
            allFilmId.forEach(film_id => {
                let film = "https://api.themoviedb.org/3/movie/" + film_id + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=en-FR"
                
                fetch(film)
                    .then((response) => 
                        response.json())
            
                    .then(function(data) {
                        data.genres.forEach(result => {
                            if(result.name == currentGenre) {
                                moovie.innerHTML += `
                                    <a href="../page/onepage_moovie.php?id=${data.id}">
                                        <div class="rounded-3xl relative">
                                            <img src="${"https://image.tmdb.org/t/p/original" + data.backdrop_path}" alt="" class="rounded-3xl w-full">
                                            <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${data.title}</h2>
                                        </div>
                                    </a>
                                    `
                            }
                        })
                })
            })
        })

}

function showAllFilm(url) {

    // Affiche tout les films
    fetch(url)
    .then((response) => 
        response.json())

    .then(function(data) {

        data.results.forEach(film => {
    
            moovie.innerHTML += `
                <a href="../page/onepage_moovie.php?id=${film.id}">
                    <div class="rounded-3xl relative">
                        <img src="${"https://image.tmdb.org/t/p/original" + film.backdrop_path}" alt="" class="rounded-3xl w-full">
                        <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${film.title}</h2>
                    </div>
                </a>
                `
        })

    })

}

function showAllFilmFilter(url) {

    // Affiche tout les films
    fetch(url)
    .then((response) => 
        response.json())

    .then(function(data) {

        moovie.innerHTML += `
            <a href="../page/onepage_moovie.php?id=${data.results[0].id}">
                <div class="rounded-3xl relative">
                    <img src="${"https://image.tmdb.org/t/p/original" + data.results[0].backdrop_path}" alt="" class="rounded-3xl w-full">
                    <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${data.results[0].title}</h2>
                </div>
            </a>
            `
    })

}

function triFilmName(url) {

    fetch(url)
        .then((response) => 
            response.json())

        .then(function(data) {
            let fetchFilm = []
            // SI il n'y a pas de genre on push juste
            if(currentGenre == "") {
                // console.log("pas de genre")
                for (var i = 0; i < data.results.length; i++) {
                    fetchFilm.push(data.results[i].title)
                }
                fetchFilm.sort()
            // Sinon, si il y a un genre on push seulement ceux qui on le genre
            }

            console.log("juste avant" , fetchFilm.length)
            // On affiche
            for (var i = 0; i < fetchFilm.length; i++) {
                console.log("caca")
                let newUrl = writeTitle(fetchFilm[i])
                showAllFilmFilter(newUrl)
            }
        })

}

function triFilmNameGenre() {
        console.log("avec un genre")
        let fetchFilm = []
        let limite = 0

        for(var i = 0; i < allFilmId.length; i++) {
            let film = "https://api.themoviedb.org/3/movie/" + allFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
            fetch(film)
                .then((response) => 
                    response.json())
                .then(function(data) {
                    data.genres.forEach(result => {
                        console.log(result.name)
                        if(result.name == currentGenre) {

                            fetchFilm.push(data.title)
                        }
                    })
                    fetchFilm.sort()
                    limite += 1
                    if(limite == allFilmId.length) {
                        if(fetchFilm.length != 0) {
                            // On affiche
                            for (var i = 0; i < fetchFilm.length; i++) {
                                console.log("fetchFilm : " ,fetchFilm[i])
                                let newUrl = writeTitle(fetchFilm[i])
                                showAllFilmFilter(newUrl)
                                wait = 1
                            }
                        }
                    }
            })
        }
    }

function writeTitle(filmName) {
    let newTitle = ""
    for (var i = 0; i < filmName.length; i++) {
        if(filmName.charAt(i) == " "){
            newTitle += "+"
        }else{
            newTitle += filmName.charAt(i)
        }
    }
    // (newTitle)

    // console.log("https://api.themoviedb.org/3/search/movie?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR&query=" + newTitle)
    return("https://api.themoviedb.org/3/search/movie?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR&query=" + newTitle)
}

function getPopularity(url) {
    fetch(url)
        .then((response) => 
            response.json())
        .then(function(data) {
            data.forEach(dataPopularity => {

            })

        })
}

function bubbleSort(array) {
    var done = false;
    while (!done) {
      done = true;
      for (var i = 1; i < array.length; i += 1) {
        if (array[i - 1] > array[i]) {
          done = false;
          var tmp = array[i - 1];
          array[i - 1] = array[i];
          array[i] = tmp;
        }
      }
    }
  
    return array;
  }
  
var numbers = [12, 10, 15, 11, 14, 13, 16];
bubbleSort(numbers);
// console.log("le sort mano :" , numbers);