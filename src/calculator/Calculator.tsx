import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Input } from "react-daisyui";

export const Calculator: FC<any> = () => {
  const { t } = useTranslation();

  const [expr, setExpr] = useState<string>("");

  const handleChange = (event: any) => setExpr(event.target.value);

  const calculate = (str: string) => {
    const code = `
'use strict';

function sqrt(num) {
  return Math.sqrt(num);
};

return (${str})
`;

    try {
      // eslint-disable-next-line
      const result = Function(code)();
      if (typeof result == "number") {
        return result;
      }
      return "?";
    } catch (error) {
      return "?";
    }
  };

  return (
    <Card className="bg-slate-100">
      <Card.Body className="items-center text-center">
        <Card.Title tag="h2">{t("calculator.name")}</Card.Title>
        {t("calculator.text")}
        <Input
          className="m-4"
          autoComplete="off"
          value={expr}
          onChange={handleChange}
        />
        <div className="font-bold">{calculate(expr)}</div>
      </Card.Body>
    </Card>
  );
};
