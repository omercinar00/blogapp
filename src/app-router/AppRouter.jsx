import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login'
import NewBlog from '../pages/NewBlog';
import Profile from '../pages/Profile';
import Register from '../pages/Register';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard/>} />
        <Route path='/addblog' element={<NewBlog/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter