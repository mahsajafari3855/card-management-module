
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { searchCards, fetchCards } from "../../features/cards/cardsSlice";
import { AppDispatch } from "../../store/store";
import "./CardSearch.css";



interface CardSearchProps {
  onSearchChange: (searchTerm: string) => void;
  clearSearch: () => void;
}

const CardSearch: React.FC<CardSearchProps> = ({
  onSearchChange,
  clearSearch,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      dispatch(fetchCards());
    } else {
      await dispatch(searchCards(searchTerm));
    }
    onSearchChange(searchTerm);
  };

  return (
    <div className="d-flex mb-3">
      <Form.Control
        type="text"
        placeholder="Search by ID, Cardholder, or IBAN"
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />
      <Button variant="secondary" onClick={clearSearch} className="clear-btn">
        Clear
      </Button>
    </div>
  );
};

export default CardSearch;
