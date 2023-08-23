"use client";
import { useState, useRef, useEffect } from "react";
import "./style.css";
import "../../styles/animation.css";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Joi from "joi";
import Question from "./components/Question";
import Registration from "./components/Registration";

const data = [
  {
    id: 1,
    sn: 1,
    component: "question",
    question:
      "Are you an attorney in good standing with all relevant bar associations, including the Oregon State Bar or a state bar within the United States, and registered to practice before the immigration courts?This question is required.",
    options: [
      { id: 1, option: "Yes" },
      { id: 2, option: "No" },
    ],
    required: true,
  },
  {
    id: 2,
    sn: 2,
    component: "question",
    question:
      "Are you covered and can demonstrate coverage of malpractice insurance covering at least $300,000 per claim through the Professional Liability Fund (PLF) or another similar malpractice insurance?This question is required.",
    options: [
      { id: 1, option: "Yes" },
      { id: 2, option: "No" },
    ],
    required: true,
  },
  {
    id: 3,
    sn: 3,
    component: "question",
    question:
      "Have you practiced immigration law for at least five years before the immigration authorities or are you working under supervision of attorney with at least 5 years of experience?This question is required.",
    options: [
      { id: 1, option: "Yes" },
      { id: 2, option: "No" },
    ],
    required: true,
  },
  {
    id: 4,
    sn: 4,
    component: "question",
    question:
      "Do you have experience or demonstrated ability to communicate with and advocate for immigrants from different cultures?",
    options: [
      { id: 1, option: "Yes" },
      { id: 2, option: "No" },
    ],
    required: true,
  },
  {
    id: 5,
    sn: 5,
    component: "question",
    question:
      "Do you have experience practicing before the immigration courts?",
    options: [
      { id: 1, option: "Yes" },
      { id: 2, option: "No" },
    ],
    required: true,
  },
  {
    id: 6,
    sn: 6,
    component: "question",
    question:
      "Do you have experience in master hearings, motions practice, and merits hearings before the immigration court?This question is required.",
    options: [
      { id: 1, option: "Yes" },
      { id: 2, option: "No" },
    ],
    required: true,
  },
  {
    id: 7,
    sn: 7,
    component: "question",
    question:
      "Do you have access to and regularly use legal research databases, and can you prepare and present written and oral arguments on behalf of immigrants beyond the filing of generic or canned briefs and the making of routine arguments?This question is required.",
    options: [
      { id: 1, option: "Yes" },
      { id: 2, option: "No" },
    ],
    required: true,
  },
  {
    id: 8,
    sn: 8,
    component: "question",
    question:
      "Do you possess good moral and ethical character and have you demonstrated professional demeanor with the immigration courts, the immigration bar, and the legal profession in general?",
    options: [
      { id: 1, option: "Yes" },
      { id: 2, option: "No" },
    ],
    required: true,
  },
  {
    id: 1,
    sn: 1,
    component: "registration",
    label: "Enter your primary telephone",
    type: "phoneInput",
    note: "We will provide this telephone to ECO participants when you are engaged for representation. This number should be answered during normal business hours and be accessible, at a minimum, to individuals who speak English and Spanish.",
    field: "phone",
    validation: Joi.number().required(),
  },
  {
    id: 2,
    sn: 2,
    component: "registration",
    label: "Enter your primary email address",
    type: "text",
    note: "This email address should match the email address registered with the Oregon State Bar, or the appropriate bar. We will use this email address for all official correspondence.",
    field: "email",
    validation: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  },
  {
    id: 3,
    sn: 3,
    component: "registration",
    label: "Enter your primary physical address",
    type: "text",
    note: "This address is the address where you typically see clients. We will list this address on the official ECO Provider list. This list is available to the public and is available on the internet.",
    field: "address",
    required: true,
    validation: Joi.string().min(10).max(255).required(),
  },
  {
    id: 4,
    sn: 4,
    component: "registration",
    label: "Enter the name of your law firm.",
    type: "text",
    field: "law_firm",
    validation: Joi.string().optional(),
  },
  {
    id: 5,
    sn: 5,
    component: "registration",
    label: "Are you a member of the Oregon State Bar?",
    type: "text",
    field: "state_bar",
    required: true,
    validation: Joi.string().required(),
  },
  {
    id: 6,
    sn: 6,
    component: "registration",
    label: "Enter your Oregon State Bar number.",
    type: "text",
    field: "state_bar_number",
    required: true,
    validation: Joi.number().required(),
  },
  {
    id: 7,
    sn: 7,
    component: "registration",
    label:
      "Are you registered with EOIR and eligible to practice immediately before the Portland Immigration Court?",
    type: "text",
    note: "In order to be a panel provider, you must be registered with the Portland Immigration Court under the EOIR eRegistry.",
    field: "immigration_court",
    required: true,
    validation: Joi.string().required(),
  },
  {
    id: 8,
    sn: 8,
    component: "registration",
    label:
      "Select all the languages your office currently supports in providing services because you or a staff member speaks the language.",
    type: "select",
    note: "ECO panel attorneys are required to have staff who speak English and Spanish. For languages other than English or Spanish, panel attorneys have access to the ECO language line and ECO contract interpreters in over 100 languages. We will publish the language information in an online directory of providers to help inform ECO participants in selecting service an attorney. Choose as many as you like",
    field: "language",
    validation: Joi.array(),
  },
  {
    id: 9,
    sn: 9,
    component: "registration",
    label: "Select all your practice areas",
    type: "text",
    note: "We will publish the practice areas in an online directory of providers to help inform ECO participants in selecting service an attorney.",
    field: "practice_areas",
    required: true,
    validation: Joi.string().required(),
  },
  {
    id: 10,
    sn: 10,
    component: "registration",
    label:
      "I have read and accept the terms of the ECO Panel Attorney Program.",
    type: "checkbox",
    field: "eco_panel_attorney",
    required: true,
    validation: Joi.boolean().valid(true).required().messages({
      "any.only": "You must accept the terms and conditions.",
      "any.required": "Terms and conditions checkbox is required.",
    }),
  },
];

export default function Page() {
  const [count, setCount] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const [fields, setFields] = useState({});
  const divRef = useRef(null);

  const next = () => {
    divRef.current.focus();
    let next = true;
    // Validation for questions
    if (data[slideIndex].component === "question") {
      if (
        data[slideIndex].required &&
        parseInt(answers[data[slideIndex]?.id] || 0) <= 0
      ) {
        setError(true);
        next = false;
      }
    } else if (data[slideIndex].component === "registration") {
      const schema = Joi.object({
        [data[slideIndex].field]: data[slideIndex].validation,
      });
      const { error } = schema.validate({
        [data[slideIndex].field]: fields[data[slideIndex].field],
      });
      console.log(error);
      if (error) {
        setError(error.details[0].message);
        next = false;
      }else{
        setError(null)
      }
    }

    if (next && slideIndex < data.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prev = () => {
    divRef.current.focus();
    setError(null);
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      next();
    }
  };

  useEffect(() => {
    // Give the div focus when the component mounts
    divRef.current.focus();
  }, []);

  useEffect(() => {
    count > 0 && next();
    setCount(count + 1);
    console.log(answers);
  }, [answers]);

  return (
    <div
      className="slide-container"
      tabIndex="0" // Make the div focusable
      ref={divRef} // Assign the ref to the div
      onKeyUp={handleKeyPress}
    >
      {data.map((item, index) => {
        let class_name =
          index === slideIndex
            ? "active_slide"
            : index < slideIndex
            ? "prev_slide"
            : "next_slide";
        return (
          <div className={`slide-div ` + class_name} key={`slide-${index}`}>
            {item?.component === "question" && (
              <Question
                index={index}
                data={item}
                setAnswers={setAnswers}
                answers={answers}
                error={error}
                setError={setError}
                next={next}
              />
            )}
            {item?.component === "registration" && (
              <Registration
                index={index}
                data={item}
                setFields={setFields}
                fields={fields}
                error={error}
                setError={setError}
                next={next}
              />
            )}
          </div>
        );
      })}

      <div className="slide-buttons">
        {slideIndex > 0 && (
          <button onClick={prev} className="shadow-sm">
            <MdOutlineKeyboardArrowUp className="fs-3 text-white" />
          </button>
        )}
        <button
          onClick={() => {
            next();
          }}
          className="shadow-sm"
        >
          <MdOutlineKeyboardArrowDown className="fs-3 text-white" />
        </button>
      </div>
    </div>
  );
}
