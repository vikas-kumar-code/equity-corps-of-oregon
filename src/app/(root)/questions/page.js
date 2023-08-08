'use client';
import { useState } from 'react';
import './style.css'

const data = [{ id: 1, ques: "What is Computer", options: ['Electronic', 'Mechanical', 'IT', 'Robot'] }, { id: 2, ques: "What is Mobile", options: ['Android', 'IOS', 'Microsoft', 'Robot'] }, { id: 3, ques: "What is Computer", options: ['Electronic', 'Mechanical', 'IT', 'Robot'] }]
const page = () => {
    const [currentQues, setCurrentQues] = useState(0)
    const [isActive, setIsActive] = useState(false)

    const handleChooseOption = () => {
        setCurrentQues(currentQues + 1)
        setIsActive(true);
        setTimeout(() => setIsActive(false), 100);
    }


    return (
        <div className="container-scroller">
            <div className="question-bg">
                <div className="card question">
                    {currentQues < data.length ? (
                        <div className={` ${isActive ? "slide-in-element-active" : "slide-in-element"}`}>
                            <div className='ques'>{currentQues + 1}. {data[currentQues].ques}</div>
                            {data[currentQues].options.map((option, i) => {
                                return (
                                    <div key={i}>
                                        <button className='btn btn-sm btn-success' onClick={handleChooseOption}>{option}</button>
                                    </div>
                                )
                            })}
                        </div>
                    ) : <div className='test_done'>
                        <h4>You Have Successfully completed your test</h4>
                        <button>Submit</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default page