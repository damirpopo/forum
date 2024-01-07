import { createSlice } from '@reduxjs/toolkit'
import avatar from '../static/img/79e584272cf8bc7eed3de9a9427ccaaae38c0af9_full.jpg' // стандартное фото профиля

const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState:{
        auth: JSON.parse(localStorage.getItem('auth')),
        token: JSON.parse(localStorage.getItem('token')),
        avatar: avatar,
        style: JSON.parse(localStorage.getItem('style'))
    },
    reducers:{
        //Аутентификация пользователя
        auth(state,action){
            state.auth = true;
            state.token = action.payload;
        },
        //Выход пользователя
        logoutRed(state){
            state.auth = false;
            state.token = null;
        },
        //Смена стиля(све/тём)
        styleChange(state){
            state.style = !state.style
        }
    }
})

export default toolkitSlice.reducer
export const {auth, logoutRed, styleChange} =toolkitSlice.actions