import React from "react";

const { REACT_APP_API_BASE_URL } = process.env;

function TableList({ table, loadDashboard }) {
  const { table_id, table_name, capacity, reservation_id } = table;

  async function finishBtnHandler() {
    console.log("finishBtnHandler called")
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
        console.log("About to load dashboard")
        loadDashboard()
      } else {
        console.log("there was an error")
        console.log(response.status)
      }
        } catch (error) {
            console.log( "ERROR",error)
        }
      

    
    }
  }

  return (
    <div className="card mx-3" id="tables-list">
    <div className="card-header">
      Table: {table_name}
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item second-background-color">Capacity: {capacity}</li>
      <li className="list-group-item second-background-color" data-table-id-status={table.table_id}>{!reservation_id ? "Free" : "occupied"}</li>
    </ul>
    {reservation_id ? <button type="button" onClick={finishBtnHandler} className="btn btn-primary" data-table-id-finish={table.table_id}>Finish</button> : <></>}
  </div>
)
}

export default TableList;