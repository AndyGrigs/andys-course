import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
);
