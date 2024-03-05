import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { Toggle } from "rsuite";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { AppDispatch } from "../../store/store";
import { v4 as uuidv4 } from "uuid";
import "./CardList.css"; // Import your CSS file

import {
  editCard,
  addCard,
  deleteCard,
  selectAllCards,
  fetchCards,
  searchCards,
  setSearchResults,
} from "../../features/cards/cardsSlice";

// Define the CardList functional component
export const CardList: React.FC = () => {
  // Redux setup
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector(selectAllCards);

  // Component state
  const initCurrentUser = {
    id: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    iban: "",
    account: "",
    expireDate: "",
    isActive: false,
    description: "",
  };

  const [showCreateBtn, setShowCreateBtn] = useState(true);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);

  // Fetch cards when the component mounts
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  // Modal handling functions
  const handleShow = () => {
    setShow(true);
    if (editing === false) {
      setNewUser(initCurrentUser);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  // Search functionality
  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      // If search term is empty, fetch all cards
      dispatch(fetchCards());
    } else {
      // Otherwise, perform search
      await dispatch(searchCards(searchTerm));
    }
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    handleSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchResults([]); // Clear the search results in the Redux state
  };

  // Form submission and CRUD operations
  const onFormSubmit = (newUser: any) => {
    const id = editing ? newUser.id : uuidv4(); // Use existing ID for edit, generate a new one for add
    editing
      ? dispatch(editCard({ ...newUser, id }))
      : dispatch(addCard({ ...newUser, id }));
    handleClose();
  };

  const onEdit = (card: any) => {
    setEdit(true);
    handleShow();
    // Use setTimeout to ensure that the modal is rendered before setting newUser
    setTimeout(() => {
      setNewUser(card);
    }, 0);
    console.log("edit");
  };

  // Reset newUser when the modal is closed
  useEffect(() => {
    if (!show) {
      setNewUser(initCurrentUser);
    }
  }, [show, initCurrentUser]);

  const onUpdateUser = (editedCard: any) => {
    dispatch(editCard(editedCard));
    setEdit(false);
    handleClose();
  };

  const onDeleteUser = (id: number) => {
    dispatch(deleteCard(id));
  };

  // JSX structure for rendering the component
  return (
    <>
      <div className="d-flex">
        <div className="d-flex mb-3">
          <Form.Control
            type="text"
            placeholder="Search by ID, Cardholder, or IBAN"
            onChange={onSearchChange}
            className="search-input" // Apply the custom style class
          />
          <Button
            variant="secondary"
            onClick={clearSearch}
            className="clear-btn"
          >
            Clear
          </Button>
        </div>

        {/* Add button to trigger modal for adding a new card */}
        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="primary"
            onClick={handleShow}
            title="Add Card"
            className="add-card-btn" // Apply the custom style class
          >
            <FaPlus /> Add Card
          </Button>
        </div>
      </div>

      {/* Table displaying card information */}
      <Table striped bordered hover variant="dark" className="custom-table">
        <thead className="custom-table-header">
          <tr>
            <th>ID</th>
            <th>Cardholder</th>
            <th>Card Number</th>
            <th>IBAN</th>
            <th>Account</th>
            <th>Expire Date</th>
            <th>Active/Inactive</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through cards to render table rows */}
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{`${card.firstName} ${card.lastName}`}</td>
              <td>{card.cardNumber}</td>
              <td>{card.iban}</td>
              <td>{card.account}</td>
              <td>{card.expireDate}</td>
              <td>{card.isActive ? "Active" : "Inactive"}</td>
              <td>{card.description}</td>
              <td>
                {/* Buttons for editing and deleting a card */}
                <Button
                  variant="info"
                  title="Edit user details"
                  onClick={() => onEdit(card)}
                  className="edit-btn" // Apply the custom style class
                >
                  <FaPencilAlt />
                </Button>{" "}
                <Button
                  variant="danger"
                  title="Delete user"
                  onClick={() => onDeleteUser(card.id)}
                  className="delete-btn" // Apply the custom style class
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding/editing a card */}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            editing ? onUpdateUser(newUser) : onFormSubmit(newUser);
          }}
        >
          <Modal.Header closeButton>
            {editing ? (
              <Modal.Title>Edit Card</Modal.Title>
            ) : (
              <Modal.Title>Add Card</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            {/* Form fields for card details */}
            <Form.Group className="mb-3" controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                value={newUser.id ?? ""}
                onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                placeholder="Enter ID"
                disabled // Disable editing of ID
              />
            </Form.Group>
            {/* ... (similar structure for other form fields) */}
          </Modal.Body>

          {/* Modal footer with close and submit buttons */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleClose}
              disabled={!newUser.firstName} // Add your condition here
            >
              {editing ? "Update" : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CardList; // Export the CardList component as the default export
