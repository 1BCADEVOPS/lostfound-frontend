import React, { useState } from "react";
import axios from "axios";

const AddItem = ({ fetchItems }) => {
  const [item, setItem] = useState({
    userName: "",
    phoneNumber: "",
    itemName: "",
    description: "",
    type: "LOST"
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!item.userName.trim()) newErrors.userName = "Please enter your name.";
    if (!item.phoneNumber.trim()) newErrors.phoneNumber = "Please enter a phone number.";
    if (!item.itemName.trim()) newErrors.itemName = "Please enter an item name.";
    if (!item.description.trim()) newErrors.description = "Please enter a description.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await axios.post(`${process.env.REACT_APP_API_URL}/api/items`, item);
    setItem({ userName: "", phoneNumber: "", itemName: "", description: "", type: "LOST" });
    setErrors({});
    fetchItems();
  };

  return (
    <section className="card">
      <h2>Report Lost / Found Item</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label>
            Name
            <input
              name="userName"
              placeholder="Your Name"
              value={item.userName}
              onChange={handleChange}
              className={errors.userName ? "input-error" : ""}
            />
          </label>
          {errors.userName && <div className="error-text">{errors.userName}</div>}
        </div>

        <div className="form-row">
          <label>
            Phone Number
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={item.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "input-error" : ""}
            />
          </label>
          {errors.phoneNumber && <div className="error-text">{errors.phoneNumber}</div>}
        </div>

        <div className="form-row">
          <label>
            Item Name
            <input
              name="itemName"
              placeholder="Item Name"
              value={item.itemName}
              onChange={handleChange}
              className={errors.itemName ? "input-error" : ""}
            />
          </label>
          {errors.itemName && <div className="error-text">{errors.itemName}</div>}
        </div>

        <div className="form-row">
          <label>
            Description
            <input
              name="description"
              placeholder="Description"
              value={item.description}
              onChange={handleChange}
              className={errors.description ? "input-error" : ""}
            />
          </label>
          {errors.description && <div className="error-text">{errors.description}</div>}
        </div>

        <div className="form-row">
          <label>
            Status
            <select name="type" value={item.type} onChange={handleChange}>
              <option value="LOST">LOST</option>
              <option value="FOUND">FOUND</option>
            </select>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddItem;
