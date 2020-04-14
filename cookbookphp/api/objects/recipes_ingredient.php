<?php
class Recipe_Ingredient
{
    private $conn;
    private $table_name = 'recipes_ingredient';

    public $id;
    public $recipe_id;
    public $ingredient_id;
    public $gram;
    

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // метод read() - получение товаров 
    function read()
    {

        // выбираем все записи 
        $query = "SELECT id, recipe_id, ingredient_id, gram
            FROM " . $this->table_name . " ORDER BY recipe_id";

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);

        // выполняем запрос 
        $stmt->execute();

        return $stmt;
    }
    // метод create - создание товаров 
    function create()
    {

     

        // очистка 
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->recipe_id = htmlspecialchars(strip_tags($this->recipe_id));
        $this->ingredient_id = htmlspecialchars(strip_tags($this->ingredient_id));
        $this->gram = htmlspecialchars(strip_tags($this->gram));
       

        // привязка значений 
           // запрос для вставки (создания) записей 
           $query = "INSERT INTO
           " . $this->table_name . "
          (id, recipe_id, ingredient_id, gram)
          VALUES(". $this->id .",'".$this->recipe_id."',".$this->ingredient_id.",".$this->gram.")";


        // выполняем запрос 
        if ($this->conn->query($query)) {
            return true;
        }

        return false;
    }
    function update()
    {

        // запрос для обновления записи (товара) 
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    recipe_id = ?,
                    ingredient_id = ?,
                    gram = ?
                WHERE
                    id = ?";

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);

        // очистка 
   
        $this->recipe_id = htmlspecialchars(strip_tags($this->recipe_id));
        $this->ingredient_id = htmlspecialchars(strip_tags($this->ingredient_id));
        $this->gram = htmlspecialchars(strip_tags($this->gram));
        $this->id = htmlspecialchars(strip_tags($this->id));


        // привязка значений 
        
        $stmt->bindParam(1, $this->recipe_id);
        $stmt->bindParam(2, $this->ingredient_id);
        $stmt->bindParam(3, $this->gram);
        $stmt->bindParam(4, $this->id);

        // выполняем запрос 
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
    // метод delete - удаление товара 
    function delete($id)
    {

        // запрос для удаления записи (товара)
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ".$id."";

        // подготовка запроса
        $stmt = $this->conn->prepare($query);

        // выполняем запрос 
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
