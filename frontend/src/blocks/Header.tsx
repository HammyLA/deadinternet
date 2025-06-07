import SearchBar from '../components/SearchBar'
import '../styles/header/Header.css'


function Header() {
  return (
    <>
      <div className='header'>
        <div className='title'>
          <img src='../../public/DeadInternetIcon.svg' />
          <h1>
            DeadInternet
          </h1>
        </div>
        <SearchBar />
      </div>
    </>
  )
}

export default Header
