import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Card } from "react-daisyui";

export const useRandomQuestion = () => {
  const questions = [
    "bioinformatics.oral.rna",
    "bioinformatics.oral.orf",
    "bioinformatics.oral.gene",
  ];

  const random = () => Math.floor(Math.random() * questions.length);

  const [questionIndex] = useState<number>(random);

  return questions[questionIndex];
};

type BioinformaticsOralProps = {
  question: string;
};

export const BioinformaticsOral: FC<BioinformaticsOralProps> = ({
  question,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-slate-100 w-full">
      <Card.Body className="items-center text-center">
        <Card.Title tag="h2">{t("bioinformatics.oral.title")}</Card.Title>
        <div className="w-full text-left">
          <ReactMarkdown className="prose max-w-none">
            {t(question)}
          </ReactMarkdown>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BioinformaticsOral;
