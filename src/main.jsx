import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import QueryClientSetup from "./QueryClientSetup.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientSetup>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientSetup>
  </React.StrictMode>
);
