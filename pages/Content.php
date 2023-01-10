
<?php
// session_start();    
require_once '../header.php';
require_once '../controllers/album.php';
// $connection = new Connection();



if(isset($_POST["removeId"])){
  $delete = $connection->removeMovieFromAlbum($_POST["removeId"], $_GET['movie_id']);
  if($delete){
      echo "Suppression réussie";
  }
  else{
      echo "Erreur dans la supression";
  }
}


?>
<link rel="stylesheet" href="../style.css">



        <div id="divParentAlbum" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-5 gap-8">
            <?php
                // $allMovies = $connection->getMoviesFromAlbum($album_id['album_id']);
                if(!empty($allMovies)){
                    echo '<h1> Cet album ne contient aucun film</h1>';
                }
                // $array_movies_id = [];
                // foreach($allMovies as $movie){
                //     array_push($array_movies_id, $movie[0]["movies_id"]);
                // }
               
            ?>
            <form class="w-[120px]" method="POST" action="">
                 <input type="hidden" name="delete_album" value="<?= $album["album_id"]; ?>">
                 <input class="bg-inherit" type="submit" name="deleteAlbum" value="supprimer">
             </form>

        </div>














<!-- <?php
require_once '../footer.php';
?> -->
</body>
</html>

