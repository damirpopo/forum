import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
    endpoints: (builder) => ({
        //Список категорий
        getCategory: builder.query({
            query() {
                return {
                    url: 'category'
                }
            }
        }),
        //Список тем
        getTheme: builder.query({
            query() {
                return {
                    url: 'theme'
                }
            }
        }),
        //Список комментариев
        getComment: builder.query({
            query() {
                return {
                    url: 'comment'
                }
            }
        }),
        //Создание темы
        postTheme: builder.mutation({
            query({ token, formData }) {
                return {
                    url: 'theme',
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,


                    },
                    body: formData,
                }
            }
        }),
        //тема по id
        getThemeID: builder.query({
            query(id) {
                return {
                    url: `them/${id}`
                }
            }
        }),
        //Создание комментария
        postComment: builder.mutation({
            query({ formData, token }) {
                return {
                    url: 'comment',
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                }
            }
        }),
        //информация о пользователе
        getUser: builder.query({
            query(token) {
                return {
                    url: 'user',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            }
        }),
        //Редактирование комментария
        PatchComment: builder.mutation({
            query({ token, formData, id }) {
                return {
                    url: `comment/${id}`,
                    method: 'PATCH',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                }
            }
        }),
        //Удаление комментария
        removeComment: builder.mutation({
            query({ token, id }) {
                console.log(id);
                return {
                    url: `comment/${id}`,
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            }
        }),
        //Редактирование пользователя
        patchUser: builder.mutation({
            query({ token, formData, id }) {
                return {
                    url: `users/${id}`,
                    method: 'PATCH',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                }
            }
        }),
        //Список пользователей
        getAllUser: builder.query({
            query() {
                return {
                    url: 'users'
                }
            }
        }),
        //Редактирование темы
        patchTheme: builder.mutation({
            query({ token, formData, id }) {
                return {
                    url: `theme/${id}`,
                    method: 'PATCH',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    body: formData,
                }
            }
        }),
        //Удаление темы
        removeTheme: builder.mutation({
            query({ token, id }) {
                return {
                    url: `theme/${id}`,
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            }
        })
    })
})

export const { usePatchThemeMutation, useRemoveThemeMutation, useGetAllUserQuery, usePatchUserMutation, useRemoveCommentMutation, usePatchCommentMutation, useGetUserQuery, usePostCommentMutation, useGetThemeIDQuery, useGetCategoryQuery, useGetThemeQuery, useGetCommentQuery, usePostThemeMutation } = api
export default api