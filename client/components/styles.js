import { makeStyles } from "@material-ui/core";

export const loginFormStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "33vw"
  },
  formPaper: {
    padding: "5rem"
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
    marginTop: "1.5rem"
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

export const headerStyles = makeStyles(({ spacing, palette }) => ({
  userInfo: {
    display: "flex"
  },
  appBar: {
    background: "white"
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
    justifyContent: "space-around"
  },
  loginActions: {
    width: 250,
    display: "flex",
    justifyContent: "space-evenly"
  },
  userNameText: {
    fontWeight: 600,
    transform: "scale(0.98)",
    marginRight: spacing(1)
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
