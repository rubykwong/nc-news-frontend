import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Main/Home'
import TopicPage from './components/Main/TopicPage'
import ErrorPage from './components/ErrorPage'
import ArticleMain from './components/Article/ArticleMain'
function App() {
  return (
    <>
    <Header />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/topics/:topic" element={<TopicPage/>}/>
      <Route path="/:articleId" element={<ArticleMain/>} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
