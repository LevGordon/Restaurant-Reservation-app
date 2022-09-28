import React from 'react'
import ErrorAlert from './ErrorAlert';

function ReservationForm({resData, submit, cancel, change, error}) {
  console.log(submit)

    const formElement = (
        <form onSubmit={submit} className="row-lg col-sm">
          <label htmlFor="first_name">
            First name:
            <input
              type="text"
              name="first_name"
              id="first_name"
              onChange={change}
              value={resData.first_name}
              required
            />
          </label>
    
          <label htmlFor="last_name">
            Last name:
            <input
              type="text"
              name="last_name"
              id="last_name"
              onChange={change}
              value={resData.last_name}
              required
            />
          </label>
    
          <label htmlFor="mobile_number">
            Mobile number:
            <input
              type="number"
              name="mobile_number"
              id="mobile_number"
              placeholder="xxx-xxx-xxxx"
              onChange={change}
              value={resData.mobile_number}
              required
            />
          </label>
    
          <label htmlFor="reservation_date">
            Reservation date:
            <input
              type="date"
              name="reservation_date"
              id="reservation_date"
              onChange={change}
              value={resData.reservation_date}
              required
            />
          </label>
    
          <label htmlFor="reservation_time">
            Reservation time:
            <input
              type="time"
              name="reservation_time"
              id="reservation_time"
              onChange={change}
              value={resData.reservation_time}
              required
            />
          </label>
    
          <label htmlFor="people">
            Amount of people:
            <input
              type="number"
              name="people"
              id="people"
              onChange={change}
              value={resData.people}
              required
            />
          </label>
          <div className="new-res-but-stack"><button onClick={cancel} className='newReservation-buttons'>
            Cancel
          </button>
          <button type="submit" className='newReservation-buttons'> Submit </button>
          </div>    
        </form>
      );
    
      return (
        <div className="main-background">
          {error ? <ErrorAlert error={error} /> : <></>}
          <div className="form-group">{formElement}</div>
        </div>
      );
}

export default ReservationForm