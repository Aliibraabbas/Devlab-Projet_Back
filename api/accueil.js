// require('dotenv').config();
// api_key = process.env.api_key
let moovie = document.querySelector(".accueil")
let trending = "https://api.themoviedb.org/3/movie/popular?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"

// Ajoute tout les id des films dans un tableau
let allFilmId = []
let allFilmName = []
let isNameSorted = 0
let isCroissant = true

// Affiche les films au chargement
window.onload = function() {
    showAllFilm(trending)
};

// Recupere tout les id des films
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

// recupere la classification actuel
let classification = document.querySelector(".limiteAge")
let currentClassification = classification.value

// recupere le boutton croissant
let croissant = document.querySelector(".croissant")

// Met a jour croissant/decroissant
croissant.addEventListener("click", function(){
    if(isCroissant == true) {
        isCroissant = false
        croissant.textContent = 'Decroissant'
    }else {
        isCroissant = true
        croissant.textContent = 'Croissant'
    }
    console.log(isCroissant)
})

// Met a jour le tri
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

// Met a jour la classification d'age
classification.addEventListener("click", function() {

    // Check si la value a changé
    if(currentClassification != classification.value){
        currentClassification = classification.value
    }
})

// ------------------- Boutton qui lance l'affichafe des films ----------------------------------- //
let searchButton = document.querySelector(".searchButton")
searchButton.addEventListener("click", function() {
    if(currentClassification != "" && currentGenre == "" && currentTri == "") {
        resetInnerHTML(trending)
        for(var i = 0; i < allFilmId.length; i++) {
            checkClassification("https://api.themoviedb.org/3/movie/"+ allFilmId[i] +"/release_dates?api_key=4d96b3b4809a91b441704c4ff361ba94")
        }
    }else{
        classification.value = ""
        // Affiche tout les films si il n'y a pas de genre choisit
        if(currentGenre == ""){
            // Si il n'y a pas de tri choisit
            if(currentTri == "") {
                resetInnerHTML(trending)
                showAllFilm(trending)
            }else {
                if(currentTri == "nom") {
                    resetInnerHTML(trending)
                    triFilm(trending, "nom")
                }else if(currentTri == "popularite") {
                    resetInnerHTML(trending)
                    triFilm(trending, "popularite")
                }else if(currentTri == "avis") {
                    resetInnerHTML(trending)
                    getAvis(trending)
                }else if(currentTri == "note") {
                    resetInnerHTML(trending)
                    triFilm(trending, "note")
                }
            }

        // Sinon affiche en fonction du genre choisit
        }else {
            if(currentTri == "") {
                resetInnerHTML(trending)
                showFilmByGenre(trending)
            }else {
                if(currentTri == "nom") {
                    resetInnerHTML(trending)
                    triFilmGenre("nom")
                }else if(currentTri == "popularite") {
                    resetInnerHTML(trending)
                    triFilmGenre("popularite")
                }else if(currentTri == "note") {
                    resetInnerHTML(trending)
                    triFilmGenre("note")
                }
                // else if(currentTri == "avis") {
                //     resetInnerHTML(trending)
                //     getAvisGenre(trending)
                // }
            }
        }
    }

})

// Remet le html a blanc
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

// -------------------------- AFFICHAGE DE FILM -------------------------------- //

// Affiche tout les film par genre (sans tri)
function showFilmByGenre(url) {
    console.log('test')
    fetch(url)
        .then((response) => 
        response.json())

        .then(function(data) {
            
            // On recupere la page detail de tout les films grace a leur id et on verifie si leur genre correspond au genre choisit
            allFilmId.forEach(film_id => {
                let film = "https://api.themoviedb.org/3/movie/" + film_id + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                
                fetch(film)
                    .then((response) => 
                        response.json())
            
                    .then(function(data) {
                        data.genres.forEach(result => {
                            if(result.name == currentGenre) {
                                moovie.innerHTML += `
                                    <a href="onepage.php?id=${data.id}">
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

// Affiche tout les film sans genre et tri
function showAllFilm(url) {

    // Affiche tout les films
    fetch(url)
    .then((response) => 
        response.json())

    .then(function(data) {

        data.results.forEach(film => {
    
            moovie.innerHTML += `
                <a href="onepage.php?id=${film.id}">
                    <div class="rounded-3xl relative">
                        <img src="${"https://image.tmdb.org/t/p/original" + film.backdrop_path}" alt="" class="rounded-3xl w-full">
                        <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${film.title}</h2>
                    </div>
                </a>
                `
        })

    })

}

function showAllFilmSearch(url) {

    // Affiche tout les films
    fetch(url)
    .then((response) => 
        response.json())

    .then(function(data) {
        moovie.innerHTML += `
            <a href="onepage.php?id=${data.id}">
                <div class="rounded-3xl relative">
                    <img src="${"https://image.tmdb.org/t/p/original" + data.backdrop_path}" alt="" class="rounded-3xl w-full">
                    <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${data.title}</h2>
                </div>
            </a>
            `

    })

}

// Affiche tout le film
function showAllFilmFilter(url) {

    // Affiche tout les films
    fetch(url)
    .then((response) => 
        response.json())

    .then(function(data) {

        console.log(data.id, data.title)
        moovie.innerHTML += `
            <a href="onepage.php?id=${data.id}">
                <div class="rounded-3xl relative">
                    <img src="${"https://image.tmdb.org/t/p/original" + data.backdrop_path}" alt="" class="rounded-3xl w-full">
                    <h2 class="p-2 text-xl absolute left-0 bottom-0 bg-orange-500 w-full rounded-b-3xl">${data.title}</h2>
                </div>
            </a>
            `
    })

}

// --------------------- FONCTION DE TRI COMMUNE --------------------- //

function triFilm(url, whichTri) {
    fetch(url)
        .then((response) => 
            response.json())

        .then(function(data) {
            var fetchFilm = []
            var fetchFilmId = []

            if(whichTri == "nom") {
                for (var i = 0; i < data.results.length; i++) {
                    fetchFilm.push(data.results[i].title)
                    fetchFilmId.push(data.results[i].id)
                }
            }else if(whichTri == "popularite") {
                for (var i = 0; i < data.results.length; i++) {
                    fetchFilm.push(data.results[i].popularity)
                    fetchFilmId.push(data.results[i].id)
                }
            }else if(whichTri == "note") {
                for (var i = 0; i < data.results.length; i++) {
                    fetchFilm.push(data.results[i].vote_average)
                    fetchFilmId.push(data.results[i].id)
                }
            }

            var done = false
            while(!done) {
                done = true
                if(isCroissant == true) {
                    for(var i = 1; i < fetchFilm.length; i++) {

                        if (fetchFilm[i - 1] > fetchFilm[i]) {
                            done = false
                            var tmpPopularity = fetchFilm[i - 1]
                            var tmpid = fetchFilmId[i - 1]
            
                            fetchFilm[i - 1] = fetchFilm[i]
                            fetchFilmId[i - 1] = fetchFilmId[i]
            
                            fetchFilm[i] = tmpPopularity
                            fetchFilmId[i] = tmpid
                        }
                    }
                }else {
                    console.log("decroissant")
                    for(var i = 1; i < fetchFilm.length; i++) {

                        if (fetchFilm[i - 1] < fetchFilm[i]) {
                            done = false
                            var tmpPopularity = fetchFilm[i - 1]
                            var tmpid = fetchFilmId[i - 1]
            
                            fetchFilm[i - 1] = fetchFilm[i]
                            fetchFilmId[i - 1] = fetchFilmId[i]
            
                            fetchFilm[i] = tmpPopularity
                            fetchFilmId[i] = tmpid
                        }
                    }
                }

                // console.log(fetchFilm)
                // console.log(fetchFilmId)
                
            }
            // On affiche
            for (var i = 0; i < fetchFilm.length; i++) {
                let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                showAllFilmFilter(newUrl)
            }
        })
}

function triFilmGenre(whichTri) {
    var fetchFilm = []
    var fetchFilmId = []
    let limite = 0

    // on check tout les films
    for(var i = 0; i < allFilmId.length; i++) {
        let film = "https://api.themoviedb.org/3/movie/" + allFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
        fetch(film)
            .then((response) => 
                response.json())
            .then(function(data) {
                data.genres.forEach(result => {
                    // On remplie les tableaux
                    if(result.name == currentGenre) {
                        if(whichTri == "nom") {
                            fetchFilm.push(data.title)
                            fetchFilmId.push(data.id)
                        }else if(whichTri == "popularite") {
                            fetchFilm.push(data.popularity)
                            fetchFilmId.push(data.id)
                        }else if(whichTri == "note") {
                            fetchFilm.push(data.vote_average)
                            fetchFilmId.push(data.id)
                        }
                    }
                })
                // Mtn on trie
                var done = false
                while(!done) {
                    done = true
                    if(isCroissant == true) {
                        for(var i = 1; i < fetchFilm.length; i++) {

                            if (fetchFilm[i - 1] > fetchFilm[i]) {
                                done = false
                                var tmpPopularity = fetchFilm[i - 1]
                                var tmpid = fetchFilmId[i - 1]
                
                                fetchFilm[i - 1] = fetchFilm[i]
                                fetchFilmId[i - 1] = fetchFilmId[i]
                
                                fetchFilm[i] = tmpPopularity
                                fetchFilmId[i] = tmpid
                            }
                        }
                    }else {
                        for(var i = 1; i < fetchFilm.length; i++) {

                            if (fetchFilm[i - 1] < fetchFilm[i]) {
                                done = false
                                var tmpPopularity = fetchFilm[i - 1]
                                var tmpid = fetchFilmId[i - 1]
                
                                fetchFilm[i - 1] = fetchFilm[i]
                                fetchFilmId[i - 1] = fetchFilmId[i]
                
                                fetchFilm[i] = tmpPopularity
                                fetchFilmId[i] = tmpid
                            }
                        }
                    }
                }
                    

                // On affiche
                limite += 1
                if(limite == allFilmId.length) {
                    for (var i = 0; i < fetchFilm.length; i++) {
                        let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                        showAllFilmFilter(newUrl)
                    }
                }
        })
    }
    
}


// ------------------------------- TRI PAR CLASSIFICATION (pas parfait) ------------------------- //

function checkClassification(url) {

    fetch(url)
        .then((response) => 
            response.json())
        .then(function(data) {
            data.results.forEach(region => {
                if(region.iso_3166_1 == "FR") {
                    if(currentClassification == 'all') {
                        if(region.release_dates[0].certification == 'U' || region.release_dates[0].certification == 'G' || region.release_dates[0].certification == '') {
                            let newUrl = "https://api.themoviedb.org/3/movie/" + data.id + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                            showAllFilmFilter(newUrl)
                        }
                    }else if(currentClassification == '12') {
                        if(region.release_dates[0].certification == 'PG-13' || region.release_dates[0].certification == 'G' || region.release_dates[0].certification == '12A' || region.release_dates[0].certification == '12') {
                            let newUrl = "https://api.themoviedb.org/3/movie/" + data.id + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                            showAllFilmFilter(newUrl)
                        }
                    }else if(currentClassification == '16') {
                        if(region.release_dates[0].certification == 'R' || region.release_dates[0].certification == '15' || region.release_dates[0].certification == 'M15+' || region.release_dates[0].certification == '16') {
                            let newUrl = "https://api.themoviedb.org/3/movie/" + data.id + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                            showAllFilmFilter(newUrl)
                        }
                    }else if(currentClassification == '18') {
                        if(region.release_dates[0].certification == 'X' || region.release_dates[0].certification == '18' || region.release_dates[0].certification == 'R18+') {
                            let newUrl = "https://api.themoviedb.org/3/movie/" + data.id + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                            showAllFilmFilter(newUrl)
                        }
                    }else {
                        return false
                    }
                }
            })
        })
}

// console.log(currentClassification)
// console.log('aaaaaaa' , checkClassification("https://api.themoviedb.org/3/movie/76600/release_dates?api_key=4d96b3b4809a91b441704c4ff361ba94"))

// ------------------------------- Search de film (axios) ------------------------- //
let searchText = document.getElementById("inputSearch")
let searchTextValue = ""
searchText.addEventListener('keydown', function(){
    if(searchText.value != searchTextValue) {
        searchTextValue = searchText.value
    }
})

let buttonSearch = document.querySelector('.buttonWriteSearch')
buttonSearch.addEventListener('click', function() {
    searchForFilm()
})

function searchForFilm() {
    var query = "https://api.themoviedb.org/3/search/movie?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR&query=" + searchText.value
    axios.get(query).then(function(response) {
        resetInnerHTML(trending)
        console.log(response.data.results)
        response.data.results.forEach(film => {
            if(film.backdrop_path != null) {
                let newUrl = "https://api.themoviedb.org/3/movie/" + film.id + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                showAllFilmSearch(newUrl)
            }
        })
    }).catch(function(error) {
        console.log(error)
    })
}

// -------------------------------------- AUTRES ------------------------------------ //

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

function getFilmDetailUrl(url) {
    let newUrl = []
    fetch(url)
        .then((response) => 
            response.json())

        .then(function(data) {
            var fetchFilm = []
            // console.log("pas de genre")
            for (var i = 0; i < data.results.length; i++) {
                fetchFilm.push(data.results[i].title)
            }
            fetchFilm.sort()
            // On affiche
            for (var i = 0; i < fetchFilm.length; i++) {
                newUrl.push(writeTitle(fetchFilm[i]))
            }
            return(newUrl)
        })

}

function bubbleSort(array) {
    var done = false;
    while (!done) {
      done = true;
      for (var i = 1; i < array.length; i += 1) {
        if (array[i - 1] < array[i]) {
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




// ----------------------------------------------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------------------------------------------- //

// -------------------------------- TRI PAR NOTE ---------------------- //

function getNote(url) {
    fetch(url)
    .then((response) => 
        response.json())

    .then(function(data) {
        var fetchFilm = []
        var fetchFilmId = []

        for (var i = 0; i < data.results.length; i++) {
            fetchFilm.push(data.results[i].vote_average)
            fetchFilmId.push(data.results[i].id)
        }

        var done = false
        while(!done) {
            done = true
            if(isCroissant == true) {
                for(var i = 1; i < fetchFilm.length; i++) {

                    if (fetchFilm[i - 1] > fetchFilm[i]) {
                        done = false
                        var tmpPopularity = fetchFilm[i - 1]
                        var tmpid = fetchFilmId[i - 1]
        
                        fetchFilm[i - 1] = fetchFilm[i]
                        fetchFilmId[i - 1] = fetchFilmId[i]
        
                        fetchFilm[i] = tmpPopularity
                        fetchFilmId[i] = tmpid
                    }
                }
            }else {
                console.log("decroissant")
                for(var i = 1; i < fetchFilm.length; i++) {

                    if (fetchFilm[i - 1] < fetchFilm[i]) {
                        done = false
                        var tmpPopularity = fetchFilm[i - 1]
                        var tmpid = fetchFilmId[i - 1]
        
                        fetchFilm[i - 1] = fetchFilm[i]
                        fetchFilmId[i - 1] = fetchFilmId[i]
        
                        fetchFilm[i] = tmpPopularity
                        fetchFilmId[i] = tmpid
                    }
                }
            }
        }
        // On affiche
        for (var i = 0; i < fetchFilm.length; i++) {
            let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
            showAllFilmFilter(newUrl)
        }
    })
}

function getNoteIfGenre() {

    var fetchFilm = []
    var fetchFilmId = []
    let limite = 0

    for(var i = 0; i < allFilmId.length; i++) {
        let film = "https://api.themoviedb.org/3/movie/" + allFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
        fetch(film)
            .then((response) => 
                response.json())
            .then(function(data) {
                data.genres.forEach(result => {
                    // On remplie les tableaux
                    if(result.name == currentGenre) {
                        fetchFilm.push(data.vote_average)
                        fetchFilmId.push(data.id)
                    }
                })
                // Mtn on trie
                var done = false
                while(!done) {
                    done = true
                    if(isCroissant == true) {
                        for(var i = 1; i < fetchFilm.length; i++) {

                            if (fetchFilm[i - 1] > fetchFilm[i]) {
                                done = false
                                var tmpPopularity = fetchFilm[i - 1]
                                var tmpid = fetchFilmId[i - 1]
                
                                fetchFilm[i - 1] = fetchFilm[i]
                                fetchFilmId[i - 1] = fetchFilmId[i]
                
                                fetchFilm[i] = tmpPopularity
                                fetchFilmId[i] = tmpid
                            }
                        }
                    }else {
                        for(var i = 1; i < fetchFilm.length; i++) {

                            if (fetchFilm[i - 1] < fetchFilm[i]) {
                                done = false
                                var tmpPopularity = fetchFilm[i - 1]
                                var tmpid = fetchFilmId[i - 1]
                
                                fetchFilm[i - 1] = fetchFilm[i]
                                fetchFilmId[i - 1] = fetchFilmId[i]
                
                                fetchFilm[i] = tmpPopularity
                                fetchFilmId[i] = tmpid
                            }
                        }
                    }
                }

                // On affiche
                limite += 1
                if(limite == allFilmId.length) {
                    for (var i = 0; i < fetchFilm.length; i++) {
                        let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                        showAllFilmFilter(newUrl)
                    }
                }
        })
    }
}

// ------------------------------------- TRI DES FILMS PAR NOM ----------------------------- //

// Tri les nom et recupere les ids
function triFilmNameId(url) {

    fetch(url)
        .then((response) => 
            response.json())

        .then(function(data) {
            var fetchFilm = []
            var fetchFilmId = []

            for (var i = 0; i < data.results.length; i++) {
                fetchFilm.push(data.results[i].title)
                fetchFilmId.push(data.results[i].id)
            }

            var done = false
            while(!done) {
                done = true
                if(isCroissant == true) {
                    for(var i = 1; i < fetchFilm.length; i++) {

                        if (fetchFilm[i - 1] > fetchFilm[i]) {
                            done = false
                            var tmpPopularity = fetchFilm[i - 1]
                            var tmpid = fetchFilmId[i - 1]
            
                            fetchFilm[i - 1] = fetchFilm[i]
                            fetchFilmId[i - 1] = fetchFilmId[i]
            
                            fetchFilm[i] = tmpPopularity
                            fetchFilmId[i] = tmpid
                        }
                    }
                }else {
                    console.log("decroissant")
                    for(var i = 1; i < fetchFilm.length; i++) {

                        if (fetchFilm[i - 1] < fetchFilm[i]) {
                            done = false
                            var tmpPopularity = fetchFilm[i - 1]
                            var tmpid = fetchFilmId[i - 1]
            
                            fetchFilm[i - 1] = fetchFilm[i]
                            fetchFilmId[i - 1] = fetchFilmId[i]
            
                            fetchFilm[i] = tmpPopularity
                            fetchFilmId[i] = tmpid
                        }
                    }
                }

                // console.log(fetchFilm)
                // console.log(fetchFilmId)
                
            }
            // On affiche
            for (var i = 0; i < fetchFilm.length; i++) {
                let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                showAllFilmFilter(newUrl)
            }
        })
}

// Tri par nom si y a un genre et recup les id pour afficher
function triFilmNameGenreId() {
    var fetchFilm = []
    var fetchFilmId = []
    let limite = 0

    // on check tout les films
    for(var i = 0; i < allFilmId.length; i++) {
        let film = "https://api.themoviedb.org/3/movie/" + allFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
        fetch(film)
            .then((response) => 
                response.json())
            .then(function(data) {
                data.genres.forEach(result => {
                    // On remplie les tableaux
                    if(result.name == currentGenre) {
                        fetchFilm.push(data.title)
                        fetchFilmId.push(data.id)
                    }
                })
                // Mtn on trie
                var done = false
                while(!done) {
                    done = true
                    if(isCroissant == true) {
                        for(var i = 1; i < fetchFilm.length; i++) {

                            if (fetchFilm[i - 1] > fetchFilm[i]) {
                                done = false
                                var tmpPopularity = fetchFilm[i - 1]
                                var tmpid = fetchFilmId[i - 1]
                
                                fetchFilm[i - 1] = fetchFilm[i]
                                fetchFilmId[i - 1] = fetchFilmId[i]
                
                                fetchFilm[i] = tmpPopularity
                                fetchFilmId[i] = tmpid
                            }
                        }
                    }else {
                        for(var i = 1; i < fetchFilm.length; i++) {

                            if (fetchFilm[i - 1] < fetchFilm[i]) {
                                done = false
                                var tmpPopularity = fetchFilm[i - 1]
                                var tmpid = fetchFilmId[i - 1]
                
                                fetchFilm[i - 1] = fetchFilm[i]
                                fetchFilmId[i - 1] = fetchFilmId[i]
                
                                fetchFilm[i] = tmpPopularity
                                fetchFilmId[i] = tmpid
                            }
                        }
                    }
                }
                    

                // On affiche
                limite += 1
                if(limite == allFilmId.length) {
                    for (var i = 0; i < fetchFilm.length; i++) {
                        let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                        showAllFilmFilter(newUrl)
                    }
                }
        })
    }
    
}

// ------------------------------- TRI PAR POPULARITE ------------------------- //

function getPopularity(url) {

    // On recupre tout les url de details pour avoir la popularité des films
    fetch(url)
        .then((response) => 
            response.json())

        .then(function(data) {
            var fetchFilm = []
            var fetchFilmId = []
            for (var i = 0; i < data.results.length; i++) {
                fetchFilm.push(data.results[i].popularity)
                fetchFilmId.push(data.results[i].id)
            }

            var done = false
            while(!done) {
                done = true
                if(isCroissant == true) {
                    for(var i = 1; i < fetchFilm.length; i++) {
                        if (fetchFilm[i - 1] > fetchFilm[i]) {
                            done = false
                            var tmpPopularity = fetchFilm[i - 1]
                            var tmpid = fetchFilmId[i - 1]
            
                            fetchFilm[i - 1] = fetchFilm[i]
                            fetchFilmId[i - 1] = fetchFilmId[i]
            
                            fetchFilm[i] = tmpPopularity
                            fetchFilmId[i] = tmpid
                        }
                    }
                }else {
                    for(var i = 1; i < fetchFilm.length; i++) {
                        if (fetchFilm[i - 1] < fetchFilm[i]) {
                            done = false
                            var tmpPopularity = fetchFilm[i - 1]
                            var tmpid = fetchFilmId[i - 1]
            
                            fetchFilm[i - 1] = fetchFilm[i]
                            fetchFilmId[i - 1] = fetchFilmId[i]
            
                            fetchFilm[i] = tmpPopularity
                            fetchFilmId[i] = tmpid
                        }
                    }
                }

            }
            // On affiche
            for (var i = 0; i < fetchFilm.length; i++) {
                let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                showAllFilmFilter(newUrl)
            }
        })

}

function getPopularityIfGenre() {

    var fetchFilm = []
    var fetchFilmId = []
    let limite = 0

    for(var i = 0; i < allFilmId.length; i++) {
        let film = "https://api.themoviedb.org/3/movie/" + allFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
        fetch(film)
            .then((response) => 
                response.json())
            .then(function(data) {
                data.genres.forEach(result => {
                    // On remplie les tableaux
                    if(result.name == currentGenre) {
                        fetchFilm.push(data.popularity)
                        fetchFilmId.push(data.id)
                    }
                })
                // Mtn on trie
                var done = false
                while(!done) {
                    done = true
                    if(isCroissant == true) {
                        for(var i = 1; i < fetchFilm.length; i++) {

                            if (fetchFilm[i - 1] > fetchFilm[i]) {
                                done = false
                                var tmpPopularity = fetchFilm[i - 1]
                                var tmpid = fetchFilmId[i - 1]
                
                                fetchFilm[i - 1] = fetchFilm[i]
                                fetchFilmId[i - 1] = fetchFilmId[i]
                
                                fetchFilm[i] = tmpPopularity
                                fetchFilmId[i] = tmpid
                            }
                        }
                    }else {
                        for(var i = 1; i < fetchFilm.length; i++) {

                            if (fetchFilm[i - 1] < fetchFilm[i]) {
                                done = false
                                var tmpPopularity = fetchFilm[i - 1]
                                var tmpid = fetchFilmId[i - 1]
                
                                fetchFilm[i - 1] = fetchFilm[i]
                                fetchFilmId[i - 1] = fetchFilmId[i]
                
                                fetchFilm[i] = tmpPopularity
                                fetchFilmId[i] = tmpid
                            }
                        }
                    }
                }

                // On affiche
                limite += 1
                if(limite == allFilmId.length) {
                    for (var i = 0; i < fetchFilm.length; i++) {
                        let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                        showAllFilmFilter(newUrl)
                    }
                }
        })
    }
}

// ------------------------------- TRI PAR AVIS ------------------------- //

function getAvis(url) {

    fetch(url)
        .then((response) => 
            response.json())

        .then(function(data) {

            var fetchFilmId = []
            let limite = 0
            for (var i = 0; i < data.results.length; i++) {
                fetchFilmId.push(data.results[i].id)
            }

            var fetchFilm = []
            for(var i = 0; i < allFilmId.length; i++) {
                let filmReview = "https://api.themoviedb.org/3/movie/"+ fetchFilmId[i] +"/reviews?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                fetch(filmReview)
                    .then((response) => 
                        response.json())
                    .then(function(data) {
                        fetchFilm.push(data.total_results)
                        // Mtn on trie
                        var done = false
                        while(!done) {
                            done = true
                            if(isCroissant == true) {
                                for(var i = 1; i < fetchFilm.length; i++) {
                                    if (fetchFilm[i - 1] > fetchFilm[i]) {
                                        done = false
                                        var tmpPopularity = fetchFilm[i - 1]
                                        var tmpid = fetchFilmId[i - 1]
                        
                                        fetchFilm[i - 1] = fetchFilm[i]
                                        fetchFilmId[i - 1] = fetchFilmId[i]
                        
                                        fetchFilm[i] = tmpPopularity
                                        fetchFilmId[i] = tmpid
                                    }
                                }
                            }else {
                                for(var i = 1; i < fetchFilm.length; i++) {
        
                                    if (fetchFilm[i - 1] < fetchFilm[i]) {
                                        done = false
                                        var tmpPopularity = fetchFilm[i - 1]
                                        var tmpid = fetchFilmId[i - 1]
                        
                                        fetchFilm[i - 1] = fetchFilm[i]
                                        fetchFilmId[i - 1] = fetchFilmId[i]
                        
                                        fetchFilm[i] = tmpPopularity
                                        fetchFilmId[i] = tmpid
                                    }
                                }
                            }
                        }
                        console.log(fetchFilm)
                        console.log(fetchFilmId)
    
                    // On affiche
                    limite += 1
                    if(limite == allFilmId.length) {
                        for (var i = 0; i < fetchFilm.length; i++) {
                            let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                            showAllFilmFilter(newUrl)
                        }
                    }
                })
            }
        })//----

    
}

function getAvisGenre(url) {

    var fetchFilmId = []
    let limite = 0
    var fetchFilm = []

    for(var i = 0; i < allFilmId.length; i++) {

        let film = "https://api.themoviedb.org/3/movie/" + allFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
        fetch(film)
            .then((response) => 
                response.json())
            .then(function(data) {
                data.genres.forEach(result => {
                    // On remplie le tableaux des ID avec le bon genre
                    if(result.name == currentGenre) {
                        fetchFilmId.push(data.id)
                    }
                })

                // Mtn on va sur le lien des reviews grace aux bon ID
                for(var x = 0; x < fetchFilmId; i++) {

                    console.log("https://api.themoviedb.org/3/movie/"+ fetchFilmId[i] +"/reviews?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR")
                    // fetch(filmReview)
                    //     .then((response) => 
                    //         response.json())
                    //     .then(function(data) {
                    //         fetchFilm.push(data.total_results)
                    //         // Mtn on trie
                    //         var done = false
                    //         while(!done) {
                    //             done = true
                    //             if(isCroissant == true) {
                    //                 for(var i = 1; i < fetchFilm.length; i++) {
                    //                     if (fetchFilm[i - 1] > fetchFilm[i]) {
                    //                         done = false
                    //                         var tmpPopularity = fetchFilm[i - 1]
                    //                         var tmpid = fetchFilmId[i - 1]
                            
                    //                         fetchFilm[i - 1] = fetchFilm[i]
                    //                         fetchFilmId[i - 1] = fetchFilmId[i]
                            
                    //                         fetchFilm[i] = tmpPopularity
                    //                         fetchFilmId[i] = tmpid
                    //                     }
                    //                 }
                    //             }else {
                    //                 for(var i = 1; i < fetchFilm.length; i++) {
            
                    //                     if (fetchFilm[i - 1] < fetchFilm[i]) {
                    //                         done = false
                    //                         var tmpPopularity = fetchFilm[i - 1]
                    //                         var tmpid = fetchFilmId[i - 1]
                            
                    //                         fetchFilm[i - 1] = fetchFilm[i]
                    //                         fetchFilmId[i - 1] = fetchFilmId[i]
                            
                    //                         fetchFilm[i] = tmpPopularity
                    //                         fetchFilmId[i] = tmpid
                    //                     }
                    //                 }
                    //             }
                    //         }
            
                    //         // On affiche
                    //         // limite += 1
                    //         // if(limite == allFilmId.length) {
                    //         //     for (var i = 0; i < fetchFilm.length; i++) {
                    //         //         let newUrl = "https://api.themoviedb.org/3/movie/" + fetchFilmId[i] + "?api_key=4d96b3b4809a91b441704c4ff361ba94&language=fr-FR"
                    //         //         showAllFilmFilter(newUrl)
                    //         //     }
                    //         // }
                    //     })

                }

            })
    }
}