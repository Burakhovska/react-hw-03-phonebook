import PropTypes from "prop-types";
import { Component } from "react";

class Phonebook extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, number } = this.state;

    this.props.createUser({ name, number });

    this.setState(() => ({
      name: "",
      number: "",
    }));
  };

  render() {

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              className="form-control"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              name="number"
              onChange={this.handleChange}
              value={this.state.number}
              className="form-control"
              placeholder="Phone Number"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

Phonebook.propTypes = {
  createUser: PropTypes.func.isRequired,
};

export default Phonebook;
