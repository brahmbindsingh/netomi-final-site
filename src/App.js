import "./App.css";
import { useEffect, useState } from "react";
import Form from "./Components/Form/Form";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./Components/Home/Home";

function App() {

  const [formErrors, setFormErrors] = useState({})
  const [submitted, setSubmitted] = useState(false);

  const getFormErrors = (errors) => {
    setFormErrors(errors)
  }

  const getSubmitted = (value) => {
    setSubmitted(value);
  }

  useEffect(()=>{
    submitted && window.addEventListener('message', (event)=>{
      setFormErrors(event.data);
    })
  }, [submitted])

  const data = {
    validators: [
      {
        field: "name",
        validator: [{ required: true }, { lengthCheck: true }],
      },
      {
        field: "contactNumber",
        validator: [{ lengthCheck: true }],
      },
      {
        field: "country",
        validator: [{ required: true }],
      },
      {
        field: "state",
        validator: [{ required: true }],
      },
      {
        field: "email",
        validator: [{ checkValid: true }],
      },
    ],
  };
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element = {<Home submitted = {submitted} formErrors = {formErrors} />} />
          <Route exact path="/form" element={<Form data = {data} getSubmitted = {getSubmitted} getFormErrors = {getFormErrors} />} />
        </Routes>
      </Router>
      <section style={{position: "relative"}}>
        { submitted && Object.keys(formErrors).length===0 && ( <div>{`Result: {"Success": "All fields are valid"}`}</div> )}
        { submitted && Object.keys(formErrors).length!==0 &&
          Object.keys(formErrors).map((el, index)=>{
            return <div key={index}>Result: {`"${el}": "${JSON.stringify(formErrors[el])}"`}</div>
          })
        }
      </section>
    </>
  );
}

export default App;