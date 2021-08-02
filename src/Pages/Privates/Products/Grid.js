import React, { useState } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./style";
import DialogAddProduct from '../../../Components/Dialog'

const Grid = () => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <>
    <Fab className={classes.fab} color="primary" onClick={(e) => { 
        setOpenDialog(true)
    }}>
      <AddIcon />
    </Fab>
      <DialogAddProduct open={openDialog} handleClose={() => { 
          setOpenDialog(false)
      }}  />
      </>
  );
};
export default Grid;
