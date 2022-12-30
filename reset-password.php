
<?php 
    include_once 'header.php';
?>

    <h1 class="header">Reset Password</h1>


    <form method="post">
        <input type="hidden" name="type" value="send" />
        <input type="text" name="usersEmail" placeholder="Email">
        <button type="submit" name="submit">Receive Email</button>
    </form>
    
