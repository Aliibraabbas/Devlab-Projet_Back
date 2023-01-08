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
    <title>Document</title>
</head>
<body>

<h1 class="text-center font-bold mt-14 text-4xl">Welcome, <?php if(isset($_SESSION['usersId'])){
        echo explode(" ", $_SESSION['usersName'])[0];
    }else{
        echo 'Guest';
    } 
    ?> </h1>
<br><br><br>

    <div class="searchBar flex flex-row align-middle justify-center gap-10">
        <input type="text" class="inputSearch border-solid border-4 w-2/5" id="inputSearch">
        <button class="buttonWriteSearch">search</button>
    </div>

    <br>
    <div class="filter-container flex justify-around text-lg mt-2">
        <div class="catagorie">
            <label for="" class="text-white">Choisir une categorie</label>
            <select id="catego" class="genre">
                <option value="">Aucun</option>
                <option value="Action">Action</option>
                <option value="Aventure">Aventure</option>
                <option value="Animation">Animation</option>
                <option value="Crime">Crime</option>
                <option value="Policier">Policier</option>
            </select>
        </div>

        <div class="tri">
            <label for="" class="text-white">Trier par : </label>
            <select id="tri" class="tri_filter">
                <option value="">Aucun</option>
                <option value="nom">Nom</option>
                <option value="avis">Avis</option>
                <option value="popularite">Popularité</option>
                <option value="note">Note</option>
            </select>
            <button id="croissantBtn" class="croissant border-solid border-blue-200 border-4">Croissant</button>
        </div>

        <div class="classifiction">
            <label for="" class="text-white">Limite d'age</label>
            <select id="" class="limiteAge">
                <option value="">Aucun</option>
                <option value="all">Tout public</option>
                <option value="12">12+</option>
                <option value="16">16+</option>
                <option value="18">18+</option>
            </select>
        </div>

        <button class="searchButton text-white">Chercher</button>

    </div>

    <div class="grid grid-cols-3 px-40 py-32 grid-flow-row gap-4 accueil"></div>


    <script src="api/accueil.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <?php 
     include_once 'footer.php'
    ?>

</body>
</html>