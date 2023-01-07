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

    <div class="container">
        <img src="" alt="" class="poster" id="poster">
        <div class="info">
            <div class="title">

            </div>
            <div class="description">

            </div>
            <div class="actors">
                <div class="actor">
                    <img src="#" alt="Acteur 1" id="acteur-1">
                    <div class="name acteur-name-1"></div>
                </div>
                <div class="actor">
                    <img src="#" alt="Acteur 2" id="acteur-2">
                    <div class="name acteur-name-2"></div>
                </div>
            </div>

            <div class="buttons">
                <button class="visionne">Visioné</button>
                <button class="like">Like</button>
            </div>
        </div>
    </div>

    <script src="./api/onepage.js"></script>

    <?php 
     include_once 'footer.php'
    ?>
</body>
</html>