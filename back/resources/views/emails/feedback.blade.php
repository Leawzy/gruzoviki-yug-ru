<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обратная связь</title>
</head>
<body>
    <h1>Обратная связь</h1>
    <p><strong>ФИО:</strong> {{ $name }}</p>
    <p><strong>Почта:</strong> {{ $email }}</p>
    <p><strong>Номер телефона:</strong> {{ $phoneNumber }}</p>
    <p><strong>Категория вопроса:</strong> {{ $questionCategory }}</p>
    <p><strong>Сообщение:</strong></p>
    <p>{{ $msg }}</p>
</body>
</html>
