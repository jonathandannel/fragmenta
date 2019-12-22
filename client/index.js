import { createElement as h } from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/AppContainer";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

import rootReducer from "./reducers";

const store = createStore(rootReducer);

ReactDOM.render(
  h(
    Provider,
    { store },
    h(ThemeProvider, { theme }, h(HashRouter, { history }, h(AppContainer)))
  ),
  document.getElementById("root")
);
