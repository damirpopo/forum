import { useState } from 'react';
import { useGetCategoryQuery, useGetThemeQuery, usePostThemeMutation } from '../reduxtoolkit/api';
import Back from './Back';
import { useSelector } from 'react-redux';


function NewTheme() {
    const {token, style} = useSelector(state=>state.toolkit)
    const { refetch } = useGetThemeQuery();
    const { data: category } = useGetCategoryQuery();
    const [postTheme, { data: resp }] = usePostThemeMutation();
    const [file, setFile] = useState()
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setcategoryId] = useState(1)
    const current = new Date();
    const date = `${current.getDate() > 9 ? current.getDate() : '0' + current.getDate()}.${current.getMonth() + 1 > 9 ? current.getMonth() + 1 : '0' + (current.getMonth() + 1) }.${current.getFullYear()}`;
    const time = `${current.getHours() > 9 ? current.getHours() : '0' + current.getHours()}:${current.getMinutes() > 9 ? current.getMinutes() : '0' + current.getMinutes()}`;

    async function post(event) {
        event.preventDefault()
        try {
            const formData = new FormData();
            if (file){
                formData.append("img", file[0])
            }
            formData.append("category", categoryId);
            formData.append("name", name);
            formData.append("content", content);
            formData.append("data", date);
            formData.append("time", time);
            
            await postTheme({ token, formData })
        } catch (e) {
            console.log(e);
        }
        setName('')
        setContent('')
        await refetch()
    }

    return (
        <div className={`container_auth_form${style?'_dark':''}`}>
            <Back />
            <form className={`newthme_form${style?'_dark':''}`} action="" onSubmit={post} enctype="multipart/form-data" >
                <div>
                    <select className={`select${style?'_dark':''}`} onChange={(e) => { setcategoryId(e.target.value) }} name="" id="">
                        {category?.data.map(categor => {
                            return (
                                <option value={categor.id}>{categor.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <input autocomplete="off" className={`form_newTheme_input${style?'_dark':''}`} type="text" placeholder='Тема' onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div>
                    <textarea autocomplete="off" className={`form_newTheme_textarea${style?'_dark':''}`} type="text" placeholder='Контент' onChange={(e) => { setContent(e.target.value) }} ></textarea>
                </div>
                <label className={`btn_upload${style?'_dark':''}`}>
                    <input className={`dead${style?'_dark':''}`} onChange={(e) => { setFile(e.target.files) }} type="file" accept="image/png, image/jpeg" src="" alt="" />
                    <span >{file?'📁':'📂'}</span>
                    <span>Загрузить фото</span>
                </label>
                <input className={`auth_submit${style?'_dark':''}`} type="submit" onClick={() => { refetch() }} value="Создать тему" /><br />
                {resp?<p className={`link${style?'_dark':''}`}>Тема создана успешно</p>:''}
            </form>
        </div>
    );
}

export default NewTheme;
