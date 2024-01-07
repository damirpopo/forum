import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Back from './Back';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../reduxtoolkit/toolkitSlice';


function Signup() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordSmall, setPasswordSmall] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {style} = useSelector(state=>state.toolkit)

    async function signup(event) {
        event.preventDefault()
        if (password.length>=8){
            const resp = await fetch("http://127.0.0.1:8000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "name": name,
                    "password": password
                })
            })
            const json = await resp.json()
            console.log(json);
            if (resp.ok) {
                dispatch(auth(json.data.user_token))
                localStorage.setItem('token', JSON.stringify(json.data.user_token))
                localStorage.setItem('auth', JSON.stringify('true'))
                navigate('/')
            } else {
                setPasswordSmall('')
                setError(json)
                console.error();
            }
        } else{
            const resp = await fetch("http://127.0.0.1:8000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "name": name,
                    "password": ''
                })
            })
            const json = await resp.json()
            console.log(json);
            if (resp.ok) {
                localStorage.setItem('token', JSON.stringify(json.data.user_token))
                localStorage.setItem('auth', JSON.stringify('true'))
                navigate('/')
            } else {
                setPasswordSmall('Ваш пароль слишком короткий')
                setError(json)
                console.error();
            }
        }
        
        
    }

    useEffect(() => {
        if (error) {
            if (error.data.error.email){
                document.getElementById('input').style.outlineColor = "red";
                document.getElementById('input').style.background = "#bf5454";
            } else{
                document.getElementById('input').style.outlineColor = "#D9D9D9";
                document.getElementById('input').style.background = "#D9D9D9";
            }
            if (error.data.error.name){
                document.getElementById('input2').style.outlineColor = "red";
                document.getElementById('input2').style.background = "#bf5454";
            } else {
                document.getElementById('input2').style.outlineColor = "#D9D9D9";
                document.getElementById('input2').style.background = "#D9D9D9";
            }
            if (error.data.error.password){
                document.getElementById('input3').style.outlineColor = "red";
                document.getElementById('input3').style.background = "#bf5454";
            } else{
                document.getElementById('input3').style.outlineColor = "#D9D9D9";
                document.getElementById('input3').style.background = "#D9D9D9";
            }
        }
      }, [error])

    return (
        <div className={`container_auth_form${style?'_dark':''}`}>
            <Back/>
            <form className={`auth_form${style?'_dark':''}`} action="" onSubmit={signup}>
                {error > '' ? <p className={`error_message${style?'_dark':''}`}>{error.data.error.email > '' ? error.data.error.email[0] : ''}</p> : ''}
                <div>
                    <input className={`form_input${style?'_dark':''}`} id='input' type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                {error > '' ? <p className={`error_message${style?'_dark':''}`}>{error.data.error.name > '' ? error.data.error.name[0] : ''}</p> : ''}
                <div>
                    <input className={`form_input${style?'_dark':''}`} id='input2' type="text" placeholder='Nickname' onChange={(e) => { setName(e.target.value) }} />
                </div>
                {error > '' ? <p className={`error_message${style?'_dark':''}`}>{passwordSmall?passwordSmall:(error.data.error.password > '' ? error.data.error.password[0] : '')}</p> : ''}
                <div>
                    <input className={`form_input${style?'_dark':''}`} id='input3' type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <input className={`auth_submit${style?'_dark':''}`} type="submit" value="Зарегистриватся" />
            </form>
        </div>
    );
}

export default Signup;
