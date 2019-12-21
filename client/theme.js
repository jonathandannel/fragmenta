import { createMuiTheme } from "@material-ui/core/styles";
import { red, indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: indigo
    // secondary: "#ffffff"
  }
});

export default theme;
