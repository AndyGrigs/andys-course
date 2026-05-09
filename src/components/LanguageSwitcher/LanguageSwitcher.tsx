import React from 'react';
import { Segmented } from 'antd';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { label: 'DE', value: 'de' },
  { label: 'UK', value: 'uk' },
  { label: 'EN', value: 'en' },
];

const normalise = (lang: string) => {
  if (lang.startsWith('de')) return 'de';
  if (lang.startsWith('uk')) return 'uk';
  return 'en';
};

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <Segmented
      size="small"
      options={LANGUAGES}
      value={normalise(i18n.language)}
      onChange={(val) => i18n.changeLanguage(val as string)}
    />
  );
};

export default LanguageSelector;
