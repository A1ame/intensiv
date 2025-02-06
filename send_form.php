<?php
// Проверяем, была ли отправлена форма
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = htmlspecialchars(trim($_POST['name'])); // Имя
    $phone = htmlspecialchars(trim($_POST['phone'])); // Телефон
    $link = htmlspecialchars(trim($_POST['link'])); // Ссылка на магазин
    $comment = htmlspecialchars(trim($_POST['comment'])); // Комментарий

    // Email получателя
    $to = "sobachka1236@gmail.com"; // Замените на ваш email

    // Тема письма
    $subject = "Новая заявка с сайта";

    // Тело письма
    $message = "
        <html>
        <head>
            <title>Новая заявка</title>
        </head>
        <body>
            <h3>Поступила новая заявка:</h3>
            <p><strong>Имя:</strong> $name</p>
            <p><strong>Телефон:</strong> $phone</p>
            <p><strong>Ссылка на магазин:</strong> " . ($link ? "<a href='$link'>$link</a>" : "Не указано") . "</p>
            <p><strong>Комментарий:</strong> " . ($comment ? "$comment" : "Не указано") . "</p>
        </body>
        </html>
    ";

    // Заголовки письма
    $headers = "From: Новая заявка <no-reply@example.com>\r\n"; // Отправитель
    $headers .= "Reply-To: $email\r\n"; // Адрес для ответа
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n"; // Кодировка и формат HTML

    // Отправляем письмо
    if (mail($to, $subject, $message, $headers)) {
        // Если письмо успешно отправлено
        echo json_encode(['success' => true, 'message' => 'Заявка успешно отправлена!']);
    } else {
        // Если произошла ошибка
        echo json_encode(['success' => false, 'message' => 'Произошла ошибка при отправке заявки.']);
    }
}
?>