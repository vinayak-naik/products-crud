import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;
  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error("product already exists");
  }

  const product = await Product.create({
    name,
    price,
    description,
  });

  if (product) {
    res.status(201).json({
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;
  const product ={
    name,
    price,
    description,
  };

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id,product);
  res.json(updatedProduct);
});

export {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
