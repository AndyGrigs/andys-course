import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./app/theme/ThemeContext.tsx";
import './app/theme/themes.scss'
import './index.scss'
import { I18nextProvider } from 'react-i18next';
import i18n from './shared/i18next/i18next';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
