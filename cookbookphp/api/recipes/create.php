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
include_once '../objects/recipes.php';

$database = new Database();
$db = $database->getConnection();

$recipe = new Recipe($db);
 
// получаем отправленные данные 
$content = file_get_contents("php://input");

$data = json_decode($content);

//var_dump($data);
//print(gettype($data));

 
// убеждаемся, что данные не пусты 
if ((!empty($data->recipes->id)) &&
    (!empty($data->recipes->name)) &&
    (!empty($data->recipes->recipe)) 
) {

    // устанавливаем значения свойств товара 
    $recipe->id = $data->recipes->id;
    $recipe->name = $data->recipes->name;
    $recipe->recipe = $data->recipes->recipe;
    

    // создание товара 
    if($recipe->create()){

        // установим код ответа - 201 создано 
        http_response_code(201);

        // сообщим пользователю 
        echo json_encode(array("message" => "Рецепт был создан."), JSON_UNESCAPED_UNICODE);
    }

    // если не удается создать товар, сообщим пользователю 
    else {

        // установим код ответа - 503 сервис недоступен 
        http_response_code(503);

        // сообщим пользователю 
        echo json_encode(array("message" => "Невозможно создать рецепт."), JSON_UNESCAPED_UNICODE);
    }
}

// сообщим пользователю что данные неполные 
else {

    // установим код ответа - 400 неверный запрос 
    http_response_code(400);

    // сообщим пользователю 
    echo json_encode(array("message" => "Невозможно создать рецепт. Данные неполные."), JSON_UNESCAPED_UNICODE);
}
?>