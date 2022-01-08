import './searchBar.css';

const SearchBar = ({query, onInputChange}: searchBarProps) => {

    return (
        <div>
            <input type="text"
                   value={query}
                   onChange={e => onInputChange(e.target.value)}
                   className="searchInput"/>
        </div>
    )
}

export default SearchBar;

interface searchBarProps {
    query: string,
    onInputChange: Function
}