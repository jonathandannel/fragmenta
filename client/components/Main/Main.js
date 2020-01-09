import { createElement as h, useEffect } from "react";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";

import { withRouter, Route, Switch } from "react-router-dom";

import Header from "../Header";
import MainMenu from "./MainMenu";
import Upload from "./Upload";
import Edit from "./Edit";
import Collection from "./Collection";

import {
  setAllUserUploads,
  addUpload,
  addFinishedPhoto,
  setAllFinishedPhotos
} from "../../actions/imageActions";

import { appStyles } from "../styles";
import { getUploadsByUserid, getFinishedPhotosByUserid } from "../../api";

const mapStateToProps = state => {
  return {
    userUploads: state.images.userUploads,
    finishedPhotos: state.images.finishedPhotos
  };
};

const mapDispatchToProps = dispatch => ({
  addUpload: singleUpload => dispatch(addUpload({ singleUpload })),
  setAllUserUploads: allUploads => dispatch(setAllUserUploads({ allUploads })),
  addFinishedPhoto: singlePhoto => dispatch(addFinishedPhoto({ singlePhoto })),
  setAllFinishedPhotos: allPhotos =>
    dispatch(setAllFinishedPhotos({ allPhotos }))
});

const Main = ({
  user,
  setUser,
  setJwt,
  userUploads,
  setAllUserUploads,
  setAllFinishedPhotos,
  finishedPhotos,
  addUpload
}) => {
  const styles = appStyles();

  useEffect(() => {
    getUploadsByUserid({ userid: user.userid }).then(({ images, success }) => {
      if (success) {
        setAllUserUploads(images);
      }
    });

    getFinishedPhotosByUserid({ userid: user.userid }).then(
      ({ images, success }) => {
        if (success) {
          setAllFinishedPhotos(images);
        }
      }
    );
  }, []);

  return user
    ? h(
        "div",
        { className: styles.appWrapper },
        h(Header, { user, setUser, setJwt }),
        h(
          "div",
          { className: styles.splitPane },
          h(MainMenu, {
            uploadCount: userUploads.length,
            collectionCount: finishedPhotos.length
          }),
          h(
            "div",
            { className: styles.main },
            h(
              Switch,
              null,
              h(
                Route,
                { exact: true, path: "/app/upload" },
                h(Upload, { userUploads, addUpload })
              ),
              h(
                Route,
                { exact: true, path: "/app/edit" },
                h(Edit, { userUploads, addUpload, addFinishedPhoto })
              ),
              h(
                Route,
                { exact: true, path: "/app/collection" },
                h(Collection, { finishedPhotos })
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
