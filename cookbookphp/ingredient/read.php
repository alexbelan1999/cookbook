<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// подключение базы данных и файл, содержащий объекты 
include_once '../config/database.php';
include_once '../objects/ingredient.php';

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// инициализируем объект 
$ingredient = new Ingredient($db);
 
// запрашиваем товары 
$stmt = $ingredient->read();
$num = $stmt->rowCount();

// проверка, найдено ли больше 0 записей 
if ($num>0) {

    // массив товаров 
    $ingredients_arr=array();
    $ingredients_arr["ingredients"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);

        $ingredient_item=array(
            "id" => $id,
            "name" => $name,
            "calorie" => $calorie,
            "protein" => $protein,
            "fat" => $fat,
            "carbohydrates" => $carbohydrates
            );

        array_push($ingredients_arr["ingredients"], $ingredient_item);
    }

    // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($ingredients_arr);
}
else {

    // установим код ответа - 404 Не найдено 
    http_response_code(404);

    // сообщаем пользователю, что товары не найдены 
    echo json_encode(array("message" => "Ингредиенты не найдены."), JSON_UNESCAPED_UNICODE);
}

