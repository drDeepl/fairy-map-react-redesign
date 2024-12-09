# Сохранение культурного наследия России

## Структура проекта

```
/my-react-app
│
├── /public
│   ├── index.html
│   └── favicon.ico
│
├── /src
│   ├── /api         // Работа с API
│   │   ├── apiClient.ts       // Настройка и конфигурация axios
│   │
│   ├── /app         // Конфигурация приложения
│   │   ├── store.ts          // Настройка store Redux с помощью configureStore
│   │   └── rootReducer.ts    // Корневой редьюсер или соединентие с redux toolkit
│   │
│   ├── /components  // Компоненты
│   ├── /commons  // общие файлие такие как константы и т.п
│   │
│   ├── /features    // отдельные функциональности
│   │   ├── /auth                 // Feature для пользователя
│   │   │   ├── schemas           // Схемы для валидации форм
│   │   │   ├── authSlice.ts        // Создание slice для пользователя
│   │   │   └── UserComponent.tsx  // Компонент, связанный с пользователем
│   │   └── ...                    // Другие features
│   │
│   ├── /hooks       // Кастомные хуки
│   │   ├── useAppDispatch.ts // Хук для использования диспетчера из redux
│   │   ├── useAppSelector.ts // Хук для использования селектора из redux
│   │   └── ...
│   │
│   ├── /pages       // Общие Страницы приложения
│   │
│   ├── /assets       // Стили общего использования
│   │   ├── img      // изображения
│   │   ├── style   // стили
│   │   └── ...
│   │
│   ├── App.tsx       // Основной компонент приложения
│   ├── index.tsx     // Входной файл приложения
│   ├── Dockerfile     // файл для развертывания в docker

```

## Запуск приложения

```
docker build -t fairy-map-frontend .
```

```
docker run -p 80:80 fairy-map-frontend
```
