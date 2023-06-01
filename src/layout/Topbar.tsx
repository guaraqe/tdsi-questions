import React, { FC } from "react";
import { Button, Navbar } from "react-daisyui";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Topbar: FC<any> = ({ children }) => {
  const { t } = useTranslation();

  const onClickLanguage = (lang: string) => () => {
    i18n.changeLanguage(lang);
  };

  const isActive = (lang: string) => i18n.language === lang;

  return (
    <React.Fragment>
      <Navbar className="bg-slate-300">
        <Navbar.Start>
          <Button className="text-m lg:text-xl normal-case" color="ghost">
            {t("ui.title")}
          </Button>
        </Navbar.Start>
        <Navbar.End>
          <div className="text-xs mr-2">{t("ui.language")}</div>
          <Language active={isActive("en")} onClick={onClickLanguage("en")}>
            English
          </Language>
          <Language active={isActive("ru")} onClick={onClickLanguage("ru")}>
            Русский
          </Language>
        </Navbar.End>
      </Navbar>
      {children}
    </React.Fragment>
  );
};

type LanguageProps = {
  active: boolean;
  onClick: () => any;
  children?: React.ReactNode;
};

const Language: FC<LanguageProps> = ({ active, onClick, children }) => {
  return (
    <Button color={active ? "primary" : "ghost"} size="xs" onClick={onClick}>
      {children}
    </Button>
  );
};

export default Topbar;
