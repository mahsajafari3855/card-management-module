// CardListContainer.tsx
import React, { useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch } from "../../store/store";




import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCards,
  addCard,
  editCard,
  deleteCard,
  fetchCards,
} from "../../features/cards/cardsSlice";
import CardForm from "../cardForm/CardForm";
import CardListDisplay from "../cardListDisplay/CardListDisplay";
import CardSearch from "../cardSearch/CardSearch";

const CardListContainer: React.FC = () => {
  const cards = useSelector(selectAllCards);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedCard, setEditedCard] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleEdit = (card: any) => {
    console.log("Editing", card);
    setEditing(true);
    setEditedCard(card);
    setShowModal(true);
  };

  const handleAdd = () => {
    console.log("Adding");
    setEditing(false);
    setShowModal(true);
  };

  const handleFormSubmit = (newUser: any) => {
    const id = editing ? newUser.id : uuidv4();
    editing
      ? dispatch(editCard({ ...newUser, id }))
      : dispatch(addCard({ ...newUser, id }));
    setEditing(false);
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCard(id));
  };
    const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <>
      <CardSearch
        onSearchChange={handleSearchChange}
        clearSearch={clearSearch}
      />

      <Button variant="primary" onClick={handleAdd} className="add-card-btn">
        <FaPlus /> Add Card
      </Button>

      <CardListDisplay
        cards={cards}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CardForm
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        onFormSubmit={handleFormSubmit}
        editing={editing}
        editedCard={editedCard}
      />
    </>
  );
};

export default CardListContainer;
