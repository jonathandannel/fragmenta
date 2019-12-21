import { createElement as h, useState, useEffect } from "react";
import { appStyles } from "./styles";
import { Switch, Route } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";

const PageContent = () => {
  const appStyle = appStyles();
  return h(
    "main",
    { className: appStyle.main },
    h(
      Switch,
      null,
      h(Route, { exact: true, path: "/register" }, h(Register)),
      h(Route, { exact: true, path: "/login" }, h(Login))
    )
  );
};

export default PageContent;
