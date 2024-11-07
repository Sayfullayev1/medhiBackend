const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Загружаем переменные окружения из .env файла

const app = express();

app.use(cors());
app.use(express.json());



// const tok = jwt.sign({ username: 'user1' }, process.env.JWT_SECRET);

// console.log(tok);



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
app.get('/schedule/B24T01', authenticateToken, (req, res) => {
  const data = {

    groupName: 'Б24-Т03 (141)  13',

    schedule: [
        {
            dayOfTheWeek: "Понедельник",
            data: "04.11.2024",
            lessons: [
                {
                    lessonTime: '9:00-10:20',
                    lessonTitle: 'Иностранный язык (английский)',
                    teachersName: 'Рахимова С.Д.',
                    rumNumber: '220',
                },
                {
                    lessonTime: '10:30-11:50',
                    lessonTitle: 'Иностранный язык (английский)',
                    teachersName: 'Рахимова С.Д.',
                    rumNumber: '220',
                },
                {
                    lessonTime: '12:40-14:00',
                    lessonTitle: 'Общая физика (механика) (лаб.раб.)',
                    teachersName: 'Шовдирова С.Л.',
                    rumNumber: '234',
                },
                {
                    lessonTime: '14:10-15:30',
                    lessonTitle: 'Общая физика (механика) (лаб.раб.)',
                    teachersName: 'Шовдирова С.Л.',
                    rumNumber: '234',
                },
            ],
        },
        {
            dayOfTheWeek: "Вторник",
            data: "05.11.2024",
            lessons: [
                {
                    lessonTime: '9:00-10:20',
                    lessonTitle: 'Maтематический анализ (лекция)',
                    teachersName: 'Рахматуллаев А.М.',
                    rumNumber: '208',
                },
                {
                    lessonTime: '10:30-11:50',
                    lessonTitle: 'Математический анализ (пр)',
                    teachersName: 'Рахматуллаев А.М.',
                    rumNumber: '325',
                },
                {
                    lessonTime: '12:40-14:00',
                    lessonTitle: 'Иностранный язык (русский)',
                    teachersName: 'Тошматова Т.Т',
                    rumNumber: '207',
                },
                {
                    lessonTime: '14:10-15:30',
                    lessonTitle: 'Физическая культура',
                    teachersName: ' Сияев С.',
                    rumNumber: 'спзал',
                },
            ],
        },
        {
            dayOfTheWeek: "Среда",
            data: "06.11.2024",
            lessons: [
                {
                    lessonTime: '9:00-10:20',
                    lessonTitle: 'Аналитическая геометрия (лекция)',
                    teachersName: 'Шарипов А.С.',
                    rumNumber: '206',
                },
                {
                    lessonTime: '10:30-11:50',
                    lessonTitle: 'Информатика',
                    teachersName: ' Егамбердиев Б.Б.',
                    rumNumber: '210',
                },
                {
                    lessonTime: '12:40-14:00',
                    lessonTitle: 'Аналитическая геом. (практика)',
                    teachersName: 'Шарипов А.С.',
                    rumNumber: '206',
                },
                {
                    lessonTime: '14:10-15:30',
                    lessonTitle: 'Иностранный язык (английский)',
                    teachersName: 'Рахимова С.Д.',
                    rumNumber: '220',
                },
            ],
        },
        {
            dayOfTheWeek: "Четверг",
            data: "07.11.2024",
            lessons: [
                {
                    lessonTime: '9:00-10:20',
                    lessonTitle: '',
                    teachersName: '',
                    rumNumber: '',
                },
                {
                    lessonTime: '10:30-11:50',
                    lessonTitle: 'Общая физика (механика) (лек)',
                    teachersName: 'Пяк П.Э.',
                    rumNumber: '208',
                },
                {
                    lessonTime: '12:40-14:00',
                    lessonTitle: 'Общая физика (механика) (практика)',
                    teachersName: 'Пяк П.Э.',
                    rumNumber: '202',
                },
                {
                    lessonTime: '14:10-15:30',
                    lessonTitle: 'Физическая культура',
                    teachersName: 'Сияев С.',
                    rumNumber: 'спзал',
                },
            ],
        },
        {
            dayOfTheWeek: "Пятница",
            data: "08.11.2024",
            lessons: [
                {
                    lessonTime: '9:00-10:20',
                    lessonTitle: 'Математический анализ (лекция)',
                    teachersName: 'Рахматуллаев А.М.',
                    rumNumber: '102',
                },
                {
                    lessonTime: '10:30-11:50',
                    lessonTitle: 'Химия (лек) за 30.09.2024',
                    teachersName: 'Мухтаров О.П.',
                    rumNumber: '104',
                },
                {
                    lessonTime: '12:40-14:00',
                    lessonTitle: 'Урок духовности и просвещения',
                    teachersName: 'Юлдашева Ш.С.',
                    rumNumber: '102',
                },
                {
                    lessonTime: '14:10-15:30',
                    lessonTitle: 'Математический анализ (лекция)',
                    teachersName: 'Рахматуллаев А.М.',
                    rumNumber: '214',
                },
            ],
        },
        {
            dayOfTheWeek: "Субота",
            data: "09.11.2024",
            lessons: [
                {
                    lessonTime: '9:00-10:20',
                    lessonTitle: 'История России (практика)',
                    teachersName: 'Алимджанов Б.А.',
                    rumNumber: '214',
                },
                {
                    lessonTime: '10:30-11:50',
                    lessonTitle: 'Иностранный язык (русский)',
                    teachersName: 'Тошматова Т.Т.',
                    rumNumber: '207',
                },
                {
                    lessonTime: '12:40-14:00',
                    lessonTitle: 'Общая физика (механика) (практика)',
                    teachersName: 'Пяк П.Э.',
                    rumNumber: '325',
                },
                {
                    lessonTime: '14:10-15:30',
                    lessonTitle: 'Химия (лаб.раб.)',
                    teachersName: 'Аширматова Н.',
                    rumNumber: '119',
                },
            ],
        },

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

