import React, { useState } from "react";
import { useFirebase } from "../../Components/FirebaseProvider";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { withRouter } from "react-router";

const DialogAddProduct = ({ history, open, handleClose }) => {
  const { firestore, user } = useFirebase();
  const arvisDoc = firestore.collection(`arvis/${user.uid}/product`);
  const [nama, setNama] = useState("");
  const [error, setError] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      if (!nama) {
        throw new Error("Product Name is required");
      }
      const newProduct = await arvisDoc.add({ nama });
      history.push(`product/edit/${newProduct.id}`);
    } catch (e) {
      setError(e.message);
    }
    setSubmit(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableBackdropClick={isSubmit}
      disableEscapeKeyDown={isSubmit}
    >
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent dividers>
        <TextField
          id="nama"
          label="Product Name"
          value={nama}
          onChange={(e) => {
            setError("");
            setNama(e.target.value);
          }}
          helperText={error}
          error={error ? true : false}
          fullWidth
          disabled={isSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmit} onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave} disabled={isSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogAddProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withRouter(DialogAddProduct);
