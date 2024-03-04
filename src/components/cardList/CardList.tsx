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
  fetchCards
} from "../../features/cards/cardsSlice";

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

  const onFormSubmit = (newUser: any) => {
    const id = editing ? newUser.id : uuidv4(); // Use existing ID for edit, generate a new one for add
    editing
      ? dispatch(editCard({ ...newUser, id }))
      : dispatch(addCard({ ...newUser, id }));
    handleClose();
  };



  const onEdit = (card: any) => {
    setEdit(true);
    setNewUser(card);
    handleShow();
    console.log("edit")
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
          <Modal.Header closeButton>
            {editing ? (
              <Modal.Title>Edit Card</Modal.Title>
            ) : (
              <Modal.Title>Add Card</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
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
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                placeholder="Enter Last Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                value={newUser.cardNumber}
                onChange={(e) =>
                  setNewUser({ ...newUser, cardNumber: e.target.value })
                }
                placeholder="Enter Card Number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIban">
              <Form.Label>IBAN</Form.Label>
              <Form.Control
                type="text"
                value={newUser.iban}
                onChange={(e) =>
                  setNewUser({ ...newUser, iban: e.target.value })
                }
                placeholder="Enter IBAN"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAccount">
              <Form.Label>Account</Form.Label>
              <Form.Control
                type="text"
                value={newUser.account}
                onChange={(e) =>
                  setNewUser({ ...newUser, account: e.target.value })
                }
                placeholder="Enter Account"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExpireDate">
              <Form.Label>Expire Date</Form.Label>
              <Form.Control
                type="text"
                value={newUser.expireDate}
                onChange={(e) =>
                  setNewUser({ ...newUser, expireDate: e.target.value })
                }
                placeholder="Enter Expire Date"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIsActive">
              <Form.Check
                type="checkbox"
                label="Is Active"
                checked={newUser.isActive}
                onChange={(e) =>
                  setNewUser({ ...newUser, isActive: e.target.checked })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newUser.description}
                onChange={(e) =>
                  setNewUser({ ...newUser, description: e.target.value })
                }
                placeholder="Enter Description"
              />
            </Form.Group>
          </Modal.Body>

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
export default CardList