import React from "react";
import { v4 as uuidv4 } from "uuid";
import * as AI from "react-icons/ai";

interface IIconButtonProps {
  text?: string;
  icon?: IconsList;
  iconPos?: IconPosition;
  className?: string;
  disabled?: boolean;
  handleClick: () => void;
}

export enum IconsList {
  Question = "AiOutlineQuestionCircle",
  ArrowRight = "AiFillCaretRight",
  Delete = "AiOutlineDelete",
  Edit = "AiOutlineEdit",
  Preview = "AiOutlineFileSearch",
  Print = "AiOutlinePrinter",
}

export enum IconPosition {
  Left,
  Right,
}
/**
 * React.memo used here to guarantee that the quiz ui does not need to be re-rendered if the button is already part of the list
 */
const IconButton = React.memo(
  ({
    icon,
    text,
    iconPos = IconPosition.Left,
    className = "m-1",
    disabled = false,
    handleClick,
  }: IIconButtonProps) => {
    const iconElLeft = icon
      ? React.createElement(AI[icon], {
          className: "text-slate-700 font-light fill-current w-4 h-4 mr-2",
        })
      : null;
    const iconElRight = icon
      ? React.createElement(AI[icon], {
          className: "text-slate-700 font-light fill-current w-4 h-4 ml-2",
        })
      : null;

    const iconWithoutText = icon
      ? React.createElement(AI[icon], {
          className: "text-slate-700 fill-current w-4 h-4 m-1",
        })
      : null;

    const disabledClassNameButtonWithText =
      "bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shadow hover:shadow-lg font-bold py-1 px-4 rounded-full inline-flex items-center disabled: opacity-50 cursor-not-allowed";
    const enabledClassNameButtonWithText =
      "bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shadow hover:shadow-lg font-bold py-1 px-4 rounded-full inline-flex items-center";

    const classnameButtonWithText = disabled
      ? disabledClassNameButtonWithText
      : enabledClassNameButtonWithText;

    const buttonWithText =
      iconPos === IconPosition.Left ? (
        <button
          key={uuidv4()}
          className={classnameButtonWithText}
          disabled={disabled}
          onClick={handleClick}
        >
          {iconElLeft}
          {/* <AiOutlineQuestion className="text-slate-700 fill-current w-4 h-4 mr-2" /> */}
          {text}
        </button>
      ) : (
        <button
          key={uuidv4()}
          className={classnameButtonWithText}
          disabled={disabled}
          onClick={handleClick}
        >
          {text}
          {iconElRight}
        </button>
      );

    const enabledClassName =
      "bg-slate-100 hover:bg-slate-200 text-slate-700 shadow hover:shadow-lg font-bold py-1 px-2 rounded-full inline-flex items-center ";
    const disabledClassName =
      "bg-slate-100 hover:bg-slate-200 text-slate-700 shadow hover:shadow-lg font-bold py-1 px-2 rounded-full inline-flex items-center disabled:opacity-25 cursor-not-allowed";

    const classNameButtonWOText = disabled
      ? disabledClassName
      : enabledClassName;
    const buttonWithoutText = (
      <button
        key={uuidv4()}
        disabled={disabled}
        className={classNameButtonWOText}
        onClick={handleClick}
      >
        {iconWithoutText}
      </button>
    );

    return (
      <span className={className}>
        {text ? buttonWithText : buttonWithoutText}
      </span>
    );
  }
);

export default IconButton;
