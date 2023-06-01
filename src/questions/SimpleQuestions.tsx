import React, { FC } from "react";
import { Question, QuestionsProps } from "./Questions";

export type SimpleQuestion = {
  children: React.ReactNode;
  checkAnswer: (answer: string) => boolean;
};

export type SimpleQuestionsProps = QuestionsProps & {
  simpleQuestions: SimpleQuestion[];
};

export const SimpleQuestions: FC<SimpleQuestionsProps> = ({
  question,
  completed,
  setCompleted,
  simpleQuestions,
}) => (
  <React.Fragment>
    {simpleQuestions.map(({ children, checkAnswer }, index) => (
      <React.Fragment key={index}>
        {index === question ? (
          <Question
            questionKey={index.toString()}
            checkAnswer={checkAnswer}
            completed={completed[index]}
            setCompleted={() => setCompleted(index)}
          >
            {children}
          </Question>
        ) : null}
      </React.Fragment>
    ))}
  </React.Fragment>
);
