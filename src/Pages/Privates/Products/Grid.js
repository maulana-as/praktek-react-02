import React, { useState, useEffect } from "react";
import {
  Fab,
  Card,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./style";
import DialogAddProduct from "../../../Components/Dialog";
import { useFirebase } from "../../../Components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import Loading from "../../../Components/Loading";
import { currency } from '../../../Helpers/ChangeToRupiahFormat'
import { Link } from 'react-router-dom'
import swal from "sweetalert";


const GridProduct = () => {
  const classes = useStyles();
  const { firestore, user, storage } = useFirebase();

  const productArvis = firestore.collection(`arvis/${user.uid}/product`);
  const [snapshot, loading] = useCollection(productArvis);
  const [productItems, setProductItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

   const handleDelete = async(productDelete) =>  { 

      try { 
        let result = await swal({
          title: "Are you sure?",
          text: "Are you sure that you want to leave this page?",
          icon: "warning",
          dangerMode: true,
        })
        await productDelete.ref.delete()
        const photoUrl = productDelete.data().photo; 
        if (photoUrl) await storage.refFromURL(photoUrl).delete()
        return result;
      } catch (err) { 
        console.log(err)
      }

      // swal({
      //   title: "Are you sure?",
      //   text: "Are you sure that you want to leave this page?",
      //   icon: "warning",
      //   dangerMode: true,
      // }).than(() => { 
      //  const data =  await productDelete.ref.delete()
      // const photoUrl = productDelete.data().photo; 
      // if (photoUrl) await storage.refFromURL(photoUrl).delete()
      // })
  }

  useEffect(() => {
    if (snapshot) {
      setProductItems(snapshot.docs);
    }
  }, [snapshot]);

  if (loading) return <Loading />;
  return (
    <>
      <Typography variant="h5" component="h1" style={{ marginBottom: "20px" }}>
        Daftar Product :
      </Typography>{" "}
      {productItems.length < 0 && <Typography>Product Not Found</Typography>}
      <Grid container spacing={3}>
        {
          // JSON.stringify(productItems.data())
          productItems.map((itemProduct) => {
            const product = itemProduct.data();
            console.log(product.id, '<<<id')
            return (
              <Grid key={product.id} item={true} xs={12} sm={12} md={6} lg={4}>
                <Card className={classes.card}>
                  {product.photo && (
                    <CardMedia
                      className={classes.photo}
                      image={product.photo}
                      title={product.nama}
                    />
                  )}
                  {!product.photo && (
                    <div className={classes.defaultPhoto}>
                      <ImageIcon size="large" color="disabled" />
                    </div>
                  )}
                  <CardContent>
                    <Typography variant="h5" noWrap>
                      {product.nama}
                    </Typography>
                    <Typography variant="subtitle">
                      Price: {currency(product.price)}
                    </Typography>
                    <Typography>Stock: {product.stock}</Typography>
                  </CardContent>
                  <CardActions>
                      <IconButton component={Link} to={`/product/edit/${product.id}`}>
                        <EditIcon/>
                      </IconButton>
                      <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                      </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
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
