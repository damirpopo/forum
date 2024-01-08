import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCommentQuery, useGetThemeQuery, useGetUserQuery } from '../reduxtoolkit/api';
import { useSelector } from 'react-redux';

function Notify() {
    const { token, avatar, style } = useSelector(state => state.toolkit)
    const navigate = useNavigate()
    const { data: comment, isLoading: isLoadingComment, isError: isErrorComment, refetch } = useGetCommentQuery();
    const { data: userInfo } = useGetUserQuery(token);
    const [cnt, setCnt] = useState(1)
    const [notify, setNotify] = useState(false)
    const [commNum, setCommNum] = useState()

    // костыль на обновление данных, по скольку не сделал WebSoket
    setTimeout(() => {
        if (comment) {
            refetch()
        }
    }, 1000);
    // Уведомление об ответе на комментарий
    useEffect(() => {
        setCnt(cnt + 1)
        if (cnt >= 3) {
            if (comment.data.length > 0 && comment.data[comment.data.length - 1].reply != undefined) {
                if (comment.data[comment.data.length - 1].reply.user.id == userInfo?.data.id ) {
                    setNotify(true)
                    setCommNum(comment.data.length - 1)
                }
            }

        }
    }, [comment])
    // скрытие уведомления через 3 сек
    useEffect(() => {
        if (notify) {
            setTimeout(() => {
                setNotify(false)
                setCommNum()
            }, 3000);
        }
    }, [notify])

    return (
        <>
            {notify ?
                <div className={`notify_container${style ? '_dark' : ''}`}>
                    <div>
                        <p className={`notify_close${style ? '_dark' : ''}`} onClick={() => { setNotify(false) }}>Зкрыть</p>
                    </div>
                    <div className={`title_comm_box${style ? '_dark' : ''}`}>
                        <p className={`subtitle_notify${style ? '_dark' : ''}`}>Вам ответил:</p>
                        <img className={`icn_notify${style ? '_dark' : ''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(comment?.data[commNum]?.user.id)); navigate('/Profile') }} src={comment?.data[commNum]?.user.img ? comment?.data[commNum]?.user.img : avatar} alt="" />
                        <a className={`title_notify${style ? '_dark' : ''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(comment?.data[commNum]?.user.id)); navigate('/Profile') }} >{comment?.data[commNum]?.user.name}</a>
                    </div>
                    <hr />
                    <div>
                        <p onClick={() => { localStorage.setItem('Them_id', JSON.stringify(comment?.data[commNum]?.theme.id)); navigate('/Theme') }} className={`subtitle_notify2${style ? '_dark' : ''}`}>{comment?.data[commNum]?.message}</p>
                    </div>
                </div>
                : ''}
        </>
    );
}

export default Notify;
