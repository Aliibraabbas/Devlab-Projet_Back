<?php

class Album
{
    // private PDO $pdo;

    public function __construct()
    {
        $this->pdo = new PDO('mysql:dbname=devlab_backend;host=127.0.0.1', 'root', '');
    


    }


    public function insertAlbum(Album $album)
    {
        $query = 'INSERT INTO album (user_id, name, is_privacy)
                VALUES ( :user_id, :name, :is_privacy)';

        $statement = $this->pdo->prepare($query);

        return $statement->execute([
            'user_id'=>$album->user_id,
            'name' => $album->name,
            'is_privacy'=> $album->is_privacy,
        ]);
    }

    public function getAlbum($albumId)
    {
        $query = 'SELECT * FROM album WHERE id = :albumId';
        $statement = $this->pdo->prepare($query);
        $statement->execute([
            'albumId' => $albumId,
        ]);
        $data = $statement->fetchAll();
        return $data;
    }

    public function getAlbumFromID($id)
    {
        $query =  'SELECT * from album WHERE user_id = '.$id;
        $statement = $this->pdo->prepare($query);
        $statement->execute();

        $data = $statement->fetchAll();
        return $data;
    }






    public function getMovieIdFromId($movie_id){
        $query = 'SELECT * FROM films WHERE movie_id = :movie_id';
        $statement = $this->pdo->prepare($query);
        $statement->execute([
            'movie_id' => $movie_id,
        ]);
        $data = $statement->fetchAll();
        return $data[0]['movie_id'];
    }






    public function addMovieToAlbum($movie_id, $album_id){
        $getId = $this->getMovieIdFromId($movie_id);
        $query = 'INSERT INTO films (album_id, movie_id)
                VALUES (:album_id, :movie_id)';
        $statement = $this->pdo->prepare($query);
        $statement->execute([
            'album_id' => $album_id,
            'movie_id'=> $getId,
        ]);
    }


    public function verifyMovieAlreadyAdded($movie_id, $album_id){
        $getId = $this->getMovieIdFromId($movie_id);
        $query = 'SELECT * FROM films WHERE movie_id = :movie_id AND album_id = :album_id';
        $statement = $this->pdo->prepare($query);
        $statement->execute([
            'movie_id' => $getId,
            'album_id' => $album_id,
        ]);
        $data = $statement->fetchAll();
        if($data){
            return true;
        }
        return false;
    }


    public function getMoviesFromAlbum($album_id){
        $query = 'SELECT movie_id FROM  films WHERE album_id = :album_id';
        $statement = $this->pdo->prepare($query);
        $statement->execute([
            'album_id' => $album_id,
        ]);
        $id_film = $statement->fetchAll();


        $data = [];
        foreach($id_film as $id){
            $query = 'SELECT * FROM films WHERE id = :id';
            $statement = $this->pdo->prepare($query);
            $statement->execute([
                'id' => $id["movie_id"],
            ]);
            $data[] = $statement->fetchAll();
        }
        return $data;   
    }


    public function removeMovieFromAlbum($movie_id, $album_id){
        $query = 'SELECT id FROM films WHERE movie_id = :movie_id';
        $statement = $this->pdo->prepare($query);
        $statement->execute([
            'movie_id' => $movie_id,
        ]);
        $data = $statement->fetchAll();
        $query = 'DELETE FROM films WHERE movie_id = :movie_id AND album_id = :album_id';
        $statement = $this->pdo->prepare($query);
        $statement->execute([
            'movie_id' => $data[0]['movie_id'],
            'album_id' => $album_id,
        ]);
        return $statement;
    }




    public function verifyMovie($movie_id){
        $query = 'SELECT * FROM films WHERE movie_id = :movie_id';
        $statement = $this->pdo->prepare($query);
        $statement->execute([
            'movie_id' => $movie_id,
        ]);
        $data = $statement->fetchAll();
        if(!$data){
            $addMovie = 'INSERT INTO films (movie_id) VALUES (:movie_id)';
            $statement = $this->pdo->prepare($addMovie);
            $statement->execute([
                'movie_id' => $movie_id,
            ]);
        }
    }








    
//     public function shareAlbum($album_id, $user_id, $invited){
//         $query = 'INSERT INTO invitation (album_id, user_id, invited)
//                 VALUES (:album_id, :user_id, :invited)';
//         $statement = $this->pdo->prepare($query);
//         $statement->execute([
//             'album_id' => $album_id,
//             'user_id' => $user_id,
//             'invited' => $invited,
//         ]);
//     }




//     public function acceptShare($id){
//         $query = 'UPDATE invitation SET is_accepted = 1 WHERE id = :id';
//         $statement = $this->pdo->prepare($query);
//         $statement->execute([
//             'id' => $id,
//         ]);
//     }



//     public function isShared($album_id, $user_id){
//         $query = 'SELECT * FROM invitation WHERE album_id = :album_id AND user_id = :user_id';
//         $statement = $this->pdo->prepare($query);
//         $statement->execute([
//             'album_id' => $album_id,
//             'user_id' => $user_id,
//         ]);
//         $data = $statement->fetchAll();
//         return isset($data[0]);
//     }


//     public function getAlbumShared($user_id){
//         $query = 'SELECT * FROM invitation WHERE user_id = :user_id AND is_accepted = 1';
//         $statement = $this->pdo->prepare($query);
//         $statement->execute([
//             'user_id' => $user_id,
//         ]);
//         return $statement->fetchAll();
//     }
// }


//     public function getSharedAlbums($user_id){
//         $query = 'SELECT * FROM invitation WHERE user_id = :user_id';
//         $statement = $this->pdo->prepare($query);
//         $statement->execute([
//             'user_id' => $user_id,
//         ]);
//         $data = $statement->fetchAll();
//         if($data){
//             $query = 'SELECT * FROM album WHERE id = :id';
//             $statement = $this->pdo->prepare($query);
//             $statement->execute([
//                 'id' => $data[0]['album_id'],
//             ]);
//             return $statement->fetchAll();
//         } else {
//             return [];
//         }
//     }



    


}





