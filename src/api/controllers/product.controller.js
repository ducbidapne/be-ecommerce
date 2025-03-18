import Product from "../models/product.model.js";
import { storage } from "../configs/firebase.js";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import expressAsyncHandler from "express-async-handler";

const bucketName = process.env.STORAGE_BUCKET;

// Lấy danh sách sản phẩm
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Lấy chi tiết sản phẩm theo ID
export const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

// Lấy sản phẩm theo slug
export const getProductBySlug = expressAsyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

// Lấy danh sách danh mục sản phẩm
export const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Product.find().distinct("category");
  res.send(categories);
});

// Tạo sản phẩm mới
export const createProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, slug, category, brand, description, countInStock } =
    req.body;
  const images = req.files;

  if (!images || images.length === 0) {
    return res.status(400).json({ error: "At least one image is required" });
  }

  const imageUrls = await Promise.all(
    images.map(async (file) => {
      const fileName = `products/${uuidv4()}.jpg`;
      const fileRef = ref(storage, fileName);
      await uploadBytes(fileRef, file.buffer, { contentType: file.mimetype });
      return `https://storage.googleapis.com/${bucketName}/${fileName}`;
    })
  );

  const newProduct = new Product({
    name,
    slug,
    price,
    category,
    brand,
    description,
    countInStock,
    image: imageUrls[0], 
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  res.status(201).send({ message: "Product Created", product });
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).send({ message: "Product Not Found" });
  }

  Object.assign(product, req.body);

  if (req.files && req.files.length > 0) {
    if (product.image) {
      const oldImagePath = product.image.split("/").pop();
      const oldImageRef = ref(storage, `products/${oldImagePath}`);
      await deleteObject(oldImageRef).catch((err) =>
        console.error("Error deleting old image:", err)
      );
    }

    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const fileName = `products/${uuidv4()}.jpg`;
        const fileRef = ref(storage, fileName);
        await uploadBytes(fileRef, file.buffer, { contentType: file.mimetype });
        return `https://storage.googleapis.com/${bucketName}/${fileName}`;
      })
    );

    product.image = imageUrls[0];
  }

  await product.save();
  res.send({ message: "Product Updated", product });
});

// Xóa sản phẩm
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

// Thêm đánh giá sản phẩm
export const createReview = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res
        .status(400)
        .send({ message: "You already submitted a review" });
    }

    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;

    const updatedProduct = await product.save();
    res.status(201).send({
      message: "Review Created",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      numReviews: product.numReviews,
      rating: product.rating,
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
