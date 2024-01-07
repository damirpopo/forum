import { useGetAllUserQuery, useGetCommentQuery, useGetThemeQuery, useGetUserQuery, usePatchUserMutation } from '../reduxtoolkit/api';
import { useEffect, useState } from 'react';
import editIcn from '../static/img/edit.png'
import Back from './Back';
import { useSelector } from 'react-redux';

function User() {
    const {token,avatar, style} = useSelector(state=>state.toolkit)
    const { data: userInfo ,refetch:refetchUser} = useGetUserQuery(token);
    const { data: allUser,refetch } = useGetAllUserQuery();
    const userId = JSON.parse(localStorage.getItem('user_id'))
    const { data: theme, isLoading: isLoadingTheme, isError: isErrorTheme } = useGetThemeQuery();
    const { data: comment, isLoading: isLoadingComment, isError: isErrorComment } = useGetCommentQuery();
    const [patchUser, { }] = usePatchUserMutation();
    const [file, setFile] = useState()
    const [name, setName] = useState('')
    const [editName, setEditName] = useState(false)
    const [email, setEmail] = useState('')
    const [editEmail, setEditEmail] = useState(false)
    const [editDescription, setEditDescription] = useState(false)
    const [description, setDescription] = useState('')
    const comm = comment?.data.filter(comm => comm.user.id == userId)
    const themes = theme?.data.filter(tem => tem.user.id == userId)
    const user = allUser?.data.filter(users => users.id == userId)
    const us = user ? user[0] : ''
    console.log(userInfo);
    console.log(user);

    useEffect(() => { refetch() }, [localStorage.getItem('user_id')])

    async function patch(event) {
        event.preventDefault()
        try {
            const formData = new FormData();

            if (file) {
                formData.append("img", file[0])
            }
            if (name) {
                formData.append("name", name);
            }
            if (email) {
                formData.append("email", email);
            }
            if (description) {
                formData.append("description", description);
            }
            await patchUser({ token, formData, id: userInfo?.data.id })
        } catch (e) {
            console.log(e);
        }
        refetch()
        refetchUser()
        setEditName(false);
        setEditEmail(false);
        setEditDescription(false);
        setName('');
        setEmail('');
        setFile();
        setDescription('')
    }

    return (
        <>
            {us ?
                <div className={`index${style?'_dark':''}`}>
                    <Back/>
                    <form action="" onSubmit={patch}>
                        <div className={`container_profile_form${style?'_dark':''}`}>

                            <div className={`profile_box1${style?'_dark':''}`}>
                                <img className={`avatar_profile${style?'_dark':''}`} src={us?.img ? us?.img : avatar} alt="" />
                                {userInfo?.data.id != us?.id ? '' :
                                    <label >
                                        <input className={`dead${style?'_dark':''}`} onChange={(e) => { setFile(e.target.files) }} type="file" accept="image/png, image/jpeg" src="" alt="" />
                                        <span ><p className={`span_profile${style?'_dark':''}`}>Изменить Фото</p></span>
                                    </label>}

                            </div>
                            <div className={`profile_box2${style?'_dark':''}`}>
                                <div className={`box_profile_title${style?'_dark':''}`}>
                                    <p className={`title_profile${style?'_dark':''}`}>Email: </p>
                                    {userInfo?.data.id != us?.id ? <p className={`title_profiles${style?'_dark':''}`}> {us?.email}</p> : (editEmail ?
                                        <input type="email" className={`input_profile${style?'_dark':''}`} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                        :
                                        <p className={`title_profiles${style?'_dark':''}`}> {us?.email}</p>)}
                                    {userInfo?.data.id != us?.id ? '' : (editEmail ? '' : <img className={`img_edit${style?'_dark':''}`} onClick={() => { setEditEmail(true); setEmail(us?.email) }} src={editIcn} alt="" />)}
                                </div>
                                <div className={`box_profile_title${style?'_dark':''}`}>
                                    <p className={`title_profile${style?'_dark':''}`}>Nick: </p>
                                    {userInfo?.data.id != us?.id ? <p className={`title_profile_name${style?'_dark':''}`}> {us?.name}</p> : (editName ?
                                        <input type="text" className={`input_profile${style?'_dark':''}`} value={name} onChange={(e) => { setName(e.target.value) }} />
                                        :
                                        <p className={`title_profile_name${style?'_dark':''}`}> {us?.name}</p>)}
                                    {userInfo?.data.id != us?.id ? '' : (editName ? '' : <img className={`img_edit${style?'_dark':''}`} onClick={() => { setEditName(true); setName(us?.name) }} src={editIcn} alt="" />)}

                                </div>
                                <div className={`profile_box3${style?'_dark':''}`}>
                                    <p className={`title_profile${style?'_dark':''}`}>Комментариев: {comm?.length}</p>
                                    <p className={`title_profile${style?'_dark':''}`}>Тем: {themes?.length}</p>
                                </div>
                                <div className={`profile_box4${style?'_dark':''}`}>
                                    {userInfo?.data.id != us?.id ? <p className={`title_profiles${style?'_dark':''}`}>{us?.description ? us?.description : 'О себе...'}</p> : (editDescription ?
                                        <textarea type="text" className={`textarea_profile${style?'_dark':''}`} value={description} onChange={(e) => { setDescription(e.target.value) }} />
                                        :
                                        <p className={`title_profiles${style?'_dark':''}`}>{us?.description ? us?.description : 'О себе...'}</p>)}
                                    {userInfo?.data.id != us?.id ? '' : (editDescription ? '' : <img className={`img_edit${style?'_dark':''}`} onClick={() => { setEditDescription(true); setDescription(us?.description) }} src={editIcn} alt="" />)}
                                </div>
                                <div className={`profile_box5${style?'_dark':''}`}>
                                    {userInfo?.data.id != us?.id ? '' : <input type="submit" className={`btn_profile${style?'_dark':''}`} value="Сохранить" />}

                                </div>
                            </div>

                        </div>
                    </form>
                </div>
                :
                <div className={`loader_c${style?'_dark':''}`}><span class="loader"></span></div>
            }
        </>

    );
}

export default User;
