<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Заказ</title>
</head>
<body>
    <h1>Заказ № {{ $id }}</h1>

    <p><strong>Ваш заказ:</strong></p>

    <table>
        <thead>
        <tr>
            <th>Наименование</th>
            <th>Цена, ₽</th>
            <th>Кол-во</th>
            <th>Сумма, ₽</th>
        </tr>
        </thead>
        <tbody>
        @foreach($products as $product)
        <tr>
            <td>{{ $product->title }}</td>
            <td>{{ $product->price }}</td>
            <td>{{ $product->quantity }}</td>
            <td>{{ $product->price * $product->quantity }}</td>
        </tr>
        @endforeach
        </tbody>
        <tfoot>
        <tr>
            <td colspan="3">Итого к оплате:</td>
            <td>{{ $total }}</td>
        </tr>
        </tfoot>
    </table>

</body>
</html>
