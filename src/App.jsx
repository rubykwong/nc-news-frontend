import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from "./components/Header"
import Navbar from './components/Navbar'
import Coding from './components/Main/Coding'
import Cooking from './components/Main/Cooking'
import Football from './components/Main/Football'
import Home from './components/Main/Home'
import ArticleMain from './components/Article/ArticleMain'
function App() {
  return (
    <>
    <Header />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/coding" element={<Coding />}/>
      <Route path="/cooking" element={<Cooking />}/>
      <Route path="/football" element={<Football />}/>
      <Route path="/:articleId" element={<ArticleMain/>} />
    </Routes>
    </>
  )
}

export default App
