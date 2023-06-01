import React, { FC } from "react";
import { Card } from "react-daisyui";

export type InstructionsProps = {
  title: string;
  children: React.ReactNode;
};

export const Instructions: FC<InstructionsProps> = ({ title, children }) => (
  <Card className="bg-slate-100 w-full">
    <Card.Body className="items-center text-center">
      <Card.Title tag="h2">{title}</Card.Title>
      {children}
    </Card.Body>
  </Card>
);
