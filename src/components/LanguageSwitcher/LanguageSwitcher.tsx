// LanguageSelector.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {}

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const { i18n } = useTranslation();
  const [languages, _] = useState(['de', 'uk', 'en']);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;