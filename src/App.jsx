import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from "./components/Header"
import Main from './components/Home/Main'
import ArticleMain from './components/Article/ArticleMain'
function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/:articleId" element={<ArticleMain/>} />
    </Routes>
    </>
  )
}

export default App
