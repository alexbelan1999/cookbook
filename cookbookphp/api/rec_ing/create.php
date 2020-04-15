<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header("HTTP/1.1 200 OK");
die();
}

// получаем соединение с базой данных 
include_once '../config/database.php';

// создание объекта товара 
include_once '../objects/recipes_ingredient.php';

$database = new Database();
$db = $database->getConnection();

$object = new Recipe_Ingredient($db);
 
// получаем отправленные данные 
$content = file_get_contents("php://input");

$data = json_decode($content);

//var_dump($data);
//print(gettype($data));

 
// убеждаемся, что данные не пусты 
if ((!empty($data->recipes_ingredient->id)) &&
    (!empty($data->recipes_ingredient->recipe_id)) &&
    (!empty($data->recipes_ingredient->ingredient_id)) &&
    (!empty($data->recipes_ingredient->gram)) 
) {

    // устанавливаем значения свойств товара 
    $object->id = $data->recipes_ingredient->id;
    $object->recipe_id = $data->recipes_ingredient->recipe_id;
    $object->ingredient_id = $data->recipes_ingredient->ingredient_id;
    $object->gram = $data->recipes_ingredient->gram;

    // создание товара 
    if($object->create()){

        // установим код ответа - 201 создано 
        http_response_code(201);

        // сообщим пользователю 
        echo json_encode(array("message" => "Новый объект был создан."), JSON_UNESCAPED_UNICODE);
    }

    // если не удается создать товар, сообщим пользователю 
    else {

        // установим код ответа - 503 сервис недоступен 
        http_response_code(503);

        // сообщим пользователю 
        echo json_encode(array("message" => "Невозможно создать объект."), JSON_UNESCAPED_UNICODE);
    }
}

// сообщим пользователю что данные неполные 
else {

    // установим код ответа - 400 неверный запрос 
    http_response_code(400);

    // сообщим пользователю 
    echo json_encode(array("message" => "Невозможно создать объект. Данные неполные."), JSON_UNESCAPED_UNICODE);
}
?>