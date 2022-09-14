import React from "react";
import { useHistory } from "react-router";

const { REACT_APP_API_BASE_URL } = process.env;

function ReservationList({ reservation, formatTime }) {
  const history = useHistory();
  let {
    first_name,
    last_name,
    status,
    mobile_number,
    reservation_time,
    reservation_date,
    people,
    reservation_id,
  } = reservation;
  
  let formattedTime = formatTime(reservation_time);
  let formattedHours = Number(formattedTime.slice(0,2)) > 12 ? Number(formattedTime.slice(0,2) % 12) : Number(formattedTime.slice(0,2));
  formattedTime = `${formattedHours}${formattedTime.slice(2)}`;

  const cancelHandler = async (e) => {
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
        const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations/${reservation_id}/status`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({data: { status: "cancelled" } }),
            
          }, history.go(0));
          return response;
          // if (response.status !== 400) {
          //   loadDashboard()
          // } else {
          //   console.log("there was an error")
          //   console.log(response.status)
          // }
    }
  }


  
  const reservationCard = (
    <div id="reservation-card">
      <div id="card-title">
        Reservation for {formattedTime}{" "}
        {new Date(`${reservation_date} ${reservation_time}`).getHours() < 12
          ? "AM"
          : "PM"}
      </div>
      <div>
        <h6 id="card-label">Name:</h6>
        <p id="card-text">
          {first_name} {last_name}
        </p>
        <h6 id="card-label">Status:</h6>
        <p id="card-text" data-reservation-id-status={reservation_id}>{status}</p>
        <h6 id="card-label">Contact Number:</h6>
        <p id="card-text">{mobile_number}</p>
        <h6 id="card-label">Number of Guests:</h6>
        <p id="card-text">{people}</p>
      </div>
      <div className="d-flex justify-content-end">
        {status === "Booked" ? (<button type="button" className="btn btn-secondary px-4 mr-4"><a className="text-light" href={`/reservations/${reservation_id}/seat`}>Seat</a></button>) : <></>}
        <button type="button" className="colorfulBtn">{status === "Booked" ? <a className="text-dark" href={`/reservations/${reservation_id}/edit`}>Edit</a> : null}</button>
        <button type="button" className="colorfulBtn" data-reservation-id-cancel={reservation.reservation_id} onClick={cancelHandler}>{status === "Booked" ? <div> Cancel </div> : null} </button>
      </div>
    </div>
  );

  return reservationCard
}

export default ReservationList;