import { v4 as uuid4 } from "uuid";

const quiz = {
  totalQuestions: 5,
  questions: [
    {
      id: uuid4(),
      question: "تعداد حلقه های المپیک",
      answers: [
        {
          id: 0,
          text: "۵ عدد",
        },
        {
          id: 1,
          text: "۶ عدد",
        },
        {
          id: 2,
          text: "۷ عدد",
        },
        {
          id: 3,
          text: "۸ عدد",
        },
      ],
      correctAnswer: 0,
      selectedAnswer: null,
    },
    {
      id: uuid4(),
      question: "ارتفاعات سهند در کدام استان قرار دارد",
      answers: [
        {
          id: 0,
          text: "آذربایجان شرقی",
        },
        {
          id: 1,
          text: "آذربایجان غربی",
        },
        {
          id: 2,
          text: "کردستان",
        },
        {
          id: 3,
          text: "زنجان",
        },
      ],
      correctAnswer: 0,
      selectedAnswer: null,
    },
    {
      id: uuid4(),
      question: "کدام درخت نماد صلح است",
      answers: [
        {
          id: 0,
          text: "سرو",
        },
        {
          id: 1,
          text: "زیتون",
        },
        {
          id: 2,
          text: "سیب",
        },
        {
          id: 3,
          text: "نارنج",
        },
      ],
      correctAnswer: 1,
      selectedAnswer: null,
    },
    {
      id: uuid4(),
      question: "تجریه ظروف پلاستیکی چند سال طول میکشد",
      answers: [
        {
          id: 0,
          text: "۵۰ سال",
        },
        {
          id: 1,
          text: "۵۰۰ سال",
        },
        {
          id: 2,
          text: "۵ هزار سال",
        },
        {
          id: 3,
          text: "۵۰ هزار سال",
        },
      ],
      correctAnswer: 1,
      selectedAnswer: null,
    },
    {
      id: uuid4(),
      question: "جزایر لانگرهانس در کجا قرار دارد",
      answers: [
        {
          id: 0,
          text: "اقیانوسیه",
        },
        {
          id: 1,
          text: "لوز المعده",
        },
        {
          id: 2,
          text: "اسپانیا",
        },
        {
          id: 3,
          text: "جمجمه",
        },
      ],
      correctAnswer: 1,
      selectedAnswer: null,
    },
  ],
};

export default quiz;
