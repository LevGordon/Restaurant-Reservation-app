import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ReservationForm from "./ReservationForm";


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
  
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState(undefined);
  
    //USED TO RENDER CURRENT FORM DATA TO BE EDITABLE
    useEffect(() => {
        const abortController = new AbortController();
        setError(error);
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
          setFormData({
            ...resData.data,
            reservation_date: resData.data.reservation_date.slice(0, 10),
          });
        }
    
        loadReservation();
    
        return () => abortController.abort();
      }, [reservation_id]);
  
    const changeHandler = ({ target }) => {
      setFormData({ ...formData, [target.name]: target.name === "people" ? Number(target.value) : target.value });
    };

    // CANCEL HANDLER
    const cancelHandler = () => {
    //   setFormState({ ...initialFormData });
      history.goBack();
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
      
      const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({data: formData}),
      })
      const resData = await response.json();
      if (resData.error) {
        setError(resData.error);
      }
      
      if (response.status !== 400) {
        history.push(`/dashboard/?date=${formData.reservation_date}`);
        }
    }
  

    return (
      <ReservationForm 
      resData={formData}  
      submit={submitHandler} 
      cancel={cancelHandler} 
      change={changeHandler} 
      error={error}
      />


  )
  }

export default EditReservation;