import { createElement as h } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

import rootReducer from "./reducers";

const store = createStore(rootReducer);

ReactDOM.render(
  h(Provider, { store }, h(ThemeProvider, { theme }, h(App))),
  document.getElementById("root")
);
