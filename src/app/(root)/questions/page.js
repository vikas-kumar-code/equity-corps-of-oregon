"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./form-animation.css";
import FormGroup from "./form-group";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Joi from "joi";

const questions = [
  {
    id: 1,
    component: "question",
    question: "What is Computer",
    options: ["Electronic", "Mechanical", "IT", "Robot"],
    required: true,
  },
  {
    id: 2,
    component: "question",
    question: "What is Mobile",
    options: ["Electronic", "Mechanical", "IT", "Robot"],
    required: true,
  },
  {
    id: 3,
    component: "question",
    question: "What is Computer",
    options: ["Electronic", "Mechanical", "IT", "Robot"],
    required: true,
  },
  {
    id: 4,
    label: "First Name",
    type: "text",
    field: "first_name",
    required: true,
    validation: Joi.string().required(),
  },
  {
    id: 5,
    label: "Enter your surname",
    type: "text",
    field: "sur_name",
    required: true,
    validation: Joi.string().required(),
  },
  {
    id: 6,
    label: "Enter your primary telephone",
    type: "phoneInput",
    note: "We will provide this telephone to ECO participants when you are engaged for representation. This number should be answered during normal business hours and be accessible, at a minimum, to individuals who speak English and Spanish.",
    field: "telephone",
    required: true,
    validation: Joi.number().required(),
  },
  {
    id: 7,
    label: "Enter your primary email address",
    type: "email",
    note: "This email address should match the email address registered with the Oregon State Bar, or the appropriate bar. We will use this email address for all official correspondence.",
    field: "email",
    required: true,
    validation: Joi.string().required(),
  },
  {
    id: 8,
    label: "Enter your primary physical address",
    type: "text",
    note: "This address is the address where you typically see clients. We will list this address on the official ECO Provider list. This list is available to the public and is available on the internet.",
    field: "address",
    required: true,
    validation: Joi.string().min(10).max(255).required(),
  },
  {
    id: 9,
    label: "Enter the name of your law firm.",
    type: "text",
    field: "law_firm",
    validation: Joi.string(),
  },
  {
    id: 10,
    label: "Are you a member of the Oregon State Bar?",
    type: "text",
    field: "state_bar",
    required: true,
    validation: Joi.string().required(),
  },
  {
    id: 11,
    label: "Enter your Oregon State Bar number.",
    type: "text",
    field: "bar_number",
    required: true,
    validation: Joi.number().required(),
  },
  {
    id: 12,
    label:
      "Are you registered with EOIR and eligible to practice immediately before the Portland Immigration Court?",
    type: "text",
    note: "In order to be a panel provider, you must be registered with the Portland Immigration Court under the EOIR eRegistry.",
    field: "immigration_court",
    required: true,
    validation: Joi.string().required(),
  },
  {
    id: 13,
    label:
      "Select all the languages your office currently supports in providing services because you or a staff member speaks the language.",
    type: "select",
    note: "ECO panel attorneys are required to have staff who speak English and Spanish. For languages other than English or Spanish, panel attorneys have access to the ECO language line and ECO contract interpreters in over 100 languages. We will publish the language information in an online directory of providers to help inform ECO participants in selecting service an attorney. Choose as many as you like",
    field: "language",
    validation: Joi.array(),
  },
  {
    id: 14,
    label: "Select all your practice areas",
    type: "text",
    note: "We will publish the practice areas in an online directory of providers to help inform ECO participants in selecting service an attorney.",
    field: "practice_areas",
    required: true,
    validation: Joi.string().required(),
  },
  {
    id: 15,
    label:
      "I have read and accept the terms of the ECO Panel Attorney Program.",
    type: "checkbox",
    field: "eco_panel_attorney",
    required: true,
    validation: Joi.required(),
  },
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({});

  const handleChange = (e, field) => {
    setFields({ ...fields, [field]: e.target.value });
    if (field === "eco_panel_attorney") {
      setFields({ ...fields, [field]: e.target.checked });
    }
  };

  const next = () => {
    if (questions[index].component !== "question") {
      const currentQuestionData = {
        [questions[index].field]: fields[questions[index].field],
      };
      const schema = Joi.object({
        [questions[index].field]: questions[index].validation,
      });

      const { error } = schema.validate(currentQuestionData);

      if (error) {
        setErrors({ [questions[index].field]: error.details[0].message });
      } else {
        setErrors({});
        setIndex(index + 1);
      }
    } else {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      next()
    }
  };

  return (
    <div className="h-75">
      <div
        className={
          index === questions.length - 1 ? `qs-last-container` : `qs-container`
        }
      >
        {questions.map((ques, q) => {
          const {
            label,
            question,
            options,
            type,
            component,
            id,
            field,
            note,
            required,
          } = ques;
          let class_name =
            q === index ? "active_qs" : q < index ? "prev_qs" : "next_qs";
          return (
            <div className={`question ` + class_name} key={`ques-${id}`}>
              <div className="registration_form">
                {component === "question" ? (
                  <div>
                    <h4>
                      {q + 1}. {question}
                    </h4>
                    {options.map((option, i) => {
                      return (
                        <div
                          key={`option-${q}-${i}`}
                          className="qs_form"
                          onClick={() => {
                            setAnswers({ ...answers, [id]: i });
                            next();
                          }}
                        >
                          <Form.Check
                            type="checkbox"
                            id={`option-${q}-${i}`}
                            label={option}
                            checked={answers[id] === i}
                            onChange={() => {}}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    {index === id - 1 && (
                      <div>
                        <FormGroup
                          label={label}
                          field={field}
                          type={type}
                          id={id}
                          note={note}
                          index={index}
                          setIndex={setIndex}
                          required={required}
                          errors={errors}
                          fields={fields}
                          setFields={setFields}
                          handleChange={handleChange}
                          handleEnterPress={handleEnterPress}
                        />
                        <span className="text-danger">
                          {errors[questions[index].field]}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttn_group">
        <div className="ok_qs">
        {index > 0 && (
          <Button onClick={()=>{
            next();
          }} variant="secondary">
            OK
          </Button>
        )}
        </div>
        <div className="submit_qs">
          {index === questions.length - 1 && (
            <Button variant="success">Submit</Button>
          )}
        </div>
      </div>
      <div className="qs-buttons">
        <button onClick={prev}>
          <MdOutlineKeyboardArrowUp className="fs-3" />
        </button>
        <button
          onClick={() => {
            next();
          }}
        >
          <MdOutlineKeyboardArrowDown className="fs-3" />
        </button>
      </div>
    </div>
  );
}
