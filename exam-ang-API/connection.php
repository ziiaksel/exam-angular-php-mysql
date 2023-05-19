<?php

class Connection {

    public function getConnection(){
     try {
           $host = "localhost";  
           $db = "exam-ang";       
           $user = "root";        
           $password = "";       
           $db = new PDO("mysql:host=$host;port=3307;dbname=$db;",$user, $password);
           return $db;

         }catch(PDOException $e){
           
            echo "¡Error!: " . $e->getMessage() . "<br/>";
            die(); 
         }
       
  }

}
?>
