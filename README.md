# Practice Library (Nest.js Backend)

## Опис проєкту
Цей проєкт є backend частиною онлайн бібліотеки, реалізованої на Nest.js.  
Система дозволяє керувати книгами через REST API (створення, перегляд, оновлення та видалення).

---

## Технології
- Node.js
- Nest.js
- TypeScript
- class-validator
- class-transformer

---

## Функціонал
- Повний CRUD для сутності Book
- Валідація вхідних даних
- Обробка помилок (400, 404)
- Використання HTTP статусів (200, 201)

---

## API Endpoints

- GET /books — отримати всі книги  
- GET /books/:id — отримати книгу за ID  
- POST /books — створити книгу  
- PUT /books/:id — оновити книгу  
- DELETE /books/:id — видалити книгу  

---

## Приклад JSON (створення книги)
```json
{
  "title": "Dune",
  "description": "Sci-fi book",
  "price": 300
}
