const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.json());

// Пример базы данных пользователей (массив для простоты)
const users = [
  { username: 'user1', password: '$2a$10$XjI7hb9UhBRNzFBFJXsI6evflD.aZ3b4/ZbDZKMR8lTpXP8OFjSW6' }, // пароль: 12345
  { username: 'user2', password: '$2a$10$fT5fGvnMlh3K8B/jA74uNeAdHOiBn5.6GImjYaaflyiU41F0P3XyO' }  // пароль: password
];

// Секретный ключ для подписи JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Логин пользователя
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Ищем пользователя в базе данных
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Неверные имя пользователя или пароль' });
  }

  // Проверяем правильность пароля
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Неверные имя пользователя или пароль' });
  }

  // Генерируем JWT
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Аутентификация успешна', token });
});

// Маршрут, защищенный JWT
app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'Доступ разрешен', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Недействительный токен' });
  }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

