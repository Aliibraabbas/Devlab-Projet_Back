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

    <label for="">Choisir une categorie</label>
    <select id="catego" class="filter">
        <option value="">Aucun</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
        <option value="Crime">Crime</option>
        <option value="Policier">Policier</option>
    </select>

    <label for="">Trier par : </label>
    <select id="tri" class="tri_filter">
        <option value="">Aucun</option>
        <option value="nom">Nom</option>
        <option value="avis">Avis</option>
        <option value="popularite">Popularité</option>
    </select>
    <button class="croissant border-solid border-blue-200 border-4">Croissant</button>

    <button class="searchButton">Chercher</button>


    <div class="grid grid-cols-3 p-40 grid-flow-row gap-4 accueil"></div>

    
    <script src="api/accueil.js"></script>

    <?php 
     include_once 'footer.php'
    ?>

</body>
</html>