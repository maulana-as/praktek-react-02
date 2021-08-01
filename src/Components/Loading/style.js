import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  loadingBox: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    flexDirection: "Column",
  },
}));

export default useStyles;
