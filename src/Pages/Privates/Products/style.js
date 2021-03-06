import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  inputImage: {
    display: "none",
  },
  errorNotifUpload: {
    color: "red",
    marginTop: theme.spacing(1),
  },
  photoProductDisplay: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  previewProduct: {
    width: "100%",
    height: "auto",
  },
  card: { 
    display: 'flex',
    height: 'auto'
  },
  photo: {
    width: 150,
  },
  defaultPhoto: { 
    width: 150,
    alignSelf: 'center',
    textAlign: 'center'
  }
}));

export default useStyles;
