import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from './components/Loader';

function App() {

  return (
    <>
      <BrowserRouter>
        <Loader />
        <div className='App'>
          
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
