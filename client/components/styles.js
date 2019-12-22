import { makeStyles } from "@material-ui/core";

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
    padding: "0.5rem"
  }
}));

export const appMenuStyles = makeStyles(() => ({
  menuPaper: {
    paddingTop: "5rem",
    height: "100vh",
    width: "20vw"
  }
}));

export const splashStyles = makeStyles(() => ({
  main: {
    padding: "5rem",
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    marginTop: "5.5rem",
    minHeight: "50vh"
  },
  loginActions: {
    width: 250,
    display: "flex",
    alignSelf: "center",
    justifyContent: "space-evenly",
    marginTop: "3rem",
    transform: "translateX(-1rem)"
  },
  splashContent: {
    display: "flex",
    marginTop: "2rem",
    flexDirection: "column"
  }
}));

export const appStyles = makeStyles(() => ({
  main: {
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    marginTop: "7rem",
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
  loadingSpinner: {
    display: "flex",
    justifyContent: "center",
    padding: "8rem"
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
