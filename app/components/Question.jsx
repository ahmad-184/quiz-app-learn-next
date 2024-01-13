import { memo } from "react";

const Question = ({
  data,
  showResult,
  handleSelectAnswer,
  selectedAnswer,
  correctAnswer,
  activeAnswer,
}) => {
  const { text, id } = data;

  return (
    <>
      {!showResult && (
        <div
          className={`p-3 rounded-lg hover:cursor-pointer ${
            id === activeAnswer ? "bg-gray-300" : "bg-gray-700"
          }`}
          onClick={handleSelectAnswer}
        >
          <p
            className={id === activeAnswer ? "text-gray-900" : "text-gray-200"}
          >
            {text}
          </p>
        </div>
      )}
      {showResult &&
        (() => {
          const isThisCorrectAnswer = Boolean(id === correctAnswer);
          const isAnswerWrong = Boolean(
            id === selectedAnswer && id !== correctAnswer
          );

          return (
            <div
              className={`
                flex justify-between items-center p-4 rounded-lg select-none 
              ${
                isThisCorrectAnswer
                  ? "bg-emerald-600"
                  : isAnswerWrong
                  ? "bg-rose-700"
                  : "bg-gray-700"
              }`}
            >
              <p className="text-gray-200">{text}</p>
            </div>
          );
        })()}
    </>
  );
};

export default memo(Question);
