import { Suspense, lazy } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  const MainPage = lazy( () => import('./pages/main') )
  const ReadPage = lazy( () => import('./pages/read') )
  const FullPage = lazy( () => import('./pages/full'))

  return (
    <Suspense fallback={ <div>로딩중임</div> }>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/reader' element={<ReadPage/>}/>
        <Route path='/reader/full' element={<FullPage/>}/>
      </Routes>
    </Suspense>
    
  );
}

export default App;
