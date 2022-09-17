import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import './NewReservationForm.css'

const { REACT_APP_API_BASE_URL } = process.env;

function NewReservations() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    setErrorMessage(error);
    return () => abortController.abort();
  }, [error]);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        data: formData,
      }),
    });
    const resData = await response.json();
    console.log(resData);
    if (resData.error) {
      setError(resData.error);
    }
    if (response.status !== 400) {
      setFormData({ ...initialFormState });
      // history.goBack();
      history.push(`/dashboard?date=${formData.reservation_date}`)
    }
  };

  const handleCancel = () => {
    setFormData({ ...initialFormState });
    history.goBack();
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.name === "people" ? Number(event.target.value) : event.target.value
    });
  };

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
          placeholder="xxx-xxx-xxxx"
          onChange={handleInputChange}
          value={formData.mobile_number}
          required
        />
      </label>

      <label htmlFor="reservation_date">
        reservation date:
        <input
          type="date"
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
          type="time"
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
      <button type="button" onClick={handleCancel}>
        {" "}
        Cancel{" "}
      </button>
      <button type="submit"> Submit </button>
    </form>
  );

  return (
    <div className="main-background">
      {error ? <ErrorAlert errorMessage={errorMessage}/> : <></>}
      <div className="form-group">
      {formElement}
      </div>
    </div>
    

  )
}

export default NewReservations;
