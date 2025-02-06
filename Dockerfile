# Укажите базовый образ
FROM node:18-alpine AS build

# Установите рабочую директорию
WORKDIR /app

# Копируйте package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Установите зависимости
RUN npm install

RUN npm install @rollup/rollup-linux-x64-gnu

# Скопируйте исходный код в контейнер
COPY . .

# Запустите сборку приложения
RUN npm run build


# Укажите базовый образ для production
FROM nginx:stable-alpine

# Удалите стандартный конфигурационный файл Nginx
RUN rm -rf /etc/nginx/conf.d

# Скопируйте наш конфигурационный файл
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируйте собранное приложение в директорию Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Необходимо открыть порт, чтобы Nginx мог обслуживать приложение
EXPOSE 5173

# Запустите Nginx в режиме Foreground
CMD ["nginx", "-g", "daemon off;"]
