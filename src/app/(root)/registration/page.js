"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "react-phone-input-2/lib/style.css";
import "animate.css";
import "./style.css";
import FormGroup from "./form-group";

const Registration = () => {
  const FormFields = [
    { name: "First Name", type: "text", field: "first_name" },
    { name: "Enter your surname", type: "text", field: "sur_name" },
    {
      name: "Enter your primary telephone",
      type: "tel",
      note: "We will provide this telephone to ECO participants when you are engaged for representation. This number should be answered during normal business hours and be accessible, at a minimum, to individuals who speak English and Spanish.",
      field: "telephone",
      required: true,
    },
    {
      name: "Enter your primary email address",
      type: "email",
      note: "This email address should match the email address registered with the Oregon State Bar, or the appropriate bar. We will use this email address for all official correspondence.",
      field: "email",
    },
    {
      name: "Enter your primary physical address",
      type: "text",
      note: "This address is the address where you typically see clients. We will list this address on the official ECO Provider list. This list is available to the public and is available on the internet.",
      field: "address",
    },
    {
      name: "Enter the name of your law firm.",
      type: "text",
      field: "law_firm",
    },
    {
      name: "Are you a member of the Oregon State Bar?",
      type: "text",
      field: "state_bar",
    },
    {
      name: "Enter your Oregon State Bar number.",
      type: "text",
      field: "bar_number",
    },
    {
      name: "Are you registered with EOIR and eligible to practice immediately before the Portland Immigration Court?",
      type: "text",
      note: "In order to be a panel provider, you must be registered with the Portland Immigration Court under the EOIR eRegistry.",
      field: "immigration_court",
    },
    {
      name: "Select all the languages your office currently supports in providing services because you or a staff member speaks the language.",
      type: "select",
      note: "ECO panel attorneys are required to have staff who speak English and Spanish. For languages other than English or Spanish, panel attorneys have access to the ECO language line and ECO contract interpreters in over 100 languages. We will publish the language information in an online directory of providers to help inform ECO participants in selecting service an attorney. Choose as many as you like",
      field: "language",
    },
    {
      name: "Select all your practice areas",
      type: "text",
      note: "We will publish the practice areas in an online directory of providers to help inform ECO participants in selecting service an attorney.",
      field: "practice_areas",
    },
    {
      name: "I have read and accept the terms of the ECO Panel Attorney Program.",
      type: "text",
      field: "eco_panel_attorney",
    },
  ];

  const [steps, setSteps] = useState(0);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [prevAnime, setPrevAnime] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(null);

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected)
  };

  const firstOptionRef = useRef(null);

  const handleChange = (e, field) => {
    setFields({ ...fields, [field]: e.target.value });
    if(selectedOptions){
      setFields({...fields, ['language'] : selectedOptions})
    }
     if (field == "eco_panel_attorney") {
      setFields({ ...fields, [field]: e.target.checked });
    } 
  };

  const handlePhone = (phone, field_name) => {
    fields[field_name] = "+" + phone;
    setErrors({ ...errors, [field_name]: (phone = "") });
  };

  const handleValidation = () => {
    let errors = {};
    let isFormValid = true;
    switch (steps) {
      case 2:
        if (!fields.telephone) {
          isFormValid = false;
          errors["telephone"] = "Please fill this in";
        }
        break;
      case 3:
        if (!fields.email) {
          isFormValid = false;
          errors["email"] = "Please fill this in";
        }
        break;
      case 4:
        if (!fields.address) {
          isFormValid = false;
          errors["address"] = "Please fill this in";
        }
        break;
      case 6:
        if (!fields.state_bar) {
          isFormValid = false;
          errors["state_bar"] = "Please fill this in";
        }
        break;
      case 8:
        if (!fields.immigration_court) {
          isFormValid = false;
          errors["immigration_court"] = "Please fill this in";
        }
        break;
      case 11:
        if (!fields.eco_panel_attorney) {
          isFormValid = false;
          errors["eco_panel_attorney"] = "Please fill this in";
        }
        break;
    }
    setErrors(errors);
    return isFormValid;
  };

  const prevStep = () => {
    setIsActive(true);
    setTimeout(() => {
      setPrevAnime(true);
      setSteps(prev => prev-1);
      setIsActive(false);
    }, 400);
    setPrevAnime(false);
    setErrors("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("hello", fields, selectedOptions);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      if (firstOptionRef.current) {
        firstOptionRef.current.focus();
      }
      setIsActive(true);
      setTimeout(() => {
        setPrevAnime(true);
        setSteps((prev) => prev + 1);
        setIsActive(false)
      }, 400);
      setPrevAnime(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (handleValidation()) {
        if (firstOptionRef.current) {
          firstOptionRef.current.focus();
        }
        setIsActive(true);
        setTimeout(() => {
          setPrevAnime(true);
          setSteps((prev) => prev + 1);
          setIsActive(false)
        }, 400);
        setPrevAnime(false);
      }
    }
  };

  useEffect(() => {
    if (firstOptionRef.current) {
      firstOptionRef.current.focus();
    }
  }, [steps]);

  const animationClass = isActive
    ? "animate__animated animate__fadeOutUp"
    : prevAnime
    ? "animate__animated animate__fadeInUp"
    : "";

  return (
    <div className="container d-flex align-items-center justify-content-center flex-column registration">
      <h2 className="text-dark my-5 fw-bolder">Registration</h2>
      <div className={animationClass}>
        <Form className={`form `} onSubmit={handleSubmit}>
          <FormGroup
            label={FormFields[0].name}
            keyName={FormFields[0].field}
            errors={errors}
            id={0}
            handleChange={handleChange}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            handleKeyDown={handleKeyDown}
          />

          <FormGroup
            label={FormFields[1].name}
            keyName={FormFields[1].field}
            errors={errors}
            id={1}
            handleChange={handleChange}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            handleKeyDown={handleKeyDown}
          />

          <FormGroup
            label={FormFields[2].name}
            keyName={FormFields[2].field}
            errors={errors}
            id={2}
            handlePhone={handlePhone}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            required={true}
            phoneInput={true}
            note={FormFields[2].note}
          />

          <FormGroup
            label={FormFields[3].name}
            keyName={FormFields[3].field}
            errors={errors}
            id={3}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            required={true}
            note={FormFields[3].note}
          />

          <FormGroup
            label={FormFields[4].name}
            keyName={FormFields[4].field}
            errors={errors}
            id={4}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            required={true}
            note={FormFields[4].note}
          />
          <FormGroup
            label={FormFields[5].name}
            keyName={FormFields[5].field}
            errors={errors}
            id={5}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
          />
          <FormGroup
            label={FormFields[6].name}
            keyName={FormFields[6].field}
            errors={errors}
            id={6}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            required={true}
          />
          <FormGroup
            label={FormFields[7].name}
            keyName={FormFields[7].field}
            errors={errors}
            id={7}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
          />
          <FormGroup
            label={FormFields[8].name}
            keyName={FormFields[8].field}
            errors={errors}
            id={8}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            required={true}
            note={FormFields[8].note}
          />
          <FormGroup
            label={FormFields[9].name}
            keyName={FormFields[9].field}
            errors={errors}
            id={9}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            note={FormFields[9].note}
            handleDropdownChange={handleDropdownChange}
            selectedOptions={selectedOptions}
            select={true}
          />
          <FormGroup
            label={FormFields[10].name}
            keyName={FormFields[10].field}
            errors={errors}
            id={10}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            note={FormFields[10].note}
          />
          <FormGroup
            keyName={FormFields[11].field}
            errors={errors}
            id={11}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            firstOptionRef={firstOptionRef}
            steps={steps}
            fields={fields}
            note={FormFields[11].note}
            check={true}
            required={true}
          />
          <div className="mt-3 me-2">
            {steps > 0 && (
              <Button
                size="sm"
                className="btn btn-success mx-2"
                onClick={prevStep}
              >
                Prev
              </Button>
            )}
            {steps < 11 ? (
              <Button
                size="sm"
                className="btn btn-success"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button size="sm" className="btn btn-success" type="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
