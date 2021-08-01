import React from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./style";
import DialogAddProduct from '../../../Components/Dialog'

const Grid = () => {
  const classes = useStyles()
  return (
    <Fab className={classes.fab} color="primary">
      <AddIcon />
      <DialogAddProduct />
    </Fab>
  );
};
export default Grid;
