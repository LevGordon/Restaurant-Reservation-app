import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "./ErrorAlert";
import loadDashboard from "../dashboard/Dashboard"

const { REACT_APP_API_BASE_URL } = process.env;

function EditReservation() {
    const history = useHistory();
    const { reservation_id }  = useParams();

    const initialFormState = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: 0,
    };
  
    const [formState, setFormState] = useState(initialFormState);
    const [error, setError] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    //USED TO RENDER CURRENT FORM DATA TO BE EDITABLE
    useEffect(() => {
        const abortController = new AbortController();
        setErrorMessage(error);
        return () => abortController.abort();
      }, [error]);

    useEffect(() => {
        const abortController = new AbortController();
    
        async function loadReservation() {
          const response = await fetch(
            `${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const resData = await response.json();
          setFormState({
            ...resData.data,
            reservation_date: resData.data.reservation_date.slice(0, 10),
          });
        }
    
        loadReservation();
    
        return () => abortController.abort();
      }, [reservation_id]);
  
    const changeHandler = ({ target }) => {
      setFormState({ ...formState, [target.name]: target.name === "people" ? Number(target.value) : target.value });
    };

    // CANCEL HANDLER
    const cancelHandler = () => {
    //   setFormState({ ...initialFormState });
      history.goBack();
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
      
      const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({data: formState}),
      })
      const resData = await response.json();
      if (resData.error) {
        setError(resData.error);
      }
      
      if (response.status !== 400) {
        history.push(`/dashboard/?date=${formState.reservation_date}`);
        }
    }
  
    // currently, ErrorAlert will only display one error message at a time
    // with "Reservations must be place in the future" taking priority
    // needs to be set up so there multiple form valiations will result in multiple messages
    return (
      <div>
      <div className="form-group">
        <form onSubmit={submitHandler}>
          <label htmlFor="first_name">First Name</label>
          <input
            required
            type="text"
            id="first_name"
            name="first_name"
            value={formState.first_name}
            onChange={changeHandler}
          ></input>
          <label htmlFor="last_name">Last Name</label>
          <input
            required
            type="text"
            id="last_name"
            name="last_name"
            value={formState.last_name}
            onChange={changeHandler}
          ></input>
          <label htmlFor="mobile_number">Reservation Contact Number</label>
          <input
            required
            type="text"
            id="mobile_number"
            name="mobile_number"
            placeholder="xxx-xxx-xxxx"
            value={formState.mobile_number}
            onChange={changeHandler}
          ></input>
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            required                
            type="date"
            id="reservation_date"
            name="reservation_date"
            placeholder={new Date()}
            value={formState.reservation_date}
            onChange={changeHandler}
          ></input>
          <label htmlFor="reservation_time">Reservation Start Time</label>
          <input
            required
            type="time"
            id="reservation_time"
            name="reservation_time"
            // placeholder="HH:MM:SS"
            value={formState.reservation_time}
            onChange={changeHandler}
          ></input>
          <label htmlFor="people">Number of Guests</label>
          <input
            required
            type="number"
            id="people"
            name="people"
            value={formState.people}
            onChange={changeHandler}
          ></input>
          <br />
          <button
            type="button"
            name="cancel-btn"
            onClick={cancelHandler}
            className="btn btn-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            name="submit-btn"         
            className="btn btn-secondary"
          >
            Submit
          </button>
        </form>
      </div>
      </div>
    );
  }

export default EditReservation;