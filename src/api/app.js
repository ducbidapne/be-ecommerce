import express from "express";
import cors from "cors";
import connectDB from "./configs/database.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoute.js'
import orderRoutes from './routes/orderRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("common"));

connectDB();

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.get('/', (req, res) => {
  res.send('Hello from Vercel API!');
});

app.use((req, res) => {
  res.send("Not found!");
});

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
export default app;
