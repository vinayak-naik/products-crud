import React, { useState, useEffect } from "react";
import style from "./view.module.scss";
import { Box, Button, Grid } from "@material-ui/core";
import Navbar from "../../components/navbar";
import { useHistory, useParams } from "react-router-dom";
import { ArrowBack, Delete, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { productDetails, deleteProduct } from "../../redux/actions/productActions";
import EditProductDialog from "./editProduct";

const ViewComponent = () => {
  const [open, setOpen] = useState(false); 

  const history = useHistory();
  const dispatch = useDispatch();
  const params=useParams()
  const routeHandler = () => history.replace("/home");

  const productDetailsState = useSelector((state) => state.productDetails);
  const { product } = productDetailsState;
  const productDeleteState = useSelector((state) => state.productDelete);
  const { deleteSuccess } = productDeleteState;
  const productUpdateState = useSelector((state) => state.productUpdate);
  const { updateSuccess } = productUpdateState;

useEffect(() => {
  dispatch(productDetails(params.id))
  
}, [open])
useEffect(() => {
  if (deleteSuccess){
    history.replace("/home") 
  }
  if (updateSuccess){
    setOpen(false)
  }
}, [deleteSuccess, updateSuccess])

const deleteHandler = (id) => {
  if (window.confirm('Are you sure')) { 
    dispatch(deleteProduct(id))
  }
}

  return (
    <div className={style.container}>
      <Navbar route={routeHandler} goto="home" />
      <div className={style.mainBox}>
        <div className={style.contentBox}>
          <Grid container className={style.row}>
            <Grid item xs={4} className={style.gridItem}>
              <span className={style.head}>Name:&nbsp;</span>
            </Grid>
            <Grid item xs={8}>
              <span className={style.text}>{product.name}</span>
            </Grid>
          </Grid>
          <Grid container className={style.row}>
            <Grid item xs={4} className={style.gridItem}>
              <span className={style.head}>Price:&nbsp;</span>
            </Grid>
            <Grid item xs={8}>
              <span className={style.text}>{product.price}</span>
            </Grid>
          </Grid>
          <Grid container className={style.row}>
            <Grid item xs={4} className={style.gridItem}>
              <span className={style.head}>Description:&nbsp;</span>
            </Grid>
            <Grid item xs={8}>
              <span className={style.text}>{product.description}</span>
            </Grid>
          </Grid>
         
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="primary"
                startIcon={<ArrowBack />}
                onClick={routeHandler}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                // style={{backgroundColor:'red'}}
                startIcon={<Edit />}
                onClick={()=>setOpen(true)}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<Delete />}
                onClick={() => deleteHandler(product._id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <EditProductDialog  id={product._id} open={open} handleClose={()=>setOpen(false)}/>

    </div>
  );
};

export default ViewComponent;
