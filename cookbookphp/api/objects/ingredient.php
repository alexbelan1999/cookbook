<?php
class Ingredient
{
    private $conn;
    private $table_name = 'ingredient';

    public $id;
    public $name;
    public $calorie;
    public $protein;
    public $fat;
    public $carbohydrates;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // метод read() - получение товаров 
    function read()
    {

        // выбираем все записи 
        $query = "SELECT id, name, calorie, protein, fat, carbohydrates
            FROM " . $this->table_name . " ORDER BY id";

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);

        // выполняем запрос 
        $stmt->execute();

        return $stmt;
    }
    // метод create - создание товаров 
    function create()
    {

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->calorie = htmlspecialchars(strip_tags($this->calorie));
        $this->protein = htmlspecialchars(strip_tags($this->protein));
        $this->fat = htmlspecialchars(strip_tags($this->fat));
        $this->carbohydrates = htmlspecialchars(strip_tags($this->carbohydrates));


        // привязка значений 
           // запрос для вставки (создания) записей 
           $query = "INSERT INTO
           " . $this->table_name . "
          (id, name, calorie, protein, fat, carbohydrates)
          VALUES(". $this->id .",'".$this->name."',".$this->calorie.",".$this->protein.",
            ".$this->fat.",". $this->carbohydrates.")";


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
                    name = ?,
                    calorie = ?,
                    protein = ?,
                    fat = ?,
                    carbohydrates= ?
                WHERE
                    id = ?";

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);

        // очистка 
   
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->calorie = htmlspecialchars(strip_tags($this->calorie));
        $this->protein = htmlspecialchars(strip_tags($this->protein));
        $this->fat = htmlspecialchars(strip_tags($this->fat));
        $this->carbohydrates = htmlspecialchars(strip_tags($this->carbohydrates));
        $this->id = htmlspecialchars(strip_tags($this->id));


        // привязка значений 
        
        $stmt->bindParam(1, $this->name);
        $stmt->bindParam(2, $this->calorie);
        $stmt->bindParam(3, $this->protein);
        $stmt->bindParam(4, $this->fat);
        $stmt->bindParam(5, $this->carbohydrates);
        $stmt->bindParam(6, $this->id);

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
