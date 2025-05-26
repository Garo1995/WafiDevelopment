<?php
// Подключение PHPMailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных из формы
$name = $_POST['name'] ?? '';
$tel = $_POST['tel'] ?? '';
$text = $_POST['text'] ?? '';

// Заголовки для письма
$nameT = '<b>Имя:</b>';
$telT = '<b>Телефон:</b>';
$textT = '<b>Комментарий:</b>';

// Составляем тело письма
$body = "
    $nameT $name<br>
    $telT $tel<br>
    $textT $text<br>
";

// Заголовок письма
$title = 'Новая заявка с сайта';

// Настройка PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->Encoding = 'base64';
    $mail->SMTPAuth = true;

    // SMTP настройки
    $mail->Host = 'smtp.yandex.ru';
    $mail->Username = 'hovhannisyans2021@yandex.com';
    $mail->Password = 'vlmmcjpygmpwxshv';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom('hovhannisyans2021@yandex.com', 'New Mail');

    // Кому отправляем
    $mail->addAddress('brokers@afid.ru');

    // Отправка письма
    $mail->isHTML(true);
    $mail->Subject = '=?UTF-8?B?' . base64_encode($title) . '?=';
    $mail->Body = $body;

    // Результат
    if ($mail->send()) {
        $result = "success";
    } else {
        $result = "error";
    }

} catch (Exception $e) {
    $result = "error";
    $status = "Ошибка при отправке письма: {$mail->ErrorInfo}";
}

// Возвращаем результат в JS
echo json_encode(["result" => $result]);
?>
