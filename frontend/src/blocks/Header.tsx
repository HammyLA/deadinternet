import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import '../styles/header/Header.css'

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className='header'>
        <div className='title'>
          <img src='../../public/DeadInternetIcon.svg' />
          <h1 className='titleText'>
            DeadInternet
          </h1>
        </div>
        <SearchBar />
        <div className='headerBtns'>
          <button onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
