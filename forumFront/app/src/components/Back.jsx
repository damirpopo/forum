import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Back() {
const navigate = useNavigate()
const {style} = useSelector(state=>state.toolkit)


    return (
        <div className={`back${style?'_dark':''}`} onClick={()=>{navigate('/')}}>
            <p>Назад</p>
        </div>
    );
}

export default Back;
