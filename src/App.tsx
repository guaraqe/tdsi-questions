import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Pagination } from "react-daisyui";
import ReactMarkdown from "react-markdown";

import BioinformaticsQuestions, {
  useBioinformaticsQuestions,
} from "./bioinformatics/BioinformaticsQuestions";
import BioinformaticsCoding from "./bioinformatics/BioinformaticsCoding";
import BioinformaticsOral, {
  useRandomQuestion,
} from "./bioinformatics/BioinformaticsOral";
import Instructions from "./instructions";
import Calculator from "./calculator";
import Notes from "./notes";
import { useQuestionsProps } from "./questions/Questions";

type PartName = "coding" | "oral" | "question";

type Part = {
  name: PartName;
  component: React.ReactNode;
};

const partNames: PartName[] = ["question", "coding", "oral"];

const App: FC<any> = () => {
  const { t } = useTranslation();

  const [currentPart, setCurrentPart] = useState<PartName>("question");

  const { dna, simpleQuestions } = useBioinformaticsQuestions();

  const questionsProps = useQuestionsProps(simpleQuestions.length);

  const question = useRandomQuestion();

  const parts: Part[] = [
    {
      name: "question",
      component: (
        <BioinformaticsQuestions
          dna={dna}
          simpleQuestions={simpleQuestions}
          {...questionsProps}
        />
      ),
    },
    {
      name: "coding",
      component: <BioinformaticsCoding />,
    },
    {
      name: "oral",
      component: <BioinformaticsOral question={question} />,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full component-preview p-4 justify-center gap-2 font-sans">
      <div className="flex flex-col w-full lg:w-2/3 h-full items-center justify-center">
        <Instructions title={t("bioinformatics.instructions.title")}>
          <div className="text-left whitespace-pre-line">
            <ReactMarkdown>
              {t("bioinformatics.instructions.text")}
            </ReactMarkdown>
          </div>
          <div className="font-bold m-1"> {dna.join("")}</div>
          <Pagination className="mt-4">
            {partNames.map((partName) => (
              <Button
                key={partName}
                active={partName === currentPart}
                className="btn-xs lg:btn-md normal-case"
                onClick={() => setCurrentPart(partName)}
              >
                {t(`bioinformatics.instructions.${partName}`)}
              </Button>
            ))}
          </Pagination>
        </Instructions>
        <div className="w-full mt-2 lg:mb-40">
          {parts.map((part) =>
            part.name === currentPart ? part.component : null
          )}
        </div>
      </div>
      <div className="w-full lg:w-1/3">
        <Calculator />
        <Notes />
      </div>
    </div>
  );
};

export default App;
