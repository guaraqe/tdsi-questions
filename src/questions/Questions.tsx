import React, { FC, useState } from "react";
import { Button, Card, Pagination, Input } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

////////////////////////////////////////////////////////////////////////////////
// Question

export type QuestionProps = {
  questionKey: string;
  checkAnswer: (answer: string) => boolean;
  children: React.ReactNode;
  completed: boolean;
  setCompleted: () => any;
};

export const Question: FC<QuestionProps> = (props: QuestionProps) => {
  const { t } = useTranslation();

  const { questionKey, checkAnswer, completed, setCompleted, children } = props;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useFormPersist(questionKey, {
    watch,
    setValue,
  });

  const onSubmit = (data: any) => setCompleted();

  const isCorrect = (answer: string) => checkAnswer(answer);

  return (
    <form
      className="flex flex-col w-100 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {children}
      <Input
        className="m-4"
        autoComplete="off"
        placeholder={t("questions.answer") || undefined}
        disabled={completed}
        {...register("answer", {
          required: true,
          validate: isCorrect,
        })}
      />
      {errors.answer && <span>Incorrect</span>}
      {completed ? (
        t("questions.correct")
      ) : (
        <Button type="submit">{t("questions.check")}</Button>
      )}
    </form>
  );
};

////////////////////////////////////////////////////////////////////////////////
// Questions

export type QuestionsProps = {
  question: number;
  setQuestion: (question: number) => any;
  completed: boolean[];
  setCompleted: (index: number) => any;
  numberOfQuestions: number;
};

export const useQuestionsProps = (
  numberOfQuestions: number
): QuestionsProps => {
  const [question, setQuestion] = useState(0);

  const [completed, setCompletedArray] = useState<boolean[]>(
    Array(numberOfQuestions).fill(false)
  );

  const setCompleted = (index: number) =>
    setCompletedArray(
      completed.map((element, ix) => (ix === index ? true : element))
    );

  return {
    question,
    setQuestion,
    completed,
    setCompleted,
    numberOfQuestions,
  };
};

export type Props = QuestionsProps & {
  children: FC<QuestionsProps>;
};

export const Questions: FC<Props> = ({
  children,
  question,
  setQuestion,
  completed,
  setCompleted,
  numberOfQuestions,
}) => {
  const { t } = useTranslation();

  const count = () => {
    const total = completed.length || 1;
    const done = completed.filter((bool) => bool).length || 0;
    const percent = ((done / total) * 100).toFixed(0);
    return `✓ ${percent}%`;
  };

  return (
    <Card className="w-full h-full bg-slate-100">
      <Card.Body className="items-center text-center">
        <Card.Title tag="h2">
          {t("questions.question")} {question + 1}
        </Card.Title>
        {children({
          question,
          setQuestion,
          completed,
          setCompleted,
          numberOfQuestions,
        })}
        <Pages
          currentPage={question}
          numberOfPages={numberOfQuestions}
          setQuestion={setQuestion}
          completed={completed}
        />
        {count()}
      </Card.Body>
    </Card>
  );
};

////////////////////////////////////////////////////////////////////////////////
// Pages

type PagesProps = {
  currentPage: number;
  numberOfPages: number;
  setQuestion: (question: number) => any;
  completed: boolean[];
};

const Pages: FC<PagesProps> = ({
  currentPage,
  numberOfPages,
  setQuestion,
  completed,
}) => {
  const questions = Array.from(Array(numberOfPages).keys());
  return (
    <Pagination className="mt-4">
      {questions.map((question: number, index: number) => (
        <Button
          key={index}
          active={question === currentPage}
          onClick={() => setQuestion(question)}
        >
          {completed[index] ? "✓" : question + 1}
        </Button>
      ))}
    </Pagination>
  );
};

export default Questions;
