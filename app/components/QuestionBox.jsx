"use client";
import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { v4 as uuid4 } from "uuid";

import quiz_data from "@/app/constants/quiz_data";
import Question from "./Question";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

// const fakeTimeStop = () =>
//   new Promise((resolve) =>
//     setTimeout(resolve, parseFloat(Math.floor(Math.random() * 5000)))
//   );

const QuestionBox = () => {
  const [activeQues, setActiveQues] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  // const [result, setResult] = useState({
  //   answered: [],
  //   score: 0,
  //   correct: 0,
  //   wrong: 0,
  // });
  const [finalResult, setFinalResult] = useState({
    answered: [],
    score: 0,
    correct: 0,
    wrong: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setActiveAnswer(2);
    }, 5000);
  }, []);

  const quiz = useMemo(() => quiz_data.questions[activeQues], [activeQues]);

  const handleSelectAnswer = useCallback((id) => {
    setActiveAnswer(id);
    const question_existed = finalResult.answered.find((q) => q.id === quiz.id);
    if (question_existed) {
      const question_index = finalResult.answered.findIndex(
        (q) => q.id === quiz.id
      );
      const updatedData = {
        ...finalResult.answered[question_index],
        selectedAnswer: id,
      };
      setFinalResult({
        ...finalResult,
        answered: finalResult.answered.map((q) => {
          if (q.id === quiz.id) return { ...updatedData };
          else return { ...q };
        }),
      });
    } else {
      setFinalResult({
        ...finalResult,
        answered: [
          ...finalResult.answered,
          {
            ...quiz,
            selectedAnswer: id,
          },
        ],
      });
    }
  }, []);

  const handleNextquestion = useCallback(() => {
    setActiveAnswer(null);
    if (activeQues === quiz_data.questions.length - 1) return;
    setActiveQues(activeQues + 1);
  }, []);

  const handleShowResult = useCallback(() => {
    let correctCount = 0;
    let wrongCount = 0;
    for (const item of finalResult.answered) {
      if (item.correctAnswer === item.selectedAnswer) correctCount++;
      else wrongCount++;
    }
    setFinalResult({
      ...finalResult,
      correct: correctCount,
      wrong: wrongCount,
    });
    setShowResult(true);
  }, []);

  return (
    <>
      <section>
        {showResult && finalResult.answered.length && (
          <div style={{ marginBottom: "1.5rem", color: "whitesmoke" }}>
            <h2 style={{ marginBottom: "10px" }}>نتایج</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <p>پاسخ های صحیح: {finalResult.correct}</p>
              <p>پاسخ های غلط: {finalResult.wrong}</p>
            </div>
          </div>
        )}
        {!showResult && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 19 }}>{quiz.question} ؟</p>
                <p style={{ fontSize: 19 }}>
                  {activeQues + 1}/{quiz_data.questions.length}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {quiz.answers.map(async (q) => {
                  return (
                    <Question
                      key={q.id + uuid4()}
                      data={q}
                      handleSelectAnswer={() => handleSelectAnswer(q.id)}
                      activeAnswer={activeAnswer}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
        {showResult && finalResult.answered.length && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {finalResult.answered.map((q) => (
              <div key={q.id + uuid4()}>
                <p style={{ fontSize: 19, marginBottom: "10px" }}>
                  {q.question} ؟
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {q.answers.map((answer) => (
                    <Question
                      key={q.id + uuid4()}
                      data={answer}
                      showResult={showResult}
                      selectedAnswer={q.selectedAnswer}
                      correctAnswer={q.correctAnswer}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeAnswer !== null &&
          activeQues !== quiz_data.questions.length - 1 && (
            <div>
              <span
                onClick={handleNextquestion}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <CaretRight size={24} />
                بعدی
              </span>
            </div>
          )}
        {activeAnswer !== null &&
          !showResult &&
          activeQues === quiz_data.questions.length - 1 && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <button
                style={{
                  width: "100%",
                  color: "rgb(33, 33, 33)",
                  backgroundColor: "whitesmoke",
                  padding: 8,
                  borderRadius: 9,
                  fontWeight: "500",
                  fontFamily: "inherit",
                  fontSize: 16,
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
                onClick={handleShowResult}
              >
                دیدن نتایج
              </button>
            </div>
          )}
        {showResult && finalResult.answered.length && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              marginTop: "1.5rem",
              justifyContent: "center",
            }}
          >
            <p
              onClick={() => window.location.reload()}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              دوباره امتحان میکنم
            </p>

            <Link href={"/"}>بازگشت به خانه</Link>
          </div>
        )}
      </section>
    </>
  );
};

export default QuestionBox;
