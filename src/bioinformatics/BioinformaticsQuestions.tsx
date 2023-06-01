import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DNA from "./DNA";
import { SimpleQuestion, SimpleQuestions } from "../questions/SimpleQuestions";
import { Questions, QuestionsProps } from "../questions/Questions";
import codonTable from "./codon-table.png";

type BioinformaticsQuestionsProps = QuestionsProps & {
  dna: string[];
  simpleQuestions: SimpleQuestion[];
};

export const useBioinformaticsQuestions = () => {
  const [dna] = useState<string[]>(DNA.randomDNA(20));

  const { t } = useTranslation();

  const simpleQuestions: SimpleQuestion[] = [
    {
      children: (
        <div className="text-left">{t("bioinformatics.questions.gc")}</div>
      ),
      checkAnswer: (answer) => answer === DNA.toGC(dna).toFixed(0),
    },
    {
      children: (
        <div className="text-left">{t("bioinformatics.questions.rna")}</div>
      ),
      checkAnswer: (answer) => answer === DNA.toRNA(dna).join(""),
    },
    {
      children: (
        <div className="text-left">
          {t("bioinformatics.questions.complementary")}
        </div>
      ),
      checkAnswer: (answer) => answer === DNA.toComplementary(dna).join(""),
    },
    {
      children: (
        <div className="text-left">
          {t("bioinformatics.questions.rna-complementary")}
        </div>
      ),
      checkAnswer: (answer) =>
        answer === DNA.toRNA(DNA.toComplementary(dna)).join(""),
    },
    {
      children: (
        <React.Fragment>
          <div className="text-left whitespace-pre-line">
            {t("bioinformatics.questions.orf")}
          </div>
          <img src={codonTable} alt="Codon Table" className="w-full lg:w-1/2" />
          <div className="font-bold m-1"> {dna.join("")}</div>
        </React.Fragment>
      ),
      checkAnswer: (answer) => DNA.allORFs(dna).includes(answer),
    },
  ];

  return { dna, simpleQuestions };
};

export const BioinformaticsQuestions: FC<BioinformaticsQuestionsProps> = ({
  dna,
  simpleQuestions,
  ...props
}) => {
  const Children: FC<QuestionsProps> = (props) => (
    <SimpleQuestions simpleQuestions={simpleQuestions} {...props} />
  );

  return <Questions children={Children} {...props} />;
};

export default BioinformaticsQuestions;
