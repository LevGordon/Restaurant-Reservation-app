import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

const { REACT_APP_API_BASE_URL } = process.env;


function SeatTableForm() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [tables, setTables] = useState([]);
  const [error, setError] = useState(undefined);

  function loadTables() {
    const abortController = new AbortController();
    setError(null);

    listTables(abortController.signal).then(setTables).catch(setError);

    return () => abortController.abort();
  }

  useEffect(loadTables, []);

  // the value selected in the form is used to determine where to send the data
  // ex. PUT request to "/tables/1/seat" to update the reservation_id column in "tables"
  const submitHandler = async (e) => {
    e.preventDefault();
    const form = document.getElementById("select");
    const value = form.value;
    const response = await fetch(`${REACT_APP_API_BASE_URL}/tables/${value}/seat`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({data: { reservation_id: reservation_id }}),
      });
      const resData = await response.json();

      if (resData.error) {
        setError(resData.error);
      }
    
      if (response.status !== 400) {
        history.push(`/dashboard`);
      }
  };

  const tableOptions = tables.map((table, index) => {
    return (
      <option key={index} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <div>
      {error ? <ErrorAlert errorMessage={error}/> : <h3 className="h3-seat-table-form">Seat the guests at a table</h3>}
      <div className="form-group">
        <form onSubmit={submitHandler} className='seat-table-form'>
          <label htmlFor="table_id">Choose a table: </label>
          <select required id="select" name="table_id">
            {tableOptions}
          </select>
          <br />
          <button
            type="button"
            className="seat-table-form-buttons"
            onClick={() => history.push('/')}
          >
            Cancel
          </button>
          <button 
          type="submit"
          className="seat-table-form-buttons"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SeatTableForm;