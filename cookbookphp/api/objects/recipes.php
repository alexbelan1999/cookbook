<?php
class Recipe
{
    private $conn;
    private $table_name = 'recipes';

    public $id;
    public $name;
    public $recipes;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // метод read() - получение товаров 
    function read()
    {

        // выбираем все записи 
        $query = "SELECT id, name, recipe
            FROM " . $this->table_name . " ORDER BY id";

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);

        // выполняем запрос 
        $stmt->execute();

        return $stmt;
    }
    function read_id()
    {

        // выбираем все записи
        $query = "SELECT id, name, recipe
            FROM " . $this->table_name . " WHERE id=?";
        $stmt = $this->conn->prepare($query);
        // подготовка запроса


        $stmt->bindParam(1, $this->id);

        // выполняем запрос
        $stmt->execute();

        return $stmt;
    }
    // метод create - создание товаров
    function create()
    {



        // очистка
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->recipe = htmlspecialchars(strip_tags($this->recipe));



        // привязка значений
        // запрос для вставки (создания) записей
        $query = "INSERT INTO
           " . $this->table_name . "
          (id, name, recipe)
          VALUES(" . $this->id . ",'" . $this->name . "','" . $this->recipe . "')";



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
                    recipe = ?
                WHERE
                    id = ?";

        // подготовка запроса
        $stmt = $this->conn->prepare($query);

        // очистка

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->recipe = htmlspecialchars(strip_tags($this->recipe));
        $this->id = htmlspecialchars(strip_tags($this->id));


        // привязка значений

        $stmt->bindParam(1, $this->name);
        $stmt->bindParam(2, $this->recipe);
        $stmt->bindParam(3, $this->id);

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
