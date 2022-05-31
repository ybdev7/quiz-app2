import React from "react";
import {
  IQuiz,
  QuizCategory,
  QuizLevel,
} from "../../interfaces/EntityInterfaces";
import IconButton, { IconPosition, IconsList } from "../buttons/IconButton";
import { AiOutlineCalculator } from "react-icons/ai";
import * as AI from "react-icons/ai";

interface IQuizProps {
  quiz: IQuiz;
}

enum CategoryIcons {
  Math = "AiOutlineCalculator",
  Chemistry = "AiOutlineBulb",
  History = "AiOutlineBook",
  French = "AiOutlineComment",
}
/**
 * React.memo used here to guarantee that the quiz ui does not need to be re-rendered if the quiz is already part of the list
 */
const Quiz = React.memo(({ quiz }: IQuizProps) => {
  console.log(`Actually rendering quiz id=${quiz._id}`);

  const divLevelClassNames = [
    "bg-indigo-100 h-auto w-6 md:w-6 lg:w-8 flex items-start justify-center m-0 p-0 bg-cover p-0 m-0 rounded-tl-lg rounded-bl-lg overflow-hidden",
    "bg-indigo-300 h-auto w-6 md:w-6 lg:w-8 flex items-start justify-center m-0 p-0 bg-cover p-0 m-0 rounded-tl-lg rounded-bl-lg overflow-hidden",
    "bg-indigo-500 h-auto w-6 md:w-6 lg:w-8 flex items-start justify-center m-0 p-0 bg-cover p-0 m-0 rounded-tl-lg rounded-bl-lg overflow-hidden",
    "bg-indigo-600 h-auto w-6 md:w-6 lg:w-8 flex items-start justify-center m-0 p-0 bg-cover p-0 m-0 rounded-tl-lg rounded-bl-lg overflow-hidden",
  ];

  const divEasy =
    "bg-indigo-100 h-auto w-6 md:w-6 lg:w-8 flex items-start justify-center m-0 p-0 bg-cover p-0 m-0 rounded-tl-lg rounded-bl-lg overflow-hidden";

  const icon = () => {
    const color = `text-indigo-700`;

    console.log(color);
    const className = `h-6 w-6 inline-block p-0 m-0 ${color}`;
    switch (quiz.category) {
      case QuizCategory.Chemistry:
        return React.createElement(AI[CategoryIcons.Chemistry], {
          className: className,
        });
      case QuizCategory.Math:
        return React.createElement(AI[CategoryIcons.Math], {
          className: className,
        });
      case QuizCategory.French:
        return React.createElement(AI[CategoryIcons.French], {
          className: className,
        });
      case QuizCategory.History:
        return React.createElement(AI[CategoryIcons.History], {
          className: className,
        });
      default:
        return null;
    }
  };
  return (
    <>
      <div
        className="min-w-sm lg:w-7/8 lg:max-w-full
         bg-slate-50 hover:bg-slate-100 rounded-lg shadow-md hover:shadow-lg 
      m-2 sm:m-2 md:m-3 lg:m-4 xl:m-4"
      >
        <div className="max-w-sm w-full lg:max-w-full flex">
          <div className={divLevelClassNames[quiz.level]}>
            <div>{icon()}</div>
          </div>
          <div className="ml-2">
            <div>
              <span className="font-bold text-slate-900">{quiz.title}</span>
              <br />
              <span className="font-light text-slate-700">{quiz.desc}</span>
              <br />
              <span className="font-light text-slate-700">
                {" Level: " + levelToString(quiz.level)}
              </span>
              <br />
              <span className="font-light text-slate-700">
                {" Category: " + categoryToString(quiz.category)}
              </span>
            </div>
            <div className="mt-3 mb-2 flex justify-end">
              <IconButton icon={IconsList.Delete} />
              <IconButton icon={IconsList.Edit} />
              <IconButton text="Preview" />
              <IconButton
                icon={IconsList.ArrowRight}
                iconPos={IconPosition.Right}
                text="Take Quiz"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Quiz;
function levelToString(level: QuizLevel) {
  switch (level) {
    case QuizLevel.Easy:
      return "Easy";
    case QuizLevel.Medium:
      return "Medium";
    case QuizLevel.Advanced:
      return "Advanced";
    case QuizLevel.Expert:
      return "Expoert";
  }
}
function categoryToString(category: QuizCategory) {
  switch (category) {
    case QuizCategory.Chemistry:
      return "Chemistry";
    case QuizCategory.Math:
      return "Math";
    case QuizCategory.History:
      return "History";
    case QuizCategory.French:
      return "French";
  }
}
