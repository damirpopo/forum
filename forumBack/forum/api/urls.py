from django.urls import path
from .views import *


urlpatterns = [
    path('login', loginView),
    path('signup', signupView),
    path('logout', logoutView),
    path('category', listCategory, name='Список категорий'),
    path('categorys', addCategory, name='Добваление новой катигории, метод POST'),
    path('categorys/<int:pk>', detailCategory, name='Управления категориями, методы "GET","PATCH","DELETE"'),
    path('theme', listAndPostTheme, name='Список тем и добавление новых для авторизованых пользователей, методы "GET","POST"'),
    path('themes', userGetTheme, name='Список тем пользователя'),
    path('them/<int:pk>', getPkTheme, name='тема по id'),
    path('theme/<int:pk>', detailTheme, name='Управления темами для пользователя, методы "GET","PUT","PATCH","DELETE"'),
    path('themes/<int:pk>', adminDetailTheme,name='Управления темами для админа, методы "PUT","PATCH","DELETE"'),
    path('comment', listAndPostComment, name='Список комментариев и добавление новых для авторизованых пользователей, методы "GET","POST"'),
    path('comments', userGetCommetn, name='Список комментариев пользователя'),
    path('comment/<int:pk>', detailComment,name='Управления комментариями для пользователя, методы "GET","PUT","PATCH","DELETE"'),
    path('comments/<int:pk>', adminDetailComment,name='Управления комментариями для админа, методы "PUT","PATCH","DELETE"'),
    path('user', getUser, name='получает информацию о пользователе'),
    path('users/<int:pk>',patchUser,name='Изменение профиля, метод "PATCH"'),
    path('users',getAllUser,name='Список пользователей')
]
