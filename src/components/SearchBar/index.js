// src/components/SearchBar.js
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => (
  <div className="search-bar">
    <input
      type="text"
      value={value}
      placeholder="Search by name, email, or body..."
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
