import { useState } from 'react'

const Search = ({ onSearchChange }) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
    onSearchChange(e.target.value)
  }
  return (
    <div className="searchBarContainer ">
      <input
        className=" form-control"
        type="text"
        value={searchInput}
        placeholder="              Search..."
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default Search
