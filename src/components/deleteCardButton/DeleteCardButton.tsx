// src/components/DeleteCardButton.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { deleteCard } from  "../../features/cards/cardsSlice";

interface DeleteCardButtonProps {
  cardId: number;
}

const DeleteCardButton: React.FC<DeleteCardButtonProps> = ({ cardId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCard(cardId));
    // You can add additional logic or confirmation here
  };

  return <button onClick={handleDelete}>Delete Card</button>;
};

export default DeleteCardButton;
