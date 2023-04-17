## NextJS Starter

Стартовый шаблон для быстрого создания проектов на Next.js

## CI / CD
- **NODEJS:** ```>= 18```
- **NPM:** ```>= 9```
- **Port:** ```3000```
- **Healthcheck:** ```/api/health```

### Последовательность команд:
- `npm pkg delete scripts.prepare`
- `npm ci --slient`
- `npm run build`
- `npm run prod`

## Документация
- [ENV переменные](docs/env.md)
- [Базовая настройка](docs/settings.md)
- [Структура проекта](https://docs.w6p.ru/frontend/nextjs-starter/project-structure)
- [Работа с API](https://docs.w6p.ru/frontend/nextjs-starter/api)
- [Стандарт React & TS](https://docs.w6p.ru/frontend/nextjs-starter/react-typescript)
- [Error boundaries](https://docs.w6p.ru/frontend/nextjs-starter/boundaries)
- [Mocks](https://docs.w6p.ru/frontend/nextjs-starter/mocks)
- [React-query](https://docs.w6p.ru/frontend/nextjs-starter/queries)
- [Настройка Sentry](https://docs.w6p.ru/frontend/nextjs-starter/sentry)
- [Настройка кастомного прокси сервера](https://docs.w6p.ru/frontend/nextjs-starter/custom-proxy)
- [Дизайн токены](https://docs.w6p.ru/frontend/nextjs-starter/figma-tokens)

## NPM Scripts
- Установка модулей:  ```npm ci``` 
- Запуск билда: ```npm run build```
- Запуск dev сборки: ```npm run dev```
- Запуск прод сборки: ```npm run prod``` 
- Анализ билда: ```npm run analyze```
- Запуск storybook: ```npm run storybook```
- Билд storybook: ```npm run build-storybook```
- Билд токенов: ```npm run build-tokens```
- Автогенерация API: ```npm run api-codegen```
- Проверка TS: ```npm run type-check```
- Проверка eslint: ```npm run lint```
- Проверка prettier: ```npm run format``` 
- Проверка всего в параллельном режиме: ```npm run check-all```

## Features
- Typescript
- Sass
- Mobx
- ESLint
- Prettier
- Husky
- Commitizen
- Lint-staged
- Absolute Imports
- Storybook
- Sentry
- Bundle analyzer
- React Query
- API Codegen
- Mock Service Worker
- Figma tokens
- Security headers

## Packages
- [axios](https://axios-http.com/ru/docs/intro)
- [lodash](https://lodash.com/docs)
- [react-use](https://github.com/streamich/react-use#readme)
- [next-seo](https://www.npmjs.com/package/next-seo)
- [dompurify](https://www.npmjs.com/package/dompurify)
- [modern-normalize](https://www.npmjs.com/package/modern-normalize)
- [nanoid](https://www.npmjs.com/package/nanoid)
- [clsx](https://www.npmjs.com/package/clsx)
