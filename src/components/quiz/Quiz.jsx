import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState([{}])
  const [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let options = [option1, option2, option3, option4];
  const checkAnswer = (e, answer) => {
    if (!lock) {
      if (answer === question.ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
        setQuestionAnswered([...questionAnswered,
            {
            "question": data[index].question,
            "answer": "correct"
        }])
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        setQuestionAnswered([...questionAnswered,
            {
            "question": data[index].question,
            "answer": "wrong"
        }])
        options[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      options.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
        <h2> Your Scored {score} out of {data.length}</h2>
        <h2>List of questions</h2>
        {
            questionAnswered.map(({question, answer}, index) => {
                return(
                    question &&
                    <p key={index}>{question} - {answer}</p>
                )
            })
        }
        <button onClick={reset}> Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={() => next()}>Next</button>
          <div className="index">
            {index + 1} of {data.length} question
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
