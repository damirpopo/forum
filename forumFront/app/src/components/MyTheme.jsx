import { useGetCommentQuery, useGetThemeQuery, useGetUserQuery } from '../reduxtoolkit/api';
import commentPNG from '../static/img/comment.png'
import { useNavigate } from 'react-router-dom';
import Back from './Back';
import { useSelector } from 'react-redux';


function MyTheme() {
    const {token,avatar, style} = useSelector(state=>state.toolkit)
    const { data: theme, isLoading: isLoadingTheme, isError: isErrorTheme } = useGetThemeQuery();
    const { data: comment, isLoading: isLoadingComment, isError: isErrorComment } = useGetCommentQuery();
    const { data: userInfo } = useGetUserQuery(token);
    const navigate = useNavigate()
    console.log(theme);

    const sortTheme = theme?.data.filter(themes => themes.user.id == userInfo?.data.id)

    return (
        <>
            {sortTheme ?
                <div className={`container_themes_form${style?'_dark':''}`}>
                    <Back />
                    <div className={`container_list_theme${style?'_dark':''}`}>
                        {sortTheme?.reverse().map(them => {
                            const comm = comment?.data.filter(comm => comm.theme.id == them.id)
                            return (
                                <div className={`theme_box${style?'_dark':''}`} onClick={() => { localStorage.setItem('Them_id', JSON.stringify(them.id)); navigate('/Theme') }}>
                                    <p className={`title_theme${style?'_dark':''}`} >{them.name}</p>
                                    <div className={`container_subtitle_themes${style?'_dark':''}`}>
                                        <div className={`container_subtitle_theme${style?'_dark':''}`}>
                                            <img className={`icn${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(them?.user.id)); navigate('/Profile') }} src={them?.user.img ? them?.user.img : avatar} alt="" />
                                            <p className={`subtitle_theme${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(them?.user.id)); navigate('/Profile') }}>{them.user.name}</p>
                                            <p className={`subtitle_theme2${style?'_dark':''}`}>{them.time},</p>
                                            <p className={`subtitle_theme3${style?'_dark':''}`}>{them.data}</p>
                                        </div>
                                        <div className={`container_subtitle_themes${style?'_dark':''}`}>
                                            <p className={`subtitle_theme4${style?'_dark':''}`}>{comm?.length}</p>
                                            <img className={`png${style?'_dark':''}`} src={commentPNG} alt="" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <div className={`loader_c${style?'_dark':''}`}><span class="loader"></span></div>
            }
        </>

    );
}

export default MyTheme;