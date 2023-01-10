<?php
// session_start();    
  require_once '../header.php';
  require_once '../controllers/album.php';



//   $connection = new Connection();
  $album = new Album();

?>

<link rel="stylesheet" href="../pages/style.css">

<main class="mt-10">
    <div class="mt-[20px] font-bold text-3xl  text-white text-lg ml-[20px]  ">
      <div class="uppercase text-white  font-bold mt-[30px] text-3xl   ">
        <div  >
    
       <div>
      <h1 class="" >Welcome, <?php if(isset($_SESSION['id'])){
                echo explode(" ", $_SESSION['usersName'])[0];
             }else {
                 echo 'Guest';
            }

        ?></h1>
         </div>
        </div>
 
           <div class="text-center mt-[94px]">
           <?php
          
              echo '<button class=" visionne border-none text-center text-2xl rounded-full w-[370px] h-[50px] bg-yellow-400 font-bold text-black"><a " href="albums.php"> Vos Albums</a></button>';
            ?>
           </div>
 
      </div>
     </div>
     <div class="mt-[300px]"></div>
        </main>






</body>
<?php
require_once '../footer.php';
?>
</html>
