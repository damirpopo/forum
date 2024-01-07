import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Back from './Back';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../reduxtoolkit/toolkitSlice';


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const {style} = useSelector(state=>state.toolkit)
    
    useEffect(() => {
        if (error) {
          document.getElementById('input').style.outlineColor = "red";
          document.getElementById('input').style.background = "#bf5454";
          document.getElementById('input2').style.outlineColor = "red";
          document.getElementById('input2').style.background = "#bf5454";
        }
      }, [error])
    // Авторизация
    async function login(event) {
        event.preventDefault()
        const resp = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
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
            setError(json)
        }
    }
    //

    return (
        <div className={`container_auth_form${style?'_dark':''}`}>
            <Back/>
            <form className={`auth_form${style?'_dark':''}`} action="" onSubmit={login}>
                <div>
                    <input className={`form_input${style?'_dark':''}`} id='input' type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>
                    <input className={`form_input${style?'_dark':''}`} id='input2'  type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                {error?<p className={`error_message${style?'_dark':''}`}>{error.error.message}</p>:''}
                <input className={`auth_submit${style?'_dark':''}`} type="submit" value="Войти" />
            </form>
        </div>
    );
}

export default Login;
