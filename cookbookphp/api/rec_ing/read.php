<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// подключение базы данных и файл, содержащий объекты 
include_once '../config/database.php';
include_once '../objects/recipes_ingredient.php';

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// инициализируем объект 
$object = new Recipe_Ingredient($db);
 
// запрашиваем товары 
$stmt = $object->read();
$num = $stmt->rowCount();

// проверка, найдено ли больше 0 записей 
if ($num>0) {

    // массив товаров 
    $objects_arr=array();
    $objects_arr["recipes_ingredient"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);

        $object_item=array(
            "id" => $id,
            "recipe_id" => $recipe_id,
            "ingredient_id" => $ingredient_id,
            "gram" => $gram
            );

        array_push($objects_arr["recipes_ingredient"], $object_item);
    }

    // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($objects_arr);
}
else {

    // установим код ответа - 404 Не найдено 
    http_response_code(404);

    // сообщаем пользователю, что товары не найдены 
    echo json_encode(array("message" => "Граммы не найдены."), JSON_UNESCAPED_UNICODE);
}

