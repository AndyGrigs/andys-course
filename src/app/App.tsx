
import { Breadcrumbs } from "../components/Breadcrumps/Breadcrumps";
import { Header } from "../components/Header";
import { AppRouter } from "./routes/Router";

import { useTheme } from "./theme/ThemeContext";
import { useEffect } from "react";

//42181
function App() {
  const { theme } = useTheme();
  // const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <Header />
      <div style={{}}>
        <Breadcrumbs />
      </div>
      {/* <Divider /> */}
      <section className="content-page">
        <AppRouter />
      </section>
      {/* <LanguageSelector />
      <h1>{t('welcome')}</h1>; */}
    </div>
  );
}

export default App;


/**
 * 
 * import React from 'react';

const WelcomeComponent: React.FC = () => {

  return <h1>{t('welcome')}</h1>;
};

export default WelcomeComponent;
 */