import "../styles/header/SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';

async function search(formData: React.FormEvent<HTMLFormElement>) {
    formData.preventDefault()
    const input = (formData.target as HTMLFormElement).searchInput.value
    console.log(`Searched: ${input}`)
}

function SearchBar() {
  return (
    <div id="searchBar">
        <form id="searchForm" onSubmit={search}>
            <input id="searchInput" name="searchInput" placeholder="Search" autoComplete="off"/>
            <button type="submit" name="searchBtn">
                <SearchIcon />
            </button>
        </form>
    </div>
  )
}

export default SearchBar