<?php 
    include_once 'header.php'
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

</head>
<body class="bg-slate-800 font-mont">
    <input type="hidden" value="trending" class="whichPage">

<h1 class="text-center font-bold mt-14 text-4xl text-white font-mont">Welcome, <?php if(isset($_SESSION['id'])){
        echo explode(" ", $_SESSION['usersName'])[0];
    }else{
        echo 'User';
    } 
    ?> </h1>
<br><br><br>

    <div class="searchBar flex flex-row align-middle justify-center gap-10">
        <input type="text" class="inputSearch border-solid border-4 w-2/5" id="inputSearch">
        <button class="buttonWriteSearch font-mont text-white cursor-pointer">search</button>
    </div>

    <br>
    <div class="filter-container flex justify-around text-lg mt-2 items-baseline">
        <div class="catagorie bg-slate-500 rounded-sm w-1/5 flex gap-2 items-center justify-center">
            <label for="" class="text-white">Choisir une categorie</label>
            <select id="catego" class="genre outline-none border-none cursor-pointer">
                <option value="">Aucun</option>
                <option value="Action">Action</option>
                <option value="Aventure">Aventure</option>
                <option value="Animation">Animation</option>
                <option value="Crime">Crime</option>
                <option value="Policier">Policier</option>
            </select>
        </div>

        <div class="tri bg-slate-500 rounded-sm w-1/5 flex gap-2 items-center justify-around">
            <label for="" class="text-white">Trier par : </label>
            <select id="tri" class="tri_filter cursor-pointer">
                <option value="">Aucun</option>
                <option value="nom">Nom</option>
                <option value="avis">Avis</option>
                <option value="popularite">Popularité</option>
                <option value="note">Note</option>
            </select>
            <button id="croissantBtn" class="croissant">
                <img src="img/croissant.png" alt="" class="h-8 img-croiss">
            </button>
        </div>

        <div class="classifiction bg-slate-500 rounded-sm w-1/5 flex gap-2 items-center justify-around">
            <label for="" class="text-white">Limite d'age</label>
            <select id="" class="limiteAge cursor-pointer">
                <option value="">Aucun</option>
                <option value="all">Tout public</option>
                <option value="12">12+</option>
                <option value="16">16+</option>
                <option value="18">18+</option>
            </select>
        </div>

        <button class="resetButton text-white bg-slate-500 rounded-full w-24">reset</button>
        <button class="searchButton text-white bg-slate-500 rounded-full w-24">Chercher</button>

    </div>

    <div class="grid grid-cols-4 px-40 py-32 grid-flow-row gap-4 accueil"></div>


    <script src="api/accueil.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <?php 
     include_once 'footer.php'
    ?>

</body>
</html>