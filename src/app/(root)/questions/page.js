"use client";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "./style.css";
import "animate.css";

const data = [
  {
    id: 1,
    ques: "What is Computer",
    options: [
      { sno: 1, opt: "Electronic" },
      { sno: 2, opt: "Mechanical" },
      { sno: 3, opt: "IT" },
      { sno: 4, opt: "Robot" },
    ],
  },
  {
    id: 2,
    ques: "What is Mobile",
    options: [
      { sno: 1, opt: "Electronic" },
      { sno: 2, opt: "Mechanical" },
      { sno: 3, opt: "IT" },
      { sno: 4, opt: "Robot" },
    ],
  },
  {
    id: 3,
    ques: "What is Computer",
    options: [
      { sno: 1, opt: "Electronic" },
      { sno: 2, opt: "Mechanical" },
      { sno: 3, opt: "IT" },
      { sno: 4, opt: "Robot" },
    ],
  },
];
const page = () => {
  const [currentQues, setCurrentQues] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [prevAnime, setPrevAnime] = useState(false);
  const [answers, setAnswers] = useState(Array(data.length).fill(null));

  const handleChange = (e) => {
    const selected = parseInt(e.target.value, 10);
    const newAnswers = { ...answers };
    newAnswers[currentQues] = selected;
    setAnswers(newAnswers);
    setPrevAnime(true);
    setTimeout(() => {
      setIsActive(true);
      setCurrentQues(prev => prev+1);
      setPrevAnime(false);
    }, 400);
    setIsActive(false);
  };

  const handlePrev = () => {
    setIsActive(true);
    setTimeout(() => {
      setPrevAnime(true);
      setCurrentQues(prev => prev-1);
      setIsActive(false);
    }, 400);
    setPrevAnime(false);
  };

  const handleInputClick = (index) => {
    const newAnswers = { ...answers };
    newAnswers[currentQues] = index;
    setAnswers(newAnswers);
      setIsActive(true);
    setTimeout(() => {
      setPrevAnime(true);
      setCurrentQues(prev => prev+1);
      setIsActive(false);
    }, 400);
    setPrevAnime(false);
  };

  const handleSubmit = () => {
    console.log(answers);
  };
  return (
    <div className="container-scroller">
      <div className="question-bg">
        <div className="questions">
            {data.map((question, index) => {
              if (index !== currentQues) return null;
              const animationClass = isActive
                ? "animate__animated animate__fadeOutUp"
                : prevAnime
                ? "animate__animated animate__fadeInUp"
                : "";
              return (
                <div className={animationClass}>
                  <h4 className="ques fw-bold">
                    {currentQues + 1}. {question.ques}
                  </h4>
                  {question.options.map((option, i) => {
                    return (
                      <div key={i}>
                        <InputGroup className="my-1">
                          <InputGroup.Checkbox
                            aria-label="Checkbox for following text input"
                            className="check_box"
                            checked={answers[currentQues] === i}
                            value={i}
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control
                            aria-label="Text input with checkbox"
                            className="input"
                            value={option.opt}
                            checked={answers[currentQues] === i}
                            onChange={() => {}}
                            onClick={() => handleInputClick(i)}
                            readOnly
                          />
                        </InputGroup>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          {currentQues > data.length - 1 && (
            <div className="text-center">
              <h2 className="mb-5">
                You Have Successfully completed your test
              </h2>
              <Button
                className="btn btn-sm text-dark btn-success"
                href="/registration"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          )}
          {currentQues > 0 && (
            <Button
              className="btn btn-sm btn-success text-dark my-2"
              onClick={handlePrev}
            >
              Prev
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
