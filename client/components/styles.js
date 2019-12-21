import { makeStyles } from "@material-ui/core";

export const registerFormStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "50vw",
    height: "50vh",
    justifyContent: "space-between"
  },
  buttonContainer: {
    width: "100%"
  },
  button: {
    background: "darkseagreen",
    width: "100%",
    fontWeight: "bold",
    color: "white",
    marginTop: "1rem"
  },
  title: {
    alignSelf: "center"
  }
}));

export const loginFormStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "50vw",
    height: "50vh",
    justifyContent: "space-between"
  },
  buttonContainer: {
    width: "100%"
  },
  button: {
    width: "100%",
    fontWeight: "bold",
    marginTop: "1rem"
  },
  title: {
    alignSelf: "center"
  }
}));

export const appStyles = makeStyles(() => ({
  main: {
    padding: "5rem",
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    marginTop: "7rem"
  },
  link: {
    textDecoration: "none"
  }
}));

export const headerStyles = makeStyles(({ spacing }) => ({
  userInfo: {
    display: "flex"
  },
  userAvatar: {
    marginRight: spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    // transform: "scale(0.9)"
  },
  toolBar: {
    marginLeft: spacing(2),
    display: "flex",
    justifyContent: "space-between"
  },
  userAction: {
    marginRight: spacing(2)
  }
}));
