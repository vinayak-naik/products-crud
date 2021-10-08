import React, { useEffect, useState } from "react";
import style from "./home.module.scss";
import { Box, Grid, Paper, CircularProgress } from "@material-ui/core";
import Navbar from "../../components/navbar";
import { useHistory } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../redux/actions/productActions"; 
import CreateProductDialog from "./createProduct";

const HomeComponent = () => {
  const [open, setOpen] = useState(false); 

  const history = useHistory();
  const routeHandler = () => history.replace("/profile");
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate)
  const {
    success: successCreate,
  } = productCreate

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      history.push("/login");
    } else {
      dispatch(listProduct());
      if(successCreate){
        setOpen(false)
      }
    }
  }, [successCreate]);
  if (error == "Not authorized, token failed") {
    history.replace("/login");
  }
 

  return (
    <div className={style.container}>
      <Navbar route={routeHandler} user="vinayak" />
      {loading ? (
        <div className={style.loaderPage}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className={style.mainBox}>
          <Grid container spacing={2}>
            {products &&
              products.map((item, k) => (
                <Grid
                  key={k}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={style.cardGrid}
                >
                  <Paper elevation={2}>
                    <Box
                      className={style.cardContainer}
                      onClick={() => history.replace(`/view/${item._id}`)}
                    >
                      <Box className={style.imageBox}>Image</Box>
                      <Box className={style.textRow}><span className={style.textHead}>Product Name:&nbsp;</span><span>{item.name}</span></Box>
                      <Box><span className={style.textHead}>Price:&nbsp;</span><span>{item.price}</span></Box>
                      <Box className={style.descriptionBox}><span className={style.textHead}>Description:&nbsp;</span><span>{item.description}</span></Box>
                     </Box>
                  </Paper>
                </Grid>
              ))}
            {products && (
              <div className={style.fab} onClick={()=>setOpen(true)}>
                <Add className={style.fabIcon} />
              </div>
            )}
          </Grid>
        </div>
      )}
      <CreateProductDialog open={open} handleClose={()=>setOpen(false)}/>
    </div>
  );
};

export default HomeComponent;
