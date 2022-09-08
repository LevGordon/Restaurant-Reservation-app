import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationsList";
import { formatAsTime, previous, next, today } from "../utils/date-time";
import TableList from "./TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])



  const history = useHistory();

  // searches URL query, finds "date" and skips 5 characters. Then the result is sliced out of the query and later formatted.
  const urlQuery = useLocation().search;
  const dateQueryStart = urlQuery.search("date") + 5;
  date = urlQuery.slice(dateQueryStart, dateQueryStart + 10) || date;

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

      listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError); // errors fetching tables adds to reservationsError array
    return () => abortController.abort();
  }

  const reservationsMapped = reservations.map((reservation, index) => (
    <ReservationList
      key={index}
      reservation={reservation}
      date={date}
      formatTime={formatAsTime}
    />
  ));

  const tablesMapped = tables.map((table, index) => (
    <TableList key={index} table={table} setError={setReservationsError} />
  ));

  const previousHandler = () => {
    const previousDate = previous(date);
    history.push(`/dashboard?date=${previousDate}`);
  };

  const nextHandler = () => {
    const nextDate = next(date);
    history.push(`/dashboard?date=${nextDate}`);
  };

  const todayHandler = () => {
    const todayDate = today();
    history.push(`/dashboard?date=${todayDate}`);
  };


  const noReservationsMessage = (
    <div>
      <h5>There are no reservations on {date}</h5>
    </div>
  );


  
  const DashboardRender = (
    <div>
      <div className="row d-flex flex-column">
        <h1
          className="col-12 d-flex flex-wrap"
          style={{ fontFamily: "Oooh Baby" }}
        >
          {new Date().getHours() < 12 ? "Good morning." : "Good evening."}
        </h1>
        <div className="col-12 flex-wrap d-flex flex-wrap justify-content-center">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
      </div>

      <div className="row justify-content-around my-3">
        <button
          type="button"
          name="previous-btn"
          className="ml-auto"
          onClick={previousHandler}
        >
          Previous
        </button>
        <button
          type="button"
          name="next-btn"
          className="mx-3"
          onClick={nextHandler}
        >
          Next
        </button>
        <button
          type="button"
          name="today"
          className="mr-auto"
          onClick={todayHandler}
        >
          Today
        </button>
      </div>

      {reservationsError ? <ErrorAlert error={reservationsError} /> : <></>}
      <hr />
      <div className="row">
        {reservations.length >= 1 ? reservationsMapped : noReservationsMessage}{" "}
      </div>

      <br />

        <div className="col d-flex flex-wrap">
          {tablesMapped.length === 0 ? <h3>No Tables Listed</h3> : tablesMapped}
        </div>
    </div>
  );

  return (
    <main>
      {DashboardRender}
    </main>);
}

export default Dashboard;
