import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Card } from "react-daisyui";

export const BioinformaticsCoding: FC<any> = () => {
  const { t } = useTranslation();

  return (
    <Card className="bg-slate-100 w-full">
      <Card.Body className="items-center text-center">
        <Card.Title tag="h2">{t("bioinformatics.coding.title")}</Card.Title>
        <div className="w-full text-left">
          <ReactMarkdown className="prose max-w-none">
            {t("bioinformatics.coding.text")}
          </ReactMarkdown>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BioinformaticsCoding;
