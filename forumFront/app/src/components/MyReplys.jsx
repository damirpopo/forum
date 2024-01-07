import { useGetCommentQuery, useGetThemeQuery, useGetUserQuery } from '../reduxtoolkit/api';
import { useNavigate } from 'react-router-dom';
import Back from './Back';
import { useSelector } from 'react-redux';


function MyReplys() {
    const {token,avatar, style} = useSelector(state=>state.toolkit)
    const { data: theme, isLoading: isLoadingTheme, isError: isErrorTheme } = useGetThemeQuery();
    const { data: comment, isLoading: isLoadingComment, isError: isErrorComment } = useGetCommentQuery();
    const { data: userInfo } = useGetUserQuery(token);
    const navigate = useNavigate()
    console.log(theme);

    const sortComment = comment?.data.filter(comm => comm.reply?.user.id == userInfo?.data.id)

    return (
        <>
            {sortComment ?
                <div className={`container_themes_form${style?'_dark':''}`}>
                    <Back/>
                    <div className={`container_comment_form${style?'_dark':''}`}>
                        {sortComment ? sortComment.reverse().map((comm, index) => {
                            return (
                                <div key={index} onClick={() => { localStorage.setItem('Them_id', JSON.stringify(comm.theme.id)); navigate('/Theme') }} >
                                    <div className={`container_comm${style?'_dark':''}`}>
                                        <div className={`title_comm_box${style?'_dark':''}`}>
                                            <img className={`icn_theme${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(theme?.data.user.id)); navigate('/Profile') }} src={comm?.user.img ? comm?.user.img : avatar} alt="" />
                                            <p className={`title_comm${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(theme?.data.user.id)); navigate('/Profile') }} >{comm.user.name}</p>
                                        </div>
                                        {comm.reply > '' ? <div><br />
                                            <div className={`container_reply${style?'_dark':''}`} >
                                                <div className={`title_comm_box${style?'_dark':''}`}>
                                                    <p className={`reply_title${style?'_dark':''}`}>Ответ пользователю: </p>
                                                    <p className={`reply_title_user${style?'_dark':''}`}>{comm.reply.user.name}</p>
                                                </div>
                                                <p className={`reply_subtitle${style?'_dark':''}`}>{comm.reply.message}</p>
                                            </div>
                                        </div>
                                            : ''}
                                        <div className={`subtitle_comm_box${style?'_dark':''}`}>
                                            <p className={`subtitle_comm${style?'_dark':''}`} >{comm.message}</p>
                                            {comm.img ? <img className={`img2${style?'_dark':''}`} src={comm.img} alt='' /> : ''}
                                        </div>
                                        <div className={`container_subtitle_themes${style?'_dark':''}`}>
                                            <div className={`container_subtitle_theme${style?'_dark':''}`}>
                                                <p className={`subtitle_comm2${style?'_dark':''}`}>{comm.time} </p>
                                                <p className={`subtitle_comm2${style?'_dark':''}`}>{comm.data}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <p className={`reply_subtitle${style?'_dark':''}`}>Loading...</p>}
                    </div>
                </div>
                :
                <div className={`loader_c${style?'_dark':''}`}><span class="loader"></span></div>
            }

        </>
    );
}

export default MyReplys;