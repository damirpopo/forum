import './light.css';
import './dark.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Index from './components/Index';
import Header from './components/Header';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import NewTheme from './components/NewTheme';
import Theme from './components/Theme';
import MyTheme from './components/MyTheme';
import MyMessage from './components/MyMessage';
import MyReplys from './components/MyReplys';
import Profile from './components/Profile';
import Notify from './components/Notify';
import { useSelector } from 'react-redux';

function App() {

  const { style } = useSelector(state => state.toolkit)

  return (
    <>
      <div className={`main${style ? '_dark' : ''}`}>
        <Header />
        <Notify />
        <Routes>
          <Route path='/' element={<Index />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='signup' element={<Signup />}></Route>
          <Route path='newTheme' element={<NewTheme />}></Route>
          <Route path='Theme' element={<Theme />}></Route>
          <Route path='MyTheme' element={<MyTheme />}></Route>
          <Route path='MyMessage' element={<MyMessage />}></Route>
          <Route path='MyReplys' element={<MyReplys />}></Route>
          <Route path='Profile' element={<Profile />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;