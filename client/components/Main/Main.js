import { createElement as h, useEffect } from "react";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";

import { withRouter, Route, Switch } from "react-router-dom";

import Header from "../Header";
import MainMenu from "./MainMenu";
import Upload from "./Upload";
import Edit from "./Edit";

import { setAllUserImages, addImage } from "../../actions/imageActions";

import { appStyles } from "../styles";
import { getImagesByUserid } from "../../api";

const mapStateToProps = state => {
  return { userImages: state.images.userImages };
};

const mapDispatchToProps = dispatch => ({
  addImage: image => dispatch(addImage(image)),
  setAllUserImages: images => dispatch(setAllUserImages(images))
});

const Main = ({
  user,
  setUser,
  setJwt,
  userImages,
  setAllUserImages,
  addImage
}) => {
  const styles = appStyles();

  useEffect(() => {
    getImagesByUserid({ userid: user.userid }).then(({ images, success }) => {
      if (success) {
        setAllUserImages(images);
      }
    });
  }, []);

  return user
    ? h(
        "div",
        { className: styles.appWrapper },
        h(Header, { user, setUser, setJwt }),
        h(
          "div",
          { className: styles.splitPane },
          h(MainMenu, { imageCount: userImages.length }),
          h(
            "div",
            { className: styles.main },
            h(
              Switch,
              null,
              h(
                Route,
                { exact: true, path: "/app/upload" },
                h(Upload, { userImages, addImage })
              ),
              h(
                Route,
                { exact: true, path: "/app/edit" },
                h(Edit, { userImages, addImage })
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
