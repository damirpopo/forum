# Forum Project

## Используемые библиотеки:
- React.js
- React Router
- Redux Toolkit

## Управление состояниями
Для управления состояниями используются React Hooks и Redux Toolkit.

## Взаимодействие с бэкендом
Взаимодействие с бэкендом происходит с использованием API (RTK Query, Fetch async/await).

## Установка проекта
```
git clone https://github.com/damirpopo/forum.git
```
## Для запуска проекта надо запустить бек и фронт.
### Запуск backend:
Переходим в раздел forumBack и вводим следующие комманды:
  1.	виртуальное окружение:
может потребоватся удоление старого и создание нового
```
python -m venv venv
```
```
venv/Scripts/activate   
```
  2. Установка модулей:
```
pip install djangorestframework
```
```
pip install django-cors-headers
```
```
python -m pip install Pillow
```
  3.	В разделе forumBack заходим в раздел forum
```
     cd .\forum\
```
  и запускаем сервер
```
     pythom manage.py runserver
```
### Запуск frontend:

Переходим в раздел forumFront
### Вводим следующие команды:

```
cd app
```
```
npm install react-scripts --save
```
```
npm start
```
## Описание функционала - https://docs.google.com/document/d/1J-1aCBdd2xj2I6RI81upGWMNAX0B2sIWZNfuhALvsRo/edit?usp=sharing
