import { createMuiTheme } from "@material-ui/core/styles";
import {
  red,
  teal,
  amber,
  deepOrange,
  indigo,
  lightBlue
} from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red
    // secondary: "#ffffff"
  }
});

export default theme;
