import { memo } from "react";
import styles from "@/app/styles/question.module.css";

const Question = ({
  data,
  showResult,
  handleSelectAnswer,
  activeAnswer,
  selectedAnswer,
  correctAnswer,
}) => {
  const { text, id } = data;

  return (
    <>
      {!showResult && (
        <div
          className={`${styles.box} ${
            activeAnswer === id && styles.box_active
          }`}
          onClick={handleSelectAnswer}
        >
          <p>{text}</p>
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
              className={
                isThisCorrectAnswer
                  ? styles.correct
                  : isAnswerWrong
                  ? styles.wrong
                  : ""
              }
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                borderRadius: "10px",
                userSelect: "none",
                ...(!isAnswerWrong &&
                  !isThisCorrectAnswer && {
                    backgroundColor: "#232323",
                  }),
              }}
            >
              <p>{text}</p>
            </div>
          );
        })()}
    </>
  );
};

export default memo(Question);
