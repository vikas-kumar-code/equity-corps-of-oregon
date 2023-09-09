"use client";
import { useState, useRef, useEffect } from "react";
import "./style.css";
import "../../styles/animation.css";

import Joi from "joi";
import Question from "./components/Question";
import Registration from "./components/Registration";
import Info from "./components/Info";
import LoadingOverlay from "react-loading-overlay";
import common from "@/utils/common";
import { toast } from "react-toastify";

const slideData = [
  {
    component: "info",
    label: "ECO Panel Attorney Program Application & Registration",
    imgUrl: "/images/qs-eco-logo.png",
    button: true,
  },
  {
    component: "info",
    label: "Registration",
    imgUrl: "/images/qs-eco-logo.png",
    button: true,
  },
  {
    id: 1,
    sn: 1,
    component: "registration",
    label: "Enter your first name",
    type: "text",
    field: "first_name",
    validation: Joi.string().required(),
  },
  {
    id: 2,
    sn: 2,
    component: "registration",
    label: "Enter your surname",
    type: "text",
    field: "last_name",
    validation: Joi.string().required(),
  },
  {
    id: 3,
    sn: 3,
    component: "registration",
    label: "Enter your primary telephone",
    type: "phoneInput",
    note: "We will provide this telephone to ECO participants when you are engaged for representation. This number should be answered during normal business hours and be accessible, at a minimum, to individuals who speak English and Spanish.",
    field: "phone",
    validation: Joi.number().required(),
  },
  {
    id: 4,
    sn: 4,
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
    id: 5,
    sn: 5,
    component: "registration",
    label: "Enter your primary physical address",
    type: "text",
    note: "This address is the address where you typically see clients. We will list this address on the official ECO Provider list. This list is available to the public and is available on the internet.",
    field: "address",
    required: true,
    validation: Joi.string().min(10).max(255).required(),
  },
  {
    id: 6,
    sn: 6,
    component: "registration",
    label: "Enter the name of your law firm.",
    type: "text",
    field: "law_firm_name",
    validation: Joi.string().optional(),
  },
  {
    id: 7,
    sn: 7,
    component: "registration",
    label: "Are you a member of the Oregon State Bar?",
    type: "check",
    field: "is_oregon_state_bar_member",
    options: [{ label: 'Yes', value: 1},
    { label: 'No', value: 0}],
    required: true,
    validation: Joi.required()
  },
  {
    id: 8,
    sn: 8,
    component: "registration",
    label: "Enter your Oregon State Bar number.",
    type: "text",
    field: "oregon_state_bar_number",
    required: true,
    validation: Joi.number().required(),
  },
  {
    id: 9,
    sn: 9,
    component: "registration",
    label:
      "Are you registered with EOIR and eligible to practice immediately before the Portland Immigration Court?",
    type: "check",
    note: "In order to be a panel provider, you must be registered with the Portland Immigration Court under the EOIR eRegistry.",
    field: "eoir_registered",
    options: [{ label: 'Yes', value: 1},
    { label: 'No', value: 0}],
    required: true,
    validation: Joi.required(),
  },
  {
    id: 10,
    sn: 10,
    component: "registration",
    label:
      "Select all the languages your office currently supports in providing services because you or a staff member speaks the language.",
    type: "select",
    note: "ECO panel attorneys are required to have staff who speak English and Spanish. For languages other than English or Spanish, panel attorneys have access to the ECO language line and ECO contract interpreters in over 100 languages. We will publish the language information in an online directory of providers to help inform ECO participants in selecting service an attorney. Choose as many as you like",
    field: "languages_supports",
    options:[{ value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "Vietnamese", label: "Vietnamese" },
    { value: "Filipino", label: "Filipino" },
    { value: "Pashto", label: "Pashto" },
    { value: "Dari / Persian", label: "Dari / Persian" },
    { value: "Arabic", label: "Arabic" },
    { value: "Bengali", label: "Bengali" },
    { value: "Chinese", label: "Chinese" },
    { value: "Haitian Creole", label: "Haitian Creole" },
    { value: "French", label: "French" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Hindi", label: "Hindi" },
    { value: "Portuguese", label: "Portuguese" },
    { value: "Tigrinya", label: "Tigrinya" },
    { value: "Russian", label: "Russian" },
    { value: "Turkish", label: "Turkish" },
    { value: "Other", label: "Other" },],
    validation: Joi.array(),
  },
  {
    id: 11,
    sn: 11,
    component: "registration",
    label: "Select all your practice areas",
    type: "select",
    note: "We will publish the practice areas in an online directory of providers to help inform ECO participants in selecting service an attorney.",
    field: "practice_areas",
    required: true,
    options:[{ value: "Adoption", label: "Adoption" },
    { value: "Asylum & Protection", label: "Asylum & Protection" },
    { value: "Business & Employment", label: "Business & Employment" },
    { value: "Consular Processing", label: "Consular Processing" },
    { value: "Deportation - Removal Defense", label: "Deportation - Removal Defense" },
    { value: "Detention Work", label: "Detention Work" },
    { value: "Family", label: "Family" },
    { value: "Naturalization", label: "Naturalization" },
    { value: "Waivers", label: "Waivers" },
    { value: "TPS", label: "TPS" },
    { value: "DACA", label: "DACA" },
    { value: "Other", label: "Other" },],
    validation: Joi.array().required(),
  },
  {
    id: 12,
    sn: 12,
    component: "registration",
    label:
      "I have read and accept the terms of the ECO Panel Attorney Program.",
    type: "checkbox",
    field: "eco_panel_attorney",
    required: true,
    validation: Joi.boolean().valid(true).optional().messages({
      "any.only": "You must accept the terms and conditions.",
      "any.required": "Terms and conditions checkbox is required.",
    }),
    declaration: true,
  },
  {
    component: "info",
    label:
      "Thank you. Your application has been submitted. We process applications quickly. If you are not an Oregon-barred lawyer, please be ready to provide proof of malpractice coverage.",
    imgUrl: "/images/qs-eco-logo.png",
    button: false,
  },
];

export default function Page() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const [fields, setFields] = useState({});
  const divRef = useRef(null);

  function capitalizeEachWord(str) {
    let name = str.match(/"([^"]+)"/)[1];
    let capitalized = name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    let result = str.replace(`"${name}"`, capitalized);
    return result;
  }

  const next = () => {
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
      if (error) {
        console.log(error.details,'Errrrrrroooooooorrrrrrssss');
        let errs = error.details[0].message;
        setError(capitalizeEachWord(errs));
        next = false;
      } else {
        setError(null);
      }
    }

    if (next && slideIndex < data.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prev = () => {
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

  const getQuestions = () => {
    fetch(common.apiPath(`/questions`))
      .then((response) => response.json())
      .then((data) => {
        let questions = [];
        data.records.forEach((record, index) => {
          questions.push({
            id: record.id,
            sn: index + 1,
            component: "question",
            question: record.question,
            options: record.options,
            required: true,
          });
        });
        setData([
          ...slideData.slice(0, 1),
          ...questions,
          ...slideData.slice(1, slideData.length),
        ]);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    // Give the div focus when the component mounts
    getQuestions();
    divRef.current.focus();
  }, []);

  useEffect(() => {
    count > 0 && next();
    setCount(count + 1);
  }, [answers]);

  return (
    <LoadingOverlay active={data.length <= 0} spinner>
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
                  prev={prev}
                />
              )}
              {item?.component === "registration" && (
                <Registration
                  index={index}
                  dataLength={data.length}
                  data={item}
                  setFields={setFields}
                  setAnswers={setAnswers}
                  fields={fields}
                  error={error}
                  setError={setError}
                  next={next}
                  isActive={class_name === "active_slide"}
                  prev={prev}
                  answers={answers}
                />
              )}
              {item?.component === "info" && (
                <Info index={index} data={item} next={next} />
              )}
            </div>
          );
        })}
      </div>
    </LoadingOverlay>
  );
}
