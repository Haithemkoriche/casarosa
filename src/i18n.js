import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import En from "./translations/en.json";
import Dz from "./translations/dz.json";
import Fr from "./translations/fr.json";

const resources = {
  en: { translation: En },
  dz: { translation: Dz },
  fr: { translation: Fr },
};

export default i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export const changeLanguage = (lang) => {
  if (["dz", "en", "fr"].includes(lang) !== true) return;
  if (i18n.language === lang) return;
  let dir = "ltr";
  if (lang === "dz") dir = "rtl";
  localStorage.setItem("lang", lang);
  localStorage.setItem("direction", dir);
  document.getElementsByTagName("html")[0].setAttribute("lang", lang);
  document.getElementsByTagName("html")[0].setAttribute("dir", dir);
  i18n.changeLanguage(lang);
};

const initLanguage = () => {
  const lang = localStorage.getItem("lang");
  if (lang === null) {
    localStorage.setItem("lang", "en");
    localStorage.setItem("direction", "ltr");
    return;
  }
  changeLanguage(lang);
};

initLanguage();
