import { createElement as h, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Badge
} from "@material-ui/core";

import { CloudUpload, CropRotate, Send, Collections } from "@material-ui/icons";
import { appMenuStyles } from "../styles";

const MainMenu = ({ history, imageCount }) => {
  const styles = appMenuStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (selectedIndex === 0) {
      history.push("/app/upload");
    }
  }, []);

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
          key: "menu-upload",
          selected: selectedIndex === 0,
          onClick: () => {
            setSelectedIndex(0);
            history.push("/app/upload");
          }
        },
        h(ListItemIcon, {}, h(CloudUpload)),
        h(ListItemText, {}, `Uploads (${imageCount})`)
      ),
      h(
        ListItem,
        {
          button: true,
          key: "menu-edit",
          selected: selectedIndex === 1,
          onClick: () => {
            setSelectedIndex(1);
            history.push("/app/edit");
          }
        },
        h(ListItemIcon, {}, h(CropRotate)),
        h(ListItemText, {}, "Edit")
      ),
      h(
        ListItem,
        {
          button: true,
          key: "menu-collection",
          selected: selectedIndex === 2,
          onClick: () => {
            setSelectedIndex(2);
            history.push("/app/collection");
          }
        },
        h(ListItemIcon, {}, h(Collections)),
        h(ListItemText, {}, "Collection")
      ),
      h(
        ListItem,
        {
          button: true,
          key: "menu-export",
          selected: selectedIndex === 3,
          onClick: () => {
            setSelectedIndex(3);
            history.push("/app/export");
          }
        },
        h(ListItemIcon, {}, h(Send)),
        h(ListItemText, {}, "Export")
      )
    )
  );
};

export default withRouter(MainMenu);
