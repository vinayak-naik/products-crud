import React, { useState,useEffect } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  listProduct,
  createProduct,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";


const CreateProductDialog = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(createProduct(name, price, description));
  };
  const productCreate = useSelector((state) => state.productCreate)
  const {
    error,success: successCreate,
  } = productCreate

  useEffect(() => {
    setName("")
    setPrice("")
    setDescription("")
  }, [successCreate])
 
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <DialogTitle>
        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2 style={{ color: "#388e3c" }}>Create Product</h2>
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
                type="text"
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
                create
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && (
        <Alert  severity="error">
          {error}
        </Alert>
      )}
      </DialogTitle>
    </Dialog>
  );
};

export default CreateProductDialog;
