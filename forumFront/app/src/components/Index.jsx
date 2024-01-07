import { useNavigate } from 'react-router-dom'
import { useGetAllUserQuery, useGetCategoryQuery, useGetCommentQuery, useGetThemeQuery } from '../reduxtoolkit/api';
import { useEffect, useState } from 'react';
import commentPNG from '../static/img/comment.png'
import { useSelector } from 'react-redux';

function Index() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('')
  const [useCategory, setUseCategory] = useState('')
  const { data, isLoading, isError } = useGetCategoryQuery();
  const { data: theme, isLoading: isLoadingTheme, isError: isErrorTheme } = useGetThemeQuery();
  const { data: comment, isLoading: isLoadingComment, isError: isErrorComment } = useGetCommentQuery();
  const { data: allUser } = useGetAllUserQuery();
  const {auth, avatar, style} = useSelector(state=>state.toolkit)

  // поиск по вводу и категориям
  const result = theme?.data.filter(them => them.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
    && (useCategory === "" || them.category.id.toString().toLocaleLowerCase().includes(useCategory)))

  //фильтрация категорий по id с id выбраной категорией 
  const cattegory = useCategory ? data.data.filter(categor => categor.id == useCategory) : ''

  useEffect(() => {
    if (useCategory) {
      document.getElementById('search').style.marginBottom = "13px";
    }
  }, [useCategory])

  // находит самую обсуждаемую тему 
  const [mostTheme, setMostTheme] = useState([])
  const mostThemeSort = theme?.data.map(themes => {
    const comm = comment?.data.filter(comm => comm.theme.id == themes.id)
    const sort = comm?.length
    mostTheme.push(comm > [] ? comm : '')
  })
  const set = Array.from(new Set(mostTheme.sort().reverse()))
  //

  // находит самого общительного пользователя
  const [mostUserComm, setMostUserComm] = useState([])
  const mostUserCommSort = allUser?.data.map(user => {
    const comm = comment?.data.filter(comm => comm.user.id == user.id)
    const sort = comm?.length
    mostUserComm.push(comm > [] ? comm : '')
  })
  const setUserComm = Array.from(new Set(mostUserComm.sort().reverse()))
  //

  // находит лучшего тем мейкера
  const [mostUserTheme, setMostUserTheme] = useState([])
  const mostUserThemeSort = allUser?.data.map(user => {
    const comm = theme?.data.filter(themes => themes.user.id == user.id)
    const sort = comm?.length
    mostUserTheme.push(comm > [] ? comm : '')
  })
  const setMostUserThemes = Array.from(new Set(mostUserTheme.sort().reverse()))
  //

  return (
    <>
      {theme && result ? // загрузка контента 
        <div className={`index${style?'_dark':''}`}>
          <div>
            <div className={`block_one${style?'_dark':''}`}>
              <div>
                <button className={`btn${style?'_dark':''}`} onClick={() => { auth ? navigate("/newTheme") : navigate("/login") }}>Новая тема</button>
              </div>
              <div className={`container_category${style?'_dark':''}`}>
                <p className={`n${style?'_dark':''}`}>Категории</p>
                {data?.data.map(categor => {  
                  function setCategor() { // Выбор категории 
                    if (categor.id == useCategory) { 
                      setUseCategory('')
                    } else {
                      setUseCategory(categor.id)
                    }
                  }
                  return (
                    <div className={`category${useCategory == categor.id ? '_select' : ''}${style?'_dark':''}`} onClick={() => { setCategor() }}>
                      <p className={`category_title${style?'_dark':''}`} >{categor.name}</p>
                    </div>
                  )
                })}
                <div>
                  <p></p>
                </div>
              </div>
            </div>
            <div className={`block_second${style?'_dark':''}`}>
              {set[0] ?
                <div >
                  <p className={`title_mostTheme${style?'_dark':''}`}>Cамая обсуждаемая тема </p>
                  <div  onClick={() => { localStorage.setItem('Them_id', JSON.stringify(set[0][0]?.theme.id)); navigate('/Theme') }}>
                    <p className={`title_themeMost${style?'_dark':''}`} >{set[0][0]?.theme.name}</p>
                    <div className={`container_subtitle_themesMost${style?'_dark':''}`}>
                      <div className={`container_subtitle_theme${style?'_dark':''}`}>
                        <img className={`icn_themeMost${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(set[0][0]?.theme.user.id)); navigate('/Profile') }} src={set[0][0]?.theme.user.img ? set[0][0]?.theme.user.img : avatar} alt="" />
                        <p className={`subtitle_theme${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(set[0][0]?.theme.user.id)); navigate('/Profile') }}>{set[0][0]?.theme.user.name}</p>
                      </div>
                      <div className={`container_subtitle_themes${style?'_dark':''}`}>
                        <p className={`subtitle_theme5${style?'_dark':''}`}>{set[0]?.length}</p>
                        <img className={`png_themeMost${style?'_dark':''}`} src={commentPNG} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                : ''}
            </div>
            <div className={`block_second${style?'_dark':''}`}>
              {setUserComm[0] ?
                <div >
                  <div className={`title_mostUserComm${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(setUserComm[0][0]?.user.id)); navigate('/Profile') }}>
                    <p className={`title_mostTheme${style?'_dark':''}`}>Cамый общительный user</p>
                    <img className={`icn_user_comm_most${style?'_dark':''}`} src={setUserComm[0][0]?.user.img ? setUserComm[0][0]?.user.img : avatar} alt="" />
                    <p className={`subtitle_theme${style?'_dark':''}`} >{setUserComm[0][0]?.user.name}</p>
                    <p className={`title_mostTheme${style?'_dark':''}`} >Комментариев: {setUserComm[0]?.length}</p>
                  </div>
                </div>
                : ''}
            </div>
            <div className={`block_second${style?'_dark':''}`}>
              {setMostUserThemes[0] ?
                <div >
                  <div className={`title_mostUserComm${style?'_dark':''}`} onClick={() => { localStorage.setItem('user_id', JSON.stringify(setMostUserThemes[0][0]?.user.id)); navigate('/Profile') }}>
                    <p className={`title_mostTheme${style?'_dark':''}`}>Лучший тем мейкер</p>
                    <img className={`icn_user_comm_most${style?'_dark':''}`} src={setMostUserThemes[0][0]?.user.img ? setMostUserThemes[0][0]?.user.img : avatar} alt="" />
                    <p className={`subtitle_theme${style?'_dark':''}`} >{setMostUserThemes[0][0]?.user.name}</p>
                    <p className={`title_mostTheme${style?'_dark':''}`} >Создал {setMostUserThemes[0]?.length} тему </p>
                  </div>
                </div>
                : ''}
            </div>
          </div>
          <div className={`container_list_theme${style?'_dark':''}`}>
            <input autocomplete="off" className={`search${style?'_dark':''}`} id='search' type="text" placeholder='Поиск' onChange={(e) => { setSearch(e.target.value) }} />
            <p className={`category_title_in_theme${style?'_dark':''}`} >{useCategory ? `Категория: ${cattegory[0].name}` : ''}</p>
            {result?.reverse().map(them => {
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

export default Index;
