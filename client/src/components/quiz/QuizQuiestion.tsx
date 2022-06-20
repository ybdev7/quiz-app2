import { useState } from "react";
import { IQuiz, IQuestion, IAnswer } from "../../interfaces/EntityInterfaces";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
export interface IQuizQuestionProps {
  question: IQuestion;
  numberOrder: number;
  setIsCorrect: (questionId: string, isCorrect: boolean) => void;
  isCheckMode: boolean;
  disabled: boolean;
}

const QuizQuestion = ({
  question,
  numberOrder,
  setIsCorrect,
  isCheckMode,
  disabled,
}: IQuizQuestionProps) => {
  let defaultMap = new Map<string, boolean>();
  question.answers.map((answer) => {
    defaultMap.set(answer._id as string, false);
  });

  const [isChecked, setIschecked] = useState<Map<string, boolean>>(defaultMap);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

  const correctAnswer: IAnswer = question.answers.find(
    (answer) => answer.isCorrect
  ) as IAnswer;

  let classNameDisabled = "cursor-not-allowed";
  return (
    <>
      <div className="flex">
        {isCheckMode && (
          <span className="h-4 w-4 align-center ml-2">
            {isAnswerCorrect ? (
              <AiOutlineCheck className="fill-green-500 " />
            ) : (
              <AiOutlineClose className="fill-red-500" />
            )}
          </span>
        )}
        {numberOrder
          .toString()
          .concat(". ", question.questionText)
          .concat(` (${question.score} points)`)}
      </div>
      <div className="flex justify-left ml-2">
        {question.answers.map((answer) => (
          <div key={answer._id} className="form-check form-check-inline">
            <input
              className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border 
            border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none 
            transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer disabled:cursor-not-allowed"
              type="radio"
              id={answer._id?.concat("radio")}
              key={answer._id?.concat("answer")}
              value={answer.answerText}
              checked={isChecked.get(answer._id as string) as boolean}
              disabled={disabled}
              onChange={() => {
                let newMap = new Map<string, boolean>();
                //create new map
                for (let key of Array.from(isChecked.keys())) {
                  newMap.set(key, false);
                }
                //toggle this answer
                newMap.set(
                  answer._id as string,
                  !isChecked.get(answer._id as string)
                );
                setIschecked(newMap);
                setIsCorrect(question._id as string, answer.isCorrect);
                setIsAnswerCorrect(answer.isCorrect);
              }}
            ></input>
            <label
              className="form-check-label inline-block text-slate-800 mr-2"
              htmlFor={answer._id?.concat("radio")}
            >
              {answer.answerText}
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-left ml-2 mb-2">
        {isCheckMode && (
          <span>{`Correct Answer: ${correctAnswer.answerText}`}</span>
        )}
      </div>
    </>
  );
};

export default QuizQuestion;
