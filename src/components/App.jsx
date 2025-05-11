import { Component } from "react";
import Phonebook from "./Phonebook/Phonebook";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { nanoid } from "nanoid";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    isCreate: false,
    isDelete: false,
  };

  componentDidMount() {
    if (localStorage.getItem("contact"))
      this.setState({
        contacts: JSON.parse(localStorage.getItem("contact")),
      });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length > this.state.contacts.length) {
      localStorage.setItem("contact", JSON.stringify(this.state.contacts));
      this.setState({
        isDelete: true,
      });
      setTimeout(() => {
        this.setState({
          isDelete: false,
        });
      }, 1500);
    }

    if (prevState.contacts.length < this.state.contacts.length) {
      localStorage.setItem("contact", JSON.stringify(this.state.contacts));
      this.setState({
        isCrete: true,
      });
      setTimeout(() => {
        this.setState({
          isCreate: false,
        });
      }, 1500);
    }
  }

  createUser = (data) => {
    const { contacts } = this.state;
    const normalizedName = data.name.toLowerCase();
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === normalizedName
    );
    if (isDuplicate) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    const newUser = {
      ...data,
      id: nanoid(),
    };
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newUser],
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleDelete = (id) =>
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <Phonebook createUser={this.createUser} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
