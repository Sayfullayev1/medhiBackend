
const express = require('express');
const cors = require('cors'); // Импортируем CORS
const app = express();

app.use(cors()); // Разрешаем CORS
app.use(express.json()); // Позволяет серверу обрабатывать JSON-тело запросов

// Пример маршрута для получения данных
app.get('/api/data', (req, res) => {
  const data = {
    message: 'Данные успешно получены',
    users: [
      { username: 'user111', age: 25 },
      { username: 'user2', age: 30 },
    ],
  };
  res.json(data); // Отправляем данные обратно клиенту
});

// Запускаем серверcd
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
