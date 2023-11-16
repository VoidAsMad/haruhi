import { Suspense, lazy, useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import { Cookies } from 'react-cookie';


function App() {
  const Main = lazy( () => import('./Main') )
  const About = lazy( () => import('./About') )
  const Read = lazy( () => import('./Read') )
  return (
    <>
    <Suspense fallback={<div>로딩중..</div>}>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path="/about/:id" element={<About/>}/>
        <Route path="/reader" element={<Read/>}/>
      </Routes>
    </Suspense>
    
    </>
    
  );
}

export default App;
