import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetThemeQuery } from '../reduxtoolkit/api';

function Back() {
const navigate = useNavigate()
const {style} = useSelector(state=>state.toolkit)
const { refetch } = useGetThemeQuery();

    return (
        <div className={`back${style?'_dark':''}`} onClick={()=>{navigate('/');refetch()}}>
            <p>Назад</p>
        </div>
    );
}

export default Back;
