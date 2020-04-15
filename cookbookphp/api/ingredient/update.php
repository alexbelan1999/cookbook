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

// подключаем файл для работы с БД и объектом Product 
include_once '../config/database.php';
include_once '../objects/ingredient.php';

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// подготовка объекта 
$ingredient = new Ingredient($db);

// получаем id товара для редактирования 
$data = json_decode(file_get_contents("php://input"));

// установим id свойства товара для редактирования 
$ingredient->id = $data->ingredients->id;

// установим значения свойств товара 
$ingredient->name = $data->ingredients->name;
$ingredient->calorie = $data->ingredients->calorie;
$ingredient->protein = $data->ingredients->protein;
$ingredient->fat = $data->ingredients->fat;
$ingredient->carbohydrates = $data->ingredients->carbohydrates;


// обновление товара 
if ($ingredient->update()) {

    // установим код ответа - 200 ok 
    http_response_code(200);

    // сообщим пользователю 
    echo json_encode(array("message" => "Ингредиент был обновлён."), JSON_UNESCAPED_UNICODE);
}

// если не удается обновить товар, сообщим пользователю 
else {

    // код ответа - 503 Сервис не доступен 
    http_response_code(503);

    // сообщение пользователю 
    echo json_encode(array("message" => "Невозможно обновить ингредиент."), JSON_UNESCAPED_UNICODE);
}
