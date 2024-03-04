// src/components/EditCardForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {editCard,MyCard } from "../../features/cards/cardsSlice";

interface EditCardFormProps {
  cardData: MyCard; // Assuming Card interface is available
}

const EditCardForm: React.FC<EditCardFormProps> = ({ cardData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // Initialize form data with existing card data
    ...cardData,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editCard(formData));
    // You can add additional logic or close the edit form here
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields and submit button */}
    </form>
  );
};

export default EditCardForm;
