import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './components/Header';   // fixed typo here
import React from 'react';
import Login from './components/Login';     // fixed typo here
import Blogs from './components/Blogs';     // fixed typo here
import UserBlogs from './components/UserBlogs';  // fixed typo here
import AddBlogs from './components/AddBlogs';    // fixed typo here
import BlogDetail from './components/BlogDetail'; // fixed typo here

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myBlogs" element={<UserBlogs />} />
          <Route path="/myBlogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/add" element={<AddBlogs />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
