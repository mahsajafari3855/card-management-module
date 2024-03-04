// src/components/SearchCardInput.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCards, setSearchResults } from "../../features/cards/cardsSlice";

const SearchCardInput: React.FC = () => {
  const dispatch = useDispatch<any>(); // Use the AppDispatch type
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      try {
        // Dispatch the searchCards action to fetch search results
        const resultAction = await dispatch(searchCards(searchTerm));

        // Handle the search results by updating the state
        if (searchCards.fulfilled.match(resultAction)) {
          dispatch(setSearchResults(resultAction.payload));
        }
      } catch (error) {
        console.error("An error occurred during search:", error);
      }
    } else {
      // If the search term is empty, reset the search results
      dispatch(setSearchResults([]));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cards"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchCardInput;
