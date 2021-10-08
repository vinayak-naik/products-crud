import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/actions/productActions";



const EditProductDialog = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();



  

const productDetails={name, price, description}
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(updateProduct(productDetails,props.id));
  };


 
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <DialogTitle>
      <form onSubmit={onSubmitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2 style={{ color: "#388e3c" }}>Update Product</h2>
          </Grid>

          
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Name"
                variant="outlined"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="price"
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                disabled={!name || !price || !description}
                style={{ height: 50 }}
              >
                {/* {loading ? <CircularProgress size={30} /> : "login"} */}
                update
              </Button>
            </Grid>
        </Grid>
          </form>
      </DialogTitle>
    </Dialog>
  );
};

export default EditProductDialog;
