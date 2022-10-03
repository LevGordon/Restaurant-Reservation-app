import React from "react";



const { REACT_APP_API_BASE_URL } = process.env;

function TableList({ table, loadDashboard }) {
  const { table_id, table_name, capacity, reservation_id } = table;

  async function finishBtnHandler() {
    const alertMessage =
      "Is this table ready to seat new guests?\nThis cannot be undone.";
    if (window.confirm(alertMessage) === true) {
        try {
            const response = await fetch(
                `${REACT_APP_API_BASE_URL}/tables/${table_id}/seat`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({data: {}}),
                }
              );
                if (response.status !== 400) {
        loadDashboard()
      } else {
        console.log(response.status)
      }
        } catch (error) {
            console.log( "ERROR",error)
        }
      

    
    }
  }

  const box = (color) => {
    if(color === "red") {
      return <div className='red-box'></div>
    } else {
      return <div className='green-box'></div>
    }
    
  }


  return (
    <div id="whole-card" className="mx-3 ">
      <div className="row-lg col-sm d-flex justify-content-center">
        <h4 id="table-name">Table: {table_name}</h4>
      </div>
      <ul className='table-card-ul'>
        <div className="row-lg col-sm d-flex justify-content-center">
          <li id="table-info">
            <span className="col">Capacity: </span><span className="col" id="table-info-value">{capacity}</span>
          </li>
        </div>
        <div className="row d-flex justify-content-center">
          <li id="table-info" data-table-id-status={table.table_id}>
          <span className="col">Status: </span>
            <span id="table-info-value">
              {reservation_id ? "Occupied" : "Free"}
              {reservation_id ? box("red") : box("green")}
            </span>
          </li>
        </div>
      </ul>
      <div className="d-flex justify-content-center">
        {reservation_id ? (
          <button
            type="button"
            id="finish-btn"
            data-table-id-finish={table.table_id}
            className='table-list-buttons'
            onClick={finishBtnHandler}
          >
            Finish
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default TableList;