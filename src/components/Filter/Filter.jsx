import PropTypes from "prop-types";
import { Component } from "react";

const Filter = ({ value, onChange }) => (

    <input
    type="text"
    name="filter"
    value={value}
    onChange={onChange}
    placeholder="Find contacts by name"
  />
    
);
Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  

export default Filter;