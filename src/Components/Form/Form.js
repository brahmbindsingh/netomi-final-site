import React, { useState } from "react";
import { Country, State } from "country-state-city";
import "./Form.css";

const Form = (props) => {

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contactNumber: "",
    country: "",
    state: "",
  });

  const handleInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const validator = (formValues) => {
    const errors = {};
    props.data.validators.map((el)=>{
      switch(el.field){
        case "email":
          el.validator.map((validate)=>{
            if(validate.checkValid)
              if( formValues.email.length>0 && !isValidEmail(formValues.email))
                errors.Email = {"error": "should only support valid email address"}
              else{}
          })
          break;
        case "name":
          el.validator.map((validate)=>{
            if(validate.required){
              if((formValues.name.trim()).length===0){
                errors.Name = {"error": "Name is required"}
              }
            }
            if(validate.lengthCheck){
              if((formValues.name.trim()).length>0){
                if(formValues.name.length<4 || formValues.name.length>10){
                  errors.Name = {"error": "Length should be between 4-10 characters"}
                }
              }
            }
          })
          break;
        case "contactNumber":
          el.validator.map((validate)=>{
            if(validate.lengthCheck)
              if( formValues.contactNumber > 0 )
                if(formValues.contactNumber.length !== 10)
                  errors.contactNumber = {"error": "mobile number should be of 10 digits"}
              else{}
          })
          break;
        case "country":
          el.validator.map((validate)=>{
            if(validate.required)
              if(!formValues.country)
                errors.Country = {"error": "Country is required"}
          })
          break;
        case "state":
          el.validator.map((validate)=>{
            if(validate.required)
              if(!formValues.state)
                errors.State = {"error": "State is required"}
          })
          break;

        default:
          break
      }
    })
    return errors
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    props.getSubmitted(true);
    // props.getFormErrors(validator(formValues));
    window.postMessage(validator(formValues), "http://localhost:3000")
  }

  return (
    <>
      {/* <form target="myframe" onSubmit={handleSubmit}> */}
      <div target="myframe" className="form">
        <div className="form-fields">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInput}
          />
        </div>
        <div className="form-fields">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInput}
          />
        </div>
        <div className="form-fields">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="number"
            name="contactNumber"
            value={formValues.contactNumber}
            onChange={handleInput}
          />
        </div>
        <div className="form-fields">
          <div className="form-subfields">
            <label htmlFor="country">Country</label>
            <select
              name="country"
              value={formValues.country}
              onChange={handleInput}
            >
              <option value=""></option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-subfields">
            <label htmlFor="state">State</label>
            {formValues.country !== "" && (
              <select
                name="state"
                value={formValues.state}
                onChange={handleInput}
              >
                <option value=""></option>
                {State &&
                  State.getStatesOfCountry(formValues.country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      {/* </form> */}
      </div>
      {/* { isSubmit && Object.keys(formErrors).length===0 && ( <div>{`Result: {"Success": "All fields are valid"}`}</div> )}
      { isSubmit && Object.keys(formErrors).length!==0 &&
        Object.keys(formErrors).map((el, index)=>{
          return <div key={index}>Result: {`"${el}": "${JSON.stringify(formErrors[el])}"`}</div>
        })
      } */}
    </>
  );
};

export default Form;