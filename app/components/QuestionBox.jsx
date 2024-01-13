"use client";
import { Suspense, useState, useMemo, memo } from "react";
import Link from "next/link";
import { v4 as uuid4 } from "uuid";

import quiz_data from "@/app/constants/quiz_data";
import Question from "./Question";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Skeleton from "./LoadingSkeleton";

const fakeTimeStop = async () =>
  new Promise((resolve) =>
    setTimeout(resolve, parseFloat(Math.floor(Math.random() * 5000)))
  );

const SuspensedComp = memo(({ Wrapper, ...props }) => {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <Wrapper {...props} />
      </Suspense>
    </>
  );
});

const QuestionBox = () => {
  const [activeQues, setActiveQues] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState({
    answered: [],
    score: 0,
    correct: 0,
    wrong: 0,
  });

  const quiz = useMemo(() => quiz_data.questions[activeQues], [activeQues]);

  const handleSelectAnswer = (id) => {
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
  };

  const handleNextquestion = () => {
    setActiveAnswer(null);
    if (activeQues === quiz_data.questions.length - 1) return;
    setActiveQues(activeQues + 1);
  };

  const handleShowResult = () => {
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
  };

  return (
    <>
      <section className="p-4 bg-gray-800 rounded-lg">
        {showResult && finalResult.answered.length && (
          <>
            <div className="mb-5 text-zinc-200">
              <h2 className="mb-3 text-2xl">نتایج</h2>
              <div className="flex items-center gap-4">
                <p>پاسخ های صحیح: {finalResult.correct}</p>
                <p>پاسخ های غلط: {finalResult.wrong}</p>
              </div>
            </div>
            <div className="mb-4 w-full h-[0.5px] rounded-xl bg-gray-500" />
          </>
        )}
        {!showResult && (
          <>
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex justify-between align-middle">
                <p className="text-gray-100 text-lg">{quiz.question} ؟</p>
                <p className="text-gray-100 text-lg">
                  {activeQues + 1}/{quiz_data.questions.length}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {quiz.answers.map((q) => {
                  return (
                    <SuspensedComp
                      Wrapper={Question}
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
          <div className="flex flex-col gap-8">
            {finalResult.answered.map((q, index) => (
              <div key={q.id + uuid4()}>
                <p className="text-lg mb-3 text-gray-200">
                  {index + 1} - {q.question} ؟
                </p>
                <div className="flex flex-col gap-2">
                  {q.answers.map((answer) => (
                    <Question
                      key={q.id + uuid4()}
                      showResult={showResult}
                      data={answer}
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
                className="flex align-middle cursor-pointer text-gray-200"
              >
                <CaretRight size={24} />
                بعدی
              </span>
            </div>
          )}
        {activeAnswer !== null &&
          !showResult &&
          activeQues === quiz_data.questions.length - 1 && (
            <div className="w-full text-center">
              <button
                className="w-full text-gray-200 bg-gray-900 rounded-xl font-medium text-base border-none
                outline-none cursor-pointer
                py-3 hover:bg-gray-800 transition-colors duration-200
              "
                onClick={handleShowResult}
              >
                دیدن نتایج
              </button>
            </div>
          )}
        {showResult && finalResult.answered.length && (
          <div className="flex items-center gap-8 mt-6 justify-center">
            <p
              onClick={() => window.location.reload()}
              style={{ cursor: "pointer", textDecoration: "underline" }}
              className="cursor-pointer underline text-zinc-200"
            >
              دوباره امتحان میکنم
            </p>

            <Link href={"/"} className="text-zinc-200">
              بازگشت به خانه
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default QuestionBox;
