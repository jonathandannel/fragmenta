import { createElement as h, useRef, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from "@material-ui/core";

import { CloudUpload, CropRotate, Send, Collections } from "@material-ui/icons";
import { appMenuStyles } from "./styles";

const AppMenu = ({}) => {
  const styles = appMenuStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return h(
    Paper,
    { elevation: 3, className: styles.menuPaper },
    h(
      List,
      { className: styles.list, component: "nav" },
      h(
        ListItem,
        {
          button: true,
          selected: selectedIndex === 0,
          onClick: () => setSelectedIndex(0)
        },
        h(ListItemIcon, {}, h(CloudUpload)),
        h(ListItemText, {}, "Upload")
      ),
      h(
        ListItem,
        {
          button: true,
          selected: selectedIndex === 1,
          onClick: () => setSelectedIndex(1)
        },
        h(ListItemIcon, {}, h(CropRotate)),
        h(ListItemText, {}, "Edit")
      ),
      h(
        ListItem,
        {
          button: true,
          selected: selectedIndex === 2,
          onClick: () => setSelectedIndex(2)
        },
        h(ListItemIcon, {}, h(Send)),
        h(ListItemText, {}, "Export")
      ),
      h(
        ListItem,
        {
          button: true,
          selected: selectedIndex === 3,
          onClick: () => setSelectedIndex(3)
        },
        h(ListItemIcon, {}, h(Collections)),
        h(ListItemText, {}, "Collection")
      )
    )
  );
};

export default AppMenu;
