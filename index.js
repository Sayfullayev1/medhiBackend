const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Загружаем переменные окружения из .env файла

const app = express();

app.use(cors());
app.use(express.json());

// Middleware для проверки токена
const authenticateToken = ((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Извлекаем токен из заголовка

  if (!token) return res.sendStatus(401); // Если токена нет, возвращаем 401

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Если токен невалиден, возвращаем 403
    req.user = user; // Сохраняем информацию о пользователе в запросе
    next(); // Переходим к следующему middleware или обработчику
  });
});

// Пример маршрута для получения токена
app.post('/api/login', (req, res) => {
  // Здесь должна быть логика проверки пользователя
  const username = req.body.username; // Получаем имя пользователя из тела запроса

  // Создаем токен с помощью jwt.sign
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token }); // Возвращаем токен клиенту
});

// Пример защищенного маршрута для получения данных
app.get('/api/data', authenticateToken, (req, res) => {
  const data = {
    message: 'Данные успешно получены',
    users: [
      { username: 'user111', age: 25 },
      { username: 'user2', age: 30 },
    ],
  };
  res.json(data); // Отправляем данные обратно клиенту
});

// Запускаем сервер
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
