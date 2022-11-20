import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Details from '../pages/Details';
import Login from '../pages/Login'
import NewBlog from '../pages/NewBlog';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import UpdateBlog from '../pages/UpdateBlog';
import PrivateRouter from './PrivateRouter';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="" element={<PrivateRouter />}>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/addblog" element={<NewBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateblog" element={<UpdateBlog />} />
        </Route>

        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter