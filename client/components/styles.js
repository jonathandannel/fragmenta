import { makeStyles } from "@material-ui/core";

export const uploadStyles = makeStyles(() => ({
  mainContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column"
  },
  uploadGallery: {
    display: "flex",
    flexWrap: "wrap"
  },
  imageThumbnail: {
    maxHeight: 200,
    transform: "scale(0.8)"
  },
  checkIcon: {
    color: "lightgreen",
    marginRight: "0.5rem",
    transform: "scale(0.9)"
  },
  confirmUploadContent: {
    display: "flex",
    justifyContent: "space-evenly",
    color: "white",
    marginLeft: "1rem"
  },
  addIcon: {
    marginRight: "0.25rem"
  },
  form: {
    marginLeft: "2rem"
  },
  divider: {
    margin: "1rem 0rem 1rem 0rem"
  }
}));

export const editStyles = makeStyles(() => ({
  mainContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "2rem"
  },
  webcamContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "3rem",
    width: "fit-content"
  },
  imageOutput: {
    display: "flex",
    justifyContent: "center",
    padding: "3rem",
    width: "fit-content"
  },
  imageThumbnail: {
    maxHeight: 200,
    transform: "scale(0.8)"
  },
  spinner: {
    transform: "translateY(5rem)"
  },
  fab: {
    marginRight: "2.5rem"
  },
  fabIcon: {
    marginRight: "0.25rem"
  },
  fabIconLg: {
    marginRight: "0.75rem"
  },
  photoActions: {
    display: "flex"
  },
  choices: {
    width: "100%",
    alignSelf: "flex-start",
    display: "flex"
  },
  divider: {
    margin: "2rem 0rem 3rem 0rem"
  }
}));

export const loginFormStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    flexDirection: "column"
  },
  formPaper: {
    padding: "4.5rem"
  },
  textField: {
    marginBottom: "1.5rem"
  },
  buttonContainer: {
    width: "100%"
  },
  button: {
    width: "100%",
    fontWeight: "bold",
    marginTop: "1.25rem",
    padding: "0.5rem",
    marginBottom: "2rem"
  }
}));

export const appMenuStyles = makeStyles(() => ({
  menuPaper: {
    paddingTop: "5rem",
    height: "100vh",
    width: "23vw"
  }
}));

export const splashStyles = makeStyles(() => ({
  main: {
    padding: "5rem",
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    marginTop: "4rem",
    minHeight: "50vh"
  },
  splashImage: {
    backgroundImage: `url('images/faces.svg')`,
    height: "600px",
    width: "50vw",
    alignSelf: "center",
    backgroundRepeat: "no-repeat"
  },
  loginActions: {
    width: "100%",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: "3rem",
    transform: "translateX(-75px)"
  },
  splashContent: {
    display: "flex",
    flexDirection: "column",
    margin: "3rem",
    maxWidth: "33vw",
    paddingTop: "1rem"
  },
  loginButton: {
    borderRadius: "50px",
    width: "200px",
    height: "75px",
    marginRight: "3rem",
    fontSize: "larger"
  },
  alreadyHave: { textDecoration: "none" },
  alreadyHaveA: { textDecoration: "none" }
}));

export const appStyles = makeStyles(() => ({
  main: {
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    paddingTop: "7rem",
    height: "100vh",
    width: "100%"
  },
  appWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  splitPane: {
    display: "flex"
  },
  link: {
    textDecoration: "none"
  },
  spinnerContainer: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    justifyContent: "space-around",
    transform: "translateY(-5rem)"
  },
  loadingSpinner: {
    display: "flex",
    justifyContent: "center"
  }
}));

export const headerStyles = makeStyles(({ spacing, palette }) => ({
  userInfo: {
    display: "flex"
  },
  link: {
    textDecoration: "none"
  },
  userAvatar: {
    marginRight: spacing(2),
    background: palette.secondary.main
  },
  userName: {
    display: "flex",
    flexDirection: "column",
    color: "white",
    justifyContent: "space-around"
  },
  loginActions: {
    width: 250,
    display: "flex",
    alignSelf: "center",
    justifyContent: "space-evenly"
  },
  userNameText: {
    fontWeight: 600,
    transform: "scale(0.98) translateY(0.1rem)",
    marginRight: spacing(1),
    color: "white"
  },
  logo: {
    color: "white"
  },
  grow: {
    flexGrow: 1
  },
  toolBar: {
    marginLeft: spacing(2),
    display: "flex",
    justifyContent: "space-between"
  },
  userMenu: {
    width: "150px"
  },
  userMenuPopper: {
    zIndex: 5000
  }
}));
