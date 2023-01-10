<?php 
    session_start(); 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devlab_Projet_Backend</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="style.css" >
</head>
<body >
    <nav >
            <ul>
                <a class="text-white" href="index.php"><li>Home</li></a>

                <?php if(!isset($_SESSION['id'])) : ?>

                        <a  href="signup.php"><li>Sign Up</li></a>
                        <a  href="login.php"><li>Login</li></a>

                        <?php else: ?>
                    <a class="text-white" href="./pages/profil.php"><li>Profil</li></a>
                    <a class="text-white" href="./controllers/Users.php?q=logout"><li>Logout</li></a>
                <?php endif; ?>

            </ul>

    </nav>