import React, { useState, useEffect } from "react";
import {
  Fab,
  Card,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./style";
import DialogAddProduct from "../../../Components/Dialog";
import { useFirebase } from "../../../Components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import Loading from "../../../Components/Loading";

const GridProduct = () => {
  const classes = useStyles();
  const { firestore, user } = useFirebase();

  const productArvis = firestore.collection(`arvis/${user.uid}/product`);
  const [snapshot, loading] = useCollection(productArvis);
  const [productItems, setProductItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (snapshot) {
      setProductItems(snapshot.docs);
    }
  }, [snapshot]);

  if (loading) return <Loading />;
  return (
    <>
      <Typography variant="h5" component="h1" style={{marginBottom: "20px" }}>
        Daftar Product :
      </Typography>{" "}
      {productItems.length < 0 && <Typography>Product Not Found</Typography>}
      <Grid container spacing={3}>
        {
            // JSON.stringify(productItems)
            productItems.map(itemProduct => {
                const product = itemProduct.data()
                return <Grid key={product.id} item={true} xs={12} sm={12} md={6} lg={4}>
                <Card>
                    {
                     product.photo && 
                     <CardMedia className={classes.photo}
                         image={product.photo}
                         title={product.nama}
                     /> 
                    }
                    <CardContent>
                        <Typography
                         variant="h5"
                         noWrap
                        >
                            { product.nama}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            })
        }
      </Grid>
      <Fab
        className={classes.fab}
        color="primary"
        onClick={(e) => {
          setOpenDialog(true);
        }}
      >
        <AddIcon />
      </Fab>
      <DialogAddProduct
        open={openDialog}
        handleClose={() => {
          setOpenDialog(false);
        }}
      />
    </>
  );
};
export default GridProduct;
