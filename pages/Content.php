
<?php
// session_start();    
require_once '../header.php';
require_once '../controllers/album.php';
// $connection = new Connection();




?>
<link rel="stylesheet" href="../style.css">



        <div id="divParentAlbum" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-5 gap-8">
            <?php
                if(!empty($allMovies)){
                    echo '<h1> Cet album ne contient aucun film</h1>';
                }
               
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

