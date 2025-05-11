import PropTypes from "prop-types";
import { Component } from "react";

const ContactList = ({ contacts, handleDelete }) => (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button type="button" onClick={() => handleDelete(contact.id)}>
          Delete
          </button>
        </li>

      ))}
    </ul>
  );
  
  ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  

export default ContactList;