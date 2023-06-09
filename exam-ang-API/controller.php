<?php

class Controller{

  public function getProducts(){
   try{
        $list = array();
        $Connection = new Connection();
        $db = $Connection->getConnection();
        $query = "SELECT * FROM product ORDER BY name";
        $statement = $db->prepare($query);
        $statement->execute();
        while($row = $statement->fetch()) {
           $list[] = array(
                 "id" => $row['id'],
                 "name" => $row['name'],
                 "price" => $row['price'],
                 "description" => $row['description'] );
        }//fin del ciclo while 

        return $list;

      }catch(PDOException $e){
        echo "¡Error!: " . $e->getMessage() . "<br/>";
      }
  }


public function addProduct($data){
  try{
      $name = $data['name'];
      $price = $data['price'];
      $description = $data['description'];
      $Connection = new Connection();
      $db = $Connection->getConnection();
      $query = "INSERT INTO product (name, price, description) VALUES (:name,:price,:description)";
      $statement = $db->prepare($query);
      $statement->bindParam(":name", $name);
      $statement->bindParam(":price", $price);
      $statement->bindParam(":description", $description);
      $result = $statement->execute();
      if($result){
         return "successfully";
      }
       return "error!";

     } catch (PDOException $e) {
      echo "¡Error!: " . $e->getMessage() . "<br/>";
   }
}



public function deleteProduct($data){
  try {
       $id = $data['id'];
       $Connection = new Connection();
       $db = $Connection->getConnection();
       $query = "DELETE FROM product WHERE id=:id";
       $statement = $db->prepare($query);
       $statement->bindParam(':id', $id);
       $result = $statement->execute();
       if($result){
         return "removed";
       }
       return "error!";      

      } catch (PDOException $e) {
          echo "¡Error!: " . $e->getMessage() . "<br/>";
  }
  
}

public function getProduct($data){
    $id = $data['id'];
    $list = array();
    $Connection = new Connection();
    $db = $Connection->getConnection();
    $query = "SELECT * FROM product WHERE id=:id";
    $statement = $db->prepare($query);
    $statement->bindParam(':id', $id); 
    $statement->execute();
    while($row = $statement->fetch()) {
          $list[] = array(
            "id" => $row['id'],
            "name" => $row['name'],
            "price" => $row['price'],
            "description" => $row['description'] );
          }//fin del ciclo while 

    return $list[0];
  }


public function updateProduct($data){
 try{
    $id = $data['id'];
    $name = $data['name'];
    $price = $data['price'];
    $description = $data['description'];
    $Connection = new Connection();
    $db = $Connection->getConnection();
    $query="UPDATE product SET name=:n,price=:p,description=:q
            WHERE id=:id";
    $statement= $db->prepare($query);
    $statement->bindParam(":n", $name);
    $statement->bindParam(":p", $price);
    $statement->bindParam(":q", $description);
    $statement->bindParam(":id", $id); 
    $result = $statement->execute();
    if($result){ return "updated"; } 

      return "error!";

   } catch(PDOException $e){
     echo "¡Error!: " . $e->getMessage() . "<br/>";
   }
}


}

?>