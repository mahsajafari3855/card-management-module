// CardForm.tsx

import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import"./CardForm.css"
interface CardFormProps {
  showModal: boolean;
  handleClose: () => void;
  onFormSubmit: (newUser: any) => void;
  editing: boolean;
  editedCard?: any;
}

const CardForm: React.FC<CardFormProps> = ({
  showModal,
  handleClose,
  onFormSubmit,
  editing,
  editedCard,
}) => {
    console.log("Props in CardForm", showModal, editing, editedCard);

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

  const [newUser, setNewUser] = useState(initCurrentUser);

  // Set newUser based on whether it's an edit or add operation
  React.useEffect(() => {
    if (editing) {
      setNewUser(editedCard || initCurrentUser);
    } else {
      setNewUser(initCurrentUser);
    }
  }, [editing, editedCard]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editing ? newUser.id : uuidv4(); // Use existing ID for edit, generate a new one for add
    onFormSubmit({ ...newUser, id });
    handleClose();
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
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

          <Form.Group className="custom-form-group" controlId="formCardNumber">
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
              onChange={(e) => setNewUser({ ...newUser, iban: e.target.value })}
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

          <Form.Group className="custom-form-group" controlId="formExpireDate">
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

          <Form.Group className="custom-form-group" controlId="formDescription">
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
  );
};

export default CardForm;
