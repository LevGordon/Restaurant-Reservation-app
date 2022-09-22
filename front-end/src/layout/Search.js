import React, { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import ReservationList from "../dashboard/ReservationsList";
import { formatAsTime } from "../utils/date-time";

const { REACT_APP_API_BASE_URL } = process.env;

function Search() {
  const [formState, setFormState] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [altMessage, setAltMessage] = useState("");

  function changeHandler({ target }) {
    setFormState(target.value);
  }

  async function submitHandler(e) {
    e.preventDefault();
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/reservations?mobile_number=${formState}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const resData = await response.json();
    console.log(resData);
    console.log(resData.data.length);
    if (resData.data.length === 0) {
      setAltMessage("No reservations found.");
    }
    if (response.status !== 400) {
      setReservations(resData.data);
    }
    if (resData.error) {
      setReservationsError(resData.error);
    }
  }

  const reservationsList = reservations.map((reservation, index) => {
    return (
      <ReservationList
        key={index}
        reservation={reservation}
        formatTime={formatAsTime}
      />
    );
  });

  return (
    <div className="column" id="background">
      <div>
        {reservationsError ? (
          <ErrorAlert errorMessage={reservationsError} />
        ) : (
          <></>
        )}
      </div>
      <div className="row d-flex justify-content-center">
        <form onSubmit={submitHandler}>
          <label htmlFor="mobile_number" className="search-label">Search:</label>
          <input
            required
            name="mobile_number"
            id="mobile_number"
            className="search-input"
            onChange={changeHandler}
            placeholder="Enter a customer's phone number"
          ></input>
          <button type="submit" className="search-buttons">Find</button>
        </form>
      </div>
      <div>
        <div className="row d-flex justify-content-center">
        {reservationsList.length === 0 ? <h3>Enter phone number above to see associated reservations.</h3> : <h3>Showing reservations for {formState} </h3>}
        </div>
        <div className="row d-flex justify-content-center">
          {reservationsList.length === 0 ? (
            <h3>{altMessage}</h3>
          ) : (
            reservationsList
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Search;
