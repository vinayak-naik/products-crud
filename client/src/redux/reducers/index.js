import React from "react";
import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./userReducers";
import { productListReducer, productDetailsReducer, productCreateReducer, productDeleteReducer, productUpdateReducer} from "./productReducers";

const RootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDetails:productDetailsReducer,
  productCreate:productCreateReducer,
  productDelete:productDeleteReducer,
  productUpdate:productUpdateReducer,
});

export default RootReducer;
