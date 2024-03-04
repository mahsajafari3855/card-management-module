import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, Modal, Table } from "react-bootstrap";
import { Toggle } from "rsuite";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { AppDispatch } from "../../store/store";
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
    id: null,
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
    dispatch(addCard(newUser));
    handleClose();
  };

  const onEdit = (card: any) => {
    setEdit(true);
    setNewUser(card);
    handleShow();
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
      {/* ... (rest of your code) ... */}
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
                >
                  <FaPencilAlt />
                </Button>{" "}
                <Button
                  variant="danger"
                  title="Delete user"
                  onClick={() => onDeleteUser(card.id)}
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
          {/* ... (rest of your Modal code) ... */}
        </Form>
      </Modal>
    </>
  );
};
export default CardList