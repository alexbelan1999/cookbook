<?php
// показывать сообщения об ошибках 
ini_set('display_errors', 1);
error_reporting(E_ALL);

// URL домашней страницы 
$home_url="http://localhost/cookbookphp/api/";

// страница указана в параметре URL, страница по умолчанию одна 
$page = isset($_GET['page']) ? $_GET['page'] : 1;

?>