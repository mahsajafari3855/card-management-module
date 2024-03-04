// src/components/AddCardForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../../features/cards/cardsSlice";

const AddCardForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // Add initial form data here
    id:0,
    firstName: "",
    lastName: "",
    cardNumber: "",
    iban: "",
    account: "",
    expireDate: "",
    isActive: false,
    description: "",
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
    dispatch(addCard(formData));
    // You can add additional logic or reset the form here
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields and submit button */}
    </form>
  );
};

export default AddCardForm;
