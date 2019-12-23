import { createElement as h } from "react";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";

import { withRouter, Route, Switch } from "react-router-dom";

import Header from "../Header";
import AppMenu from "./MainMenu";
import Upload from "./Upload";

import { appStyles } from "../styles";

const mapStateToProps = state => {
  return { images: state.images.userImages };
};

const mapDispatchToProps = dispatch => ({
  addImage: user => dispatch(addImage(image))
});

const Main = ({ user, setUser, setJwt, images, addImage }) => {
  const styles = appStyles();

  return user
    ? h(
        "div",
        { className: styles.appWrapper },
        h(Header, { user, setUser, setJwt }),
        h(
          "div",
          { className: styles.splitPane },
          h(AppMenu),
          h(
            "div",
            { className: styles.main },
            h(
              Switch,
              null,
              h(
                Route,
                { exact: true, path: "/app/upload" },
                h(Upload, { images, addImage })
              ),
              h(
                Route,
                { exact: true, path: "/app/edit" },
                h(Typography, { variant: "h2" }, "Edit")
              ),
              h(
                Route,
                { exact: true, path: "/app/collection" },
                h(Typography, { variant: "h2" }, "Collection")
              ),
              h(
                Route,
                { exact: true, path: "/app/export" },
                h(Typography, { variant: "h2" }, "Export")
              )
            )
          )
        )
      )
    : null;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
