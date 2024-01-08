import { useState } from 'react';
import { useGetCommentQuery, useGetThemeIDQuery, useGetThemeQuery, useGetUserQuery, usePatchCommentMutation, usePatchThemeMutation, usePostCommentMutation, useRemoveCommentMutation, useRemoveThemeMutation } from '../reduxtoolkit/api';
import commentPNG from '../static/img/pngwing.com.png'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from './Back';
import { useSelector } from 'react-redux';

function Theme() {
    const {auth, token, avatar, style} = useSelector(state=>state.toolkit)
    const [postComment, { }] = usePostCommentMutation();
    const [PatchComment, { }] = usePatchCommentMutation();
    const [removeComment, { }] = useRemoveCommentMutation();
    const [removeTheme, { }] = useRemoveThemeMutation();
    const [patchTheme, { }] = usePatchThemeMutation();
    const { refetch: refecthAllTheme } = useGetThemeQuery();
    const { data: theme, isLoading: isLoadingTheme, refetch: refecthTheme } = useGetThemeIDQuery(JSON.parse(localStorage.getItem('Them_id')));
    const { data: comment, isLoading: isLoadingComment, isError: isErrorComment, refetch } = useGetCommentQuery();
    const { data: userInfo } = useGetUserQuery(token);
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const [img, setImg] = useState()
    const [themes, setThemes] = useState()
    const [replys, setReplys] = useState()
    const [replyUser, setReplyUser] = useState()
    const [content, setContent] = useState()
    const [message, setMessage] = useState()
    const [edit, setEdit] = useState()
    const [editTheme, setEditTheme] = useState(false)
    const [titleTheme, setTitleTheme] = useState()
    const current = new Date();
    const date = `${current.getDate() > 9 ? current.getDate() : '0' + current.getDate()}.${current.getMonth() + 1 > 9 ? current.getMonth() + 1 : '0' + (current.getMonth() + 1)}.${current.getFullYear()}`;
    const time = `${current.getHours() > 9 ? current.getHours() : '0' + current.getHours()}:${current.getMinutes() > 9 ? current.getMinutes() : '0' + current.getMinutes()}`;
    const input = useRef(null)
    const response = useRef(null)
    const setScrollPosition = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: "smooth"
        });
    };

    const sortComment = comment?.data.filter(comm => comm.theme.id == theme?.data.id)

    console.log(sortComment);
    console.log(comment);
    console.log(theme ? theme : '');
    console.log(themes);

    async function post(event) {
        event.preventDefault()
        try {
            const formData = new FormData();

            if (file) {
                formData.append("img", file[0])
            }
            if (replys) {
                formData.append("reply", replys);
            }
            formData.append("theme", theme.data.id);
            formData.append("message", message);
            formData.append("data", date);
            formData.append("time", time);

            edit ? await PatchComment({ token, formData, id: edit }) : await postComment({ token, formData })
        } catch (e) {
            console.log(e);
        }
        setEdit();
        setMessage('');
        setReplys();
        setFile();
        setReplyUser()
        refetch()
    }

    async function patch(event) {
        event.preventDefault()
        try {
            const formData = new FormData();
            if (titleTheme) {
                formData.append("name", titleTheme)
            }
            if (content) {
                formData.append("content", content);
            }
            if (img) {
                formData.append("img", img[0])
            }
            await patchTheme({ token, id: theme?.data.id, formData })
        } catch (e) {
            console.log(e);
        }
        setImg()
        setContent()
        setTitleTheme()
        setEditTheme(false)
        refecthTheme()
    }

    async function Themeremove(id) {
        await removeTheme({ token, id })
        await refecthTheme()
        await refecthAllTheme()
        navigate('/')
    }

    async function remove(id) {
        await removeComment({ token, id })
        await refetch()
    }

    function comments(x) {
        const c = x ? comment.data.filter(com => com.id == x) : ''
        setMessage(c[0].message)
    }

    return (
        <div className={`container_themes_form${style?'_dark':''}`}>
            {theme && sortComment ?
                <div className={`theme_one${style?'_dark':''}`}>
                    <Back></Back>
                    <div>
                        <div className={`container_theme_form${style?'_dark':''}`}>
                            <div className={`theme_author${style?'_dark':''}`}>
                                <div className={`title_comm_box${style?'_dark':''}`}>
                                    <img className={`icn_theme${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(theme?.data.user.id)); navigate('/Profile') }} src={theme?.data.user.img ? theme?.data.user.img : avatar} alt="" />
                                    <p className={`title_comm${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(theme?.data.user.id)); navigate('/Profile') }} >{theme?.data.user.name}</p>
                                </div>
                                <div className={`title_comm_box${style?'_dark':''}`}>
                                    <p className={`subtitle_theme4${style?'_dark':''}`}>{theme?.data.time},</p>
                                    <p className={`subtitle_theme4${style?'_dark':''}`}>{theme?.data.data}</p>
                                </div>
                            </div>
                            <form action="" onSubmit={patch}>
                                <div className={`theme_title${style?'_dark':''}`}>
                                    {editTheme ?
                                        <input type="text" className={`input_profile${style?'_dark':''}`} value={titleTheme} onChange={(e) => { setTitleTheme(e.target.value) }} />
                                        :
                                        <p className={`subtitle_comm${style?'_dark':''}`}>{theme?.data.name}</p>
                                    }

                                </div>
                                <div className={`container_theme_form2${style?'_dark':''}`}>
                                    {editTheme ?
                                        <div className={`theme_sub_title${style?'_dark':''}`}>
                                            <textarea type="text" className={`textarea_Theme${style?'_dark':''}`} value={content} onChange={(e) => { setContent(e.target.value) }} />
                                        </div>
                                        :
                                        <div className={`theme_sub_title${style?'_dark':''}`}>
                                            <p className={`subtitle_comm${style?'_dark':''}`}>{theme?.data.content}</p>
                                            <img className={`img${style?'_dark':''}`} src={theme?.data.img} alt='' />
                                        </div>
                                    }

                                </div>
                                <div className={`edit_author${style?'_dark':''}`}>
                                    {userInfo?.data.id == theme?.data.user.id ? <p className={`subtitle_comm3${style?'_dark':''}`} onClick={() => { Themeremove(theme?.data.id) }}>Удалить</p> : ''}
                                    {editTheme ? <p className={`subtitle_comm3${style?'_dark':''}`} onClick={() => { setEditTheme(false) }}>Отмена</p> : ''}
                                    {userInfo?.data.id == theme?.data.user.id ?
                                        (editTheme ?
                                            <label >
                                                <input type="submit" value='' className={`dead${style?'_dark':''}`} />
                                                <span>
                                                    <p className={`subtitle_comm3${style?'_dark':''}`}>Сохранить</p>
                                                </span>
                                            </label>
                                            :
                                            <p className={`subtitle_comm3${style?'_dark':''}`} onClick={() => { setEditTheme(true); setTitleTheme(theme?.data.name); setContent(theme?.data.content) }}>Изменить</p>) : ''}
                                    {editTheme ?
                                        <label >
                                            <input className={`dead${style?'_dark':''}`} onChange={(e) => { setImg(e.target.files) }} type="file" accept="image/png, image/jpeg" src="" alt="" />
                                            <span className={`btn_upload_comm${style?'_dark':''}`}>{file ? '📁' : '📂'}</span>
                                        </label>
                                        : ''}
                                </div>
                            </form>
                        </div>
                        <div>
                            {auth ?
                                <form onSubmit={post} className={`return_comm${style?'_dark':''}`} action="">
                                    <div ref={input}>
                                        {replyUser ? <div >
                                            <p className={`title_comm${style?'_dark':''}`} >ответ: {replyUser}</p>
                                            <p className={`subtitle_comm4${style?'_dark':''}`} onClick={() => { setReplyUser(); setReplys() }}>Отмена</p>
                                        </div> : ''}
                                        {edit ? <div>
                                            <p className={`subtitle_comm5${style?'_dark':''}`}>Редактирование</p>
                                            <p className={`subtitle_comm4${style?'_dark':''}`} onClick={() => { setEdit(); setMessage('') }}>Отмена</p>
                                        </div> : ''}
                                    </div>
                                    <div className={`return_comm_input_box${style?'_dark':''}`}>
                                        <textarea className={`comm_input${style?'_dark':''}`} value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" />
                                        <label >
                                            <input className={`dead${style?'_dark':''}`} onChange={(e) => { setFile(e.target.files) }} type="file" accept="image/png, image/jpeg" src="" alt="" />
                                            <span className={`btn_upload_comm${style?'_dark':''}`}>{file ? '📁' : '📂'}</span>
                                        </label>
                                        <label >
                                            <input type="submit" value='' onClick={(e) => { setThemes(theme?.data.id) }} className={`dead${style?'_dark':''}`} />
                                            <span>
                                                <img className={`pngComm${style?'_dark':''}`} src={commentPNG} alt="" />
                                            </span>
                                        </label>
                                    </div>
                                </form>
                                : ''}
                        </div>
                        <div className={`container_themes_form${style?'_dark':''}`}>
                            <div className={`container_comment_form${style?'_dark':''}`}>
                                {sortComment?.map((comm, index) => {
                                    return (
                                        <div key={index} >
                                            <div className={`container_comm${style?'_dark':''}`}>
                                                <div className={`title_comm_box${style?'_dark':''}`}>
                                                    <img className={`icn_theme${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(comm?.user.id)); navigate('/Profile') }} src={comm?.user.img ? comm?.user.img : avatar} alt="" />
                                                    <p className={`title_comm${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(comm?.user.id)); navigate('/Profile') }} >{comm.user.name}</p>
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
                                                    {auth ?
                                                        <div className={`title_comm_box${style?'_dark':''}`}>
                                                            {userInfo?.data.id == comm.user.id ? <p className={`subtitle_comm3${style?'_dark':''}`} onClick={() => { remove(comm.id) }}>Удалить</p> : ''}
                                                            {userInfo?.data.id == comm.user.id ? <p className={`subtitle_comm3${style?'_dark':''}`} onClick={() => { setEdit(comm.id); setScrollPosition(input); setReplyUser(); setReplys(); comments(comm.id) }}>Изменить</p> : ''}
                                                            <p className={`subtitle_comm3${style?'_dark':''}`} onClick={() => { setReplys(comm.id); setReplyUser(comm.user.name); setScrollPosition(input); setEdit(); setMessage('') }}>Ответить</p>
                                                        </div>
                                                        : ''}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}<hr color='black'  />
                            </div>
                        </div>
                    </div>
                </div>
                : <div className={`loader_c${style?'_dark':''}`}><span class="loader"></span></div>}
        </div>
    );
}

export default Theme;