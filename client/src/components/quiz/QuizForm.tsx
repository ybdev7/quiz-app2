import React, { useState } from "react";
import {
  IQuestion,
  IQuiz,
  IUserWithToken,
  QuizCategory,
  QuizLevel,
  UserRole,
} from "../../interfaces/EntityInterfaces";
import IconButton, { IconPosition, IconsList } from "../buttons/IconButton";
import { AiOutlineCalculator } from "react-icons/ai";
import * as AI from "react-icons/ai";
import { useTypedSelector } from "../../store/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import Quiz from "./Quiz";
import QuizQuestion from "./QuizQuiestion";

interface IQuizFormProps {
  quiz: IQuiz;
}

const QuizForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const param = location.state as IQuizFormProps;

  //set all question as having wrong answers
  const defaultAnswers = new Map<string, boolean>();
  param.quiz.questions.map((question) => {
    defaultAnswers.set(question._id as string, false);
  });
  const [answers, setAnswers] = useState<Map<string, boolean>>(defaultAnswers);
  const [isCheckMode, setIsCheckMode] = useState<boolean>(false);

  console.log(param);

  const handleCheck = () => {
    setIsCheckMode(true);
  };

  const handleBack = () => {
    setIsCheckMode(false);
    setAnswers(defaultAnswers);
    navigate(-1);
  };
  const setIsCorrect = (questionId: string, isCorrect: boolean) => {
    //update answer as correct/incorrect
    let newMap = new Map<string, boolean>();
    //create new map
    for (let key of Array.from(answers.keys())) {
      newMap.set(key, answers.get(key) as boolean);
    }
    //toggle this answer
    newMap.set(questionId as string, isCorrect);
    setAnswers(newMap);
  };
  if (param === undefined || param == null)
    return (
      <>
        <div>Oops...No quiz found. Please try again</div>
      </>
    );
  else {
    const quiz = param.quiz;
    let quizPoints = 0;
    let totalPoints = 0;
    for (let key of Array.from(answers.keys())) {
      let score = (
        quiz.questions.find(
          (question) => (question._id as string) === key
        ) as IQuestion
      ).score;
      if (answers.get(key) as boolean) {
        quizPoints += score;
      }
      totalPoints += score;
    }

    return (
      <>
        <div
          className="bg-blue-50 shadow-md
        ml-0 mr-0 
       lg:ml-40 xl:ml-40
       lg:mr-40 xl:mr-40"
        >
          <h3>{`${quiz.title} (${totalPoints} points)`}</h3>
          <h6>{quiz.desc}</h6>
          <div className="my-2">
            {quiz.questions.map((question, index) => (
              <QuizQuestion
                key={question._id}
                question={question}
                numberOrder={index + 1}
                setIsCorrect={setIsCorrect}
                isCheckMode={isCheckMode}
                disabled={isCheckMode}
              />
            ))}
          </div>
          <div className="my-2">
            <IconButton
              icon={IconsList.Check}
              iconPos={IconPosition.Left}
              handleClick={handleCheck}
              disabled={isCheckMode}
              text="Check Answers"
            />
            <IconButton
              icon={IconsList.Back}
              iconPos={IconPosition.Left}
              handleClick={handleBack}
              text="Back To Quizzes"
            />
          </div>
          <div className="ml-2">
            {isCheckMode &&
              `Your Score: ${quizPoints}/${totalPoints} (${Math.round(
                (100 * quizPoints) / totalPoints
              )}%)`}
          </div>
        </div>
      </>
    );
  }
};

export default QuizForm;
