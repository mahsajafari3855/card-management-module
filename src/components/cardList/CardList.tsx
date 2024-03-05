import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, Modal, Table } from "react-bootstrap";
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
} from "../../features/cards/cardsSlice";
import { searchCards, setSearchResults } from "../../features/cards/cardsSlice";
import SearchCardInput from "../searchCardInput/SearchCardInput";

export const CardList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector(selectAllCards);
  // Fetch cards when the component mounts
  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

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

  const handleShow = () => {
    setShow(true);
    if (editing === false) {
      setNewUser(initCurrentUser);
    }
  };

  const handleClose = () => {
    setShow(false);
  };
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
  

  const onUpdateUser = (editedCard: any) => {
    dispatch(editCard(editedCard));
    setEdit(false);
    handleClose();
  };

  const onDeleteUser = (id: number) => {
    dispatch(deleteCard(id));
  };

  return (
    <>
      <div className="d-flex">
        <div className=" d-flex mb-3">
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
        <div className=" d-flex justify-content-center align-items-center">
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
                <Button
                  variant="info"
                  title="Edit user details"
                  onClick={() => onEdit(card)}
                  className="                  edit-btn
" // Apply the custom style class
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
      <Modal size="lg" show={show} onHide={handleClose}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            editing ? onUpdateUser(newUser) : onFormSubmit(newUser);
          }}
        >
          <Modal.Header className="custom-close-button">
            {editing ? (
              <Modal.Title>Edit Card</Modal.Title>
            ) : (
              <Modal.Title>Add Card</Modal.Title>
            )}
            <button className="custom-close-button">close</button>
          </Modal.Header>
          <Modal.Body className="custom-modal-body">
            <Form.Group className="custom-form-group" controlId="formId">
              <Form.Label className="custom-form-label">ID</Form.Label>
              <Form.Control
                type="text"
                value={newUser.id ?? ""}
                onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                placeholder="Enter ID"
                disabled // Disable editing of ID
                className="custom-form-control"
              />
            </Form.Group>

            <Form.Group className="custom-form-group" controlId="formFirstName">
              <Form.Label className="custom-form-label">First Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                placeholder="Enter First Name"
                className="custom-form-control"
              />
            </Form.Group>

            <Form.Group className="custom-form-group" controlId="formLastName">
              <Form.Label className="custom-form-label">Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                placeholder="Enter Last Name"
                className="custom-form-control"
              />
            </Form.Group>

            <Form.Group
              className="custom-form-group"
              controlId="formCardNumber"
            >
              <Form.Label className="custom-form-label">Card Number</Form.Label>
              <Form.Control
                type="text"
                value={newUser.cardNumber}
                onChange={(e) =>
                  setNewUser({ ...newUser, cardNumber: e.target.value })
                }
                placeholder="Enter Card Number"
                className="custom-form-control"
              />
            </Form.Group>

            <Form.Group className="custom-form-group" controlId="formIban">
              <Form.Label className="custom-form-label">IBAN</Form.Label>
              <Form.Control
                type="text"
                value={newUser.iban}
                onChange={(e) =>
                  setNewUser({ ...newUser, iban: e.target.value })
                }
                placeholder="Enter IBAN"
                className="custom-form-control"
              />
            </Form.Group>

            <Form.Group className="custom-form-group" controlId="formAccount">
              <Form.Label className="custom-form-label">Account</Form.Label>
              <Form.Control
                type="text"
                value={newUser.account}
                onChange={(e) =>
                  setNewUser({ ...newUser, account: e.target.value })
                }
                placeholder="Enter Account"
                className="custom-form-control"
              />
            </Form.Group>

            <Form.Group
              className="custom-form-group"
              controlId="formExpireDate"
            >
              <Form.Label className="custom-form-label">Expire Date</Form.Label>
              <Form.Control
                type="text"
                value={newUser.expireDate}
                onChange={(e) =>
                  setNewUser({ ...newUser, expireDate: e.target.value })
                }
                placeholder="Enter Expire Date"
                className="custom-form-control"
              />
            </Form.Group>

            <Form.Group className="custom-form-group" controlId="formIsActive">
              <Form.Check
                type="checkbox"
                label="Is Active"
                checked={newUser.isActive}
                onChange={(e) =>
                  setNewUser({ ...newUser, isActive: e.target.checked })
                }
                className="custom-checkbox-label"
              />
            </Form.Group>

            <Form.Group
              className="custom-form-group"
              controlId="formDescription"
            >
              <Form.Label className="custom-form-label">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newUser.description}
                onChange={(e) =>
                  setNewUser({ ...newUser, description: e.target.value })
                }
                placeholder="Enter Description"
                className="custom-form-control"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={handleClose}
              disabled={!newUser.firstName} // Add your condition here
              className="custom-update-submit-button"
            >
              {editing ? "Update" : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default CardList;
