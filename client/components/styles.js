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

export const appStyles = makeStyles(() => ({
  main: {
    padding: "5rem",
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  appBar: {
    height: "2rem"
  }
}));
