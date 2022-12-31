//////////////////////////////////////////////
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
                    if(result.name == currentGenre) {
                        fetchFilm.push(data.title)
                        console.log(data)
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
/////////////////////////////////////////////

// tri les film par nom et les affiche ///////////////////
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
                let newUrl = writeTitle(fetchFilm[i])
                showAllFilmFilter(newUrl)
            }
        })
        for(var i = 1; i < sortedFilmPopularity.length; i++) {

            if (sortedFilmPopularity[i - 1] > sortedFilmPopularity[i]) {
                done = false
                var tmpPopularity = sortedFilmPopularity[i - 1]
                var tmpName = sortedFilmName[i - 1]

                sortedFilmPopularity[i - 1] = sortedFilmPopularity[i]
                sortedFilmName[i - 1] = sortedFilmName[i]

                sortedFilmPopularity[i] = tmpPopularity
                sortedFilmName[i] = tmpName
            }
        }
}
////////////////////////////////////////////////////////




// On trie par popularité croissante
let sortedFilmPopularity = []
let sortedFilmName = []
let done = false
newUrl.forEach(url => {
    fetch(url)
        .then((response) => 
            response.json())
        .then(function(data) {
            // console.log(data.results[0].popularity)

            data.results.forEach(test => {
            })

            // sortedFilmPopularity.push(data.results[0].popularity)
            // sortedFilmName.push(data.results[0].title)
            // while(!done) {
            //     console.log(sortedFilmPopularity)
            //     done = true
                // for(var i = 1; i < sortedFilmPopularity.length; i++) {

                //     if (sortedFilmPopularity[i - 1] > sortedFilmPopularity[i]) {
                //         done = false
                //         var tmpPopularity = sortedFilmPopularity[i - 1]
                //         var tmpName = sortedFilmName[i - 1]

                //         sortedFilmPopularity[i - 1] = sortedFilmPopularity[i]
                //         sortedFilmName[i - 1] = sortedFilmName[i]

                //         sortedFilmPopularity[i] = tmpPopularity
                //         sortedFilmName[i] = tmpName
                //     }
                // }
            //     // console.log(sortedFilmPopularity)
            // }

    })
})