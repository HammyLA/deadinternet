import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>

  )
}

export default App
