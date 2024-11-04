const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Загружаем переменные окружения из .env файла

const app = express();

app.use(cors());
app.use(express.json());



console.log("",);



// Middleware для проверки токена
const authenticateToken = ((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Извлекаем токен из заголовка

  console.log("Извлечённый токен:", req.headers['authorization']?.split(' ')[1]);

  console.log(process.env.JWT_SECRET);
  

  if (!token) return res.sendStatus(401); // Если токена нет, возвращаем 401

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Ошибка верификации токена:", err);
      return res.status(403).json({ message: 'Невалидный токен' });
    }

    // console.log(err, user);
    
    req.user = user; // Сохраняем информацию о пользователе в запросе
    next(); // Переходим к следующему middleware или обработчику
  });

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
const PORT = 3068;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});



// const express = require('express');
// const cors = require('cors'); // Импортируем CORS
// const app = express();

// app.use(cors()); // Разрешаем CORS
// app.use(express.json()); // Позволяет серверу обрабатывать JSON-тело запросов

// // Пример маршрута для получения данных
// app.get('/api/data', (req, res) => {
//   const data = {
//     message: 'Данные успешно получены',
//     users: [
//       { username: 'user111', age: 25 },
//       { username: 'user2', age: 30 },
//     ],
//   };  
//   res.json(data); // Отправляем данные обратно клиенту
// });

// // Запускаем серверcd
// const PORT = 3002;
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });

