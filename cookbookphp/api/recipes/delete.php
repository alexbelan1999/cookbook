<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');



// подключим файл для соединения с базой и объектом Product
include_once '../config/database.php';
include_once '../objects/recipes.php';

// получаем соединение с БД
$database = new Database();
$db = $database->getConnection();

// подготовка объекта
$recipe = new Recipe($db);

// получаем id товара
$data = json_decode(file_get_contents("php://input"));

// установим id товара для удаления
$id = isset($_GET['id']) ? $_GET['id'] : die();

// удаление товара
if ($recipe->delete($id)) {

    // код ответа - 200 ok
    http_response_code(204);

    // сообщение пользователю
    echo json_encode(array("message" => "Рецепт был удалён."), JSON_UNESCAPED_UNICODE);
}

// если не удается удалить товар
else {

    // код ответа - 503 Сервис не доступен
    http_response_code(503);

    // сообщим об этом пользователю
    echo json_encode(array("message" => "Не удалось удалить рецепт."));
}
?>