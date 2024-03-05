// CardListDisplay.tsx
import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "./CardListDisplay.css";


interface CardListDisplayProps {
  cards: any[];
  onEdit: (card: any) => void;
  onDelete: (id: number) => void;
}

const CardListDisplay: React.FC<CardListDisplayProps> = ({
  cards,
  onEdit,
  onDelete,
}) => {
  
  
  return (
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
                className="edit-btn"
              >
                <FaPencilAlt />
              </Button>
              <Button
                variant="danger"
                title="Delete user"
                onClick={() => onDelete(card.id)}
                className="delete-btn" // Apply the custom style class
              >
                <FaTrashAlt />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CardListDisplay;
