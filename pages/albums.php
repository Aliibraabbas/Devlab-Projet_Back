
<?php
// session_start();    
require_once '../header.php';
require_once '../controllers/album.php';



//   $connection = new Connection();
$album = new Album();

?>
<link rel="stylesheet" href="../style.css">
<main > 

<?php
  if(!isset($_GET['userName'])) {
      echo '<h2 class="mt-[100px] text-white text-3xl font-bold ml-[20px]">Your Albums :</h2>';
      $Albums = $album->getAlbumFromId($_SESSION ['id']);
  }

?> 
<div class="mt-[40px] text-white text-lg ml-[20px] " >
  <?php

    foreach ($Albums as $albums) {

      
      echo '<div class="  ml-[40%] mr-[60%] mt-8" >';
          echo '<div>';
            echo '<button class=" visionne border-none text-center text-xl rounded-full w-[370px] h-[50px] bg-yellow-400 font-bold text-black"><a " href="Content.php?id=' . $albums['id'] . '" >Cliquer pour voir l\'album '.$albums["name"].'</a></button>';
      echo '</div>';
      
    }


  ?>


</div>
<div class="mt-[220px]"></div>
</main>

<div class=" lg:ml-8  lg:mt-16">
            <h1 class="text-white text-2xl lg:text-3xl font-bold">Créer un album:</h1>
            <form method="POST" class="mt-8 flex flex-col py-4 rounded-lg border border-white ">
                <div class="">
                    <label for="name" class="text-white text-xl font-bold ">Nom:</label>
                    <input class="w-6/12  border-white"type="text" name="name" id="name" placeholder="Album name">
                </div>
                <div class="flex mt-4">
                    <label for="privacy" class="text-white text-xl mr-2">public ou privé :</label>
                    <select class=" border  rounded-lg" name="privacy" id="privacy">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <button type="submit" name="addAlbum" class="text-white mt-8 border-2 border-white rounded-lg w-6/12 lg:w-4/12 m-auto">Créer</button>
            </form>
        </div>



 



<?php
require_once '../footer.php';
?>
</body>
</html>

