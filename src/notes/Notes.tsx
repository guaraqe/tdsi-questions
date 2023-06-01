import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Card, Textarea } from "react-daisyui";

export const Notes: FC<any> = () => {
  const { t } = useTranslation();

  return (
    <Card className="bg-slate-100 mt-2">
      <Card.Body className="items-center text-center">
        <Card.Title tag="h2">{t("notes.name")}</Card.Title>
        {t("notes.text")}
        <Textarea
          className="w-full font-mono leading-4"
          spellCheck={false}
          rows={10}
        />
      </Card.Body>
    </Card>
  );
};
