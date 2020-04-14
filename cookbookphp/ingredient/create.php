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
include_once '../objects/ingredient.php';

$database = new Database();
$db = $database->getConnection();

$ingredient = new Ingredient($db);
 
// получаем отправленные данные 
$content = file_get_contents("php://input");

$data = json_decode($content);

//var_dump($data);
//print(gettype($data));

 
// убеждаемся, что данные не пусты 
if ((!empty($data->ingredients->id)) &&
    (!empty($data->ingredients->name)) &&
    (!empty($data->ingredients->calorie)) &&
    (!empty($data->ingredients->protein)) &&
    (!empty($data->ingredients->fat)) &&
    (!empty($data->ingredients->carbohydrates))
) {

    // устанавливаем значения свойств товара 
    $ingredient->id = $data->ingredients->id;
    $ingredient->name = $data->ingredients->name;
    $ingredient->calorie = $data->ingredients->calorie;
    $ingredient->protein = $data->ingredients->protein;
    $ingredient->fat = $data->ingredients->fat;
    $ingredient->carbohydrates =$data->ingredients->carbohydrates;

    // создание товара 
    if($ingredient->create()){

        // установим код ответа - 201 создано 
        http_response_code(201);

        // сообщим пользователю 
        echo json_encode(array("message" => "Ингредиент был создан."), JSON_UNESCAPED_UNICODE);
    }

    // если не удается создать товар, сообщим пользователю 
    else {

        // установим код ответа - 503 сервис недоступен 
        http_response_code(503);

        // сообщим пользователю 
        echo json_encode(array("message" => "Невозможно создать ингредиент."), JSON_UNESCAPED_UNICODE);
    }
}

// сообщим пользователю что данные неполные 
else {

    // установим код ответа - 400 неверный запрос 
    http_response_code(400);

    // сообщим пользователю 
    echo json_encode(array("message" => "Невозможно создать ингредиент. Данные неполные."), JSON_UNESCAPED_UNICODE);
}
?>