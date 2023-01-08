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
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php
        $id = $_GET["id"]
    ?>
    <h1 class="test"></h1>
    <input type="hidden" value="<?php echo $id ?>" class="filmId">

    <div class="container flex align-middle gap-40 mt-20 mx-4">
        <img src="" alt="" class="poster w-2/6 mr-5" id="poster">
        <div class="info w-7/12 mt-16">
            <div class="title text-3xl text-white font-bold mb-2.5">

            </div>
            <div class="description text-base text-white mb-5">

            </div>
            <div class="actors flex flex-wrap gap-4 justify-center">

                <div class="actor w-[20%] text-center mb-2.5 rounded-md bg-white p-2.5 flex flex-col items-center justify-center">
                    <img src="#" alt="Acteur 1" id="acteur-1" class="w-9/12 rounded-md mb-2.5">
                    <div class="name acteur-name-1 text-base font-bold"></div>
                </div>

                <div class="actor w-[20%] text-center mb-2.5 rounded-md bg-white p-2.5 flex flex-col items-center justify-center">
                    <img src="#" alt="Acteur 2" id="acteur-2" class="w-9/12 rounded-md mb-2.5">
                    <div class="name acteur-name-2 text-base font-bold"></div>
                </div>

                <div class="actor w-[20%] text-center mb-2.5 rounded-md bg-white p-2.5 flex flex-col items-center justify-center">
                    <img src="#" alt="Acteur 3" id="acteur-3" class="w-9/12 rounded-md mb-2.5">
                    <div class="name acteur-name-3 text-base font-bold"></div>
                </div>

                <div class="actor w-[20%] text-center mb-2.5 rounded-md bg-white p-2.5 flex flex-col items-center justify-center">
                    <img src="#" alt="Acteur 4" id="acteur-4" class="w-9/12 rounded-md mb-2.5">
                    <div class="name acteur-name-4 text-base font-bold"></div>
                </div>
            </div>

            <div class="buttons flex items-center justify-around mt-8">
                <button class="visionne border-none text-center text-base rounded-full w-1/4 h-12 bg-yellow-400">Visioné</button>
                <button class="like border-none text-center text-base rounded-full w-1/4 h-12 bg-red-600">Like</button>
            </div>
        </div>
    </div>

    <script src="./api/onepage.js"></script>

    <?php 
     include_once 'footer.php'
    ?>
</body>
</html>