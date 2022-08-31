import React, { useState } from "react";
import { useHistory } from "react-router-dom"

function NewReservations() {

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData.first_name, formData.last_name, formData.mobile_number, formData.reservation_date, formData.reservation_time, formData.people)
    setFormData({ ...initialFormState })
    history.push('/dashboard')
  }

  const handleCancel = () => {
    setFormData({ ...initialFormState })
    history.goBack()
  }

  const handleInputChange = (event) => {
          setFormData({
      ...initialFormState, ...formData,
      [event.target.name]: event.target.value,
    })
    
  }

  const formElement = (
    <form className="form" onSubmit={handleSubmit}>
      
      <label htmlFor="first_name">
        first name:
        <input
          type="text"
          name="first_name"
          id="first_name"
          onChange={handleInputChange}
          value={formData.first_name}
          required
        />
      </label>

      <label htmlFor="last_name">
        last name:
        <input
          type="text"
          name="last_name"
          id="last_name"
          onChange={handleInputChange}
          value={formData.last_name}
          required
        />
      </label>

      <label htmlFor="mobile_number">
        mobile number:
        <input
          type="text"
          name="mobile_number"
          id="mobile_number"
          onChange={handleInputChange}
          value={formData.mobile_number}
          required
        />
      </label>

      <label htmlFor="reservation_date">
        reservation date:
        <input
          type="text"
          name="reservation_date"
          id="reservation_date"
          onChange={handleInputChange}
          value={formData.reservation_date}
          required
        />
      </label>

      <label htmlFor="reservation_time">
        reservation time:
        <input
          type="text"
          name="reservation_time"
          id="reservation_time"
          onChange={handleInputChange}
          value={formData.reservation_time}
          required
        />
      </label>

      <label htmlFor="people">
        amount of people:
        <input
          type="number"
          name="people"
          id="people"
          onChange={handleInputChange}
          value={formData.people}
          required
        />
      </label>
      <button type="button" onClick={handleCancel} > Cancel </button>
      <button type="submit"> Submit </button>
    </form>
  );

  return formElement;
}

export default NewReservations;
